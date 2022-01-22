import React, { Component } from "react";
import "./myContest.scss";
import Skeleton from "../../../components/skeleton/skeleton.jsx";
import ViewParticipants from "./ViewParticipant";
import ViewPost from "./ViewPost";
import ViewPass from "./ViewPass";
import { connect } from "react-redux";
import FinalWinners from "./FinalWinners";
import SubHeader from "../../../components/subHeader";
import {
  getOptions,
  postOptions,
  postMultipartFile,
} from "../../../utils/httpConfig";
import Modal from "react-bootstrap/Modal";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import moment from "moment";
import notifications from "../../../utils/notifications";
class MyContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      menu: "viewparticipant",
      projectId:
        new URLSearchParams(this.props.location.search).get("projectId") ||
        "20211207092516",
      selectedProject: {},
      projectDetail: {},
      proposals: [],
      firstPassLoading: false,
      firstPassParticipants: [],
      finalWinners:[],
      winnersLoading:false,
      show:false,
      contestDocuments:[]
    };
  }

  componentDidMount() {
    if (this.state.projectId) {
      this.bindProjectDetails();
      this.GetFirstPassParticipants();
      this.getFinalWinners()
    }
  }
  handleSUbmitFirstPassSuccess=()=>{
    this.GetFirstPassParticipants(); 
  }
  handleFinalWinnersSuccess=()=>{
    this.getFinalWinners(); 
  }
  async getFinalWinners(){
    this.setState({ winnersLoading: true });
    let result = await request(
      `${ENDPOINT["GetContestWinners"]}?projectId=` +
        this.state.projectId,
      getOptions({})
    );
    if (result.success) {
      this.setState({ winnersLoading: false });
      if (result.result !== null && result.result !== " ") {
        this.setState({
          finalWinners: result.result,menu:"finalwinner"
        });
      }
    } else {
      this.setState({ winnersLoading: false });
    }
  }
  async GetFirstPassParticipants() {
    this.setState({ firstPassLoading: true });
    let result = await request(
      `${ENDPOINT["GetFirstPassParticipants"]}?projectId=` +
        this.state.projectId,
      getOptions({})
    );
    if (result.success) {
      this.setState({ firstPassLoading: false });
      if (result.result !== null && result.result !== " ") {
        this.setState({
          firstPassParticipants: result.result,menu:"viewpass"
        });
      }
    } else {
      this.setState({ firstPassLoading: false });
    }
  }

  async bindProjectDetails() {
    this.setState({ loading: true });
    let result = await request(
      `${ENDPOINT["GetProjectContest"]}?projectId=` +
        this.state.projectId +
        "&userId=" +
        this.state.freelancerUserId,
      getOptions({})
    );
    if (result.success) {
      this.setState({ loading: false });
      if (result.result !== null && result.result !== " ") {
        let projectResponse = result.result;
        let projectDetailResponse = result.result;
        this.setState({
          selectedProject: projectResponse,
          projectDetail: projectDetailResponse,
          proposals: projectResponse.proposals,
        });
      } else this.props.history.push("/project-post");
    } else {
      this.setState({ loading: false });
    }
  }

  handleShowDocuments=(documents)=>{
   this.setState({show:true,contestDocuments:documents})
  }
  render() {
    const { loading, menu, selectedProject, proposals,firstPassParticipants,projectDetail,finalWinners,show,contestDocuments } = this.state;
    const { languageType } = this.props;
    return (
      <>
        <SubHeader />

        {loading ? (
          <div className="mycontest-loader m-4">
            <Skeleton count={3} isSkeletonLoading={true} />
          </div>
        ) : (
          <section className="card-section">
            <div className="bcknd_container">
              <div className="row">
                <div className="col-12 col-lg-2"></div>
                <div className="col-12 col-lg-8">
                  <div className="my-contest-section">
                    <div className="my-contest-card">
                      <div className="my-contest-header">
                        <div className="my-contest-header-logo">
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/paintBrush.svg"
                            }
                            alt="logoSvg"
                          />

                          <span>
                            {selectedProject &&
                            Object.keys(selectedProject).length === 0 &&
                            Object.getPrototypeOf(selectedProject) ===
                              Object.prototype
                              ? languageType.COMPANY_LOGO
                              : selectedProject.jobTitle}
                          </span>
                        </div>

                        {selectedProject &&
                        Object.keys(selectedProject).length === 0 &&
                        Object.getPrototypeOf(selectedProject) ===
                          Object.prototype ? (
                          ""
                        ) : (
                          <>
                            {selectedProject.isGuaranteed ? (
                              <div className="my-contest-header-img d-flex align-items-end">
                                <img
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/award.svg"
                                  }
                                  alt="logoImg"
                                />

                                <span>{languageType.AWARD_GURANTEED}</span>
                              </div>
                            ) : (
                              <div className="my-contest-header-img d-flex align-items-end">
                                <img
                                  src={
                                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/verifiedPayment.svg"
                                  }
                                  alt="logoImg"
                                />

                                <span>{languageType.PAYMENT_VERIFIED}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="my-contest-tip">
                        <img
                          src={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/bulb.png"
                          }
                          alt="noteImg"
                        />
                        <span>{languageType.NOTE_PLEASE_BE_PATIENT}</span>
                      </div>
                      <div className="my-contest-body">
                        <div className="my-contest-body-section1">
                          <img
                            className="awarded-icon"
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/achievement_award.svg"
                            }
                          />
                          <img
                            className="mountains_winner_icon"
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/mountains_winner_icon.svg"
                            }
                          />
                          <div
                            className={
                              menu === "viewpass"
                                ? "view-pass-body-section1-text my-contest-body-section1-text"
                                : "my-contest-body-section1-text"
                            }
                          >
                            {(menu === "viewparticipant" ||
                              menu === "finalwinner" ||
                              menu === "viewpost") && (
                              <>
                                <p>{languageType.CONTEST_WILL_BE_CLOSED} </p>
                                {!(menu === "finalwinner") && (
                                  <>
                                    <span>
                                      <p>{languageType.YOU_CAN_SELECT}</p>{" "}
                                      <button>
                                        {languageType.SELECT_TEXT}
                                      </button>
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                            {menu === "finalwinner" && (
                              <>
                                <span className="hideDiv"></span>
                              </>
                            )}
                            {menu === "viewpass" && (
                              <>
                                <p>{languageType.NO_CANDIDATE}</p>
                                <span>
                                  <p className="view-post-p">
                                    {languageType.BE_MORE_PATIENT}
                                  </p>
                                </span>
                              </>
                            )}
                          </div>
                          <div className="noticeImg">
                            <img
                              src={
                                "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/noticeImg.png"
                              }
                              alt="noticeImg"
                            />
                          </div>
                        </div>

                        {proposals?.length > 0 ? (
                          <div>
                            <div className="my-contest-body-section2">
                              <div className="my-contest-body-section2-menu">
                                <button
                                
                                  onClick={() =>{
                                    if(firstPassParticipants && firstPassParticipants.length===0 && finalWinners.length===0){
                                      this.setState({ menu: "viewparticipant" })  
                                  }else{
                                    notifications.showWarning("1st pass candidate select is closed ")
                                  } 
                                  }}
                                  className={
                                    menu === "viewparticipant"
                                      ? "menu-button-focus"
                                      : "menu-button-not-focus"
                                  }
                                >
                                  {" "}
                                  {languageType.VIEW_PARTICIPANTS}{" "}
                                </button>
                                <button
                                  onClick={() => {
                                    this.setState({ menu: "viewpost" });
                                    this.props.history.push(
                                      `/mycontest?projectId=${this.state.projectId}`
                                    );
                                  }}
                                  className={
                                    menu === "viewpost"
                                      ? "menu-button-focus"
                                      : "menu-button-not-focus"
                                  }
                                >
                                  {" "}
                                  {languageType.VIEW_MY_POST}{" "}
                                </button>
                                {
                                  firstPassParticipants.length>0 &&  <button
                                  onClick={() =>{
                                    if(finalWinners.length===0){
                                      this.setState({ menu: "viewpass" })  
                                  }else{
                                    notifications.showWarning("Final winners select is closed")
                                  } 
                                  }}
                                  className={
                                    menu === "viewpass"
                                      ? "menu-button-focus"
                                      : "menu-button-not-focus"
                                  }
                                  // hidden={firstPassParticipants.length>0?false:true}
                                >
                                  {" "}
                                  {languageType.VIEW_PASS}{" "}
                                </button>
                                }
                               
                                {
                                  finalWinners.length>0 &&  <button
                                  onClick={() =>
                                    this.setState({ menu: "finalwinner" })
                                  }
                                  className={
                                    menu === "finalwinner"
                                      ? "menu-button-focus"
                                      : "menu-button-not-focus"
                                  }
                                  // hidden={firstPassParticipants.length>0?false:true}
                                >
                                  {" "}
                                  {languageType.FINAL_WINNERS}{" "}
                                </button>
                                }
                               
                              </div>
                            </div>
                            <div>
                              {menu === "viewparticipant" && (
                                <ViewParticipants handleShowDocuments={this.handleShowDocuments} handleSUbmitFirstPassSuccess={this.handleSUbmitFirstPassSuccess} firstPassParticipants={firstPassParticipants} projectDetail={projectDetail} proposals={proposals} />
                              )}
                              {menu === "viewpost" && (
                                <ViewPost
                                  disableProposedChecking={true}
                                  {...this.props}
                                />
                              )}
                              {menu === "viewpass" && <ViewPass handleShowDocuments={this.handleShowDocuments} handleFinalWinnersSuccess={this.handleFinalWinnersSuccess}  firstPassParticipants={this.state.firstPassParticipants} projectDetail={projectDetail} firstPassLoading={this.state.firstPassLoading}/>}
                              {menu === "finalwinner" && <FinalWinners handleShowDocuments={this.handleShowDocuments} projectDetail={projectDetail} finalWinners={finalWinners} />}
                            </div>
                          </div>
                        ) : (
                          <NoDataAvailable
                            title="Sorry no participants exist yet !"
                            buttonText="Click here to see more"
                            path="/my-contracts"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-2"></div>
              </div>
            </div>
          </section>
        )}
           <Modal
        dialogClassName="jungle-modal"
        contentClassName="jungle-modal-content"
        show={show}
        onHide={() =>this.setState({show:false})}
        centered
        size="lg"
        backdrop={true}
        dialogClassName="modal-90w"
      >
        <Modal.Header className={`position-relative jungle-modal-header`}>
          <div className="customer-invitation-header">
            <img
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/homepage.svg"}
              alt=""
            />
            <h3>Contest Design Files</h3>
          </div>

          <span onClick={() => this.setState({show:false})} className="custom-close">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="hide_scroll_bar invitation_modal">
          <div className="other-freelancers-area">
            <div className="other-freelancer-area-item">
              <div className="freelancer-user-item-profile">
                {contestDocuments.map((imgSrc, index) => {
                    return <img src={imgSrc} />
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
export default connect(mapStateToProps, mapDispatchProps)(MyContest);
