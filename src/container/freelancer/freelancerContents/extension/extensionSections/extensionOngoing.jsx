import React, { Component } from "react";
import moment from "moment";
import { ProjectType } from "../../../../../utils/projectConst";
import { v4 } from "uuid";
import ProjectTypeBadge from "../../../../../components/project/projectTypeBadge";
import NoDataAvailable from "../../../../../shared/error/not-data-available-new";
import Skeleton from "../../../../../components/skeleton/skeleton";
import SkeletonExtensionOnGoing from "./skeletonExtensionOnGoing";

import Pagination from "../../../../../components/pagination";
const ExtensionOngoing = (props) => {
  let { freelancer, onGoingProjectData, pagination } = props;
  return (
    <>
      <SkeletonExtensionOnGoing count={1} isSkeletonLoading={props.loading} />

      <div className="skeletonLoading_mobile">
        <Skeleton count={2} isSkeletonLoading={props.loading} />
      </div>

      {!props.loading && onGoingProjectData && onGoingProjectData.length > 0 ? (
        <>
          <div className="work_detail contract_detail">
            <div className="table-responsive detail_tbl">
              <table className="table text-center" style={{borderColor:"transparent"}}>
                <tr >
                  <td className="text-left" style={{whiteSpace:'nowrap'}}>Job Title</td>
                  <td className="text-left" style={{whiteSpace:'nowrap'}}>Project type</td>
                  <td className="text-left" style={{whiteSpace:'nowrap'}}> Estimated completion</td>
                </tr>
                <tbody >
                  {onGoingProjectData.map((project, index) => (
                    <tr key={`${v4()}`}>
                      <td className="text-left">
                        {index + 1}. {project.jobTitle}
                      </td>
                      <td className="text-left">
                        <ProjectTypeBadge projectType={project.projectType} />{" "}
                      </td>
                      <td className="text-left">
                        {moment(project.completionDateTime).format(
                          "DD-MMM-YYYY"
                        )}
                      </td>
                      {/*  No need this design now may be we will in future */}
                      {/* {project.projectType === ProjectType.Hourly && (
                          <>
                            <td className="text-left">Average working hour</td>
                            <td className="text-left">
                              {project.noOfDayHourly} hours per day
                            </td>
                          </>
                        )} */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            {!props.loading &&
              onGoingProjectData &&
              onGoingProjectData.length > 0 && (
                <Pagination
                  isPreviousPage={pagination.pageNumber > 1 ? true : false}
                  isNextPage={
                    pagination.pageNumber * pagination.pageSize <
                    pagination.total
                      ? true
                      : false
                  }
                  lastPkEvaluatedTrack={onGoingProjectData}
                  pageNumber={pagination.pageNumber}
                  moveBack={() =>
                    props.getOngoingProjectsForFreelancer(
                      "prev",
                      freelancer.individualFreelancerId ||
                        freelancer.organizationId
                    )
                  }
                  moveNext={() =>
                    props.getOngoingProjectsForFreelancer(
                      "next",
                      freelancer.individualFreelancerId ||
                        freelancer.organizationId
                    )
                  }
                />
              )}
            {/*  No need this design now may be we will in future */}
            {/* <a className="green_text view_more">View More</a> */}
          </div>
        </>
      ) : !props.loading ? (
        <NoDataAvailable
          title="Sorry no project exists!"
          buttonText="View more projects"
          path="/all-projects"
          color={"#0d2146"}
          minHeight={"18vh"}
          {...props}
        />
      ) : null}
    </>
  );
};
export default ExtensionOngoing;
