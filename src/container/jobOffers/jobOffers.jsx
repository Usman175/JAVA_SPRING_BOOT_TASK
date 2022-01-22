import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Heading from "../../components/jobOffers/heading";
import JobOfferCard from "../../components/jobOffers/jobOfferCard";
import Badge from "../../components/jobOfferStatusBadges/badge";
import Telegram from "@material-ui/icons/Telegram";
import CheckIcon from "@material-ui/icons/Check";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import Skeleton from "../../components/skeleton/skeleton";
import NoDataAvailable from "../../shared/error/not-data-available-new";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../store/constants/constant";
import SubHeader from "../../components/subHeader"; /* 
import JobOfferMenuItems from "../../components/jobOffers/jobOfferMenuItems"; */
import JobOfferMenuItems from "../../components/jobOffers/invitationOffersMenu";
import CheckboxCard from "../../components/checkboxCard/checkboxCard.jsx";
import { getOptions, postOptions } from "../../utils/httpConfig";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import FileUploadLoader from "../../components/loader/fileUpload";

class JobOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobOfferStatuses: [],
      isSkeletonLoading: false,
      loading: false,
      type: "",
      offers: [
        {
          id: 1,
          logo: `https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`,
          name: "SAMSUNG ELECTRONICS. INC",
          opportunity: "New Opportunity For React Developer",
          description: `(주)위솝 프론트앤드 개발자를 모십니다.(react-native) 모집부문 및 자격요건 담당업무 자격요건 인원 [담당업무] react-native 프론트를 담당하게 됩니다. - 현재 운영중인 샵솔과 개발중인 긱잡채용플랫폼 담당[근무부서 및 직급/직책]근무부서: 개발팀직급/직책: 팀원 [자격요건]경력사항: 경력(1년 이상 )`,
          offered: true,
          action: null,
        },
        {
          id: 2,
          logo: `https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`,
          name: "SAMSUNG ELECTRONICS. INC",
          opportunity: "New Opportunity For React Developer",
          description: `(주)위솝 프론트앤드 개발자를 모십니다.(react-native) 모집부문 및 자격요건 담당업무 자격요건 인원 [담당업무] react-native 프론트를 담당하게 됩니다. - 현재 운영중인 샵솔과 개발중인 긱잡채용플랫폼 담당[근무부서 및 직급/직책]근무부서: 개발팀직급/직책: 팀원 [자격요건]경력사항: 경력(1년 이상 )`,
          applied: true,
          action: null,
        },
        {
          id: 3,
          logo: `https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`,
          name: "SAMSUNG ELECTRONICS. INC",
          opportunity: "New Opportunity For React Developer",
          description: `(주)위솝 프론트앤드 개발자를 모십니다.(react-native) 모집부문 및 자격요건 담당업무 자격요건 인원 [담당업무] react-native 프론트를 담당하게 됩니다. - 현재 운영중인 샵솔과 개발중인 긱잡채용플랫폼 담당[근무부서 및 직급/직책]근무부서: 개발팀직급/직책: 팀원 [자격요건]경력사항: 경력(1년 이상 )`,
          applied: true,
          action: null,
        },
      ],
      inviteOffers: [],
    };
  }

  /**Generate UI elements for job offers that user received */
  createJobOffersReceived() {
    return (
      <>
        <div className="offer-card-title">
          <b>RECEIVED OFFERS</b>
        </div>
        <div className="job-offer-card">
          <div className="row">
            <div className="span">
              <img
                src={`https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`}
                alt=""
                style={{ width: "64px", marginLeft: "20px" }}
              />
            </div>
            <div className="col">
              <a style={{ fontSize: "18px" }}>
                Digis: Building Unicorns and strong IT Projects
              </a>
              <a>
                Digis offers technical experts for short-term projects and
                permanent positions. Many of our employees have certificates in
                specific areas that are hard to find elsewhere. Since they can
                ask for help from their colleges and company's knowledge base,
                they able to solve virtually any problem.
              </a>
            </div>
          </div>
          <div className="row" style={{ "justify-content": "flex-end" }}>
            <div className="text-right save_cancel mt-10 mb-10">
              <button
                type="button"
                className="btn contest-project-post-btn white_text"
                onClick={() => {}}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /**Generate UI elements for job offers that user sent already. */
  createJobOffersSent() {
    return (
      <>
        <div className="offer-card-title">
          <b>OFFERS SENT</b>
        </div>
        <div className="job-offer-card">
          <div className="row">
            <div className="span">
              <img
                src={`https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`}
                alt=""
                style={{ width: "64px", marginLeft: "15px" }}
              />
            </div>
            <div className="col">
              <a style={{ fontSize: "18px" }}>
                Digis: Building Unicorns and strong IT Projects
              </a>
              <a>
                Digis offers technical experts for short-term projects and
                permanent positions. Many of our employees have certificates in
                specific areas that are hard to find elsewhere. Since they can
                ask for help from their colleges and company's knowledge base,
                they able to solve virtually any problem.
              </a>
            </div>
          </div>
          <div className="row" style={{ "justify-content": "flex-end" }}>
            <div className="text-right save_cancel mt-10 mb-10">
              <button
                type="button"
                className="btn contest-project-back-btn white_text"
                onClick={() => {}}
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /**Generate UI elements for position available of an user*/
  createJobOffersPositionAvailable() {
    return (
      <>
        <div className="offer-card-title">
          <b> Recommended Jobs</b>
        </div>
        <div className="job-offer-card">
          <div className="row">
            <div className="span">
              <img
                src={`https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`}
                alt=""
                style={{ width: "64px", marginLeft: "15px" }}
              />
            </div>
            <div className="col">
              <a style={{ fontSize: "18px" }}>
                Digis: Building Unicorns and strong IT Projects
              </a>
              <a>
                Digis offers technical experts for short-term projects and
                permanent positions. Many of our employees have certificates in
                specific areas that are hard to find elsewhere. Since they can
                ask for help from their colleges and company's knowledge base,
                they able to solve virtually any problem.
              </a>
            </div>
          </div>
          <div className="row" style={{ "justify-content": "flex-end" }}>
            <div className="text-right mt-10 mb-10">
              <button
                type="button"
                className="btn apply-offer-btn"
                onClick={() => {
                  this.props.history.push("/apply-job");
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="job-offer-card">
          <div className="row">
            <div className="span">
              <img
                src={`https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`}
                alt=""
                style={{ width: "64px", marginLeft: "15px" }}
              />
            </div>
            <div className="col">
              <a style={{ fontSize: "18px" }}>
                Digis: Building Unicorns and strong IT Projects
              </a>
              <a>
                Digis offers technical experts for short-term projects and
                permanent positions. Many of our employees have certificates in
                specific areas that are hard to find elsewhere. Since they can
                ask for help from their colleges and company's knowledge base,
                they able to solve virtually any problem.
              </a>
            </div>
          </div>
          <div className="row" style={{ "justify-content": "flex-end" }}>
            <div className="text-right mt-10 mb-10">
              <button
                type="button"
                className="btn apply-offer-btn"
                onClick={() => {
                  this.props.history.push("/apply-job");
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="job-offer-card">
          <div className="row">
            <div className="span">
              <img
                src={`https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`}
                alt=""
                style={{ width: "64px", marginLeft: "15px" }}
              />
            </div>
            <div className="col">
              <a style={{ fontSize: "18px" }}>
                Digis: Building Unicorns and strong IT Projects
              </a>
              <a>
                Digis offers technical experts for short-term projects and
                permanent positions. Many of our employees have certificates in
                specific areas that are hard to find elsewhere. Since they can
                ask for help from their colleges and company's knowledge base,
                they able to solve virtually any problem.
              </a>
            </div>
          </div>
          <div className="row" style={{ "justify-content": "flex-end" }}>
            <div className="text-right mt-10 mb-10">
              <button
                type="button"
                className="btn apply-offer-btn"
                onClick={() => {
                  this.props.history.push("/apply-job");
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  componentWillMount() {
    this.bindjobOfferStatuses();
    console.log(
      this.props.authReducer?.freelancerAuth?.individualFreelancerId,
      "this.props.authReducer"
    );
    this.getFreelancerOffers();
  }

  async getFreelancerOffers() {
    if (this.props.authReducer?.freelancerAuth?.individualFreelancerId) {
      this.setState({ isSkeletonLoading: true });

      let result = await request(
        `${ENDPOINT["GetOrganizationInvitesByFreelancer"]}?individualFreelancerId=${this.props.authReducer?.freelancerAuth?.individualFreelancerId}`,
        postOptions()
      );
      if (result.success) {
        this.setState({
          isSkeletonLoading: false,
          inviteOffers: result.result,
        });
      } else {
        this.setState({ isSkeletonLoading: false });
        notifications.showError(
          result.message || "Some problems occur please try again later"
        );
      }
    }
  }

  async onMenuItemClickInvite(type, offer) {
    this.setState({
      type: type === "Rejected" ? "Rejecting" : "Accepting",
      loading: true,
    });
    let params = {
      organizationId: offer.organizationId,
      email: offer.email,
      status: type,
      individualFreelancerId: offer.individualFreelancerId,
    };
    let result = await request(
      ENDPOINT["UpdateInvitationStatus"],
      postOptions(params)
    );
    if (result.success) {
      this.setState({ type: "", loading: false });
      notifications.showSuccess(`You have successfully ${type} the invitation`);
      this.getFreelancerOffers();
    } else {
      this.setState({ type: "", loading: false });
      notifications.showError(
        result.message || "Some problems occur please try again later"
      );
    }
  }

  async bindjobOfferStatuses() {
    let array = [];

    let jobOfferStatuses = new URLSearchParams(this.props.location.search).get(
      "type"
    );

    let projectStatusArray =
      jobOfferStatuses !== "" &&
      jobOfferStatuses !== null &&
      jobOfferStatuses !== undefined
        ? jobOfferStatuses.split(",")
        : [];

    Object.entries(this.props.jobOfferStatuses).map((item, index) => {
      let isChecked = projectStatusArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1].text,
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedProjectStatus +=
          (this.state.selectedProjectStatus !== "" ? "," : "") + item[1].text;
    });
    this.setState({ jobOfferStatuses: array });
  }

  onMenuItemClick(type, id) {
    let oldPosition = this.state.offers;
    const positionIndex = oldPosition.findIndex((obj) => obj.id == id);
    oldPosition[positionIndex].action = type;
    this.setState({ offers: oldPosition });
    console.log(this.state.offers);
  }

  onCheckboxChangeHandle = (event, type, index) => {
    let { jobOfferStatuses } = this.state;
    if (type === "jobOfferStatuses") {
      jobOfferStatuses[index].checked = event.target.checked;
    }
    this.setState({
      jobOfferStatuses,
    });
    console.log(this.state.jobOfferStatuses);
  };

  render() {
    let { jobOfferStatuses, offers, isSkeletonLoading, inviteOffers } =
      this.state;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="row ">
                  <div className="col-lg-12 job-offer-status-sidebar">
                    <CheckboxCard
                      title="Status"
                      data={jobOfferStatuses}
                      type="jobOfferStatuses"
                      onChange={this.onCheckboxChangeHandle}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
                <div
                  hidden={isSkeletonLoading}
                  className="our_work_hard job-offer-work-hard work_card"
                >
                  <div
                    className="row"
                    style={{ "margin-left": "0px", "margin-right": "0px" }}
                  >
                    {inviteOffers.map((offer) => {
                      return (
                        <JobOfferCard
                          logo={`https://dhihitu47nqhv.cloudfront.net/${offer.companyLogo}`}
                          companyName={offer.companyTitle}
                          opportunity={offer.opportunity}
                          description={offer.companyIntroduction}
                          jobOfferMenuItems={
                            <JobOfferMenuItems
                              id={offer.organizationId}
                              onMenuItemClick={(type) =>
                                this.onMenuItemClickInvite(type, offer)
                              }
                              offered={true}
                            />
                          }
                          badge={
                            offer.invitationStatus ? (
                              offer.invitationStatus === "Pending" ? (
                                <Badge
                                  styleChip={{
                                    backgroundColor: "#FEE102",
                                    color: "#010101",
                                  }}
                                  label="You got offered"
                                  icon={<CheckIcon />}
                                />
                              ) : (
                                <Badge
                                  styleChip={{
                                    backgroundColor: "#0d2146",
                                    color: "#ffffff",
                                  }}
                                  label="You Applied"
                                  icon={
                                    <Telegram
                                      style={{
                                        color: "#ffffff",
                                        marginRight: "5px",
                                      }}
                                    />
                                  }
                                />
                              )
                            ) : (
                              false
                            )
                          }
                        />
                      );
                    })}

                    <div
                      className="col-12"
                      style={{ padding: "0px", marginTop: "-20px" }}
                    >
                      {!isSkeletonLoading && inviteOffers?.length <= 0 && (
                        <NoDataAvailable
                          title="Sorry no offer exist yet !"
                          buttonText="View other jobs"
                          path="/all-projects"
                          color={"#0d2146"}
                          {...this.props}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ "margin-left": "0px", "margin-right": "0px" }}
                    hidden={true}
                  >
                    {offers.map((offer) => {
                      return (
                        <JobOfferCard
                          logo={offer.logo}
                          companyName={offer.name}
                          opportunity={offer.opportunity}
                          description={offer.description}
                          jobOfferMenuItems={
                            <JobOfferMenuItems
                              id={offer.id}
                              onMenuItemClick={this.onMenuItemClick.bind(this)}
                              offered={true}
                            />
                          }
                          badge={
                            offer.offered || offer.applied ? (
                              offer.offered ? (
                                <Badge
                                  styleChip={{
                                    backgroundColor: "#FEE102",
                                    color: "#010101",
                                  }}
                                  label="You got offered"
                                  icon={<CheckIcon />}
                                />
                              ) : (
                                <Badge
                                  styleChip={{
                                    backgroundColor: "#0d2146",
                                    color: "#ffffff",
                                  }}
                                  label="You Applied"
                                  icon={
                                    <Telegram
                                      style={{
                                        color: "#ffffff",
                                        marginRight: "5px",
                                      }}
                                    />
                                  }
                                />
                              )
                            ) : (
                              false
                            )
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 job-offer-sidebar">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>
          <FileUploadLoader
            title={`${this.state.type} please wait...`}
            show={this.state.loading}
          />
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    jobOfferStatuses: state.languageReducer.jobOfferStatuses.filter(
      (n) => n.isAdmin === !state.authReducer.isGuest
    ),
    authReducer: state.authReducer,
  };
}
function mapDispatchProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(JobOffers)
);
