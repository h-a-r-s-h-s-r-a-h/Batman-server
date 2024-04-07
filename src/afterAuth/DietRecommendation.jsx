import React, { useState, useEffect } from "react";
import style from "./TestHome.module.css";
import styles from "./Services.module.css";
import DietVisulizer from "./DietVisulizer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
const DietRecommendation = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [dietData, setdietData] = useState([]);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activity_level: "Lightly_Active",
    goal: "Weight loss",
    preference: [],
    restriction: "No Restriction",
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      // Handle checkbox inputs separately
      if (checked) {
        setFormData({ ...formData, [name]: [...formData[name], value] });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData.weight)
    // console.log(formData);
    const response = await fetch("http://127.0.0.1:8001/food_recomendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        weight: formData.weight,
        height: formData.height,
        age: formData.age,
        gender: formData.gender,
        activity_level: formData.activity_level,
        goal: formData.goal,
        preference: formData.preference,
        restriction: formData.restriction,
      }),
    });
    const data = await response.json();
    console.log(data);
    console.log(data[0][0].calorie);
    setdietData(data);
    toast.success("Your Food is Ready");
  };
  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          // alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./login";
        }
      });
  }, []);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };
  return (
    <div>
      <div
        id="topbar"
        className={`${style.topbar1} d-flex align-items-center fixed-top`}
      >
        <div
          className={`${style.container} d-flex align-items-center justify-content-center justify-content-md-between`}
        >
          <div className={`${style.rightItem} d-flex align-items-center`}>
            <i className="bi bi-phone"></i>Call us now 6203104630
          </div>
        </div>
      </div>

      <header id="header" className={`${style.header1} fixed-top`}>
        <div className={`${style.container} d-flex align-items-center`}>
          <a href="/" className={`${style.logo} me-auto`}>
            <img
              className="img-fluid rounded-circle shadow-sm"
              src="/batDoctor.png"
              alt=""
              style={{ width: "50px", height: "auto" }}
            />
          </a>

          <nav id="navbar" className={`${style.navbar} order-last order-lg-0`}>
            <ul>
              <li>
                <a className={`${style.navlink}`} href="/">
                  Home
                </a>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/doctor">
                  Doctors
                </a>
              </li>

              <li className={style.dropdown}>
                <a>
                  <span>Health Ally</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="/aidoctor">MedicoMate's AI Doctor</a>
                  </li>
                  <li className={style.dropdown}>
                    <a>
                      <span>Ai Assistant</span>
                      <i className="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="/diseasePrediction">Disease Predictor</a>
                      </li>
                      <li>
                        <a href="/medicinePrediction">Medicine Predictor</a>
                      </li>
                      <li>
                        <a href="/calorieTracker">
                          MedicoMate's Calorie Tracker
                        </a>
                      </li>
                      <li>
                        <a href="/exercise">Custom Fitness Plans</a>
                      </li>
                      <li>
                        <a href="/diet">Customized Nutrition</a>
                      </li>
                      {/* <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li> */}
                    </ul>
                  </li>
                  <li>
                    <a href="/medicomart">MedicoMart: Your Health Hub</a>
                  </li>
                  {/* <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li> */}
                </ul>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/services">
                  Services
                </a>
              </li>
              <li>
                <a className={`${style.navlink}`} href="/contact">
                  Contact
                </a>
              </li>
              {/* <li>
                <a className={`${style.navlink}`} href="#footer">
                  About
                </a>
              </li> */}
              <li className={style.dropdown}>
                <a href="">
                  <span>Account Settings</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>{userData.fname}</li>
                  <li>
                    <a href={`/patientAppointment/${userData._id}`}>
                      See Appointment
                    </a>
                  </li>

                  <li>
                    <a onClick={logOut}>Log Out</a>
                  </li>
                  {/* <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </nav>

          <a href="/doctor" className={`${style.appointmentbtn}`}>
            <span className="d-none d-md-inline">Make an</span> Appointment
          </a>
        </div>
      </header>

      <section id="hero" className={`${styles.hero} d-flex align-items-center`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>MedicoMate: NutriGenie</h1>
              <h2>
                Personalized diet recommendations for your health goals, all at
                your fingertips.
              </h2>
              <div className="d-flex"></div>
            </div>
            <div className={`col-lg-6 order-1 order-lg-2 ${styles.heroimg}`}>
              <img src="/diet.png" class="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="featured-services" className={styles.featuredservices8}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-10">
                <label for="inputEmail4">Weight</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputEmail4"
                  name="weight"
                  placeholder="Weight (in kg)"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-10">
                <label for="inputPassword4">Height</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  name="height"
                  placeholder="Height (in cms)"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group col-md-10">
              <label for="inputAddress">Age</label>
              <input
                type="number"
                className="form-control"
                id="inputAddress"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-10">
              <label for="inputAddress2">Gender</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                name="gender"
                placeholder="Gender (Male/Female)"
                value={formData.gender}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-10">
              <label for="inputAddress2" style={{ color: "purple" }}>
                Activity Level
              </label>
              <div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="activity_level"
                      value="Sedentary"
                      checked={formData.activity_level === "Sedentary"}
                      onChange={handleChange}
                    />
                    Sedentary
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="activity_level"
                      value="Lightly_Active"
                      checked={formData.activity_level === "Lightly_Active"}
                      onChange={handleChange}
                    />
                    Lightly Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="activity_level"
                      value="Moderately_Active"
                      checked={formData.activity_level === "Moderately_Active"}
                      onChange={handleChange}
                    />
                    Moderately Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="activity_level"
                      value="Very_Active"
                      checked={formData.activity_level === "Very_Active"}
                      onChange={handleChange}
                    />
                    Very Active
                  </label>
                </div>
              </div>

              <hr />

              <label for="inputAddress2" style={{ color: "orange" }}>
                Goal
              </label>
              <div>
                <div>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="goal"
                      value="Weight loss"
                      checked={formData.goal === "Weight loss"}
                      onChange={handleChange}
                    />
                    Weight loss
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="goal"
                      value="Muscle gain"
                      checked={formData.goal === "Muscle gain"}
                      onChange={handleChange}
                    />
                    Muscle gain
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="goal"
                      value="General health"
                      checked={formData.goal === "General health"}
                      onChange={handleChange}
                    />
                    General health
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="goal"
                      value="Indulgence"
                      checked={formData.goal === "Indulgence"}
                      onChange={handleChange}
                    />
                    Indulgence
                  </label>
                </div>
              </div>

              <hr />
              <div>
                <label style={{ color: "green" }}>Prefence</label>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Protein-Rich Foods"
                      checked={formData.preference.includes(
                        "Protein-Rich Foods"
                      )}
                      onChange={handleChange}
                    />
                    Protein-Rich Foods
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Whole Grains"
                      checked={formData.preference.includes("Whole Grains")}
                      onChange={handleChange}
                    />
                    Whole Grains
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Vegetables"
                      checked={formData.preference.includes("Vegetables")}
                      onChange={handleChange}
                    />
                    Vegetables
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Dairy"
                      checked={formData.preference.includes("Dairy")}
                      onChange={handleChange}
                    />
                    Dairy
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Fruits"
                      checked={formData.preference.includes("Fruits")}
                      onChange={handleChange}
                    />
                    Fruits
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Street Food"
                      checked={formData.preference.includes("Street Food")}
                      onChange={handleChange}
                    />
                    Street Food
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="Nuts"
                      checked={formData.preference.includes("Nuts")}
                      onChange={handleChange}
                    />
                    Nuts
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="North Indian"
                      checked={formData.preference.includes("North Indian")}
                      onChange={handleChange}
                    />
                    North Indian
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="preference"
                      value="South Indian"
                      checked={formData.preference.includes("South Indian")}
                      onChange={handleChange}
                    />
                    South Indian
                  </label>
                </div>
              </div>
              <hr />

              <label for="inputAddress2" style={{ color: "red" }}>
                Restriction
              </label>
              <div>
                <div>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="restriction"
                      value="Lactose intolerant"
                      checked={formData.restriction === "Lactose intolerant"}
                      onChange={handleChange}
                    />
                    Lactose intolerant
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="restriction"
                      value="No Restriction"
                      checked={formData.restriction === "No Restriction"}
                      onChange={handleChange}
                    />
                    No Restriction
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="restriction"
                      value="Gluten-free"
                      checked={formData.restriction === "Gluten-free"}
                      onChange={handleChange}
                    />
                    Gluten-free
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="restriction"
                      value="Vegetarian"
                      checked={formData.restriction === "Vegetarian"}
                      onChange={handleChange}
                    />
                    Vegetarian
                  </label>
                  <label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="restriction"
                      value="Caffeine sensitive"
                      checked={formData.restriction === "Caffeine sensitive"}
                      onChange={handleChange}
                    />
                    Caffeine sensitive
                  </label>
                </div>
              </div>

              {/* Render Additional Information */}
              {/* <div>
                  <h2>Additional Information</h2>
                  <p>BMR: {dietData[1].Bmr}</p>
                  <p>Body Type: {dietData[1].Bodytype}</p>
                  <p>TDEE: {dietData[1].TDEE}</p>
                </div> */}
            </div>

            <button
              type="submit"
              style={{ marginTop: "25px", marginRight: "19%" }}
              className="btn btn-primary mb-3"
            >
              Make Recommendation
            </button>
          </form>
          <Popup
            trigger={
              <button
                type="submit"
                style={{ marginTop: "25px", marginRight: "19%" }}
                className="btn btn-primary mb-3"
              >
                Get Recommendation
              </button>
            }
            position="top middle"
            contentStyle={{
              width: "800px",
              padding: "20px",
              height: "800px",
              overflowY: "auto",
            }}
            // closeOnDocumentClick={false}
          >
            <div>
              {dietData[1] && ( // Check if dietData[1] is not undefined
                <div>
                  <h1 style={{ marginTop: "20px" }}>Body Details </h1>
                  <hr
                    style={{
                      width: "50%",
                      marginLeft: "25%",
                      marginBottom: "60px",
                    }}
                  />
                  <h4>
                    <li>BMR = {dietData[1].Bmr}</li>
                  </h4>
                  <h4>
                    <li>Body Type = {dietData[1].Bodytype}</li>
                  </h4>
                  <h4>
                    <li>TDEE = {dietData[1].TDEE}</li>
                  </h4>
                  <hr style={{ marginBottom: "60px", marginTop: "60px" }} />

                  {/* Render Recommended Foods only if dietData[0] is defined */}
                  {dietData[0] && (
                    <div>
                      <h1>Recommended Food </h1>
                      <hr
                        style={{
                          width: "50%",
                          marginLeft: "25%",
                          marginBottom: "60px",
                        }}
                      />
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Food (1 serv = 100g)</th>
                            <th scope="col">Calorie (in g)</th>
                            <th scope="col">Protien (in g)</th>
                            <th scope="col">Carbs (in g)</th>
                            <th scope="col">Fats (in g)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>{dietData[0][0].food}</td>
                            <td>{dietData[0][0].calorie}</td>
                            <td>{dietData[0][0].protein}</td>
                            <td>{dietData[0][0].carbs}</td>
                            <td>{dietData[0][0].fat}</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>{dietData[0][1].food}</td>
                            <td>{dietData[0][1].calorie}</td>
                            <td>{dietData[0][1].protein}</td>
                            <td>{dietData[0][1].carbs}</td>
                            <td>{dietData[0][1].fat}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>{dietData[0][2].food}</td>
                            <td>{dietData[0][2].calorie}</td>
                            <td>{dietData[0][2].protein}</td>
                            <td>{dietData[0][2].carbs}</td>
                            <td>{dietData[0][2].fat}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Popup>

          <div>
            <ul>
              {/* {dietData && dietData[0] && (
                <div>
                  <h2>Recommended Foods</h2>
                  <ul>
                    {dietData[0].map((foodItem, index) => (
                      <li key={index}>
                        <h3>{foodItem.food}</h3>
                        <p>Calories: {foodItem.calorie}</p>
                        <p>Carbs: {foodItem.carbs}</p>
                        <p>Fat: {foodItem.fat}</p>
                        <p>Protein: {foodItem.protein}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </ul>
          </div>
        </section>
        <footer id="footer" className={style.footer}>
          <div className={style.footertop}>
            <div className={style.container}>
              <div className="row">
                <div className={`col-lg-3 col-md-6 ${style.footercontact}`}>
                  <h3>MedicoMate</h3>
                  <p>Bennett University</p>
                  <p>Greater Noida , 201310</p>
                  <p>India</p>
                  <p>
                    <strong>Phone:</strong>
                  </p>{" "}
                  6203104630
                  <p>
                    <strong>Email:</strong>
                  </p>{" "}
                  harshvirat894@gmail.com
                  <br />
                  <br />
                </div>

                <div className={`col-lg-2 col-md-6 ${style.footerlinks}`}>
                  <h4>Useful Links</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/contact">About us</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/services">Services</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/contact">Terms of service</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/contact">Privacy policy</a>
                    </li>
                  </ul>
                </div>

                <div className={`col-lg-3 col-md-6 ${style.footerlinks}`}>
                  <h4>Our Services</h4>
                  <ul>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/doctor">Supportive session</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/medicomart">Medicine MarketPlace</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/medicinePrediction">Medicine Predictor</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/diseasePrediction">Disease Predictor</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/diet">Diet Recommendation</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/exercise">Exercise Recommendation</a>
                    </li>
                    <li>
                      <i className="bx bx-chevron-right"></i>{" "}
                      <a href="/calorieTracker">Calorie Tracker</a>
                    </li>
                  </ul>
                </div>

                <div className={`col-lg-4 col-md-6 ${style.footernewsletter}`}>
                  <img src="/about.jpg" alt="doctor" />
                </div>
              </div>
            </div>
          </div>

          <div className={`${style.container} d-md-flex py-4`}>
            <div className="me-md-auto text-center text-md-start">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>MedicoMate</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className={style.credits}>
                Designed by{" "}
                <a href="https://github.com/h-a-r-s-h-s-r-a-h">Harsh</a>
              </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
              <a href="#" class="twitter">
                <i class="bx bxl-twitter"></i>
              </a>
              <a href="#" class="facebook">
                <i class="bx bxl-facebook"></i>
              </a>
              <a href="#" class="instagram">
                <i class="bx bxl-instagram"></i>
              </a>
              <a href="#" class="google-plus">
                <i class="bx bxl-skype"></i>
              </a>
              <a href="#" class="linkedin">
                <i class="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DietRecommendation;
