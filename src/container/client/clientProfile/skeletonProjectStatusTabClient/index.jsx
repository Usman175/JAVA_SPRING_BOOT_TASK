import React from "react";
import "./skeletonProjectStatusTabClient.scss";

const SkeletonProjectStatusTabClient = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="skeletonProjectStatusTab_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-12">
              <div className="row justify-content-between">
                {/* heading line */}
                <div className="col-md-10">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "40%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "20px" }}
                    ></div>
                  </div>
                </div>
                {/* right badge project status */}
                <div className="col-md-2">
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
              </div>

              {/* showText lines */}
              <div
                className="placeholder"
                style={{
                  minHeight: "15px",
                  maxWidth: "100%",
                  margin: "5px 0 12px",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "15px" }}
                ></div>
              </div>
              <div
                className="placeholder"
                style={{
                  minHeight: "15px",
                  maxWidth: "40%",
                  margin: "5px 0 10px",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "15px" }}
                ></div>
              </div>

              {/* skills show line */}
              <div className="row justify-content-between">
                {/* skills set */}
                <div className="col-md-3 skeleton-card-title">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "90%",
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
                <div className="col-md-2 skeleton-card-title">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "75%",
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
                <div className="col-md-2 skeleton-card-title">
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

                <div className="col-md-5 skeleton-card-title"></div>
                {/*  */}

                {/* border line */}
                <border className="borderline_skeleton"></border>
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

export default SkeletonProjectStatusTabClient;
