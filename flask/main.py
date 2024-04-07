from flask import Flask, render_template, request, redirect, url_for, jsonify
import pandas as pd
import numpy as np
import pickle
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
import faiss
import textdistance
from fuzzywuzzy import process
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.llms import GooglePalm
from langchain.prompts import PromptTemplate
from langchain.llms import GooglePalm
from langchain.document_loaders.csv_loader import CSVLoader
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain.embeddings import HuggingFaceInstructEmbeddings
# from langchain.vectorstores import FAISS
# from langchain.prompts import PromptTemplate
# from langchain.chains import RetrievalQA
# from langchain.llms import GooglePalm
import pyttsx3
import threading

from flask_cors import CORS


app = Flask(__name__)
CORS(app)


with open('disease_prediction.pkl', 'rb') as f:
    disease_prd = pickle.load(f)

tracker = pd.read_csv("tracker.csv")

def match_food(x, df):
    match_food, similar_score = process.extractOne(x.capitalize(), df['food'].str.capitalize().values)
    try:
        if similar_score >= 80:
            row = df.loc[df['food'].str.capitalize() == match_food.capitalize()]
            calorie = float(row['calorie'].values[0])
            protein = float(row['protein'].values[0])
            carbs = float(row['carbs'].values[0])
            fat = float(row['fat'].values[0])
            sugar = float(row['Sugar'].values[0])
            fiber = float(row['Fiber'].values[0])
            sodium = float(row['Sodium'].values[0])
            vitamin = float(row['Vitamins'].values[0])
            mineral = float(row['Minerals'].values[0])
            return (calorie, protein, carbs, fat, sugar, fiber, sodium, vitamin, mineral, match_food)
    except Exception as e:
        print("Error:", e)
        return None

medicine_df = pd.read_csv("Medicine.csv")

# def edit_distance(s1, s2):
#     if len(s1) > len(s2):
#         s1, s2 = s2, s1

#     distances = range(len(s1) + 1)
#     for index2, char2 in enumerate(s2):
#         new_distances = [index2 + 1]
#         for index1, char1 in enumerate(s1):
#             if char1 == char2:
#                 new_distances.append(distances[index1])
#             else:
#                 new_distances.append(1 + min((distances[index1], distances[index1 + 1], new_distances[-1])))
#         distances = new_distances
#     return distances[-1]

diet_df = pd.read_csv("dietary_recomendation.csv")

def check_match(value, items):
    if pd.isna(value):
        return False
    for item in items:
        if item in value:
            return True
    return False

def recommend_food(goals, preferences, restrictions, filtered_df):
    goal_weight = 1
    preference_weight = 2
    restriction_weight = -3
    
    filtered_df.loc[:, 'Score'] = (
        filtered_df['Goals'].apply(lambda x: goal_weight if x in goals else 0) +
        filtered_df['Preferences'].apply(lambda x: preference_weight if check_match(x, preferences) else 0) +
        filtered_df['Restrictions'].apply(lambda x: restriction_weight if check_match(x, restrictions) else 0)
    )

    recommended_df = filtered_df.sort_values(by='Score', ascending=False)  # Recommend top 6 foods
    
    return recommended_df


# api_key="AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
# llm = GooglePalm(google_api_key=api_key,temprature=0.6)


symptoms_list = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']

encoder = SentenceTransformer('paraphrase-MiniLM-L6-v2')
symptoms_vectors = encoder.encode(symptoms_list)
print(symptoms_vectors.shape)
symptoms_dim = symptoms_vectors.shape[1]
index = faiss.IndexFlatL2(symptoms_dim)  
index
index.add(symptoms_vectors)

r_splitter = RecursiveCharacterTextSplitter(separators=["\n"," ",",","and"],chunk_size=20,chunk_overlap=0)

data = {
            'Disease': ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 
                'Peptic ulcer disease', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma',
                'Hypertension', 'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
                'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'Hepatitis A',
                'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis',
                'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemorrhoids (piles)', 'Heart attack',
                'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthritis',
                'Arthritis', '(Vertigo) Paroxysmal Positional Vertigo', 'Acne', 'Urinary tract infection',
                'Psoriasis', 'Impetigo'],
            'Test1': ['Fungal culture test', 'Skin prick test (SPT)', 'Upper endoscopy (EGD)', 'Liver function tests (LFTs)', 'Skin patch test',
              'Upper gastrointestinal (GI) endoscopy', 'HIV antibody test (ELISA)', 'Fasting blood sugar test', 'Stool culture', 'Spirometry',
              'Blood pressure measurement', 'Neurological examination', 'Neck X-ray', 'Neurological examination', 'Bilirubin blood test',
              'Blood smear for parasites', 'Clinical examination', 'Dengue NS1 antigen test', 'Blood culture for Salmonella', 'Hepatitis A IgM antibody test',
              'Hepatitis B surface antigen (HBsAg)', 'Hepatitis C antibody test (anti-HCV)', 'Hepatitis D antibody test (anti-HDV)', 'Hepatitis E IgM antibody test', 'Liver function tests (LFTs)',
              'Tuberculin skin test (TST)', 'Clinical examination', 'Chest X-ray', 'Rectal examination', 'Electrocardiogram (ECG)',
              'Clinical examination', 'Thyroid function tests (TFTs)', 'Thyroid function tests (TFTs)', 'Blood glucose measurement', 'Clinical examination',
              'Joint examination', 'Dix-Hallpike test', 'Clinical examination', 'Urinalysis', 'Clinical examination', 'Skin examination'],
            'Test2': ['KOH preparation test', 'Allergen-specific IgE blood test', 'Esophageal pH monitoring', 'Abdominal ultrasound', 'Blood test for drug levels',
              'H. pylori tests (breath, blood, stool)', 'HIV RNA test (viral load)', 'Oral glucose tolerance test (OGTT)', 'Stool antigen tests', 'Peak flow meter',
              'Blood tests (lipid profile, kidney function)', 'Imaging studies (CT, MRI)', 'MRI of the cervical spine', 'CT or MRI of the brain', 'Liver function tests (LFTs)',
              'Rapid diagnostic test (RDT)', 'Tzanck smear', 'Dengue antibody test (IgM/IgG)', 'Widal test', 'Liver function tests (LFTs)',
              'Liver function tests (LFTs)', 'HCV RNA test', 'Liver function tests (LFTs)', 'Liver function tests (LFTs)', 'Alcohol biomarker tests',
              'Chest X-ray', 'Symptom assessment', 'Sputum culture and sensitivity', 'Anoscopy', 'Cardiac enzymes blood test',
              'Doppler ultrasound', 'Thyroid ultrasound', 'Thyroid ultrasound', 'Insulin level test', 'X-ray of the affected joint',
              'Blood tests (RF, CCP, CRP)', 'Epley maneuver', 'Skin analysis', 'Urine culture and sensitivity', 'Skin biopsy', 'Skin culture'],
            'Test3': ['Skin biopsy', 'Patch test', 'Esophageal manometry', 'Liver biopsy', 'Lymphocyte transformation test',
              'Barium swallow or meal', 'CD4 cell count', 'Hemoglobin A1c (HbA1c) test', 'Electrolyte panel', 'Allergy testing',
              'Electrocardiogram (ECG)', 'Migraine triggers diary', 'Electromyography (EMG)', 'Cerebral angiography', 'Abdominal ultrasound',
              'PCR test for Plasmodium DNA', 'PCR test for varicella-zoster virus', 'Complete blood count (CBC)', 'Stool culture', 'Hepatitis A virus RNA test',
              'Hepatitis B core antibody (HBcAb)', 'Liver biopsy', 'Hepatitis D RNA test', 'Hepatitis E virus RNA test', 'Liver biopsy',
              'Sputum culture and microscopy', 'No specific diagnostic test', 'Complete blood count (CBC)', 'Proctoscopy', 'Coronary angiography',
              'Venography', 'Thyroid antibody tests', 'Thyroid antibody tests', 'C-peptide test', 'Joint aspiration',
              'Joint X-rays', 'Videonystagmography (VNG)', 'No specific diagnostic test', 'Imaging studies (ultrasound, CT)', 'No specific diagnostic test', 'No specific diagnostic test']
        }



@app.route('/disease_prediction', methods=['POST'])
def disease_prediction():
    # symptoms_list = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']
    if request.method == 'POST':
        user_input = request.json.get('user_input')
        print(user_input)
        
        # encoder = SentenceTransformer('paraphrase-MiniLM-L6-v2')
        # symptoms_vectors = encoder.encode(symptoms_list)
        # print(symptoms_vectors.shape)
        # symptoms_dim = symptoms_vectors.shape[1]
        # index = faiss.IndexFlatL2(symptoms_dim)  
        # index
        # index.add(symptoms_vectors)

        # r_splitter = RecursiveCharacterTextSplitter(
        # separators=["\n"," ",",","and"],
        # chunk_size=20,
        # chunk_overlap=0
        # )

        user_chunk = r_splitter.split_text(user_input)
        print(user_chunk)

        lq = []

        for i in user_chunk:
            qr = encoder.encode(i)
            qr = np.array(qr).reshape(1,-1)
            distances , I = index.search(qr, k=3)
            original = I[0][0]
            lq.append(symptoms_list[original])
        lq = [item for item in lq if item != "prognosis"]

        symptoms_data = {}
        for symptom in symptoms_list:
            if symptom in lq:
                symptoms_data[symptom] = 1
            else:
                symptoms_data[symptom] = 0
        user_input_processed = pd.DataFrame(symptoms_data,  index=[0])
        pred = disease_prd.predict(user_input_processed)
        print(type(pred))
        # data = {
        #     'Disease': ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 
        #         'Peptic ulcer disease', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma',
        #         'Hypertension', 'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
        #         'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'Hepatitis A',
        #         'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis',
        #         'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemorrhoids (piles)', 'Heart attack',
        #         'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthritis',
        #         'Arthritis', '(Vertigo) Paroxysmal Positional Vertigo', 'Acne', 'Urinary tract infection',
        #         'Psoriasis', 'Impetigo'],
        #     'Test1': ['Fungal culture test', 'Skin prick test (SPT)', 'Upper endoscopy (EGD)', 'Liver function tests (LFTs)', 'Skin patch test',
        #       'Upper gastrointestinal (GI) endoscopy', 'HIV antibody test (ELISA)', 'Fasting blood sugar test', 'Stool culture', 'Spirometry',
        #       'Blood pressure measurement', 'Neurological examination', 'Neck X-ray', 'Neurological examination', 'Bilirubin blood test',
        #       'Blood smear for parasites', 'Clinical examination', 'Dengue NS1 antigen test', 'Blood culture for Salmonella', 'Hepatitis A IgM antibody test',
        #       'Hepatitis B surface antigen (HBsAg)', 'Hepatitis C antibody test (anti-HCV)', 'Hepatitis D antibody test (anti-HDV)', 'Hepatitis E IgM antibody test', 'Liver function tests (LFTs)',
        #       'Tuberculin skin test (TST)', 'Clinical examination', 'Chest X-ray', 'Rectal examination', 'Electrocardiogram (ECG)',
        #       'Clinical examination', 'Thyroid function tests (TFTs)', 'Thyroid function tests (TFTs)', 'Blood glucose measurement', 'Clinical examination',
        #       'Joint examination', 'Dix-Hallpike test', 'Clinical examination', 'Urinalysis', 'Clinical examination', 'Skin examination'],
        #     'Test2': ['KOH preparation test', 'Allergen-specific IgE blood test', 'Esophageal pH monitoring', 'Abdominal ultrasound', 'Blood test for drug levels',
        #       'H. pylori tests (breath, blood, stool)', 'HIV RNA test (viral load)', 'Oral glucose tolerance test (OGTT)', 'Stool antigen tests', 'Peak flow meter',
        #       'Blood tests (lipid profile, kidney function)', 'Imaging studies (CT, MRI)', 'MRI of the cervical spine', 'CT or MRI of the brain', 'Liver function tests (LFTs)',
        #       'Rapid diagnostic test (RDT)', 'Tzanck smear', 'Dengue antibody test (IgM/IgG)', 'Widal test', 'Liver function tests (LFTs)',
        #       'Liver function tests (LFTs)', 'HCV RNA test', 'Liver function tests (LFTs)', 'Liver function tests (LFTs)', 'Alcohol biomarker tests',
        #       'Chest X-ray', 'Symptom assessment', 'Sputum culture and sensitivity', 'Anoscopy', 'Cardiac enzymes blood test',
        #       'Doppler ultrasound', 'Thyroid ultrasound', 'Thyroid ultrasound', 'Insulin level test', 'X-ray of the affected joint',
        #       'Blood tests (RF, CCP, CRP)', 'Epley maneuver', 'Skin analysis', 'Urine culture and sensitivity', 'Skin biopsy', 'Skin culture'],
        #     'Test3': ['Skin biopsy', 'Patch test', 'Esophageal manometry', 'Liver biopsy', 'Lymphocyte transformation test',
        #       'Barium swallow or meal', 'CD4 cell count', 'Hemoglobin A1c (HbA1c) test', 'Electrolyte panel', 'Allergy testing',
        #       'Electrocardiogram (ECG)', 'Migraine triggers diary', 'Electromyography (EMG)', 'Cerebral angiography', 'Abdominal ultrasound',
        #       'PCR test for Plasmodium DNA', 'PCR test for varicella-zoster virus', 'Complete blood count (CBC)', 'Stool culture', 'Hepatitis A virus RNA test',
        #       'Hepatitis B core antibody (HBcAb)', 'Liver biopsy', 'Hepatitis D RNA test', 'Hepatitis E virus RNA test', 'Liver biopsy',
        #       'Sputum culture and microscopy', 'No specific diagnostic test', 'Complete blood count (CBC)', 'Proctoscopy', 'Coronary angiography',
        #       'Venography', 'Thyroid antibody tests', 'Thyroid antibody tests', 'C-peptide test', 'Joint aspiration',
        #       'Joint X-rays', 'Videonystagmography (VNG)', 'No specific diagnostic test', 'Imaging studies (ultrasound, CT)', 'No specific diagnostic test', 'No specific diagnostic test']
        # }
        pred = pred.tolist()
        pred = pred[0]
        pred_lower = pred.lower()
        best_match, score = process.extractOne(pred_lower, data['Disease'])

        if score >= 80:
            idx = data['Disease'].index(best_match)
            test1 = data['Test1'][idx]
            test2 = data['Test2'][idx]
            test3 = data['Test3'][idx]
            test = [test1, test2, test3]
        else:
            test = []

        print(test)
        
        dict3={}
        l3=["T1","T2","T3"]
        
        for i in range(3):
            dict3[l3[i]]=test[i]
        test = dict3

        api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=2000)
        tool = WikipediaQueryRun(api_wrapper=api_wrapper)

        info = tool.run(pred)+"....."
        print(info) 
        
        gh = {"Disease":pred,"Test":test,"Information":info}
        print(gh)




    return jsonify(gh)


@app.route('/calorie_tracker', methods=['POST'])
def calorie_tracker():
    
    food_dict={}

    if request.method == 'POST':
        x = request.json.get('food')
        serv = float(request.json.get('serving'))
        print("Food : ",x)
        # print("Serving : ",serv)
        ma = match_food(x, tracker)

        if ma:
            food_dict = {
                "Food": ma[9],
                "Serving": serv,
                "Calorie": ma[0] * serv,
                "Protein": ma[1] * serv,
                "Carbs": ma[2] * serv,
                "Fat": ma[3] * serv,
                "Sugar": ma[4] * serv,
                "Fiber": ma[5] * serv,
                "Sodium": ma[6] * serv,
                "Vitamins": ma[7] * serv,
                "Minerals": ma[8] * serv 
            }
            return jsonify({'Calorie': food_dict})
        
    return jsonify({'Calorie': food_dict})



@app.route('/medicine_prediction', methods=['POST'])
def medicine_prediction():
    if request.method == 'POST':
        user_condition = request.json.get('condition')
        # matches = [(condition, textdistance.levenshtein.normalized_distance(condition.capitalize(), condition.capitalize())) for condition in medicine_df['condition']]
        # best_match, best_similarity = min(matches, key=lambda condition: condition[1])

        # print(best_match, 1 - best_similarity)

        # condition=best_match
        # filtered_medicine_df = medicine_df[medicine_df['condition'] == condition]
        # sorted_medicine_df = filtered_medicine_df.sort_values(by=['rating', 'usefulCount'], ascending=False)
        # top_drug = (sorted_medicine_df['uniqueID'].head(3)).tolist()


        # print(top_drug)

        # dict={}
        # med=["M1","M2","M3"]
        # for i in range(3):
        #     dict[med[i]] = (medicine_df[medicine_df['uniqueID'] == top_drug[0]]).to_dict(orient="records")

    def edit_distance(s1, s2):
        if len(s1) > len(s2):
            s1, s2 = s2, s1

        distances = range(len(s1) + 1)
        for index2, char2 in enumerate(s2):
            new_distances = [index2 + 1]
            for index1, char1 in enumerate(s1):
                if char1 == char2:
                    new_distances.append(distances[index1])
                else:
                    new_distances.append(1 + min((distances[index1], distances[index1 + 1], new_distances[-1])))
            distances = new_distances
        return distances[-1]


    matches = [(cond, textdistance.levenshtein.normalized_distance(user_condition, cond.capitalize())) for cond in medicine_df['condition']]
    best_match, best_similarity = min(matches, key=lambda item: item[1])

    print("Best match:", best_match)
    print("Similarity score:", 1 - best_similarity)

    filtered_medicine_df = medicine_df[medicine_df['condition'] == best_match]
    sorted_medicine_df = filtered_medicine_df.sort_values(by=['rating', 'usefulCount'], ascending=False)
    top_drug_names = sorted_medicine_df['drugName'].head(3).tolist()

    print("Top 4 drug names for the condition:", top_drug_names)

    dict={}
    med=["M1","M2","M3"]
    for i in range(3):
        dict[med[i]] = (medicine_df[medicine_df['drugName'] == top_drug_names[i]]).to_dict(orient="records")
    print(dict)

    return jsonify(dict)


@app.route('/food_recomendation', methods=['POST'])
def food_recomendation():
    if request.method == 'POST':
        weight = float(request.json.get('weight'))
        height = float(request.json.get('height'))
        age = float(request.json.get('age'))
        gender = request.json.get('gender')
        activity_level = request.json.get('activity_level')
        # activity_level_options = ['Sedentary', 'Lightly_Active', 'Moderately_Active', 'Very_Active']

        goals = request.json.get('goal')
        goals = [goals]
        # ['Weight loss', 'Muscle gain', 'General health', 'Indulgence']

        preferences = request.json.get('preference')
        # ['Protein-Rich Foods', 'Whole Grains', 'Vegetables', 'Dairy','Fruits', nan, 'Vegetarian', 'Nuts', 'Spices', 'Fats', 'Sweets','Beverages', 'Seafood', 'Snacks', 'Condiments', 'Street Food','Indian', 'South Indian', 'Fusion', 'North Indian', 'Tibetan','Indo-Chinese', 'Gujarati', 'Rajasthani']

        restrictions = request.json.get('restriction')
        restrictions = [restrictions]
        # ['Lactose intolerant', 'No Restriction', 'Gluten-free','Vegetarian', 'Caffeine sensitive']

        bmi = round(weight/((height/100)**2),2)

        if bmi < 18.5:
            bodytype="Underweight"
        elif 18.5 <= bmi < 25:
            bodytype= "Normal Weight"
        elif 25 <= bmi < 30:
            bodytype= "Overweight"
        else:
            bodytype= "Obese"
    
        print(bodytype)

        if gender.lower()=="male" or gender=="m":
            bmr=88.362+(13.397*weight)+(4.799*height)-(5.677*age)
        elif gender.lower()=="female" or gender=="f":
            bmr=447.593+(9.247*weight)+(3.098*height)-(4.330*age)
        else:
            bmr=0
    
        print(bmr)


        multiplier = {
            'sedentary': 1.2,
            'lightly_active': 1.375,
            'moderately_active': 1.55,
            'very_active': 1.725
            }

        tdee = bmr*multiplier[activity_level.lower()] 

        print("TDEE : ",tdee)

        
        filtered_df = diet_df[diet_df['Goals'].isin(goals) & diet_df['Preferences'].apply(lambda x: check_match(x, preferences)) & diet_df['Restrictions'].apply(lambda x: check_match(x, restrictions))]

        if not filtered_df.empty:
            recommendations = recommend_food(goals, preferences, restrictions, filtered_df)
            recommended = recommendations[['food', 'calorie', 'protein', 'carbs', 'fat']].head(3)

        print(recommended)
        recommended = recommended.to_dict(orient="records")
        ext={}
        ext["Bodytype"] = bodytype
        ext["Bmr"] = bmr
        ext["TDEE"] = tdee
        print(ext)   
        l=[]
        l.append(recommended)
        l.append(ext)  



    return jsonify(l)


@app.route('/exercise_recomendation', methods=['POST'])
def exercise_recomendation():
    api_key="AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
    llm = GooglePalm(google_api_key=api_key,temprature=0.6)
    if request.method == 'POST':
        age = request.json.get('age')
        gender = request.json.get('gender')
        fitness_level = request.json.get('fitness_level')
        weight = request.json.get('weight')
        height = request.json.get('height')
        activity_level = request.json.get('activity_level')
        primary_goal = request.json.get('primary_goal')
        
        input_values = {
            "age" : age, 
            "gender" : gender, 
            "fitness_level" : fitness_level, 
            "weight" : weight, 
            "height" : height, 
            "activity_level" : activity_level, 
            "primary_goal" : primary_goal
        }

        print(input_values)

        prompt_template_name = PromptTemplate(
                input_variables=["age", "gender", "fitness_level", "weight", "height", "activity_level", "primary_goal"],
                template="I am {age} years old {gender}, my fitness level is {fitness_level} and my body measurements are {weight} kgs and {height} cms, my activity level is {activity_level} and my primary goal is {primary_goal}. Based on my above information, recommend me an Exercise_Type and a detailed plan for that Exercise_Type including its duration, intensity level, muscle groups targeted, and equipment needed. Remove all other things and give a more detailed plan in the form of a dictionary."
        )
        

        formatted_prompt=prompt_template_name.format(**input_values)
        print(formatted_prompt)

        output = llm(formatted_prompt)
        print(output)

        dict={}
        dict.update({"output":output})



    return jsonify(dict)

@app.route('/ai_doctor', methods=['POST'])
def ai_doctor():
    if request.method == 'POST':
        user_input = request.json.get('user_input')
        print(user_input)
        user_chunk = r_splitter.split_text(user_input)
        print(user_chunk)

        lq = []

        for i in user_chunk:
            qr = encoder.encode(i)
            qr = np.array(qr).reshape(1,-1)
            distances , I = index.search(qr, k=3)
            original = I[0][0]
            lq.append(symptoms_list[original])
        lq = [item for item in lq if item != "prognosis"]

        symptoms_data = {}
        for symptom in symptoms_list:
            if symptom in lq:
                symptoms_data[symptom] = 1
            else:
                symptoms_data[symptom] = 0
        user_input_processed = pd.DataFrame(symptoms_data,  index=[0])
        pred = disease_prd.predict(user_input_processed)
        print(type(pred))

        pred = pred.tolist()
        pred = pred[0]
        pred_lower = pred.lower()
        best_match, score = process.extractOne(pred_lower, data['Disease'])

        if score >= 80:
                idx = data['Disease'].index(best_match)
                test1 = data['Test1'][idx]
                test2 = data['Test2'][idx]
                test3 = data['Test3'][idx]
                test = [test1, test2, test3]
        else:
                test = []

        print(test)

        api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=420)
        tool = WikipediaQueryRun(api_wrapper=api_wrapper)

        info = tool.run(pred)+"....."
        print(info) 


        matches = [(cond, textdistance.levenshtein.normalized_distance(pred, cond.capitalize())) for cond in medicine_df['condition']]
        best_match, best_similarity = min(matches, key=lambda item: item[1])

        print("Best match:", best_match)
        print("Similarity score:", 1 - best_similarity)

        filtered_medicine_df = medicine_df[medicine_df['condition'] == best_match]
        sorted_medicine_df = filtered_medicine_df.sort_values(by=['rating', 'usefulCount'], ascending=False)
        drug_name = sorted_medicine_df['drugName'].head(3).tolist()
        drug_id = sorted_medicine_df['uniqueID'].head(3).tolist()



        dict1={}
        dict2={}
        dict3={}
        l1=["M1","M2","M3"]
        l2=["I1","I2","I3"]
        l3=["T1","T2","T3"]

        for i in range(3):
            dict1[l1[i]]=drug_name[i]
        drug_name = dict1
        
        for i in range(3):
            dict2[l2[i]]=drug_id[i]
        drug_id = dict2
        
        for i in range(3):
            dict3[l3[i]]=test[i]
        test = dict3


        print("drug name for the condition:", drug_name)
        print("drug id for the condition:", drug_name)
        print("Test:",test)

                
        gh = {"Disease":pred,"Test":test,"Information":info,"Medicine":drug_name,"Medicine_id":drug_id}
        print(gh)

    return jsonify(gh)


policy_df = pd.read_csv("policy_cleaned.csv")
print(policy_df.shape)

with open('policy.pkl', 'rb') as file:
    policy_model = pickle.load(file)

from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import GooglePalm




@app.route('/policy_recomendation', methods=['POST'])
def policy_recomendation():

    api_key = "AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
    temperature = 0.6
    llm = GooglePalm(google_api_key=api_key, temperature=temperature)

    print("llm loaded")
    if request.method == 'POST':
        member_covered = int(request.json.get('member_covered'))
        age = int(request.json.get('age'))
        coverage = int(request.json.get('coverage'))
        policy_tenure = int(request.json.get('policy_tenure'))
        smoker = request.json.get('smoker')
        
        if(smoker.lower()=='yes'):
            smoker = 1
        elif(smoker.lower()=="no"):
            smoker = 0
        else :
            smoker = smoker

        user_input = {
            'member_covered': member_covered,
            'age': age,
            'coverage': coverage,
            'policy_tenure': policy_tenure,
            'smoker': smoker
        }

        user_input_df = pd.DataFrame(user_input, index=[0])
        user_pred = policy_model.predict(user_input_df)
        premium = user_pred.tolist()[0]
        print(premium)
        best_rows = policy_df[policy_df['monthly_premium'].sub(premium).abs().eq(policy_df['monthly_premium'].sub(premium).abs().min())].head(3)
        dict_outer = {}
        for i, (index, row) in enumerate(best_rows.iterrows(), 1):
            row_dict = {
                'name': row['name'],
                'member_covered': row['member_covered'],
                'age': row['age'],
                'coverage': row['coverage'],
                'policy_tenure': row['policy_tenure'],
                'monthly_premium': row['monthly_premium'],
                'claim_reported': row['claim_reported']*1000,
                'claim_outstanding': row    ['claim_outstanding']*1000,
                'smoker': row['smoker']
            }
            dict_outer[f'Policy{i}'] = row_dict

        print(dict_outer)

        prompt_template_items = PromptTemplate(
            input_variables=["name",'member_covered','age','coverage','policy_tenure','monthly_premium','claim_reported','claim_outstanding','smoker'],
            template = "The name of my medical Insurence plan is {name} my {member_covered} family members are covered my age is {age}, the policy covers inr {coverage} and is valid for {policy_tenure} years and i have to pay a monthly premium of {monthly_premium} write key benifits for this Medical insurence plan with sub heading and additional covers for this medical insurence plan with subheading"
        )
        chain = LLMChain(llm=llm,prompt=prompt_template_items)

        for i in range(1,len(dict_outer)+1):
            x= dict_outer[f'Policy{i}']  
            input_data ={
                "name" :  x['name'],
                "member_covered" : x['member_covered'],
                "age" : x['age'],
                "coverage" : x['coverage'],
                "policy_tenure" : x['policy_tenure'],
                "monthly_premium" : x['monthly_premium'],
                "claim_reported" : x['claim_reported'],
                "claim_outstanding" : x['claim_outstanding'],
                "smoker" : x['smoker']
            }

            response = chain.run(input_data) 
            response = response.replace('*', '')

            x['Benifits'] = response
        print(dict_outer)    

    return jsonify(dict_outer) 


@app.route('/mental_bot', methods=['POST'])
def mental_bot():

    api_key = "AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
    temperature = 0.6
    llm = GooglePalm(google_api_key=api_key, temperature=temperature)

    print("llm loaded")

    if request.method == 'POST':
        user_input = request.json.get('user_input')
    prompt_template_items = PromptTemplate(
        input_variables = [user_input],
        template = "This is the '{user_input}' input ; i wnat you to list all these [Mood,Trigger,Focus,Personality,Mental profile,Envoirment,Habit,Song Recomendation [English , Hindi],Analysis,Personalized Solution ] line by line according to user feeling if cannot get any answer just return 'Nan'" 
    )
    chain = LLMChain(llm=llm,prompt=prompt_template_items)  

    response = chain.run(user_input)  

    response = response.replace('*', '')
    print(response)
    
    return jsonify({'message': response})


# loader = CSVLoader(file_path='Book1.csv')
# data = loader.load()

# instructor_embeddings = HuggingFaceInstructEmbeddings()

# vectordb = FAISS.from_documents(documents=data , embedding=instructor_embeddings)

# # api_key="AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
# # temprature = 0.6
# # llm = GooglePalm(google_api_key=api_key,temprature=temprature)


# @app.route('/chat_bot', methods=['POST'])
# def chat_bot():
#     api_key="AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
#     temprature = 0.6
#     llm = GooglePalm(google_api_key=api_key,temprature=temprature)
#     # loader = CSVLoader(file_path='Book1.csv')
#     # data = loader.load()

#     # instructor_embeddings = HuggingFaceInstructEmbeddings()

#     vectordb = FAISS.from_documents(documents=data , embedding=instructor_embeddings)
#     if request.method == 'POST':
#         query = request.json.get('query')
#         retriever = vectordb.as_retriever()
#         rdocs = retriever.get_relevant_documents(query)
#         print(rdocs)

#         prompt_template = '''Given the following context and a question , generate an answer based on this context only . 
#         In the answer try to provide as much possible from "response" section you can have some liberty 
#         If the answer is not found in the context Kindly state "I don't know.", for result part give clean answers Don't try to make up an answer. Start the result with "Answer : ".
#         Context : {context}
#         Question : {question}'''

#         prompt = PromptTemplate(
#             template=prompt_template, input_variables=["context","question"]
#         )
        
#         chain = RetrievalQA.from_chain_type(llm=llm,
#             chain_type="stuff",
#             retriever=retriever,
#             # input_key="",
#             return_source_documents=True, 
#             chain_type_kwargs={"prompt":prompt}
#            )
#         io = chain(query)
#         question = io.get("query")
#         answer = io.get("result")

#         dict = {}
#         dict["Question"]= question
#         dict["Answer"]=answer

#         return jsonify(dict)

from langchain_community.embeddings import HuggingFaceInstructEmbeddings

# instructor_embeddings = HuggingFaceInstructEmbeddings()

# vectordb = FAISS.from_documents(documents=data , embedding=instructor_embeddings)

# from langchain_community.embeddings import HuggingFaceHubEmbeddingspyt

# from huggingface_hub import HF_API_TOKEN

# # Assign your Hugging Face access token to the token variable
# token = "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"




@app.route('/chat_bot', methods=['POST'])
def chat_bot():
    api_key="AIzaSyCIVgLu-1lfBHFqaHXGhzxEDmq3hFrU4bw"
    temprature = 0.6
    llm = GooglePalm(google_api_key=api_key,temprature=temprature)

    loader = CSVLoader(file_path='Book1.csv')
    data = loader.load()

    # # instructor_embeddings = HuggingFaceInstructEmbeddings()
    # instructor_embeddings = HuggingFaceInstructEmbeddings(model_name="bert-base-uncased", device="cuda")

    instructor_embeddings = HuggingFaceInstructEmbeddings()

# Example of setting the device after initialization
    instructor_embeddings.set_device("cuda")
    instructor_embeddings.model_name="bert-base-uncased"
    # instructor_embeddings.token="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"


    vectordb = FAISS.from_documents(documents=data , embedding=instructor_embeddings)

    if request.method == 'POST':
        query = request.json.get('query')
        retriever = vectordb.as_retriever()
        rdocs = retriever.get_relevant_documents(query)
        print(rdocs)

        prompt_template = '''Given the following context and a question , generate an answer based on this context only . 
        In the answer try to provide as much possible from "response" section you can have some liberty 
        If the answer is not found in the context Kindly state "I don't know.", for result part give clean answers Don't try to make up an answer. Start the result with "Answer : ".
        Context : {context}
        Question : {question}'''

        prompt = PromptTemplate(
            template=prompt_template, input_variables=["context","question"]
        )
        chain = RetrievalQA.from_chain_type(llm=llm,
            chain_type="stuff",
            retriever=retriever,
            # input_key="",
            return_source_documents=True, 
            chain_type_kwargs={"prompt":prompt}
           )
        io = chain(query)
        question = io.get("query")
        answer = io.get("result")

        # dict = {}
        # dict["Question"]= question
        # dict["Answer"]=answer

        return jsonify({"Question":question,"Answer":answer})


@app.route('/wiki', methods=['POST'])
def wiki_search():
    if request.method == 'POST':
        query = request.json.get('query')
        api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=2000)
        tool = WikipediaQueryRun(api_wrapper=api_wrapper)

        output = tool.run(query)+"....."
        dict={}
        dict["Output"]=output
        print(dict)


    return jsonify(dict)




if __name__ == '__main__':
    app.run(debug=True, port=8001) 






