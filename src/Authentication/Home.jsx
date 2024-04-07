import React, { useEffect } from "react";
import GLightbox from "glightbox"; // Make sure to install this package
import Swiper from "swiper"; // Make sure to install this package
// Import Swiper CSS
import style from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Home = () => {
  useEffect(() => {
    // Initialize GLightbox and other global scripts here
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    // Initialize Swiper for testimonials slider
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

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand me-6" href="/">
              <img
                className="img-fluid rounded-circle shadow-sm"
                src="/batDoctor.png"
                alt=""
                style={{ width: "40px", height: "auto" }}
              />
              <p>MedicoMate</p>
            </a>
            <div className="collapse navbar-collapse">
              {" "}
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/doctorSignup">
                    Doctor's Sign Up
                  </a>
                </li>{" "}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    
                  </a>
                </li>{" "}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    
                  </a>
                </li>{" "}
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    
                  </a>
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <div className="d-none d-lg-block">
              <a className="btn fw-medium me-1" href="/login">
                Sign In
              </a>
              <a className="btn btn-primary" href="/signup">
                Register Now!
              </a>
            </div>{" "}
            <div className="d-lg-none">
              {" "}
              <button className="btn navbar-burger p-0">
                {" "}
                <svg
                  className="text-primary"
                  width="51"
                  height="51"
                  viewbox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="currentColor"
                  ></rect>{" "}
                  <path
                    d="M37 32H19M37 24H19"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </nav>
      </div>

      {/* Header */}
      <header id="header" className={style.fixedtop}></header>

      {/* Hero Section */}
      <section id="hero" className={`d-flex align-items-center ${style.hero1}`}>
        <div className={style.container}>
          <h1>Welcome to MedicoMate</h1>
          <h2>
            Revolutionizing patient care through enhanced communication with
            healthcare providers.
          </h2>
          <a href="/signup" className={`${style.btngetstarted} scrollto`}>
            Get Started
          </a>
        </div>
      </section>

      {/* Main */}
      <main id="main">
        <section id="why-us" className={style.whyus}>
          <div className={style.container}>
            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className={style.content}>
                  <h3>Why Choose MedicoMate?</h3>
                  <p>
                    Choose MedicoMate for convenient access to expert healthcare
                    from anywhere. With personalized AI recommendations and
                    secure video calls, we're your trusted partner in
                    prioritizing your well-being.
                  </p>
                  <div className="text-center">
                    <a href="/contact" className={style.morebtn}>
                      Learn More <i className="bx bx-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div
                  className={`${style.iconboxes} d-flex flex-column justify-content-center`}
                >
                  <div className="row">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className={`${style.iconbox} mt-4 mt-xl-0`}>
                        <i className="bx bx-receipt"></i>
                        <h4>Personalized Care, Anywhere</h4>
                        <p>
                          Connect with doctors effortlessly through MedicoMate's
                          video calls. Experience convenient, expert care today.
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className={`${style.iconbox} mt-4 mt-xl-0`}>
                        <i className="bx bx-cube-alt"></i>
                        <h4>Your Health Ally</h4>
                        <p>
                          Experience personalized exercise and diet plans,
                          predictive disease analysis, medication
                          recommendations, and calorie tracking—all powered by
                          AI.
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className={`${style.iconbox} mt-4 mt-xl-0`}>
                        <i className="bx bx-images"></i>
                        <h4>MedicoMart: Your Health Hub</h4>
                        <p>
                          One-stop shop for all your healthcare needs. Shop
                          securely and confidently with MedicoMart.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={style.footer}>
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
                    <a href="/login">Terms of service</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Privacy policy</a>
                  </li>
                </ul>
              </div>

              <div className={`col-lg-3 col-md-6 ${style.footerlinks}`}>
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Supportive session</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Medicine MarketPlace</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Medicine Predictor</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Disease Predictor</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Diet Recommendation</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Exercise Recommendation</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <a href="/login">Calorie Tracker</a>
                  </li>
                </ul>
              </div>

              <div className={`col-lg-4 col-md-6 ${style.footernewsletter}`}>
                <img src="/footer2.png" alt="doctor"/>                                                                                                          
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
  );
};

export default Home;
