import React, { useState, useEffect } from "react";
import GLightbox from "glightbox";
import Popup from "reactjs-popup";
import Swiper from "swiper";
import style from "./TestHome.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Carousel } from "bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const AdminHome = ({ userData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userData1, setUserData] = useState("");
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
  useEffect(() => {
    // Automatically switch to next slide every 3 seconds
    const intervalId = setInterval(() => {
      goToNextSlide();
    }, 3000);

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1) % slides.length);
  };

  const slides = [
    {
      backgroundImage: "url(/slide4.jpg)",
      title: "Personalized Care, Anywhere",
      content:
        "Seamlessly connect with doctors via video calls for tailored consultations. Experience expert guidance and collaborative treatment plans, all from the comfort of home. Discover convenient, personalized care with MedicoMate.",
    },
    {
      backgroundImage: "url(/slide7.jpg)",
      title: "Your Health Ally",
      content:
        "MedicoMate harnesses AI for personalized exercise and diet plans, predictive disease analysis, medication recommendations, and real-time calorie tracking. Experience revolutionary healthcare with us.",
    },
    {
      backgroundImage: "url(/slide6.jpg)",
      title: "MedicoMart: Your Health Hub",
      content:
        "Find all your healthcare needs in one place with MedicoMart. From prescriptions to wellness essentials, shop securely and confidently. Experience seamless shopping for a healthier you with MedicoMart.",
    },
  ];

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    new Swiper(".testimonials-slider", {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      },
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

          <a
            href={`/allAppointment/${userData._id}`}
            className={`${style.appointmentbtn}`}
          >
            <span className="d-none d-md-inline">See Your</span> Appointment
          </a>
        </div>
      </header>

      <a
        href={`/allAppointment/${userData._id}`}
        className={`${style.appointmentbtn}`}
      >
        <span className="d-none d-md-inline">See Your</span> Appointment
      </a>

      <section className={style.hero}>
        <div className={`${style.carousel} slide carousel-fade`}>
          <div className={style.carouselinner} role="listbox">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${style.carouselitem} ${
                  index === currentSlide ? style.active : ""
                }`}
                style={{ backgroundImage: slide.backgroundImage }}
              >
                <div className={style.container}>
                  <h2>{slide.title}</h2>
                  <p>{slide.content}</p>
                  <a href="/" className={`${style.btngetstarted}`}>
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Next Control */}
          <button
            className={`${style.carouselcontrolnext} carousel-control-next`}
            type="button"
            onClick={goToNextSlide}
          >
            <span
              className={`${style.carouselcontrolnexticon} bi bi-chevron-right`}
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <main id="main">
        <section id="featured-services" className={style.featuredservices}>
          <div className={style.container} data-aos="fade-up">
            <div className="row">
              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div
                  className={style.iconbox}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className={style.icon}>
                    <i className="fas fa-heartbeat"></i>
                  </div>
                  <h4 className={style.title}>
                    <a href="/">Personalized Care, Anywhere</a>
                  </h4>
                  <p className={style.description}>
                    Seamlessly connect with doctors via video calls for tailored
                    consultations.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div
                  className={style.iconbox}
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className={style.icon}>
                    <i className="fas fa-pills"></i>
                  </div>
                  <h4 className={style.title}>
                    <a href="/">MedicoMart: Your Health Hub</a>
                  </h4>
                  <p className={style.description}>
                    Explore all your healthcare needs in one convenient
                    marketplace.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div
                  className={style.iconbox}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className={style.icon}>
                    <i className="fas fa-thermometer"></i>
                  </div>
                  <h4 className={style.title}>
                    <a href="/">Online Psychiatrist</a>
                  </h4>
                  <p className={style.description}>
                    Your Trusted Source for Confidential Mental Health Support,
                    Accessible from Any Location
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                <div
                  className={style.iconbox}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className={style.icon}>
                    <i className="fas fa-dna"></i>
                  </div>
                  <h4 className={style.title}>
                    <a href="/">MedicoMate's AI Doctor</a>
                  </h4>
                  <p className={style.description}>
                    Your Trusted Virtual Healthcare Companion, Available Around
                    the Clock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="cta" className={style.cta}>
          <div className={style.container} data-aos="zoom-in">
            <div className={`text-center`}>
              <h3>In an emergency? Need help now?</h3>
              <p>
                URGENT: Immediate Assistance Available! Facing an emergency?
                Don't hesitate to contact us now. Our team is standing by to
                provide the help you need. Your safety and well-being are
                paramount to us.
              </p>
              <NavLink
                activeClassName={`${style.active}`}
                href="/"
                className={`${style.ctabtn} `}
              >
                Make an Appointment
              </NavLink>
            </div>
          </div>
        </div>
        <section id="services" className={`${style.services} services`}>
          <div className={style.container} data-aos="fade-up">
            <div className={style.sectiontitle}>
              <h2>Services</h2>
              <p>
                Expert consultations, AI-driven exercise and diet plans,
                predictive disease analysis, medication recommendations,
                real-time calorie tracking, and a trusted marketplace—all in one
                place. MedicoMate offers seamless, personalized healthcare
                tailored to you.
              </p>
            </div>

            <div className="row">
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className={style.icon}>
                  <i className="fas fa-heartbeat"></i>
                </div>
                <h4 className={style.title}>
                  <a href="">Disease Predictor</a>
                </h4>
                <p className={style.description}>
                  MedicoMate's Disease Predictor utilizes AI to analyze your
                  health data, offering personalized insights into potential
                  health risks. Stay ahead of health issues with MedicoMate.
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className={style.icon}>
                  <i className="fas fa-pills"></i>
                </div>
                <h4 className={style.title}>
                  <a href="">MedicoMart: Your Health Hub</a>
                </h4>
                <p className={style.description}>
                  Explore all your healthcare needs in one convenient
                  marketplace. From prescriptions to wellness essentials, shop
                  securely and confidently with MedicoMart.
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className={style.icon}>
                  <i className="fas fa-hospital-user"></i>
                </div>
                <h4 className={style.title}>
                  <a href="">Expert Healthcare, Anywhere</a>
                </h4>
                <p className={style.description}>
                  Connect with doctors instantly via MedicoMate's Online Doctor
                  Consultancy. Skip the queues and receive personalized medical
                  guidance from the comfort of your home through secure video
                  calls.
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className={style.icon}>
                  <i className="fas fa-dna"></i>
                </div>
                <h4 className={style.title}>
                  <a href="">Customized Nutrition </a>
                </h4>
                <p className={style.description}>
                  MedicoMate's Diet Predictor utilizes AI to analyze your diet
                  and health data, providing personalized nutrition
                  recommendations. Experience tailored dietary advice for a
                  healthier lifestyle.
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className={style.icon}>
                  <i className="fas fa-wheelchair"></i>
                </div>
                <h4 className={style.title}>
                  <a href="">Custom Fitness Plans</a>
                </h4>
                <p className={style.description}>
                  MedicoMate's Exercise Recommendation Model uses AI to create
                  personalized workout routines based on your fitness level,
                  goals, and health status. Get tailored exercise guidance for
                  maximum effectiveness.
                </p>
              </div>
              <div
                className={`col-lg-4 col-md-6 ${style.iconbox}`}
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className={style.icon}>
                  <i className="fas fa-notes-medical"></i>
                </div>
                <h4 className={style.title}>
                  <a href="">MedicoMate's Calorie Tracker</a>
                </h4>
                <p className={style.description}>
                  Effortlessly monitor your calorie intake with MedicoMate's
                  AI-driven tracker. Receive personalized guidance to achieve
                  your dietary goals. Simplify your nutrition journey with
                  MedicoMate.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className={style.contact}>
          <div className={style.container}>
            <div className="section-title">
              <h2>Contact</h2>
            </div>
          </div>

          <div className={style.container}>
            <div className="row mt-5">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-md-12">
                    <div className={style.infobox}>
                      <img src="/map.png" style={{ width: "100px" }}></img>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.google.com/maps/dir//Plot+Nos+8,+Bennett+University+(Times+of+India+Group),+11,+TechZone+2,+Greater+Noida,+Uttar+Pradesh+201310/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x390cbf94deb6bc39:0x7ba6bedc9a2b537f?sa=X&ved=1t:57443&ictx=111"
                      >
                        <h3>Our Address</h3>
                      </a>
                      <p>
                        Plot Nos 8, 11, TechZone 2, Greater Noida, Uttar Pradesh
                        201310
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box mt-4">
                      <i className="bx bx-envelope"></i>
                      <h3>Email Us</h3>
                      <p>
                        harshvirat894@gmail.com
                        <br />
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-box mt-4">
                      <i className="bx bx-phone-call"></i>
                      <h3>Call Us</h3>
                      <p>
                        +91 6203104630
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <form className={style.phpemailform}>
                  <div className="row">
                    <div className={`col-md-6 ${style.formgroup}`}>
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="name"
                        placeholder="Your Name"
                        required=""
                      />
                    </div>
                    <div className={`col-md-6 ${style.formgroup} mt-3 mt-md-0`}>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required=""
                      />
                    </div>
                  </div>
                  <div className={`${style.formgroup} mt-3`}>
                    <input
                      type="text"
                      class="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required=""
                    />
                  </div>
                  <div className={`${style.formgroup} mt-3`}>
                    <textarea
                      class="form-control"
                      name="message"
                      rows="7"
                      placeholder="Message"
                      required=""
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className={style.loading}>Loading</div>
                    <div className={style.errormessage}></div>
                    <div className={style.sentmessage}>
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Send Message</button>
                  </div>
                </form>
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
      </main>
    </div>
  );
};

export default AdminHome;
