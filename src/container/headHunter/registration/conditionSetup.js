import React, { useState } from "react";
import Heading from "../../../components/freelancerCreation/heading";
import Radio from "../../../components/radioButton/radio";
import Label from "../../../components/postProject/label";
import "./headHunter.scss";

function ConditionSetup(props) {
  const [resumeView, setResumeView] = useState("");
  const [jobAvailability, setJobAvailability] = useState("");
  const [registration, setRegistration] = useState("");
  return (
    <section className="card_sec" style={{ padding: "0px" }}>
      <Heading heading={"Condition Set Up "} step={"3"} shadow={true} />{" "}
      <div hidden={true} className="text-danger">
        {" "}
        Sorry this service is currently not available until 2021 jan
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mr-0 my-0" style={{ width: '18rem',marginLeft:'-40px' }}>
              <div className="card-body">
                <h5 className="card-title my-10 py-5 py-md-0 my-md-20 text-center">Basic</h5>
                <h6 className="card-subtitle mb-2 text-muted my-10 py-5 py-md-0 my-md-20 text-center">Free</h6>
                <div className="planlist">
                  <ul className="list-unstyled">
                    <li className="mb-0">
                      <div className="d-flex mb-10 pb-5 pb-md-0 mb-md-20">
                        <div class="icon-check">
                          <div class="m-0 text-primary up-icon">
                            </div></div>
                      </div>
                      <div class="feature-description"><strong>10</strong> Resumes
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card mr-0 my-0" style={{width: '18rem',marginLeft:'-20px' }}>
              <div className="card-body">
                <h5 className="card-title my-10 py-5 py-md-0 my-md-20 text-center">Standard</h5>
                <h6 className="card-subtitle mb-2 text-muted mb-2 text-muted my-10 py-5 py-md-0 my-md-20 text-center" >$15</h6>
                <div className="planlist">
                  <ul className="list-unstyled">
                    <li className="mb-0">
                      <div className="d-flex mb-10 pb-5 pb-md-0 mb-md-20">
                        <div className="icon-check">
                          <div className="m-0 text-primary up-icon">
                          
                              </div>
                              </div>
                      </div>
                      <div class="feature-description"><strong>10</strong> CResumes
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title my-10 py-5 py-md-0 my-md-20 text-center">Plus</h5>
                <h6 className="card-subtitle mb-2 text-muted text-muted my-10 py-5 py-md-0 my-md-20 text-center">$30</h6>
                <div className="planlist">
                  <ul className="list-unstyled">
                    <li className="mb-0">
                      <div className="d-flex mb-10 pb-5 pb-md-0 mb-md-20">
                        <div class="icon-check">
                          <div class="m-0 text-primary up-icon">
                              </div></div>
                      </div>
                      <div class="feature-description"><strong>10</strong> Resumes
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}

export default ConditionSetup;
