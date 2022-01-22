import React, { Component } from "react";
import { connect } from "react-redux";
import "./directInvitation.scss";
import InvitationBadge from "../../../../components/invitation/invitationBadge/invitationBadge";
import moment from "moment";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { postOptions } from "../../../../utils/httpConfig";
import notifications from "../../../../utils/notifications";
import ShowMoreText from "react-show-more-text";
class CompanyInvitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading1: false,
    };
  }

  handleCompanyInvite = async (invitationData, invitationStatus) => {
    const { authReducer } = this.props;
    if (invitationStatus === "Accepted") {
      this.setState({ loading: true });
    } else {
      this.setState({ loading1: true });
    }
    let params = {
      organizationId: invitationData.organizationId,
      email: invitationData.email,
      status: invitationStatus,
      individualFreelancerId: authReducer?.freelancerAuth?.individualFreelancerId
    };
    let result = await request(
      `${ENDPOINT["UpdateInvitationStatus"]}`,
      postOptions(params)
    );
    if (result.success) {
      this.setState({ loading: false, loading1: false });
      notifications.showSuccess(
        `you have successfully ${invitationStatus} this invitation`
      );
     this.props.handleCompanyInvitationSuccess(invitationData.organizationId)
    } else {
      this.setState({ loading: false, loading1: false });
      notifications.showError("Error occurred while accepting invitation");
    }
  };

  onPress = () => {
    this.props.history.push("/all-projects");
  };
  render() {
    const { languageType, name, time, desc, type, invitationData,authReducer } = this.props;
    const { loading, loading1 } = this.state;
    return (
      <div className="card-box-container">
        <div className="card-box-header">
          <span>{moment(time).format("lll")} </span>
          <InvitationBadge
            content={"Company Invitation for full time job"}
            /* 
             content like
            1.  Company Invitation for full time job
            2.  Direct Invitation 
            3.  Automatic Invitation
            */
            type="invitation" /*  invitation or offers */
            from={"company"} /* company direct automatic  */
          />
        </div>
        <div className="card-box-details">
          <div className="card-box-client">
            <div className="card-box-client-details">
              <img
                src={`https://dhihitu47nqhv.cloudfront.net/${invitationData.companyLogo}`}
                alt=""
              />
              <div className="card-box-client-desc">
                <p>
                  <ShowMoreText
                    lines={2}
                    more="show more"
                    less={"show less"}
                    className="content-css"
                    anchorClass="view-more-less"
                    expanded={false}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: desc,
                      }}
                    ></span>
                  </ShowMoreText> 
                </p>
                <p>
                  {" "}
                  {languageType.BEST_REGARDS} <br /> {name}{" "}
                </p>
              </div>
            </div>
            <div className="card-box-client-buttons my-2">
              
            </div>
          </div>
          <div className="card-box-buttons">
            <button
              onClick={() =>
                this.handleCompanyInvite(invitationData, "Accepted")
              }
            >
             Accept Invitation
              {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
            <button
              onClick={() =>
                this.handleCompanyInvite(invitationData, "Rejected")
              }
            >
              Decline Invitation
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
    authReducer:state.authReducer
    
  };
}
function mapDispatchProps() {}
export default connect(mapStateToProps, mapDispatchProps)(CompanyInvitation);
