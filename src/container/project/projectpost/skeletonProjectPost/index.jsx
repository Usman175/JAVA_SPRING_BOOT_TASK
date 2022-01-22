import React from "react";
import "./skeletonProjectPost.scss";

const SkeletonProjectPost = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="skeleton_ProjectPost_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          {/* project post section */}
          <div className="row justify-content-between">
            <div className="col-md-12">
              {/* project post heading */}
              <div
                className="row justify-content-between"
                style={{ alignItems: "center" }}
              >
                <div className="col-md-1">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "30px",
                      maxWidth: "85%",
                      margin: "10px 0 0",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "30px" }}
                    ></div>
                  </div>
                </div>
                <div className="col-md-11">
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
                </div>
              </div>

              {/* border line */}
              <border className="borderline_skeleton"></border>

              <br />

              {/* project post form area */}
              <div className="row justify-content-between">
                <div className="col-md-6">
                  <div className="row justify-content-between">
                    {/* project type optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "10px 0 5px",
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
                              maxWidth: "40%",
                              margin: "10px 0 5px",
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
                    {/* optional one row end */}

                    {/* business scope type optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "20px 0 5px",
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
                              maxWidth: "40%",
                              margin: "20px 0 5px",
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
                    {/* optional one row end */}

                    {/* business sub-scope type optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "20px 0 5px",
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
                              maxWidth: "40%",
                              margin: "20px 0 5px",
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
                    {/* optional one row end */}

                    {/* create new post optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "20px 0 5px",
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
                              maxWidth: "40%",
                              margin: "20px 0 5px",
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
                    {/* optional one row end */}

                    {/* re using existing post optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-2 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "60%",
                              margin: "20px 0 5px",
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
                              maxWidth: "40%",
                              margin: "20px 0 5px",
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
                    {/* optional one row end */}

                    {/* re using existing post optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-8 skeleton-card-title"></div>

                        <div className="col-md-4 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "50px",
                              maxWidth: "100%",
                              margin: "70px 0 5px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "50px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* optional one row end */}

                    {/*  */}
                  </div>
                </div>

                {/* right area start */}
                <div className="col-md-6">
                  <div className="row justify-content-between">
                    {/* tips for project post and img optional */}
                    <div className="col-md-12 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "50%",
                          margin: "10px 0 15px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>

                    <div className="col-md-12 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "200px",
                          maxWidth: "60%",
                          margin: "5px 0 10px 40px",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "200px" }}
                        ></div>
                      </div>
                    </div>
                    {/* optional one row end */}

                    {/* extra services optional */}
                    <div className="col-md-12 skeleton-card-title">
                      <div
                        className="placeholder"
                        style={{
                          minHeight: "18px",
                          maxWidth: "20%",
                          margin: "20px 0 0",
                        }}
                      >
                        <div
                          className="animated-background"
                          style={{ height: "18px" }}
                        ></div>
                      </div>
                    </div>
                    {/* optional one row end */}

                    {/* boost visibility type optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-4 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "100%",
                              margin: "20px 0 5px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                        </div>

                        <div className="col-md-8 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "25%",
                              margin: "20px 0 5px 25px",
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
                    {/* optional one row end */}

                    {/* needed nda type optional */}
                    <div className="col-md-12">
                      <div
                        className="row justify-content-between"
                        style={{ alignItems: "center" }}
                      >
                        <div className="col-md-4 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "100%",
                              margin: "20px 0 5px",
                            }}
                          >
                            <div
                              className="animated-background"
                              style={{ height: "18px" }}
                            ></div>
                          </div>
                        </div>

                        <div className="col-md-8 skeleton-card-title">
                          <div
                            className="placeholder"
                            style={{
                              minHeight: "18px",
                              maxWidth: "25%",
                              margin: "20px 0 5px 25px",
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
                    {/* optional one row end */}

                    {/*  */}
                  </div>
                </div>

                {/* col ends both */}
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

export default SkeletonProjectPost;
