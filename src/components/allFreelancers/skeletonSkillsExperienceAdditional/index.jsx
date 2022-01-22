import React from "react";
import "./skeletonSkillsExperienceAdditional.scss";

const SkeletonSkillsExperienceAdditional = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="skeletonSkeletonSkillsExperienceAdditional_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* skill name line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "100%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div>

                {/* line b/w */}
                <div
                  className="col-md-5"
                  style={{ paddingLeft: "0", paddingRight: "0" }}
                >
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "1px",
                      maxWidth: "100%",
                      margin: "5px 0 10px",
                      border: "none",
                      borderTop: "2px dotted #ccc",
                      color: "#fff",
                      backgroundColor: "#fff",
                      height: "1px",
                      width: "100%",
                    }}
                  ></div>
                </div>

                {/* right skill percentage project status */}
                <div className="col-md-4">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "100%",
                      margin: "5px 0 10px",
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
      );
    }
    return html;
  };

  return <>{bindSkeleton()}</>;
};

export default SkeletonSkillsExperienceAdditional;
