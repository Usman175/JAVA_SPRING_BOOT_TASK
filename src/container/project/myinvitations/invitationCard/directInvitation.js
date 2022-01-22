import React, { Component } from "react";
import { connect } from "react-redux";
import "./directInvitation.scss";
import ShowMoreText from "react-show-more-text";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../../../store/constants/constant";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { postOptions } from "../../../../utils/httpConfig";
import notifications from "../../../../utils/notifications";
import FormatDWH from "../../../../components/formatDWH";
import InvitationBadge from "../../../../components/invitation/invitationBadge/invitationBadge";
import Format from "../../../../components/numberFormat";
import moment from "moment";
class DirectInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading1: false,
    };
  }
  onPress = () => {
    notifications.showWarning("Coming soon pls wait!");
  };
  handleAcceptOffer = async (invitationDetail) => {
    this.setState({ loading: true });
    let params = {
      projectContractId: invitationDetail.projectContractId,
      freelancerReferenceId: invitationDetail.freelancerReferenceId,
    };
    let result = await request(
      `${ENDPOINT["AcceptContractOffer"]}`,
      postOptions(params)
    );
    if (result.success) {
      this.setState({ loading: false });
      notifications.showSuccess("you have successfully accepted this offer");
  this.props.handleDirectInvitationSuccess()
    } else {
      this.setState({ loading: false });
      notifications.showError("Error occurred while accepting offer");
    }
  };
  handleDeclineOffer = async (invitationDetail) => {
    this.setState({ loading1: true });
    let params = {
      projectContractId: invitationDetail.projectContractId,
      freelancerReferenceId: invitationDetail.freelancerReferenceId,
    };
    let result = await request(
      `${ENDPOINT["DeclineContractOffer"]}`,
      postOptions(params)
    );
    if (result.success) {
      this.setState({ loading1: false });
      notifications.showSuccess("you have successfully decline this offer");
      this.props.handleDirectInvitationSuccess()
    } else {
      this.setState({ loading1: false });
      notifications.showError("Error occurred while decline offer");
    }
  };

  render() {
    const { languageType, name, time, desc, type, invitationDetail } =
      this.props;
    const { loading, loading1 } = this.state;
    // console.log(invitationDetail, "invitationDetail");
    return (
      <div className="card-box-container">
        <div className="card-box-header">
          <span>{moment(invitationDetail.createdDateTime).format("lll")}</span>
          <InvitationBadge
            content={"Project contract offer from client"}
            /* 
             content like
            1.  Full time contract offer from company
            2.  Project contract offer from client 
            3. Full time job offer from headhunter
            */
            type="offers" /*  invitation or offers */
            from="client" /* company headhunter client  */
          />
        </div>
        <div className="card-box-details">
          <div className="card-box-client">
            <div className="card-box-client-details">
        
              <img
                src={
                  invitationDetail.userProfile?.userProfileUrl
                    ? `https://${GET_IMAGE_PREFIX1}/${invitationDetail.userProfile?.userProfileUrl}`
                    : ".https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/mypic.jpg"
                }
                alt=""
              />
              <div className="card-box-client-desc">
                <ShowMoreText
                  lines={2}
                  more="show more"
                  less="Show Less"
                  className="content-css"
                  anchorClass="view-more-less"
                  expanded={false}
                >
                  <p
                    style={{ color: "#333333 !important" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        invitationDetail.contractDescription ||
                        invitationDetail.project?.jobDescription,
                    }}
                  ></p>
                </ShowMoreText>

                <p
                  hidden={invitationDetail.project.projectType != "OfficeWork"}
                >
                  Salary:
                  {invitationDetail.finalizedSalarayAmount ? (
                    <Format
                      currency={invitationDetail.project.currencyCode}
                      number={invitationDetail.finalizedSalarayAmount}
                    />
                  ) : (
                    "N/A"
                  )}
                  <br />
                  Salary type:{invitationDetail.finalizedSalaryType}
                  <br />
                  weekDays:{invitationDetail.finalizedDayOfWeek}
                </p>

                <p hidden={invitationDetail.project.projectType != "Milestone"}>
                  Milestone amount:
                  {invitationDetail.finalizedMilestoneAmount ? (
                    <Format
                      currency={invitationDetail.project.currencyCode}
                      number={invitationDetail.finalizedMilestoneAmount}
                    />
                  ) : (
                    "N/A"
                  )}{" "}
                </p>
                <p hidden={invitationDetail.project.projectType != "Hourly"}>
                  Hourly Rate:{" "}
                  <Format
                    currency={invitationDetail.project.currencyCode}
                    number={invitationDetail.finalizedHourlyRate}
                  />{" "}
                  <br />
                  Condition: {invitationDetail.finalizedHourOfWeek}{" "}
                  <FormatDWH
                    hrs
                    currency={invitationDetail.project.currencyCode}
                  />
                  /{" "}
                  <FormatDWH
                    week
                    currency={invitationDetail.project.currencyCode}
                  />
                </p>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  hidden={
                    invitationDetail.project.projectType != "FreeContract"
                  }
                >
                  <p
                    hidden={
                      invitationDetail.project.projectType != "FreeContract"
                    }
                  >
                    Hourly Rate:{" "}
                    <Format
                      currency={invitationDetail.project.currencyCode}
                      number={invitationDetail.finalizedHourlyRate}
                    />{" "}
                    <br />
                    Condition: {invitationDetail.finalizedHourOfWeek}{" "}
                    <FormatDWH
                      hrs
                      currency={invitationDetail.project.currencyCode}
                    />
                    /{" "}
                    <FormatDWH
                      week
                      currency={invitationDetail.project.currencyCode}
                    />
                  </p>
                  <p>
                    Daily Rate:{" "}
                    <Format
                      currency={invitationDetail.project.currencyCode}
                      number={invitationDetail.finalizedDailyRate}
                    />{" "}
                    <br />
                    Condition: {invitationDetail.finalizedDayOfWeek}{" "}
                    <FormatDWH
                      days
                      currency={invitationDetail.project.currencyCode}
                    />
                    /{" "}
                    <FormatDWH
                      week
                      currency={invitationDetail.project.currencyCode}
                    />
                  </p>
                </div>

                {/*        finalizedHourOfWeek: "40"
finalizedHourlyRate: "12"
            */}
                <p>
                  {" "}
                  {languageType.BEST_REGARDS} <br />{" "}
                  {invitationDetail.client?.firstName +
                    " " +
                    invitationDetail.client?.lastName}{" "}      
                </p>
              </div>
            </div>
            <div className="card-box-client-buttons my-2">
              <button
                onClick={() => {
                  this.props.history.push(
                    `/project-detail-for-freelancer?projectId=${invitationDetail.project?.projectId}`
                  );
                }}
              >
                {languageType.VIEW_PROJECT_DETAIL}{" "}
              </button>
              <button hidden={true} onClick={this.onPress}>
                {languageType.VIEW_PROPOSAL_DETAIL}{" "}
              </button>
            </div>
          </div>
          <div className="card-box-buttons">
            <button
              className="accept-contract-button"
              onClick={() => this.handleAcceptOffer(invitationDetail)}
            >
              Accept Offer{" "}
              {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
            <button onClick={() => this.handleDeclineOffer(invitationDetail)}>
              Decline Offer{" "}
              {loading1 ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}
function mapDispatchProps() {}
export default connect(mapStateToProps, mapDispatchProps)(DirectInvitation);
