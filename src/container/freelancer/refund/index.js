import React, { Component } from "react";
import { connect } from "react-redux";
import Popover from "@mui/material/Popover";
import SubHeader from "../../../components/subHeader";
import DateRangePicker from "../../../components/dateRangePicker";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import request from "../../../utils/request";
import "./refund.scss";

class Refund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherAmount: "",
      invalidAmountError: false,
      selectedFile: null,
      requestRefundId: "",
      invoiceId: "",
      projectContractId: ""
    };
  }

  handlecustomAmount = (e) => {

    this.setState({ invalidAmountError: false });
    if (e.target.value >= 0) {
      this.setState({otherAmount: e.target.value });
    } else {
      this.setState({ invalidAmountError: true });
    }
  };


  async claimRefund() {
    debugger
    let param = {
        // requestRefundId: "2345582345",
        requestedBy:"230948234",
        projectContractId : "234023424"
        // invoiceId: this.state.invoiceId,
        // invoiceId: this.state.invoiceId,
        //projectContractId: this.state.projectContractId,
    }
    let result = await request(
      ENDPOINT["AddDisputeRefund"],
      postOptions(param)
    );
    if(result.success) {
      alert(JSON.stringify(result.message))
    }else {
      alert(JSON.stringify(result.message))
    }
  }

  render() {
    let {selectedFile} = this.state;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row m-0">
              <div className="col-12 col-md-1"></div>
              <div className="col-12 col-md-10 content-wrapper">
                <div className="project_post refund-wrapper">
                  <div className="row header-wrapper">
                    <div className="col-12 col-md-6 flex flex-align-center pl-0 pr-0">
                      <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/currency.png"} alt="currencyIcon" />
                      <span className="ml-4">
                        <h5 className="mb-0">Refund</h5>
                      </span>
                    </div>
                    <div className="col-12 col-md-6 pl-0 pr-0">
                      <DateRangePicker />
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-12 col-md-7 pl-0 pr-4 content">
                      <div className="flex flex-align-center mb-4">
                        <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/invoice.svg"} alt="invoice icon" />
                        <label className="ml-4 mb-0">
                          Please select an invoice
                        </label>
                        <div className="report-content">
                          <img
                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/dropdown.svg"}
                            alt="time-icon"
                            className="ml-4 reponsive"
                            // onClick={handleClick}
                          />
                          <Popover
                            // id={id}
                            // open={open}
                            // anchorEl={anchorEl}
                            // onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            {/* {selectedByPopoverContent()} */}
                          </Popover>
                        </div>
                      </div>

                      <div className="mb-4">
                        <input
                          type="radio"
                          name="totalInvoice"
                          id="chkIsTotalInvoice"
                        />
                        <label className="ml-2 mb-0">
                          Total invoice amount($53.00)
                        </label>
                      </div>
                      <div className="mb-4 flex flex-align-center">
                        <input
                          type="radio"
                          name="totalInvoice"
                          id="chkIsTotalInvoice"
                        />
                        <label className="ml-2 mr-2 mb-0">Other amount</label>
                        <input
                          type="number"
                          className="form-control other-input"
                          onChange={this.handlecustomAmount}
                        />
                      </div>
                      {this.state.invalidAmountError && (
                        <p className="text-danger">Please enter valid amount</p>
                      )}

                      <div className="form-group upload_file mb-3 fileWrapper">
                        <label htmlFor="fileDocument">
                          <img
                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/fileIcon.png"}
                            alt="file"
                            aria-hidden="true"
                            className="mr-3"
                          />
                          {selectedFile == null ? "File attachement": selectedFile.name}
                        </label>
                        <input
                          id="fileDocument"
                          type="file"
                          className="form-control-file"
                          name={selectedFile?.name}
                          onChange={(event) => {
                            this.setState({
                              selectedFile: event.target.files[0],
                            });
                          }}
                        />
                      </div>

                      <div className="mb-4">
                        <div className="message-wrapper">
                          <label>Message</label>
                          <textarea />
                        </div>
                      </div> 

                      <div className="terms termsCondition_mobile mt-2 mb-3">
                        <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/document.svg"} alt="tems" />
                        <label className="ml-3">Terms and conditions</label>
                      </div>

                      <div className="mb-4 flex flex-align-center">
                        <div>
                          <input
                            className="custom-checkbox-styled"
                            id="dispute-counter"
                            type="checkbox"
                          />
                          <label for="dispute-counter"></label>
                        </div>
                        <label className="ml-2 mb-0">
                          I want to dispute if the counter party does not agree
                          with
                        </label>
                      </div>

                      <div className="mb-4 flex justify-space-between buttons-wrapper">
                        <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/dropdown.svg"} alt="back" className="back" />
                        <button className="btn save_btn_light send" 
                         onClick={() => this.claimRefund()}
                        
                        >
                          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/invitationtransparent.png"} /> Claim
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-5 pl-4 pr-0">
                      <div className="terms termsCondition_pc">
                        <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/document.svg"} alt="tems" />
                        <label className="ml-3">Terms and conditions</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2"></div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.authReducer,
    languageType: state.languageReducer.languageType,
  };
}

function mapDispatchProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchProps)(Refund);
