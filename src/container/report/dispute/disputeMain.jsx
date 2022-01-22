import React, { Component } from "react";
import RightTop from "../../../components/rightbar/rightTop";
import RightBottom from "../../../components/rightbar/rightBottom";

class DisputeMain extends Component {
  render() {
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-10 col-md-12">
                <div className="card_box hover_none">
                  <div className="post_form feedbk_box">
                    <div className="dispute_main">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="payable_amount">
                            <h4 className="feedbk_lbl">
                              I am not happy with this developer
                            </h4>
                            <div className="d-flex align-items-center">
                              <label>Payable Amount :</label>{" "}
                              <span>US$20,000.00</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <label>I am willing to pay US$</label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="">
                            <label>Please, describe the reason</label>
                            <div className="milestone_form">
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="post_modal dispute_btn">
                        <div className="save_cancel text-right">
                          <button type="submit" className="btn cancel_btn">
                            Issue the dispute
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default DisputeMain;
