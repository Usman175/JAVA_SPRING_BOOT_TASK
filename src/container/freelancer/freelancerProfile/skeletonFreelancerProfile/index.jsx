import React from "react";
import "./skeletonFreelancerProfile.scss";

const SkeletonFreelancerProfile = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <>  
          <div className="container">
            <div className="row justify-content-between" style={{marginBottom:'5rem'}}>
              {/* left area */}
              <div className="col-lg-4">
                <div
                  key={`skeleton${[i]}`}
                  className="card_box skeletonFreelancerProfile_Card"
                  hidden={!isSkeletonLoading}
                  style={{ marginTop: i == 0 ? "20px" : "10px" }}
                >
                  <div className="row justify-content-between">
                    <div className="col-md-12">
                      {/* user profile section line */}
                      <div className="row justify-content-between">
                        {/* img icon */}
                        <div className="col-md-4 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "80px",
                              maxWidth: "100%",
                              margin: "5px 0 0",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "80px" }}
                            ></div>
                          </div>
                        </div>
                        {/* name */}
                        <div className="col-md-8 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "16px",
                              maxWidth: "45%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "16px" }}
                            ></div>
                          </div>

                          {/* price section */}
                          <div className="row justify-content-between">
                            {/* 1 */}
                            <div className="col-md-6 skeleton-card-title">
                              <div
                                className="placeholder"
                                style={{
                                  minHeight: "15px",
                                  maxWidth: "70%",
                                  margin: "5px 0 15px",
                                }}
                              >
                                <div
                                  className="animated-background"
                                  style={{ height: "15px" }}
                                ></div>
                              </div>
                            </div>

                            <div className="col-md-6 skeleton-card-title">
                              <div
                                className="placeholder"
                                style={{
                                  minHeight: "15px",
                                  maxWidth: "70%",
                                  margin: "5px 0 10px",
                                }}
                              >
                                <div
                                  className="animated-background"
                                  style={{ height: "15px" }}
                                ></div>
                              </div>
                            </div>

                            {/* stars rating */}
                            <div className="col-md-12 skeleton-card-title">
                              <div
                                className="placeholder"
                                style={{
                                  minHeight: "15px",
                                  maxWidth: "30%",
                                  margin: "5px 10px 10px",
                                }}
                              >
                                <div
                                  className="animated-background"
                                  style={{ height: "15px" }}
                                ></div>
                              </div>
                            </div>

                            {/* 2 */}
                            <div className="col-md-6 skeleton-card-title">
                              <div
                                className="placeholder"
                                style={{
                                  minHeight: "15px",
                                  maxWidth: "65%",
                                  margin: "5px 0 15px",
                                }}
                              >
                                <div
                                  className="animated-background"
                                  style={{ height: "15px" }}
                                ></div>
                              </div>
                            </div>

                            <div className="col-md-6 skeleton-card-title">
                              <div
                                className="placeholder"
                                style={{
                                  minHeight: "15px",
                                  maxWidth: "65%",
                                  margin: "5px 0 10px",
                                }}
                              >
                                <div
                                  className="animated-background"
                                  style={{ height: "15px" }}
                                ></div>
                              </div>
                            </div>
                            {/* row ending below */}
                          </div>

                          {/* ending name col */}
                        </div>
                      </div>

                      {/* chat section line */}
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "22px",
                          maxWidth: "100%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "22px" }}
                        ></div>
                      </div>

                      {/* 2nd availablitiy register linkedin sec line */}
                      <div className="row justify-content-between">
                        <div className="col-md-12 skeleton-card-title">
                          {/* availability sec */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "15px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>

                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "40%",
                              margin: "5px 0 35px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                          {/*  */}

                          {/* registered sec */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "15px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>

                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "40%",
                              margin: "5px 0 35px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                          {/*  */}

                          {/* linkedin sec */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "15px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>

                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "40%",
                              margin: "5px 0 35px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                          {/*  */}

                          {/* language sec */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "30%",
                              margin: "15px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>

                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "45%",
                              margin: "5px 0 35px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                          {/*  */}
                        </div>
                      </div>

                      {/* portfolio sec */}
                      <div className="row justify-content-between">
                          {/* top portfolio heading */}
                          <div className="col-md-9 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "12px",
                              maxWidth: "30%",
                              margin: "5px 0 0",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "12px" }}
                            ></div>
                          </div>
                        </div>
                        <div className="col-md-3 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "12px",
                              maxWidth: "80%",
                              margin: "5px 0 0",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "12px" }}
                            ></div>
                          </div>
                        </div>
                        {/*  portfolio img */}
                        <div className="col-md-12 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "200px",
                              maxWidth: "100%",
                              margin: "5px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "200px" }}
                            ></div>
                          </div>
                        </div>

                        {/* portfolio description */}
                        <div className="col-md-12 skeleton-card-title">
                            {/* heading */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "30%",
                              margin: "0px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>

                          {/* show description */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "13px",
                              maxWidth: "100%",
                              margin: "5px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "13px" }}
                            ></div>
                          </div>
                          {/* 2 line */}
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "13px",
                              maxWidth: "80%",
                              margin: "0px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "13px" }}
                            ></div>
                          </div>
                        </div>
                      </div>  

                      {/* bearole time tracker line */}
                      <div className="row justify-content-between">
                        {/* bearole time heading set */}
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "80%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        {/* bearole time heading */}
                        <div className="col-md-10 skeleton-card-title" style={{paddingLeft:'0'}}>
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "40%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        {/* bearole time download set */}
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "80%",
                              margin: "0 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        {/* bearole time download */}
                        <div className="col-md-10 skeleton-card-title" style={{paddingLeft:'0'}}>
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "40%",
                              margin: "0 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div> 
                        
                        {/*  */}
                      </div> 
                      </div> 

                       

                    {/* ending */}
                  </div>
                </div>
                {/*  */}
              </div>

              {/* right area */}
              <div className="col-lg-8">
                <div
                  key={`skeleton${[i]}`}
                  className="card_box skeletonFreelancerProfile_Card"
                  hidden={!isSkeletonLoading}
                  style={{ marginTop: i == 0 ? "20px" : "10px" }}
                >
                  <div className="row justify-content-between">
                    <div className="col-md-12">
                      {/* name line */}
                      <div className="row justify-content-between">
                        {/* img icon */}
                        <div className="col-md-1 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "22px",
                              maxWidth: "80%",
                              margin: "5px 0 0",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "22px" }}
                            ></div>
                          </div>
                        </div>
                        {/* name */}
                        <div className="col-md-11 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "25%",
                              margin: "5px 0 0",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* border line */}
                      <border className="borderline_freelancerProfile"></border>

                      {/* 2nd skill sec line */}
                      <div className="row justify-content-between">
                        <div className="col-md-12 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "20%",
                              margin: "5px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* video sec */}
                      <div className="row justify-content-between">
                        <div className="col-md-12 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "300px",
                              maxWidth: "100%",
                              margin: "5px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "300px" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* border line */}
                      <border className="borderline_freelancerProfile"></border>

                      {/* skill Headings */}
                      <div className="skeleton-card-title">
                        <div
                          className="placeholder"
                          style={{
                            minHeight: "20px",
                            maxWidth: "10%",
                            margin: "15px 0 5px",
                          }}
                        >
                          <div
                            className="animated-background"
                            style={{ height: "20px" }}
                          ></div>
                        </div>
                      </div>
                      {/* skills show line */}
                      <div className="row justify-content-between">
                        {/* skills set */}
                        <div className="col-md-1 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "60%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        {/* skills set 2 */}
                        <div className="col-md-1 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "60%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        {/* skills set 3 */}
                        <div className="col-md-1 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "60%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        {/* skills set 4 */}
                        <div className="col-md-1 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "20px",
                              maxWidth: "60%",
                              margin: "15px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "20px" }}
                            ></div>
                          </div>
                        </div>

                        <div className="col-md-8 skeleton-card-title"></div>
                        {/*  */}
                      </div>
                      {/* skills set ending */}

                      {/* business scope heading line */}
                      <div className="skeleton-card-title">
                        <div
                          className="placeholder"
                          style={{
                            minHeight: "20px",
                            maxWidth: "18%",
                            margin: "15px 0 10px",
                          }}
                        >
                          <div
                            className="animated-background"
                            style={{ height: "20px" }}
                          ></div>
                        </div>
                      </div>
                      {/* sub scopes */}
                      <div className="row justify-content-between">
                        {/* 1 */}
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "15px",
                              maxWidth: "90%",
                              margin: "5px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "15px" }}
                            ></div>
                          </div>
                        </div>

                        <div className="col-md-10 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "15px",
                              maxWidth: "10%",
                              margin: "5px 0 10px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "15px" }}
                            ></div>
                          </div>
                        </div>

                        {/* 2 */}
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "15px",
                              maxWidth: "90%",
                              margin: "0px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "15px" }}
                            ></div>
                          </div>
                        </div>

                        <div className="col-md-10 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "15px",
                              maxWidth: "10%",
                              margin: "5px 0 15px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "15px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>

                    {/* ending */}
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </>
      );
    }
    return html;
  };

  return <>{bindSkeleton()}</>;
};

export default SkeletonFreelancerProfile;
