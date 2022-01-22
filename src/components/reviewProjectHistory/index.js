import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import ProjectTypeBadge from "../project/projectTypeBadge";
import Format from "../numberFormat";
import "./reviewProjectHistory.scss";
import Rating from "@material-ui/lab/Rating";

function ReviewProjectHistory(props) {
  const authUser = useSelector((state) => state.authReducer);
  let contractData = props.projectDetail?.projectContracts
    ? props.projectDetail?.projectContracts[0]
    : {};
  const handleClose = () => {
    props.setShowProjectHistoryReviewModal(false);
  };
  // console.log(props.projectDetail, "props.projectDetail");
  return (
    <Modal
      dialogClassName="jungle-modal"
      contentClassName="jungle-modal-content"
      show={props.show}
      onHide={handleClose}
      centered
      size="lg"
      backdrop={true}
    >
      <Modal.Header className={`position-relative review-modal-header`}>
        <div className="customer-invitation-header">
          <h3>
            {props.projectDetail?.jobTitle
              ? props.projectDetail?.jobTitle
              : "Experienced react developer wanted"}
          </h3>
        </div>

        <span onClick={handleClose} className="custom-close">
          x
        </span>
      </Modal.Header>
      <Modal.Body className="hide_scroll_bar invitation_modal invitation_modal_reviewProject">
        <div className="content">
          <div className="flex mb-4">
            <label>Project Type:</label>
            <span className="ml-4">
              <ProjectTypeBadge
                projectType={
                  props.projectDetail?.projectType
                    ? props.projectDetail?.projectType
                    : `Hourly`
                }
              />
            </span>
          </div>
          <div className="flex mb-4 flex-align-center period">
            <img
              src={
                "https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
              }
              alt="period"
            />
            <label className="mr-2 ml-3">Period:</label>
            <p className="payment-dateText_reviewProjectMob">
              {props.projectDetail?.expectedCompletionDays}
              (Estimated Completion{" "}
              {props.projectDetail?.completionDateTime?.slice(0, 10)})
            </p>
          </div>
          {props.projectDetail?.projectType === "Milestone" && (
            <div className="flex mb-4 flex-align-center payment-wrapper">
              <img
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/time.svg"
                }
                alt="time"
              />
              <label className="mr-2 ml-3">Milestone amount</label>
              <div className="payment-wrapper_reviewProjectMob">
                <div>
                  <p>
                    {" "}
                    <Format
                      currency={props.projectDetail?.currencyCode}
                      number={
                        props.projectDetail?.projectContracts[0]
                          ?.finalizedMilestoneAmount || "0"
                      }
                    />
                  </p>
                  <span></span>
                </div>
                <div>
                  <p>Total $US10000.00</p>
                  <span className="paid">paid</span>
                </div>
              </div>
            </div>
          )}
          {props.projectDetail?.projectType === "Hourly" && (
            <div className="flex mb-4 flex-align-center payment-wrapper">
              <img
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/time.svg"
                }
                alt="time"
              />
              <label className="mr-2 ml-3">Hourly & Payment:</label>
              <div className="payment-wrapper_reviewProjectMob">
                <div>
                  <p>
                    <Format
                      currency={props.projectDetail?.currencyCode}
                      number={
                        props.projectDetail?.projectContracts[0]
                          ?.finalizedHourlyRate || "0"
                      }
                    />
                  </p>
                  <span>/hr</span>
                </div>
                <div>
                  <p>100</p>
                  <span>hours</span>
                </div>
                <div>
                  <p>Total $US10000.00</p>
                  <span className="paid">paid</span>
                </div>
              </div>
            </div>
          )}

          {props.projectDetail?.projectType === "FreeContract" && (
            <div className="flex mb-4 flex-align-center payment-wrapper">
              <img
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/time.svg"
                }
                alt="time"
              />
              <label className="mr-2 ml-3">Hourly & Daily & Payment:</label>
              <div className="payment-wrapper_reviewProjectMob">
                <div>
                  <p>
                    <Format
                      currency={props.projectDetail?.currencyCode}
                      number={
                        props.projectDetail?.projectContracts[0]
                          ?.finalizedHourlyRate || "0"
                      }
                    />
                  </p>
                  <span>/hr</span>
                </div>
                <div>
                  <p>
                    <Format
                      currency={props.projectDetail?.currencyCode}
                      number={
                        props.projectDetail?.projectContracts[0]
                          ?.finalizedDailyRate || "0"
                      }
                    />
                  </p>
                  <span>/day</span>
                </div>
                {/* <div>
            <p>100</p>
            <span>hours</span>
          </div> */}
                <div>
                  <p>Total $US10000.00</p>
                  <span className="paid">paid</span>
                </div>
              </div>
            </div>
          )}
          {props.projectDetail?.projectType === "OfficeWork" && (
            <div className="flex mb-4 flex-align-center payment-wrapper">
              <img
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/time.svg"
                }
                alt="time"
              />
              <label className="mr-2 ml-3"> Daily & Payment:</label>
              <div className="payment-wrapper_reviewProjectMob">
                <div>
                  <p>
                    <Format
                      currency={props.projectDetail?.currencyCode}
                      number={
                        props.projectDetail?.projectContracts[0]
                          ?.finalizedDailyRate || "0"
                      }
                    />
                  </p>
                  <span>/day</span>
                </div>
                {/* <div>
            <p>100</p>
            <span>hours</span>
          </div> */}
                <div>
                  <p>Total $US10000.00</p>
                  <span className="paid">paid</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 feedback-wrapper_reviewProjectMob">
              Feedback:
            </label>
            {contractData?.freelancerFeedback ? (
              <div className="feedback-wrapper_belowText_reviewProjectMob">
                <div className="row feedback-wrapper">
                  <div className="rating-area col-5 p-0">
                    <div className="mb-2">
                      <p>Client feedback </p>
                    </div>
                    <Rating
                      name="size-small"
                      value={
                        (Number(
                          contractData?.freelancerFeedback?.totalScore || "0"
                        ) /
                          20) *
                        5
                      }
                      readOnly
                    />
                    {/* <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i> */}
                  </div>
                  <div className="col-7 p-0">
                    <div className="mb-2">
                      <p>Reliability communication and responsiveness</p>
                    </div>
                    <div className="ml-5">
                      <img
                        src={
                          contractData?.freelancerFeedback?.communicationEmoji
                            ? `https://dhihitu47nqhv.cloudfront.net/icons/${contractData?.freelancerFeedback?.communicationEmoji}.svg`
                            : `https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/sad.svg`
                        }
                        alt="feedback emoji"
                      />
                    </div>
                  </div>
                </div>
                <div className="review">
                  <p>"{contractData?.freelancerFeedback?.feedbackMessage}"</p>
                </div>
              </div>
            ) : (
              <div className="feedback-wrapper_belowText_reviewProjectMob">
                <div className="row feedback-wrapper">
                  <div className="rating-area col-5 p-0">
                    <div className="mb-2">
                      <p>Client feedback N/A</p>
                    </div>
                    <br />
                    {
                      sessionStorage.userType==="Client" && props.projectDetail?.projectStatus==="Closed" && 
                      <div className="give-feed-back-button">
                      <button onClick={()=>{
                             props.history.push(`/evaluation?projectId=${props.projectDetail?.projectId}&type=freelancer`, {
                              contractDetail: {...contractData,postUserId:props.projectDetail.postUserId,userProfile:{individualFreelancerId:props.freelancerId}},
                            });
                      }}>Give Feedback</button>
                    </div>
                    }
                  </div>
                </div>
              </div>
            )}

            <br />
            {contractData?.clientFeedback ? (
              <div>
                <div className="row feedback-wrapper">
                  <div className="rating-area col-sm-5 p-0">
                    <div className="mb-4">
                      <h5>Freelancer's response</h5>
                    </div>
                    <Rating
                      name="size-small"
                      value={
                        (Number(
                          contractData?.clientFeedback?.totalScore || "0"
                        ) /
                          20) *
                        5
                      }
                      readOnly
                    />
                  </div>
                  <div className="col-sm-7 p-0">
                    <div className="mb-2">
                      <p>Communication, Responsiveness</p>
                    </div>
                    <div className="ml-5">
                      <img
                      style={{width:'41px'}}
                        src={
                          contractData?.clientFeedback?.communicationEmoji
                            ? `https://dhihitu47nqhv.cloudfront.net/icons/${contractData?.clientFeedback?.communicationEmoji}.svg`
                            : `https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/sad.svg`
                        }
                        alt="feedback emoji"
                      />
                    </div>
                  </div>
                </div>
                <div className="review">
                  <p>"{contractData?.clientFeedback?.feedbackMessage}"</p>
                </div>
              </div>
            ) : (
              <div className="feedback-wrapper_belowText_reviewProjectMob">
                <div className="row feedback-wrapper">
                  <div className="rating-area col-5 p-0">
                    <div className="mb-2">
                      <p>Freelancer feedback N/A</p>
                    </div>
                    <br />
                    {
                      sessionStorage.userType==="Freelancer" && props.projectDetail?.projectStatus==="Closed" && 
                      <div className="give-feed-back-button">
                      <button onClick={()=>{
                             props.history.push(`/evaluation?projectId=${props.projectDetail?.projectId}&type=client`, {
                              contractDetail: {...contractData,postUserId:props.projectDetail.postUserId,userProfile:{individualFreelancerId:props.freelancerId}},
                            });
                      }}>Give Feedback</button>
                    </div>
                    }
                   
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewProjectHistory;
