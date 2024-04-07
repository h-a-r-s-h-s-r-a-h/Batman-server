import React, { useState, useEffect } from "react";
import styles from "./testappoint.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import style from "./TestHome.module.css";
const Appointment = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [date, setDate] = useState(``);
  const [time, setTime] = useState(``);
  const [Doctor, setDoctor] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/doctor/${id}`, {
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
        setDoctor(data.data);
      });
  }, []);
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
  const saveAppointment = () => {
    fetch("http://localhost:5000/registerAppointment", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userId: userData._id,
        DoctorId: id,
        dateOfAppointment: date,
        timeOfAppointment: time,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          toast.success("Your Appointment is successfully  booked!");
        } else {
          toast("Some Error Occured");
        }
      });
  };
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };
  return (
    <div className={style.customBody}>
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

      <section
        className={`${styles.mainsection} bg-info-light position-relative overflow-hidden`}
      >
        <div className="d-none d-md-flex align-items-end position-absolute top-0 start-0 h-100 bg-white col-6">
          <img className="img-fluid d-block" src="" alt="" />
        </div>
        <div className="container position-relative">
          <div className="mw-6xl mx-auto">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 pt-16 pb-12 pb-md-32 position-relative">
                <div className="d-md-none position-absolute top-0 start-0 w-100 h-100 bg-white">
                  <img className="img-fluid d-block" src="" alt="" />
                </div>
                <div className="position-relative mw-md mx-auto">
                  <img src="/nav.png" alt="" />
                  <h3 className="mb-16 mb-md-32">
                    Book Appointment at MedicoMate
                  </h3>
                  <h6 className="fs-7 mb-10"></h6>
                  <div className="d-flex mw-xs mb-5 align-items-start">
                    <span>
                      {/* <svg
                            width="25"
                            height="26"
                            viewbox="0 0 25 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z"
                            fill="#4F46E5"
                            ></path>
                        </svg> */}
                    </span>
                    <span className="ms-2">
                      {/* The best you can do in no time at all, amazing feature
                      goes here */}
                    </span>
                  </div>
                  <div className="d-flex mw-xs align-items-start">
                    <span>
                      <svg
                        width="25"
                        height="26"
                        viewbox="0 0 25 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.5 23C18.0228 23 22.5 18.5228 22.5 13C22.5 7.47715 18.0228 3 12.5 3C6.97715 3 2.5 7.47715 2.5 13C2.5 18.5228 6.97715 23 12.5 23ZM17.1339 11.3839C17.622 10.8957 17.622 10.1043 17.1339 9.61612C16.6457 9.12796 15.8543 9.12796 15.3661 9.61612L11.25 13.7322L9.63388 12.1161C9.14573 11.628 8.35427 11.628 7.86612 12.1161C7.37796 12.6043 7.37796 13.3957 7.86612 13.8839L10.3661 16.3839C10.8543 16.872 11.6457 16.872 12.1339 16.3839L17.1339 11.3839Z"
                          fill="#4F46E5"
                        ></path>
                      </svg>
                    </span>
                    <span className="ms-2">
                      The best you can do in no time at all, amazing feature
                      goes here
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mw-md py-12 mx-auto">
                  <form action="">
                    <div className="mb-4">
                      <h1>Doctor Name : {Doctor.fname}</h1>
                      <label className="form-label fw-light">Full Name *</label>
                      <input
                        className="form-control"
                        type="email"
                        defaultValue={userData.fname}
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-light">Select Date</label>
                      {/* <input
                        className="form-control"
                        type="email"
                        placeholder="Enter email address"
                      /> */}
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select date"
                        onChange={(event) => {
                          setDate(event.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-light">
                        Select Time *
                      </label>
                      <input
                        className="form-control"
                        type="time"
                        placeholder="Select Time"
                        onChange={(event) => {
                          setTime(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-check mb-6">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label fs-9" for="">
                        <span>I agree to the</span>
                        <a className="btn btn-link p-0 fs-9" href="#">
                          Terms & Conditions
                        </a>
                        <span>of MedicoMate</span>
                      </label>
                    </div>
                    <a
                      className="btn w-100 mb-8 btn-primary shadow"
                      onClick={saveAppointment}
                      href="#"
                    >
                      Schedule your Appointment
                    </a>
                    <div className="text-center mb-5">
                      <span className="fs-9 text-secondary"></span>
                    </div>
                    <div className="d-lg-flex align-items-center"></div>
                  </form>
                </div>
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
                    <i className="bx bx-chevron-right"></i> <a href="/">Home</a>
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
      <ToastContainer />
    </div>
  );
};

export default Appointment;
