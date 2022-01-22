import React, { Component } from "react";
import Skeleton from "../../../../components/skeleton/skeleton.jsx";
import Radio from "../../../../components/radioButton/radio";
import "./viewParticipant.scss";
import { connect } from "react-redux";
import notifications from "../../../../utils/notifications";
import {
  getOptions,
  postOptions,
  postMultipartFile,
} from "../../../../utils/httpConfig";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
// import Reactions from "./reaction";

class ViewParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      participant: [],
      firstPassLoading:false
    };
  }
  handleSelectPerson = (value, type) => {
    let newParticipant = [...this.state.participant];
    if (newParticipant.length < Number(this.props.projectDetail?.contestFirstPass.replace('%','')) || type) {
      if (this.state.participant.includes(value)) {
        this.setState({
          participant: newParticipant.filter((item) => item != value),
        });
      } else {
        newParticipant.push(value);
        this.setState({ participant: newParticipant });
      }
    } else {
      notifications.showWarning(`You can only select ${Number(this.props.projectDetail?.contestFirstPass)} participant`);
    }
  };

  handleSubmitFirstPass= async ()=>{
    this.setState({ firstPassLoading: true });
    let result = await request(
      `${ENDPOINT["SelectFirstPassParticipants"]}?proposalIds=` +
        JSON.stringify(this.state.participant),
      getOptions({})
    );
    if (result.success) {
      this.setState({ firstPassLoading: false });
      this.props.handleSUbmitFirstPassSuccess()
  
    } else {
      this.setState({ firstPassLoading: false });
      notifications.showError("Sorry an error occurred please try again later")
    }

  }

  componentDidMount(){
    const {firstPassParticipants } = this.props;
    if(firstPassParticipants && firstPassParticipants.length>0){
      let participant=[];
      firstPassParticipants.map((item)=>{
        participant.push(item.projectProposalId)
      })
      this.setState({participant:participant})
      
    }
    this.setState({
      loading: false,
    });
  }
  render() {
    const { loading, participant,firstPassLoading } = this.state;
    const { languageType,proposals,firstPassParticipants } = this.props;
    // console.log(firstPassParticipants,"firstPassParticipants")
    console.log(this.props.projectDetail?.contestFirstPass,"this.props.projectDetail?.contestFirstPass")
    return (
      <>
        {loading ? (
          <div className="m-4">
            <Skeleton count={3} isSkeletonLoading={loading} />
          </div>
        ) : (
          <div className="view-partcipants-img">
            {
              proposals.map((item,index)=>(
                <div className="partcipants-img-view">
                {participant.includes(item.projectProposalId) ? (
                  <img
                    className="achievement_award"
                    src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/achievement_award.svg"
                    }
                  />
                ) : (
                  ""
                )}
                <div className="participant-project-img-transition">
                  <div className="participant-project-img">
                    <img
                      src={item.documents[0]?item.documents[0]:
                     
                        "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/img.png"
                      }
                      onClick={()=>this.props.handleShowDocuments(item.documents)}
                      alt="participant-project-img"
                    />
                  </div>
                </div>
                <div className="participantDetails">
                 <div className="left-side-participant">
                 <img
                    className="client_pic"
                    src={ item.freelancerProfileImage || 
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/mypic.jpg"
                    }
                    alt="client_pic"
                  />
  
                  <p> {item.freelancerName} </p>
                 </div>
                  {/* <Reactions /> */}
                  {sessionStorage.userType==="Client" &&
                  <Radio
                    handleSelect={() => {
                      this.handleSelectPerson(
                        item.projectProposalId,
                        participant.includes(item.projectProposalId),
                      );
                    }}
                    name={item.projectProposalId}
                    id="person1Contest"
                    checked={participant.includes(item.projectProposalId)}
                    label={""}
                  />
                 }
                </div>
              </div>
              ))
            }

          </div>
        )}

        {
          sessionStorage.userType==="Client" &&
          <div className="bottom-awarded-button">
          <button onClick={this.handleSubmitFirstPass} disabled={participant.length < 1}>
            <img
              src={
                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/awardedButtonIcon.png"
              }
            />
            <span> Select the first passed candidates</span>    {firstPassLoading ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}
          </button>
        </div>
        }

       
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}
function mapDispatchProps() {}
export default connect(mapStateToProps, mapDispatchProps)(ViewParticipant);
