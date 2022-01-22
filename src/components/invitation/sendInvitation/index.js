import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./sendInvitation.scss";
import Skeleton from "../../skeleton/skeleton";
import request from "../../../utils/request";

import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";
import ProjectCardbox from "./projectCardbox";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../pagination";
function SendInvitationModal(props) {
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
    total: 20,
  });
  const [projectData, setProjectData] = useState([]);

  const authUser = useSelector((state) => state.authReducer);

  const handleClose = () => {
    props.setShowInvitation(false);
  };

  useEffect(() => {
    if (props.showInvitation) {
      bindAllProject();
    }
  }, [props.showInvitation]);

  const bindAllProject = async (lastPkEvaluated, move, projectType) => {
    setIsSkeletonLoading(true);
    setProjectData([]);

    let pageNumber = pagination.pageNumber;
    if (move === "next") {
      setPagination({
        ...pagination,
        pageNumber: pagination.pageNumber + 1,
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      setPagination({
        ...pagination,
        pageNumber: pagination.pageNumber - 1,
      });
      pageNumber = pageNumber - 1;
    }

    let queryString = `?projectTypes=&projectStatus=&projectScope=&postUserId=${authUser?.clientAuth?.clientId}&search=&pageSize=${pagination.pageSize}&pageNumber=${pageNumber}`;

    let result = await request(
      `${ENDPOINT["GetProjectsRecruitment"]}` + queryString,
      getOptions({})
    );
    if (result.success) {
      setIsSkeletonLoading(false);
      setProjectData(result.result.entries);
      setPagination({
        ...pagination,
        pageNumber: result.result.pageNumer || result.result.pageNumber,
        pageSize: result.result.pageSize,
        total: result.result.total,
      });
    } else {
      setIsSkeletonLoading(false);
    }
  };
  return (
    <Modal
      dialogClassName="jungle-modal"
      contentClassName="jungle-modal-content"
      show={props.showInvitation}
      onHide={handleClose}
      centered
      size="lg"
      backdrop={true}
    >
      <Modal.Header
        className={`position-relative jungle-modal-header`}
        // closeButton={!customClose && !noClose}
      >
        <div className="customer-invitation-header">
          <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/invitation.svg"} alt="" />
          <h3>Invite freelancer </h3>
        </div>

        <span onClick={handleClose} className="custom-close">
          x
        </span>
      </Modal.Header>
      <Modal.Body className="hide_scroll_bar invitation_modal">
        <div className="skelton-area">
          <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
        </div>
        <div hidden={isSkeletonLoading}>
          {projectData &&
            projectData.length > 0 &&
            projectData.map((project, index) => (
              <ProjectCardbox
                key={`cardProject${index}`}
                selectedProject={project}
                index={index}
                individualFreelancerId={project.postUserId}
                handleClose={handleClose}
                {...props}
              />
            ))}
          <br />
          {projectData?.length > 0 && (
            <Pagination
              isPreviousPage={pagination.pageNumber > 1 ? true : false}
              isNextPage={
                pagination.pageNumber * pagination.pageSize < pagination.total
                  ? true
                  : false
              }
              lastPkEvaluatedTrack={projectData}
              pageNumber={pagination.pageNumber}
              moveBack={() => bindAllProject("", "prev")}
              moveNext={() => bindAllProject("", "next")}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SendInvitationModal;
