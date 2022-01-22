import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SubHeader from "../../../components/subHeader";
import "./organizationProfile.scss";
import Skeleton from "../../../components/skeleton/skeleton";

import notifications from "../../../utils/notifications";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1200,
});

function AcceptCompanyInvite(props) {
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [acceptedInvitation, setAcceptedInvitation] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [InvitationDetail, setInvitationDetail] = useState({
    freelancerId: new URLSearchParams(props.location.search).get(
      "freelancerId"
    ),
    organizationId: new URLSearchParams(props.location.search).get(
      "organizationId"
    ),
    status: new URLSearchParams(props.location.search).get("status"),
    email: new URLSearchParams(props.location.search).get("email"),
  });
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (
      InvitationDetail.freelancerId &&
      InvitationDetail.freelancerId != "undefined"
    ) {
      handleAcceptInvitation();
    } else {
      setIsSkeletonLoading(false);
    }
  }, []);
  const handleAcceptInvitation = async () => {
    setIsSkeletonLoading(true);
    let params = {
      organizationId: InvitationDetail.organizationId,
      email: InvitationDetail.email,
      status: InvitationDetail.status,
      individualFreelancerId: InvitationDetail.individualFreelancerId,
    };
    let result = await request(
      ENDPOINT["UpdateInvitationStatus"],
      postOptions(params)
    );
    if (result.success) {
      setIsSkeletonLoading(false);
      notifications.showSuccess(
        "You have successfully accepted the invitation"
      );
      setAcceptedInvitation(true);
    } else {
      setIsSkeletonLoading(false);
      notifications.showError(
        result.message || "Some problems occur please try again later"
      );
      setErrMsg(result.message);
      setAcceptedInvitation("error");
    }
  };
  return (
    <>
      <span hidden={isSkeletonLoading}>
        <SubHeader />
      </span>
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-8">
              <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
              <div
                hidden={isSkeletonLoading}
                className="companyInviteToFreelancer project_post work_card"
              >
                <div className="invitation-accept-main-area">
                  {InvitationDetail.status === "Rejected" ? (
                    acceptedInvitation === true ? (
                      <div
                        className="invitation-accepted-area"
                        data-aos="fade-up-right"
                      >
                        <center>
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/acceptedIcon.png"
                            }
                          />
                          <h2> Congratulations! </h2>
                          <p> You have successfully reject the invitation.</p>
                          {InvitationDetail.freelancerId ===
                          authReducer?.freelancerAuth
                            ?.individualFreelancerId ? (
                            <button
                              onClick={() =>
                                props.history.push(
                                  `/freelancer-profile/${authReducer?.freelancerAuth?.individualFreelancerId}`
                                )
                              }
                            >
                              {" "}
                              View your profile
                            </button>
                          ) : (
                            <button
                              onClick={() => props.history.push("/start-with")}
                            >
                              {" "}
                              Log in into your account{" "}
                            </button>
                          )}
                        </center>
                      </div>
                    ) : acceptedInvitation === false ? (
                      <div className="invitation-accepted-area">
                        <center>
                          <img
                            className="errorIcon"
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/invitationIcon.png"
                            }
                          />
                          <h2> {"Company invitation"}</h2>
                          <p>
                            You have not registered as freelancer you need to
                            register first to reject the invitation of company.
                            Please create your account and check your offers to
                            reject offers and find new full time jobs offers.
                          </p>
                          <button
                            onClick={() => props.history.push("/start-with")}
                          >
                            {" "}
                            Join Freelancer
                          </button>
                        </center>
                        <br />
                      </div>
                    ) : acceptedInvitation === "error" ? (
                      <div className="invitation-accepted-area">
                        <center>
                          <img
                            className="errorIcon"
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/errorIcon.png"
                            }
                          />
                          <h2> {"Sorry! Error"}</h2>
                          <p>
                            {errMsg ||
                              "Sorry some error occur in the system please try again later"}
                          </p>
                          <button
                            onClick={() => props.history.push("/start-with")}
                          >
                            {" "}
                            Log in to accept{" "}
                          </button>
                        </center>
                        <br />
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  {InvitationDetail.status === "Accepted" ? (
                    acceptedInvitation === true ? (
                      <div className="invitation-accepted-area">
                        <center>
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/acceptedIcon.png"
                            }
                          />
                          <h2> Congratulations! </h2>
                          <p>
                            {" "}
                            You have successfully accepted invitation and now
                            you are the member of this company. you can earn
                            more as member of this company.
                          </p>
                          {InvitationDetail.freelancerId ===
                          authReducer?.freelancerAuth
                            ?.individualFreelancerId ? (
                            <button
                              onClick={() =>
                                props.history.push(
                                  `/freelancer-profile/${authReducer?.freelancerAuth?.individualFreelancerId}`
                                )
                              }
                            >
                              {" "}
                              View your profile
                            </button>
                          ) : (
                            <button
                              onClick={() => props.history.push("/start-with")}
                            >
                              {" "}
                              Log in into your account{" "}
                            </button>
                          )}
                        </center>
                      </div>
                    ) : acceptedInvitation === false ? (
                      <div className="invitation-accepted-area">
                        <center>
                          <img
                            className="errorIcon"
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/invitationIcon.png"
                            }
                          />
                          <h2> {"Company invitation"}</h2>
                          <p>
                            You have not registered as freelancer you need to
                            register first to accept the invitation of company.
                            Please create your account and check your offers to
                            join the company.
                          </p>
                          <button
                            onClick={() => props.history.push("/start-with")}
                          >
                            {" "}
                            Join Freelancer
                          </button>
                        </center>
                        <br />
                      </div>
                    ) : acceptedInvitation === "error" ? (
                      <div className="invitation-accepted-area">
                        <center>
                          <img
                            className="errorIcon"
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/errorIcon.png"
                            }
                          />
                          <h2> {"Sorry! Error"}</h2>
                          <p>
                            {errMsg ||
                              "Sorry some error occur in the system please try again later"}
                          </p>
                          <button
                            onClick={() => props.history.push("/start-with")}
                          >
                            {" "}
                            Log in to accept{" "}
                          </button>
                        </center>
                        <br />
                      </div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-2"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AcceptCompanyInvite;
