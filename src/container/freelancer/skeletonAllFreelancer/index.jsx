import React from "react";
import "./skeletonAllFreelancer.scss";

const SkeletonAllFreelancer = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="card_box skeletonAllFreelancer_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            <div className="col-md-8">
              <div className="row justify-content-between">
                {/* freelancer image loading sec */}
                <div className="col-md-3">
                  {/* img */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "80px",
                      maxWidth: "80%",
                      margin: "0px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "80px" }}
                    ></div>
                  </div>

                  {/* freelancer name */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "80%",
                      margin: "0px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-9">
                  {/* heading line */}
                  <div className="row justify-content-between">
                    <div className="col-md-12 skeleton-card-title">
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

                  {/* 2nd price sec line */}
                  <div className="row justify-content-between">
                    <div className="col-md-6 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "12px",
                          maxWidth: "40%",
                          margin: "5px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "12px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-6 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "12px",
                          maxWidth: "28%",
                          margin: "5px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "12px" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* showText lines */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "85%",
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
                      maxWidth: "80%",
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

                    {/* skills set 2 */}
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

                    {/* skills set 4 */}
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

                    <div className="col-md-4 skeleton-card-title"></div>
                    {/*  */}
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>

            {/* right area */}
            <div className="col-md-4">
              <div className="row justify-content-between">
                {/* project no line */}
                <div className="col-md-12">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "20px",
                      maxWidth: "100%",
                      margin: "5px 0 12px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "20px" }}
                    ></div>
                  </div>
                </div>

                {/* project no behind lines */}
                <div className="col-md-6">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "80%",
                      margin: "0 0 5px 15px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-6"></div>

                {/* 2 */}
                <div className="col-md-4">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "12px",
                      maxWidth: "100%",
                      margin: "5px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "12px" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-8">
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
                </div>

                {/* 3 */}
                <div className="col-md-4">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "12px",
                      maxWidth: "100%",
                      margin: "5px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "12px" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "12px",
                      maxWidth: "90%",
                      margin: "5px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "12px" }}
                    ></div>
                  </div>
                </div>

                {/* 4 */}
                <div className="col-md-4">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "12px",
                      maxWidth: "100%",
                      margin: "5px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "12px" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-8">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "12px",
                      maxWidth: "70%",
                      margin: "5px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "12px" }}
                    ></div>
                  </div>
                </div>


                {/* plus icon freelancer section */}
                <div className="col-md-8"></div>

                <div className="col-md-4">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "16px",
                      maxWidth: "100%",
                      margin: "15px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "16px" }}
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

export default SkeletonAllFreelancer;
