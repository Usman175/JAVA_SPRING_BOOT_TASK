import React from "react";

const Skeleton = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="card_box"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-12">
              <div
                className="placeholder"
                style={{
                  minHeight: "20px",
                  maxWidth: "80%",
                  margin: "5px 0 20px",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "20px" }}
                ></div>
              </div>
              <div
                className="placeholder"
                style={{
                  minHeight: "20px",
                  maxWidth: "60%",
                  margin: "5px 0 20px",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "20px" }}
                ></div>
              </div>
              <div
                className="placeholder"
                style={{
                  minHeight: "20px",
                  maxWidth: "40%",
                  margin: "5px 0 20px",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "20px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return html;
  };

  return <>{bindSkeleton()}</>;
};

export default Skeleton;
