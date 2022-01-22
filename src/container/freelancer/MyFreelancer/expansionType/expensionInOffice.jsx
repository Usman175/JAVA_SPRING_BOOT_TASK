import React, { Component } from "react";

class ExpensionInOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { projectObj } = { ...this.props };
    return (
      <>
        {projectObj && projectObj.projectStatus === "Completed" ? (
          <div className="progress_value award_value d-flex align-items-center">
            <label>
              1st Award<span>US$2,000.00</span>
            </label>
            <label>
              2nd Award<span>US$1,000.00</span>
            </label>
            <label>
              3rd Award<span>US$1,000.00</span>
            </label>
          </div>
        ) : (
          <div className="logo_character">
            <h5>Logo Character :</h5>
            <div className="row justify-content-between">
              <div className="col-md-6">
                <div className="d-flex align-items-center custom_range">
                  <label>Male</label>
                  <div className="range_slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="20"
                      className="slider"
                      id="myRange"
                    />
                  </div>
                  <label>Female</label>
                </div>
                <div className="d-flex align-items-center custom_range">
                  <label>Young</label>
                  <div className="range_slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="20"
                      className="slider"
                      id="myRange2"
                    />
                  </div>
                  <label>Mutual</label>
                </div>
                <div className="d-flex align-items-center custom_range">
                  <label>Modern</label>
                  <div className="range_slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="20"
                      className="slider"
                      id="myRange3"
                    />
                  </div>
                  <label>Classic</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center custom_range">
                  <label>Luxury</label>
                  <div className="range_slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="20"
                      className="slider"
                      id="myRange4"
                    />
                  </div>
                  <label>Public</label>
                </div>
                <div className="d-flex align-items-center custom_range">
                  <label>Simple</label>
                  <div className="range_slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="20"
                      className="slider"
                      id="myRange5"
                    />
                  </div>
                  <label>Complex</label>
                </div>
                <div className="d-flex align-items-center custom_range">
                  <label>Abstract</label>
                  <div className="range_slider">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value="20"
                      className="slider"
                      id="myRange6"
                    />
                  </div>
                  <label>Abstract</label>
                </div>
              </div>
            </div>
            <div className="logo_type">
              <h5>Preferred Logo Type</h5>
              <div className="preferred">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label className="form-check-label" for="exampleCheck1">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/placeholder_logo.svg"
                        alt=""
                      />
                    </label>
                  </div>
                  <div className="col-md-4">
                    <label className="form-check-label" for="exampleCheck2">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/placeholder_logo.svg"
                        alt=""
                      />
                    </label>
                  </div>
                  <div className="col-md-4">
                    <label className="form-check-label" for="exampleCheck3">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/placeholder_logo.svg"
                        alt=""
                      />
                    </label>
                  </div>
                </div>
              </div>
              <h5>Slogun: My First Dream Company</h5>
              <div className="creative_logo">
                <h5>Description</h5>
                <p>I need a creative logo. Do not copy exisiting logos pls</p>
                <div className="upload_file">
                  <label for="exampleFormControlFile1">
                    <a>
                      <i
                        className="fa fa-cloud-download"
                        aria-hidden="true"
                      ></i>
                      sampleImage.jpg
                    </a>
                  </label>
                </div>
                <div className="post_modal">
                  <div className="save_cancel">
                    <button type="submit" className="btn cancel_btn">
                      Modify
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ExpensionInOffice;
