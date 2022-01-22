import React, { Component } from "react";
import { connect } from "react-redux";
import "./directInvitation.scss";
import InvitationBadge from '../../../../components/invitation/invitationBadge/invitationBadge'
import moment from "moment";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { postOptions } from "../../../../utils/httpConfig";
import notifications from "../../../../utils/notifications";
import ShowMoreText from "react-show-more-text";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../../../store/constants/constant";

class ProposalInvitationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading1:false
    };
  }
  
  handleAcceptInterview = async (invitationData,invitationStatus) => {
     if(invitationStatus==="Accepted"){
      this.setState({ loading: true });
     }else{
      this.setState({ loading1: true });
     }


    let params = {
      invitationId : invitationData.invitationId,
      invitationType : invitationData.invitationType,
      invitationStatus :invitationStatus
    };
    let result = await request(
      `${ENDPOINT["UpdateInviewStatus"]}?invitationId=${params.invitationId}&invitationType=${params.invitationType}&invitationStatus=${params.invitationStatus}`,postOptions(params)
    );
    if(result.success){ 
     this.setState({ loading: false,loading1:false });
     notifications.showSuccess(`you have successfully ${invitationStatus} this 'interview'`)
     this.props.handleProposalInvitationSuccess()
    }else{
      this.setState({ loading: false,loading1:false });
      notifications.showError('Error occurred while accepting offer')
    }

  };

  onPress = () => {
    this.props.history.push("/all-projects");
  };
  
  render() {
    const { languageType, name, time, desc, type,invitationData } = this.props;
    const { loading ,loading1} = this.state;
    return (
      <div className="card-box-container">
        <div className="card-box-header">
           <span>{moment(time).format("lll")} </span>
          <InvitationBadge
            content={invitationData.invitationType==="Proposal"?"Direct Invitation ":invitationData.invitationType==="AutomaticProposal"?"Automatic Invitation":'Invitation'}
             /* 
             content like
            1.  Company Invitation for full time job
            2.  Direct Invitation 
            3.  Automatic Invitation
            */
             type="invitation" /*  invitation or offers */
             from={invitationData.from} /* company direct automatic  */
          />

          </div>
        <div className="card-box-details">
          <div className="card-box-client">
            <div className="card-box-client-details">
              <img
                src={
                  invitationData?.userProfile?.userProfileUrl
                    ?`https://${GET_IMAGE_PREFIX1}/${invitationData.userProfile?.userProfileUrl}`
                    : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/profileAvatar.png"
                }
                // src={
                //   "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/mypic.jpg"
                // }
                alt=""
              />
              <div className="card-box-client-desc">
                <p>            <ShowMoreText
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
                  </ShowMoreText> </p>
                <p>
                  {" "}
                  {languageType.BEST_REGARDS} <br /> {invitationData.userProfile.firstName?invitationData.userProfile.firstName+" "+invitationData.userProfile.lastName:"Client Name N/A"}{" "}
                </p>
              </div>
            </div>
            <div className="card-box-client-buttons my-2">
              <button onClick={()=>{
                this.props.history.push(`/project-detail-for-freelancer?projectId=${invitationData?.projectId}`)
              }}>
                {languageType.VIEW_PROJECT_DETAIL}{" "}
              </button>
          
            </div>
          </div>
          <div className="card-box-buttons">
            <button onClick={() => this.handleAcceptInterview(invitationData,'Accepted')}>
              {languageType.ACCEPT_INTERVIEW}{" "} {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
            <button  onClick={() => this.handleAcceptInterview(invitationData,'Rejected')}>
             {languageType.DECLINE_INTERVIEW}       {loading1 ? <i className="fa fa-spinner fa-spin"></i> : ""}
            </button>
            {/* <button onClick={this.onPress}>
                {languageType.REFER_A_FREELANCER}{" "}
              </button> */}
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
export default connect(mapStateToProps, mapDispatchProps)(ProposalInvitationCard);
