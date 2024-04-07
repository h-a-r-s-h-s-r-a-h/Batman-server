import React, { useState, useEffect } from "react";
import style from "./TestHome.module.css";
import styles from "./Services.module.css";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Contact = () => {
  return (
    <div>
      <section id="hero" className={`${styles.hero} d-flex align-items-center`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Contact Us</h1>
              <h2>
                Need assistance or have questions? Contact Medicomate via email,
                phone, or our online form for prompt support.
              </h2>
              <h3>Email : harshvirat894@gmail.com</h3>
              <h3>Phone : 6203104630 </h3>
              <div className="d-flex"></div>
            </div>
            <div className={`col-lg-6 order-1 order-lg-2 ${styles.heroimg}`}>
              <img src="/onlineDoctor.png" class="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>

      <div id="main">
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

export default Contact;
