import React, { Component } from "react";
import Skeleton from "../../../../components/skeleton/skeleton.jsx";
import Radio from "../../../../components/radioButton/radio";
import "./viewPass.scss";
import { connect } from "react-redux";
import notifications from "../../../../utils/notifications";
import { KeyboardReturnSharp } from "@material-ui/icons";
import {
  getOptions,
  postOptions,
  postMultipartFile,
} from "../../../../utils/httpConfig";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import Format from "../../../../components/numberFormat/index.js";
class ViewParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      participant: [],
      activeMenu:[],
      showMenu: false,
      showMenu2: false,
      showMenu3: false,
      award: "",
      award2: "",
      award3: "",
      numberOfParticipant:3
    };
  }

  handleSelectPerson = (type, award,projectProposalId) => {
    let newParticipant = [...this.state.participant];
    if (newParticipant.length < this.state.numberOfParticipant) {
      if(newParticipant.find((item)=>(item.projectProposalId===projectProposalId&&item.award===award))){
        notifications.showWarning(`You have already selected against this award`);
      }else{
        let obj={
          type,award,projectProposalId
        }    
       let checkParticipant=newParticipant.find((item)=>item.projectProposalId===projectProposalId)
       if(checkParticipant){
        let filterParticipants= newParticipant.filter((item)=>item.projectProposalId!=projectProposalId)
        filterParticipants.push(obj)
        this.setState({participant:filterParticipants})
       }else{
        newParticipant.push(obj)
        this.setState({participant:newParticipant})
       } 
      }


    
    } else {
      notifications.showWarning(`You can only select ${this.state.numberOfParticipant} participants`);
    }
    this.setState({activeMenu:[]})
  };
  showMenuLink = (type) => {
    this.setState({activeMenu:[`${type}`]})
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });

    // numberOfParticipant
    const { projectDetail} = this.props;
    if(projectDetail.winningAmount && projectDetail.winningAmount!=" "){
      this.setState({numberOfParticipant:1})
      if(projectDetail.secondPlacePrize && projectDetail.secondPlacePrize!=" "){
        this.setState({numberOfParticipant:2})
      }
      if(projectDetail.thirdPlacePrize && projectDetail.thirdPlacePrize!=" "){
        this.setState({numberOfParticipant:3})
      }
    }

  }
  handleSubmitFinalWinners= async ()=>{
    let {participant}=this.state;
    let {projectDetail}=this.props;
    this.setState({ loading1: true });
    let params={
      projectId:projectDetail.projectId,
      firstPlaceProposalId:participant.find((item)=>item.award==="firstAward")?participant.find((item)=>item.award==="firstAward").projectProposalId:'',
      secondPlaceProposalId:participant.find((item)=>item.award==="secondAward")?participant.find((item)=>item.award==="secondAward").projectProposalId:'',
      thirdPlaceProposalId:participant.find((item)=>item.award==="thirdAward")?participant.find((item)=>item.award==="thirdAward").projectProposalId:''
    }
    let result = await request(
      `${ENDPOINT["SelectContestWinners"]}`,
      postOptions(params)
    );
    if (result.success) {
      this.setState({ loading1: false });
      this.props.handleFinalWinnersSuccess()
  
    } else {
      this.setState({ loading1: false });
      notifications.showError("Sorry an error occurred please try again later")
    }
  }

  render() {
    const { loading, participant,numberOfParticipant,activeMenu } = this.state;
    const { languageType,loading1 ,firstPassParticipants ,projectDetail} = this.props;
    //  console.log(projectDetail,"projectDetail")
    return (
      <>
        {loading  ? (
          <div className="m-4">
            <Skeleton count={3} isSkeletonLoading={loading} />
          </div>
        ) : (
          <div className="view-partcipants-img-pass">

        {
          firstPassParticipants && firstPassParticipants.length>0  ?
          firstPassParticipants.map((item,index)=>{
            return        <div className="partcipants-img-view">
            {participant.find((item)=>item.type===`btn${index}`) ? (
              <img
                className="achievement_award"
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/achievement_award.svg"
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
              <div className="dropdown">
                <span
                  className="dropdown-toggle d-flex"
                  role="button"
                  type="button"
                  id="dropdownTest"
                  data-bs-toggle="dropdown"
                >
                  <button
                    className="d-flex justify-content-around align-items-center"
                    onClick={() => this.showMenuLink(`btn${index}`)}
                  >
                    {participant.find((item)=>item.type===`btn${index}`)? (
                      participant.find((item)=>item.type===`btn${index}`).award === "firstAward" && projectDetail.winningAmount && projectDetail.winningAmount!=" " ? (
                        <>
                          {" "}
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"
                            }
                            className="award-btn1"
                            alt="firstAward"
                          />
                          <span className="award-btn2"> <Format number={projectDetail.winningAmount} currency={projectDetail.currencyCode} /></span>{" "}
                        </>
                      ) : participant.find((item)=>item.type===`btn${index}`).award  === "secondAward"  && projectDetail.secondPlacePrize && projectDetail.secondPlacePrize!=" " ? (
                        <>
                          {" "}
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/secondAward.svg"
                            }
                            className="award-btn1"
                            alt="secondAward"
                          />
                          <span className="award-btn2"> <Format number={projectDetail.secondPlacePrize} currency={projectDetail.currencyCode} /> </span>{" "}
                        </>
                      ) : participant.find((item)=>item.type===`btn${index}`).award  === "thirdAward"  && projectDetail.thirdPlacePrize && projectDetail.thirdPlacePrize!=" " ? (
                        <>
                          {" "}
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/thirdAward.svg"
                            }
                            className="award-btn1"
                            alt="thirdAward"
                          />
                          <span className="award-btn2"> <Format number={projectDetail.thirdPlacePrize} currency={projectDetail.currencyCode} /> </span>{" "}
                        </>
                      ):''
                    ) : (
                      languageType.SELECT_TEXT
                    )}
                  </button>
                </span>
                <div
                  className={`${
                    activeMenu.includes(`btn${index}`) ? "showMenu" : ""
                  } dropdown-menu`}
                  aria-labelledby="dropdownTest"
                >
                  {
                    projectDetail.winningAmount && projectDetail.winningAmount!=" " && <span
                    className="dropdown-item"
                    onClick={() => this.handleSelectPerson(`btn${index}`, "firstAward",item.projectProposalId)}
                  >
                    <img
                      src={
                        "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"
                      }
                      className="awardSvg"
                      alt="firstAward"
                    />{" "}
                    <Format number={projectDetail.winningAmount} currency={projectDetail.currencyCode} />
                  </span>
                  }
                  
                    {  projectDetail.secondPlacePrize && projectDetail.secondPlacePrize!=" " &&
                  <span
                    className="dropdown-item"
                    onClick={() =>
                      this.handleSelectPerson(`btn${index}`, "secondAward",item.projectProposalId)
                    }
                  >
                    <img
                      src={
                        "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/secondAward.svg"
                      }
                      className="awardSvg"
                      alt="secondAward"
                    />{" "}
                  <Format number={projectDetail.secondPlacePrize} currency={projectDetail.currencyCode} />
                  </span>}
                  {  projectDetail.thirdPlacePrize && projectDetail.thirdPlacePrize!=" " &&
                  <span
                    className="dropdown-item"
                    onClick={() => this.handleSelectPerson(`btn${index}`, "thirdAward",item.projectProposalId)}
                  >
                    <img
                      src={
                        "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/thirdAward.svg"
                      }
                      className="awardSvg"
                      alt="thirdAward"
                    />{" "}
                     <Format number={projectDetail.thirdPlacePrize} currency={projectDetail.currencyCode} />{" "}
                  </span>}
                </div>
              </div>
            </div>
          </div>
          })
          :""
        }
     
   


          </div>
        )}
        <div className="bottom-awarded-button">
          <button  onClick={this.handleSubmitFinalWinners}  disabled={participant.length < 1}>
            <img
              src={
                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/awardedButtonIcon.png"
              }
            />
            <span> Select the first passed candidates {" "} {loading1 ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              ""
                            )}</span>
          </button>
        </div>
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
