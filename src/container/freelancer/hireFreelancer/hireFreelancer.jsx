import React, { Component } from "react";
import { connect } from "react-redux";
import request from "../../../utils/request";
import Modal from "react-bootstrap/Modal";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import notifications from "../../../utils/notifications";
import { ProjectTypeConst } from "../../../utils/ProjectConst";
import LeftSection from "../MyFreelancer/leftSection";
import LoginRequired from "../../../components/modals/loginRequired";
import Skeleton from "../../../components/skeleton/Skeleton";
import Currency from "../../../components/currency";
import Format from "../../../components/numberFormat";
class HireFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: new URLSearchParams(this.props.location.search).get("id"),
      freelancerUserId: new URLSearchParams(this.props.location.search).get(
        "userId"
      ),
      projectProposalId: new URLSearchParams(this.props.location.search).get(
        "projectProposalId"
      ),
      isAccept: false,
      clientUserId: props.authData?.myAuth?.user?.userId,
      offerAmount: "",
      selectedProject: {
        currentProposal: {
          userName: "",
          userCountry: "",
        },
      },
      isHireProposalPopupDisplay: false,
      isHireMoreFreelancer: false,
      errorMessage: {},
      isSkeletonLoading: true,
      loading: false,
    };
  }

  componentWillMount() {
    this.bindProjectDetails();
  }

  async bindProjectDetails() {
    let result = await request(
      `${ENDPOINT["GetProjectBidding"]}?projectId=` + this.state.projectId,
      getOptions({})
    );
    if (result.success) {
      if (result.result !== null && result.result !== "") {
        let projectResponse = result.result;

        if (
          !projectResponse.projectType === ProjectTypeConst.Hourly &&
          projectResponse.hasOwnProperty("projectAmount")
        )
          projectResponse.projectAmount =
            projectResponse.projectAmount === null ||
            projectResponse.projectAmount.trim() === ""
              ? 0
              : parseFloat(projectResponse.projectAmount).toFixed(2);
        if (projectResponse.hasOwnProperty("fromSalary"))
          projectResponse.fromSalary =
            projectResponse.fromSalary === null ||
            projectResponse.fromSalary.trim() === ""
              ? 0
              : parseFloat(projectResponse.fromSalary).toFixed(2);
        if (projectResponse.hasOwnProperty("toSalary"))
          projectResponse.toSalary =
            projectResponse.toSalary === null ||
            projectResponse.toSalary.trim() === ""
              ? 0
              : parseFloat(projectResponse.toSalary).toFixed(2);
        if (projectResponse.hasOwnProperty("winningAmount"))
          projectResponse.winningAmount =
            projectResponse.winningAmount === null ||
            projectResponse.winningAmount.trim() === ""
              ? 0
              : parseFloat(projectResponse.winningAmount).toFixed(2);
        if (projectResponse.hasOwnProperty("amountPerDay"))
          projectResponse.amountPerDay =
            projectResponse.amountPerDay === null ||
            projectResponse.amountPerDay.trim() === ""
              ? 0
              : parseFloat(projectResponse.amountPerDay).toFixed(2);
        if (projectResponse.hasOwnProperty("amountPerHour"))
          projectResponse.amountPerHour =
            projectResponse.amountPerHour === null ||
            projectResponse.amountPerHour.trim() === ""
              ? 0
              : parseFloat(projectResponse.amountPerHour).toFixed(2);
        if (
          projectResponse.hasOwnProperty("hourlyDetails") &&
          projectResponse.hourlyDetails.trim() !== ""
        )
          projectResponse.fromSalary =
            projectResponse.hourlyDetails.trim() === ""
              ? 0
              : Math.min
                  .apply(
                    Math,
                    JSON.parse(projectResponse.hourlyDetails).map(function (x) {
                      return x.fromAmount;
                    })
                  )
                  .toFixed(2);
        if (
          projectResponse.hasOwnProperty("hourlyDetails") &&
          projectResponse.hourlyDetails.trim() !== ""
        )
          projectResponse.toSalary =
            projectResponse.hourlyDetails.trim() === ""
              ? 0
              : Math.max
                  .apply(
                    Math,
                    JSON.parse(projectResponse.hourlyDetails).map(function (x) {
                      return x.toAmount;
                    })
                  )
                  .toFixed(2);

        this.setState({ clientUserId: projectResponse.postUserId });
        projectResponse.currentProposal = projectResponse.proposals.filter(
          (x) => x.projectProposalId === this.state.projectProposalId
        )[0];
        if (
          projectResponse.currentProposal !== null &&
          projectResponse.currentProposal !== undefined &&
          projectResponse.currentProposal !== ""
        ) {
          if (projectResponse.currentProposal.amount.trim() !== "")
            this.setState({
              offerAmount: projectResponse.currentProposal.amount,
            });
          else if (projectResponse.currentProposal.hourlyAmount.trim() !== "")
            this.setState({
              offerAmount: projectResponse.currentProposal.hourlyAmount,
            });
          else
            this.setState({
              offerAmount: projectResponse.projectAmount,
            });
        }
        projectResponse.freelancerUserName =
          projectResponse.currentProposal !== null ||
          projectResponse.currentProposal !== undefined ||
          projectResponse.currentProposal.trim() === ""
            ? projectResponse.currentProposal?.userProfile?.userName
            : "";
        this.setState({
          selectedProject: projectResponse,
          isSkeletonLoading: false,
        });
      } else this.props.history.push("/my-contracts");
    }
  }

  handleChange(fieldData, e) {
    if (fieldData === "isAccept")
      var isAccept = e.target.value === "true" ? false : true;

    this.setState({ isAccept: isAccept });
  }

  onCancelPageRedirect() {
    this.props.history.push(
      "/project-detail-for-client?projectId=" + this.state.projectId
    );
  }

  async onPageRedirectHandle() {
    let redirectTo =
      "/project-detail-for-client?projectId=" + this.state.projectId;
    let param = {
      projectId: this.state.projectId,
      postUserId: this.state.clientUserId,
      freelancerReferenceId: this.state.freelancerUserId,
      offerAmount: this.state.offerAmount,
      offerAvailableDateTime:
        this.state.selectedProject.submissionExpirationDate,
      billingDate: this.state.selectedProject.submissionExpirationDate,
    };
    this.setState({ loading: true });
    let result = await request(
      ENDPOINT["CreateProjectContract"],
      postOptions(param)
    );
    if (result.success) {
      this.setState({ isHireProposalPopupDisplay: true, loading: false });
    } else {
      notifications.showError(result.message);
      this.setState({ loading: false });
    }
  }

  async onHireMoreFreelancer(redirectTo) {
    this.props.history.push(redirectTo);
  }

  render() {
    let { selectedProject, isSkeletonLoading } = this.state;
    let { authData } = this.props;
    console.log(selectedProject, "selectedProject");
    return (
      <>
        {authData.myAuth !== null ? (
          <section className="card_sec">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-lg-9 col-md-12">
                  <h3 className="green_text">Hire</h3>
                  <div className="card_box">
                    <div className="col-md-12">
                      <Skeleton
                        count={5}
                        isSkeletonLoading={isSkeletonLoading}
                      />
                      <div className="row" hidden={isSkeletonLoading}>
                        <div className="col-md-3">
                          {
                            <LeftSection
                              projectObj={selectedProject.currentProposal}
                            />
                          }
                        </div>
                        <div className="col-md-9">
                          <div className="col-md-12">
                            {selectedProject.hasOwnProperty(
                              "currentProposal"
                            ) &&
                            selectedProject.currentProposal?.coverLetter &&
                            selectedProject.currentProposal?.hasOwnProperty(
                              "coverLetter"
                            ) ? (
                              <label className="project_details__reviewProposals_candidateName">
                                {selectedProject.currentProposal?.coverLetter &&
                                  selectedProject.currentProposal?.coverLetter}
                              </label>
                            ) : (
                              <label className="project_details__reviewProposals_candidateName">
                                {selectedProject.freelancerUserName}
                              </label>
                            )}
                            {selectedProject?.hasOwnProperty(
                              "currentProposal"
                            ) &&
                              selectedProject.currentProposal?.hasOwnProperty(
                                "description"
                              ) && (
                                <p className="project_details__reviewProposals_candidateName">
                                  {selectedProject.currentProposal
                                    ?.description &&
                                  selectedProject.currentProposal
                                    ?.description != " "
                                    ? selectedProject.currentProposal
                                        .description
                                    : "user BIO not available"}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card_box">
                    <div className="col-md-12">
                      <h4>Terms</h4>
                      <hr />
                    </div>
                    <div className="col-md-12">
                      <label
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          fontSize: 12,
                          lineHeight: 1,
                        }}
                      >
                        Payment Option
                      </label>
                      <label
                        style={{ display: "flex", fontSize: 12, lineHeight: 1 }}
                      >
                        {selectedProject.projectType}
                      </label>
                      <label
                        style={{
                          fontWeight: "bold",
                          display: "flex",
                          fontSize: 12,
                          lineHeight: 1,
                        }}
                      >
                        {selectedProject.projectType === ProjectTypeConst.Hourly
                          ? "Hourly Rate"
                          : "Payment Amount"}
                      </label>
                      <label
                        style={{ display: "flex", fontSize: 12, lineHeight: 1 }}
                      >
                        <Format
                          number={this.state.offerAmount}
                          currency={selectedProject.currencyCode}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="card_box">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="chkIsUntilHire"
                            value={this.state.isAccept}
                            checked={this.state.isAccept}
                            onChange={(e) => this.handleChange("isAccept", e)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="chkIsUntilHire"
                          >
                            {" "}
                            &nbsp;&nbsp;&nbsp;&nbsp;Yes, I understand and agree
                            to the JungleWorks Terms of Service, includinng the
                            User Agreement and Privacy Policy.{" "}
                          </label>
                        </div>
                        <hr />
                        <button
                          type="button"
                          disabled={!this.state.isAccept}
                          className="btn save_btn"
                          style={{ float: "right" }}
                          onClick={() => this.onPageRedirectHandle()}
                        >
                          {" "}
                          Hire{" "}
                          {this.state.loading ? (
                            <i className="fa fa-spinner fa-spin"></i>
                          ) : (
                            ""
                          )}
                        </button>
                        <button
                          type="button"
                          className="btn cancel_btn"
                          style={{ float: "right", marginRight: 10 }}
                          onClick={() => this.onCancelPageRedirect()}
                        >
                          {" "}
                          Cancel{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <LoginRequired defaultOpen={true} />
        )}

        {/* Hire Proposal Model*/}
        <Modal
          dialogClassName="jungle-modal"
          contentClassName="jungle-modal-content lg"
          show={this.state.isHireProposalPopupDisplay}
          onHide={() => {
            this.setState({ isHireProposalPopupDisplay: false });
          }}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Body
            style={{
              maxHeight: "887px",
              overflow: "hidden",
              padding: "0px 0px",
            }}
          >
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="col-md-12">
                  <div className="row">
                    <div className="card-box col-md-3 hire_confirmation_modal_candidateInfoWrapper">
                      <span>
                        <img
                          className="hire_confirmation_modal_candidateInfoWrapper_avatar"
                          src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/client_img.jpg"
                          alt=""
                        />
                      </span>
                      <div className="hire_confirmation_modal_candidateInfoWrapper_infoMsg">
                        * We will notify you when{" "}
                        <strong className="text-capitalize text-green">
                          {selectedProject.freelancerUserName}
                        </strong>{" "}
                        respond to your Offer.
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="col-md-12">
                        <div className="mt-4 mb-3 mx-3">
                          <div className="d-flex justify-content-center align-items-center mb-4">
                            We Will politely notify the client that you are not
                            interested. The client will be able to view the
                            reason you've withdrawn your proposal.
                          </div>

                          <div className="custom-control custom-checkbox mb-4">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="isHireMoreFreelancer"
                              id="chkIsHireDoneForFreelancer"
                              onChange={(e) => {
                                let isHireMoreFreelancer = false;
                                this.setState({ isHireMoreFreelancer });
                              }}
                              checked={this.state.isHireMoreFreelancer == false}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chkIsHireDoneForFreelancer"
                            >
                              {" "}
                              I'm done hiring for this project{" "}
                            </label>
                            <br />
                            <div>
                              When the freelancer accepts, your job post will be
                              closed to new proposals. Don't worry - the
                              original job post, all the freelancers you
                              messaged, shortlisted or archived for this job
                              will be saved.
                            </div>
                          </div>

                          <div className="custom-control custom-checkbox mb-4">
                            <input
                              type="radio"
                              className="custom-control-input"
                              name="isHireMoreFreelancer"
                              id="chkIsHireMoreFreelancer"
                              onChange={(e) => {
                                let isHireMoreFreelancer = true;
                                this.setState({ isHireMoreFreelancer });
                              }}
                              checked={this.state.isHireMoreFreelancer == true}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="chkIsHireMoreFreelancer"
                            >
                              {" "}
                              I plan to hire more freelancers for this job{" "}
                            </label>
                            <br />
                            <div>
                              Your job post will remain open to new proposals.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => this.onHireMoreFreelancer("/my-contracts")}
              className="btn save_btn"
            >
              {" "}
              Go to My Contracts{" "}
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authData: state.authReducer,
  };
}
function mapDispatchProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchProps)(HireFreelancer);
