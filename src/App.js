import { Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import SignUpPage from "./Authentication/Signup";
import LoginPage from "./Authentication/Login";
import UserDetail from "./Authentication/UserDetails";
import Home from "./Authentication/Home";
import MainHome from "./afterAuth/MainHome";
import Appointment from "./afterAuth/Appointment";
import Services from "./afterAuth/Services";
import Doctor from "./afterAuth/Doctor";
import SignUpDoctor from "./Authentication/SignupDoctor";
import AdminHome from "./afterAuth/AdminHome";
import DoctorDetails from "./afterAuth/DoctorDetails";
import SeeAppointment from "./afterAuth/SeeAppointment";
import PatientAppointment from "./afterAuth/PatientAppointment";
import Contact from "./afterAuth/Contact";
import Psychiatrist from "./afterAuth/Psychiatrist";
import RegistrationForm from "./afterAuth/test";
import Pagination from "./afterAuth/Pagination";
import MedicoMart from "./afterAuth/Medicomart";
import MedicoDetails from "./afterAuth/MedicineDetails";
import DietRecommendation from "./afterAuth/DietRecommendation";
import DietVisulizer from "./afterAuth/DietVisulizer";
import ExerciseRecommendation from "./afterAuth/ExerciseReccomendation";
import MedicineRecommendation from "./afterAuth/MedicinePrediction";
import CalorieTracker from "./afterAuth/CalorieTracker";
import AiDoctor from "./afterAuth/AiDoctor";
import DiseasePrediction from "./afterAuth/DiseasePrediction";
import PolicyRecommendation from "./afterAuth/policyReccomdation";
import MentalBot from "./afterAuth/MentalBot";
import PDFUploader from "./afterAuth/testPdf";
function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      <Routes>
        <Route path="/test" element={<RegistrationForm />} />
        <Route path="/mentalbot" element={<MentalBot />} />
        <Route path="/meet" element={<LobbyScreen />} />
        <Route path="/calorieTracker" element={<CalorieTracker />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="/diseasePrediction" element={<DiseasePrediction />} />
        <Route path="/aiDoctor" element={<AiDoctor />} />
        <Route
          path="/medicinePrediction"
          element={<MedicineRecommendation />}
        />
        <Route path="/doctor/appointment/:id" element={<Appointment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/exercise" element={<ExerciseRecommendation />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/diet" element={<DietRecommendation />} />
        <Route path="/dietvisulizer" element={<DietVisulizer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/medicomart" element={<MedicoMart />} />
        <Route path="/doctorSignup" element={<SignUpDoctor />} />
        <Route path="/doctorhome" element={<AdminHome />} />
        <Route path="/pdf" element={<PDFUploader />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/allAppointment/:id" element={<SeeAppointment />} />
        <Route
          path="/patientAppointment/:id"
          element={<PatientAppointment />}
        />
        <Route path="/phychiatrist" element={<Psychiatrist />} />
        <Route path="/userDetails" element={<UserDetail />} />
        <Route path="/MedicoDetails/:id" element={<MedicoDetails />} />
        <Route path="/policy" element={<PolicyRecommendation />} />

        <Route
          exact
          path="/login"
          element={isLoggedIn == "true" ? <UserDetail /> : <LoginPage />}
        />
        <Route
          exact
          path="/"
          element={isLoggedIn == "true" ? <UserDetail /> : <Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
