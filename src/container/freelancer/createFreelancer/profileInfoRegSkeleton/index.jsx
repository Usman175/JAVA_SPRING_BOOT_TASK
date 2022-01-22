import React from "react";
import "./profileInfoRegSkeleton.scss";

const ProfileInfoRegSkeleton = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="card_box skeleton_ProfileInfoRegFreelancer_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-12">
              <div className="row justify-content-between">
                {/* left area */}
                <div className="col-md-3">
                  {/* freelancer profile reg img */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "100px",
                      maxWidth: "65%",
                      margin: "0px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "100px" }}
                    ></div>
                  </div>

                  <br />

                  {/* profile rate */}
                  <div className="row justify-content-between">
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "-5px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "-5px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* availability per week rate */}
                  <div className="row justify-content-between">
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* language proficiency rate */}
                  <div className="row justify-content-between">
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* title skilled rate */}
                  <div className="row justify-content-between">
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "15px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* endling left area col */}
                </div>

                {/* right area */}
                <div className="col-md-9">
                  {/* Your name line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-3 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "20px",
                          maxWidth: "70%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "20px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-5 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Your mobile no line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-3 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "20px",
                          maxWidth: "70%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "20px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-3 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <br />

                  {/* Your profile rate line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Your availability per week line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-6 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-6 skeleton-card-title"></div>
                  </div>

                  {/* Your language proficiency line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-5 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-5 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "90%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "50%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Your skilled title line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-12 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Your skilled title description line */}
                  <div
                    className="row justify-content-between"
                    style={{ alignItems: "center" }}
                  >
                    <div className="col-md-12 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "150px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "150px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Your Identity passport photo line */}
                  <div
                    className="row justify-content-between"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "150px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "150px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "150px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "150px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "150px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "150px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Your kyc photo line */}
                  <div
                    className="row justify-content-between"
                    style={{
                      alignItems: "center",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      margin: ".5rem",
                    }}
                  >
                    <div className="col-md-3 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "100px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "100px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-5 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "100px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "100px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-4 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "100px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "100px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/*  */}
                </div>
              </div>
            </div>

            {/* ending */}
          </div>

          {/* optional info section profile register freelancer */}
          <div className="row justify-content-between">
            <div className="col-md-12">
              {/* optional heading */}
              <div
                className="placeholder"
                style={{
                  minHeight: "25px",
                  maxWidth: "25%",
                  margin: "10px 0 0",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "25px" }}
                ></div>
              </div>

              {/* border line */}
              <border className="borderline_skeleton"></border>

              {/* optional description */}
              <div
                className="placeholder"
                style={{
                  minHeight: "18px",
                  maxWidth: "45%",
                  margin: "10px 0 25px",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "18px" }}
                ></div>
              </div>

              {/* optional form area */}
              <div className="row justify-content-between"> 
                  {/* homepage optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* no of employee optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* annual sales optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* linkedin optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* portfolio optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title">
                <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                {/* optional one row end */}

                {/* portfolio 2 optional */}
                <div className="col-md-3"></div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title">
                <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                {/* optional one row end */}

                {/* portfolio 3 optional */}
                <div className="col-md-3"></div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title">
                <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                {/* optional one row end */}

                {/* award optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* office optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* address optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* youtube optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title"></div>
                {/* optional one row end */}

                {/* credit card optional */}
                <div className="col-md-3">
                  <div className="row justify-content-between" style={{ alignItems: "center" }}>
                    <div className="col-md-2 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "100%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-10 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "80%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "32px",
                          maxWidth: "100%",
                          margin: "5px 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "32px" }}
                        ></div>
                      </div>
                </div>
                <div className="col-md-4 skeleton-card-title">
                    <div
                        className="placeholder"
                        style={{
                          minHeight: "12px",
                          maxWidth: "80%",
                          margin: "5px 0 5px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "12px" }}
                        ></div>
                      </div>

                      <div
                        className="placeholder"
                        style={{
                          minHeight: "12px",
                          maxWidth: "50%",
                          margin: "0 0 10px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "12px" }}
                        ></div>
                      </div>
                </div>
                {/* optional one row end */}

                {/*  */}
              </div>
            </div>

            {/* ending */}
          </div>
        </div>
      );
    }
    return html;
  };

  return <>{bindSkeleton()}</>;
};

export default ProfileInfoRegSkeleton;
