import React, { useEffect, useState } from "react";
import _ from "lodash";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions } from "../../../utils/httpConfig";

function LeftSection({ projectObj }) {
  return (
    <>
      <div className="project_no client_profile">
        <div className="d-flex">
          <span>
            {projectObj?.userProfile?.userProfileUrl ? (
              <img
                src={`https://dhihitu47nqhv.cloudfront.net/${projectObj?.userProfile?.userProfileUrl}`}
                alt=""
                height={"50px"}
              />
            ) : (
              <i class="fa fa-4x fa-user" aria-hidden="true"></i>
            )}
          </span>
          <div>
            <h5>
              {projectObj?.userProfile && projectObj?.userProfile?.userName}
            </h5>

            {projectObj?.userProfile && (
              <label className="red_text">
                {projectObj?.userProfile?.noOfStars
                  ? [
                      ...Array(
                        Number(projectObj?.userProfile?.noOfStars) * 1
                      ).fill(1),
                      ...Array(
                        5 - Number(projectObj?.userProfile?.noOfStars) * 1
                      ).fill(0),
                    ].map((item, i) =>
                      item === 1 ? (
                        <i className="fa fa-star" aria-hidden="true" key={i} />
                      ) : (
                        <i class="far fa-star" aria-hidden="true" key={i}></i>
                      )
                    )
                  : ["", "", "", ""].map((item) => (
                      <i class="far fa-star" aria-hidden="true" key={"1"}></i>
                    ))}
              </label>
            )}
            <h6>
              {projectObj?.userProfile &&
                projectObj?.userProfile?.addressInfo?.userCountry}
            </h6>
          </div>
        </div>
        <div className="design_work">
          <div className="progress_bar">
            <div className="progress">
              <div
                className="progress-bar green_bar"
                role="progressbar"
                style={{
                  width: `${projectObj?.userProfile?.successRatio || 75}%`,
                }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>

          <div className="text-right">
            <a className="green_text review_skill">Review & Skill</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSection;
