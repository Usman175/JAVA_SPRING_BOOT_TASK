import React, { useState } from "react";
import "./proposalCompnents.scss";
import Modal from "react-bootstrap/Modal";
import notifications from "../../../../../utils/notifications";
import { ENDPOINT } from "../../../../../utils/endpoint";
import request from "../../../../../utils/request";
import { store } from "react-notifications-component";
import { getOptions, postMultipartFile } from "../../../../../utils/httpConfig";

function ContestTypeProposal(props) {
  const [contestFiles, setContestFiles] = useState([
    {
      fileName: "",
      fileDetail: "",
    },
  ]);
  const [currency, setCurrency] = useState(
    props.selectedProject.currencyCode ? props.selectedProject.currencyCode : ""
  );
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [termsFlag, setTermsFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isProbationAccepted, setIsProbationAccepted] = useState(false);

  const handleAddMoreContest = () => {
    if (contestFiles.length < 5) {
      let newFile = [...contestFiles];
      newFile.push({
        fileName: "",
        fileDetail: "",
      });
      setContestFiles(newFile);
    } else {
      notifications.showWarning("You can only add maximum five!");
    }
  };

  const handleRemoveMoreContest = (index) => {
    let newFile = [...contestFiles];
    newFile.splice(index, 1);
    setContestFiles(newFile);
  };
  const handleValidation = () => {
    let errorMessage = {};
    let { proposalData, languageType } = props;
    let formIsValid = true;
    if (!proposalData.coverLetter) {
      formIsValid = false;
      props.handleInitialValidation("coverLetter");
    } else if (!proposalData.description) {
      formIsValid = false;
      props.handleInitialValidation("description");
    } else if (contestFiles.length === 0 || !contestFiles[0].fileName) {
      formIsValid = false;
      errorMessage["contestFiles"] = "At least one file required";
    } else if (!termsFlag) {
      formIsValid = false;
      errorMessage["termsFlag"] = languageType.REQUIRED_MESSAGE;
    } else if (!termsFlag) {
      formIsValid = false;
      notifications.showWarning("");
    }

    setErrMsg(errorMessage);
    return formIsValid;
  };
  const handleUpdateTermsFlag = (value) => {
    if (value) {
      let errMsgs = errMsg;
      delete errMsgs.termsFlag;
      setErrMsg(errMsgs);
    } else {
      let errMsgs = errMsg;
      errMsgs["termsFlag"] = props.languageType.REQUIRED_MESSAGE;
      setErrMsg(errMsgs);
    }
    setTermsFlag(value);
  };
  const handleProposalSubmit = async () => {
    let { proposalData, selectedProject } = props;

    if (handleValidation()) {

      let data = new FormData();
      data.append("projectId", proposalData.projectId);
      data.append("freelancerReferenceId", proposalData.userId);
      data.append("freelancerType", selectedProject.freelancerType === " "
      ? "Individual"
      : selectedProject.freelancerType || "Individual");
      data.append("description", proposalData.description);
      data.append("coverLetter", proposalData.coverLetter);
       
      contestFiles.length>0 && contestFiles.map((item,index)=>{
        data.append(`documents`, item.fileDetail);
      })
       
      setLoading(true);
      let result = await request(ENDPOINT["CreateContestProposal"],
      postMultipartFile(data)
      );
      if (result.success) {
        if (result) {
          setLoading(false);
          store.addNotification({
            title: `Proposal ${
              proposalData.projectProposalId ? "Updated" : "Submitted"
            } Successfully `,
            message: `Proposal submitted successfully ${
              proposalData.projectProposalId ? "Updated" : "Submitted"
            } again Free Contract project`,
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
          let newurl = `project-proposal-detail?id=${proposalData.projectId}&projectProposalId=${result.result}`;
          setTimeout(()=>{
            props.onRouteChange("project-proposal-detail");
            props.history.push(newurl);
          },500)
        
        } else {
          store.addNotification({
            title: "Error ",
            message: result.message,
            type: "warning",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
          setLoading(false);
   
        }
      }else{
        setLoading(false);
        store.addNotification({
          title: "Error ",
          message:"Please try again later!",
          type: "warning",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      }


    }
  };
  const handleAddContestPhoto = (file, index, name) => {
    let newFile = [...contestFiles];
    newFile[index].fileName = name;
    newFile[index].fileDetail = file;
    setContestFiles(newFile);
  };
  return (
    <div className="contest-type-post-proposal">
      <div className="form-group row mb-3">
        <label for="award-certificate" class="col-sm-3 col-form-label">
          <span className="form-label-icon text-left">
            <img
              width={25}
              src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/homepage.svg"}
            />
          </span>
          Contest files
        </label>
        <div class="col-sm-9">
          {contestFiles?.map((item, index) => (
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6 col-10">
                <label
                  className="file-upload-area-label"
                  htmlFor={`ContestPhotoProposal${index}`}
                >
                  <div className="btn btn-dark w-100">
                    {" "}
                    {item.fileName ? item.fileName : "Contest photos"}{" "}
                  </div>
                </label>
                <input
                  id={`ContestPhotoProposal${index}`}
                  accept=".png, .jpg, .jpeg,.pdf"
                  onChange={(e) => {
                    let size = e.target.files[0] ? e.target.files[0].size : 0;
                    if (size < 1048576) {
                      handleAddContestPhoto(
                        e.target.files[0],
                        index,
                        e.target?.files[0]?.name
                      );
                    } else {
                      notifications.showWarning(
                        "Please select a file size of less than 1 MB."
                      );
                    }
                  }}
                  type="file"
                  className="file-upload-area"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-2">
                <a>
                  {index == contestFiles.length-1 ? (
                    <img
                      width={18}
                      src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus-bold.svg"}
                      onClick={() => handleAddMoreContest()}
                      className="plus-icon"
                    />
                  ) : (
                    <i
                      onClick={() => handleRemoveMoreContest(index)}
                      className="fa fa-minus"
                    ></i>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="contest-file-preview-area">
        {contestFiles.map((item, index) => {
          if (item.fileName) {
            return (
              <img
                onClick={() => setShow(true)}
                src={URL.createObjectURL(item.fileDetail)}
              />
            );
          }
        })}
      </div>
      {errMsg.contestFiles && (
        <p className="text-danger"> {errMsg.contestFiles} </p>
      )}
      <div
        className="checkbox_area_for_mile_stone_bid"
        style={{ margin: "5px 0px 0px -5px" }}
      >
        <input
          className="custom-checkbox-styled"
          onChange={(e) => handleUpdateTermsFlag(e.target.checked)}
          checked={termsFlag}
          id="styled-checkbox-week-terms"
          type="checkbox"
          value={termsFlag}
        />
        <label for="styled-checkbox-week-terms">
          {" "}
          Have you read the terms and conditions? If not, please click here
        </label>
      </div>
      {errMsg.termsFlag && <p className="text-danger">{errMsg.termsFlag}</p>}
      <div className="proposal_submit_area">
        <button disabled={loading} onClick={handleProposalSubmit}>
          Propose {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
        </button>
      </div>
      <Modal
        dialogClassName="jungle-modal"
        contentClassName="jungle-modal-content"
        show={show}
        onHide={() => setShow(false)}
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

          <span onClick={() => setShow(false)} className="custom-close">
            x
          </span>
        </Modal.Header>
        <Modal.Body className="hide_scroll_bar invitation_modal">
          <div className="other-freelancers-area">
            <div className="other-freelancer-area-item">
              <div className="freelancer-user-item-profile">
                {contestFiles.map((item, index) => {
                  if (item.fileName) {
                    return <img src={URL.createObjectURL(item.fileDetail)} />;
                  }
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContestTypeProposal;
