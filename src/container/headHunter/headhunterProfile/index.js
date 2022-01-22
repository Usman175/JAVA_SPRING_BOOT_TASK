import React, { useState } from "react";
import "./headhunterProfile.scss";
function HeaderHunterProfile(props) {
  return (
    <div className="headhunter-profile-page">
      <div className="headhunter-profile-top-area">
        <div className="container">
          <h1>Your Title here</h1>
          <p>My professional overview comes here and shows as description</p>
          <p>I am good developer</p>
        </div>
      </div>
      <div className="headhunter-profile-detail-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12" style={{ paddingRight: "0px" }}>
              <div className="profile-section-card">
                <div className="profile-section-left">
                  <div className="top-profile-area">
                    <div className="profile-pic-area">
                      <div className="profile-pic">
                        <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/client_img.jpg" />
                      </div>
                      <div className="profile-detail-area">
                        <h6>Member of ABC Company</h6>
                        <p>Sonny Cho</p>
                        <div className="stats-profile-row">
                          <span>US$24.00/hr</span> <span>US$240.00/day</span>
                        </div>
                        <div className="rating-area">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                        <div className="stats-profile-row1">
                          <span>New York</span> <span>USA</span>
                        </div>
                      </div>
                    </div>
                    <div className="chat-button-area">
                      Chat <i className="fa fa-comment"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="profile-section-card">
                <div className="profile-section-right-side">
                  <div className="profile-section-right-top-heading">
                    <h3>
                      <img src="https://dhihitu47nqhv.cloudfront.net/icons/BoxCheck.png" />
                      <span> Company name and logo here </span>
                      {/* <div className="active-value-profile">Active since : April 2020</div> */}
                    </h3>
                    <div className="profile-section-right-hire">Request</div>
                  </div>
                  <div className="profile-section-heading-below-text">
                    My title comes here we have to describe
                  </div>
                  <div className="profile-video-description">
                    <i className="fa fa-play"></i>
                  </div>
                  <div className="profile-section-heading-below-text1">
                    I'm a web designer & front-end developer with over 7+ years
                    experience crafting modern, mobile-friendly websites.
                    <br />
                    Highly motivated Web designer with strong front-end
                    developer skills. I'm very passionate about my design work
                    and I'm confident I have the skills for a variety of
                    projects. Focused on the high-quality code, responsive
                    design, and beautiful User interface.
                    <br />
                    I'm working as a designer for more than 7+ years and always
                    trying to implement the best designer for my <br />
                    clients. I work as per the client's directions requirements
                    and always use secure, neat & clean code and deliver the
                    project on the given time frame.
                  </div>
                  <div className="skill-area">
                    <h2>Skills</h2>
                    <div className="skill-area-detail">
                      <div className="skill-single">HTML</div>
                      <div className="skill-single">CSS</div>
                      <div className="skill-single">JavaScript</div>
                      <div className="skill-single">Node</div>
                      <div className="skill-single">Java</div>

                      <div className="skill-single">HTML5</div>
                      <div className="skill-single">CSS3</div>
                    </div>
                  </div>

                  <div className="clients-area">
                    <h2>Clients</h2>
                    <div className="client-area-detail">
                      <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons-com.jpg" />
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderHunterProfile;
