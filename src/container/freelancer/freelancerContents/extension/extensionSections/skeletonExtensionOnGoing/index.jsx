import React from "react";
import "./skeletonExtensionOnGoing.scss";

const SkeletonExtensionOnGoing = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="skeletonExtensionOnGoing_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
                {/* onGoing heading 1 line */}
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* onGoing extension 1 line */}
                <div className="col-md-6">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "25%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "20px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 2 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "100%",
                      margin: "5px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "20px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 3 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "80%",
                      margin: "5px 0 10px",
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
            
            <br />
            <br />
            
            {/* onGoing subheading line 1 */}
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* onGoing extension 1 line */}
                <div className="col-md-6">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "80%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 2 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "55%",
                      margin: "5px 15px 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 3 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "70%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div> 

                {/* border line */}
                <div className="borderline_dashed_skeleton"></div>

                {/*  */}
              </div>
            </div>

            {/* onGoing subheading line 2 */}
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* onGoing extension 1 line */}
                <div className="col-md-6">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "80%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 2 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "55%",
                      margin: "5px 15px 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 3 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "70%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div> 

                {/* border line */}
                <div className="borderline_dashed_skeleton"></div>

                {/*  */}
              </div>
            </div>

            {/* onGoing subheading line 3 */}
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* onGoing extension 1 line */}
                <div className="col-md-6">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "80%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 2 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "55%",
                      margin: "5px 15px 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 3 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "70%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div> 

                {/* border line */}
                <div className="borderline_dashed_skeleton"></div>

                {/*  */}
              </div>
            </div>

            {/* onGoing subheading line 4 */}
            <div className="col-md-12">
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                {/* onGoing extension 1 line */}
                <div className="col-md-6">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "80%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 2 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "55%",
                      margin: "5px 15px 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div>

                {/* onGoing extension 3 line */}
                <div className="col-md-3">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "70%",
                      margin: "5px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div> 
                </div> 

                {/* border line */}
                <div className="borderline_dashed_skeleton"></div>

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

export default SkeletonExtensionOnGoing;
