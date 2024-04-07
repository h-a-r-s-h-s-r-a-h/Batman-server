import React, { useState, useEffect } from "react";
import style from "./TestHome.module.css";
import styles from "./Services.module.css";
const Services = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

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
          {/* <div
            className={`${style.leftItem} align-items-center d-none d-md-flex`}
          >
            <i className="bi bi-clock"> </i>Monday - Saturday, 8AM to 10PM
          </div> */}
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
              <h1>MedicoMate: Nurturing Health, One Click Away</h1>
              <h2>
                Compassionate care, innovative solutions - MedicoMate, your
                partner in wellness.
              </h2>
              <div className="d-flex"></div>
            </div>
            <div className={`col-lg-6 order-1 order-lg-2 ${styles.heroimg}`}>
              <img src="/hero-img.png" class="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="featured-services" className={styles.featuredservices}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i className="bi bi-laptop"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/doctor">Expert Healthcare, Anywhere</a>
                  </h4>
                  <p className={styles.description}>
                    Connect with doctors instantly via MedicoMate's Online
                    Doctor Consultancy.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i className="bi bi-card-checklist"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/calorieTracker">MedicoMate's Calorie Tracker</a>
                  </h4>
                  <p className={styles.description}>
                    Effortlessly monitor your calorie intake with MedicoMate's
                    AI-driven tracker.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i className="bi bi-clipboard-data"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/exercise">Custom Fitness Plans</a>
                  </h4>
                  <p className={styles.description}>
                    Get tailored exercise guidance for maximum effectiveness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured-services" class={styles.featuredservices1}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i className="fas fa-virus"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/diseasePrediction">Disease Predictor</a>
                  </h4>
                  <p className={styles.description}>
                    MedicoMate's Disease Predictor utilizes AI to analyze your
                    health data, offering personalized insights into potential
                    health risks.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i className="fas fa-brain"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/aidoctor">MedicoMate's AI Doctor</a>
                  </h4>
                  <p className={styles.description}>
                    Your Trusted Virtual Healthcare Companion, Available Around
                    the Clock.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i className="fas fa-apple"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/diet">Customized Nutrition</a>
                  </h4>
                  <p className={styles.description}>
                    MedicoMate's Diet Predictor utilizes AI to analyze your diet
                    and health data, providing personalized nutrition
                    recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="featured-services" class={styles.featuredservices2}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i class="fas fa-pills"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/medicomart">MedicoMate's Medicine Predictor</a>
                  </h4>
                  <p className={styles.description}>
                    MedicoMate's Medicine Predictor employs AI to enhance
                    treatment decisions, ensuring optimal outcomes.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i class="fas fa-prescription-bottle-alt"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/medicomart">MedicoMart: Your Health Hub</a>
                  </h4>
                  <p className={styles.description}>
                    Explore all your healthcare needs in one convenient
                    marketplace. From prescriptions to wellness essentials, shop
                    securely and confidently with MedicoMart.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i class="fas fa-user-md"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/phychiatrist">Online Psychiatrist</a>
                  </h4>
                  <p className={styles.description}>
                    Your Trusted Source for Confidential Mental Health Support,
                    Accessible from Any Location
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div style={{ marginTop: "20px" }} className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i class="fas fa-user-md"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/mentalbot">EmoBot</a>
                  </h4>
                  <p className={styles.description}>
                    Meet EmoBot, your pocket-sized emotional support system.
                    Share your feelings, and get instant solutions along with
                    soothing music suggestions for stress relief.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div style={{ marginTop: "20px" }} className={styles.iconbox}>
                  <div className={styles.icon}>
                    <i class="fas fa-user-md"></i>
                  </div>
                  <h4 className={styles.title}>
                    <a href="/policy">Health Insurance Predictor</a>
                  </h4>
                  <p className={styles.description}>
                    In today's complex healthcare landscape, our Health
                    Insurance Predictor empowers you to anticipate your future
                    insurance needs with accuracy.
                  </p>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Services;