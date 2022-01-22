import React from "react";
import "./skeletonFreelancerExtensionPortfolio.scss";

const SkeletonFreelancerExtensionPortfolio = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="skeletonFreelancerExtensionPortfolio_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* portfolio extension 1 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "100px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "100px" }}
                    ></div>
                  </div>

                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div>

                {/* portfolio extension 2 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "100px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "100px" }}
                    ></div>
                  </div>

                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div>

                {/* portfolio extension 3 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "100px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "100px" }}
                    ></div>
                  </div>

                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div>

                {/* portfolio extension 1 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "100px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "100px" }}
                    ></div>
                  </div>

                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "90%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div>

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

export default SkeletonFreelancerExtensionPortfolio;
