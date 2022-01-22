import React from "react";
import "./skeletonContractOffers.scss";

const SkeletonContractOffers = (props) => {
  const { count, isSkeletonLoading } = props;

  const bindSkeleton = () => {
    let html = [];
    for (var i = 0; i < count; i++) {
      html.push(
        <div
          key={`skeleton${[i]}`}
          className="skeletonContractOffers_Card"
          hidden={!isSkeletonLoading}
          style={{ marginTop: i == 0 ? "20px" : "10px" }}
        >
          <div className="row justify-content-between">
            {/* direct invitation loading sec */}
            <div className="col-md-8">
              <div className="row justify-content-between">
                <div className="col-md-12">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "65%",
                      margin: "0px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>
                </div> 
              </div>
            </div>

            {/* invitation image loading sec */}
            <div className="col-md-8">
              <div className="row justify-content-between">
                {/* invitation image loading sec */}
                <div className="col-md-3">
                  {/* img */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "90px",
                      maxWidth: "85%",
                      margin: "0px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "90px" }}
                    ></div>
                  </div>
                </div>

                <div className="col-md-9">
                  {/* showText lines */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "15px",
                      maxWidth: "40%",
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
                      maxWidth: "45%",
                      margin: "0 0 15px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "15px" }}
                    ></div>
                  </div>

                  {/* 2nd name regards sec area */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "13px",
                      maxWidth: "30%",
                      margin: "10px 0 10px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "13px" }}
                    ></div>
                  </div>

                  {/* 2nd regards line */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "13px",
                      maxWidth: "30%",
                      margin: "0px 0 18px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "13px" }}
                    ></div>
                  </div>

                  {/*  */}
                </div>
              </div>

              {/* last button invitation col 1 */}
              <div
                className="placeholder"
                style={{
                  minHeight: "15px",
                  maxWidth: "40%",
                  margin: "5px 0 15px 1.5rem",
                }}
              >
                <div
                  className="animated-background"
                  style={{ height: "15px" }}
                ></div>
              </div>
              {/*  */}
            </div>

            {/* right area */}
            <div className="col-md-4">
              <div className="row justify-content-between button_section_skeletonContractOffers">
                {/* invitation Button area section */}
                <div className="col-md-5"></div>

                <div className="col-md-7">
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "22px",
                      maxWidth: "100%",
                      margin: "15px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "22px" }}
                    ></div>
                  </div>

                  {/* 2nd Button */}
                  <div
                    className="placeholder"
                    style={{
                      minHeight: "22px",
                      maxWidth: "100%",
                      margin: "15px 0 5px",
                    }}
                  >
                    <div
                      className="animated-background"
                      style={{ height: "22px" }}
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

export default SkeletonContractOffers;
