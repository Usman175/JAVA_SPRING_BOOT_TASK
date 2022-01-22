import React, { useEffect, useState } from "react";
import "../contractDetail.scss";
import Format from "../../../../components/numberFormat";
import { UserView } from "../../../../components/freelancer/userView";
import request from "../../../../utils/request";
import { ENDPOINT } from "../../../../utils/endpoint";
import { getOptions, postOptions } from "../../../../utils/httpConfig";
import Skeleton from "../../../../components/skeleton/skeleton";
import AtivitiesReportTableView from "../sharedComponents/ativitiesTableView";
import ScreenShotsCapturedView from "../sharedComponents/screenshotsCaptuedView";

function WorkReport(props) {
  const [unpaidAmount, setUnpaidAmount] = useState(0);
  const [isActiveReportViewTable, setIsActiveReportViewScreenshots] =
    useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [timeSummary, setTimeSummary] = useState({});

  useEffect(() => {
    getTimeSummary(props.contractDetail?.projectContractId,props.contractDetail?.userProfile?.userId);
  }, [props.contractDetail]);

  const getTimeSummary = async (projectContractId,userId) => {
    if (projectContractId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetTimeSummary"]}?contractId=${projectContractId}&userId=${userId}`,
        getOptions({})
      );
      if (result.success) {
        setTimeSummary(result.result);
        setIsSkeletonLoading(false);
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };
  const onReportViewChange = () => {
    setIsActiveReportViewScreenshots(!isActiveReportViewTable);
  };

  return (
    <>
      {" "}
      <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
      <div hidden={isSkeletonLoading}>
          {/* this section is removed for now may be we will use later */}
        {/* <UserView
          projectDetail={props.projectDetail}
          unpaidAmount={
            <Format
              number={unpaidAmount}
              currency={props.projectDetail.currencyCode}
            />
          }
          contractDetail={props.contractDetail}
          timeAndPaymentsTab={true}
          userProfile={props?.userProfile}
          {...props}
        /> */}
        {(props.projectDetail.projectType === "FreeContract" ||
          props.projectDetail.projectType === "Hourly") ?
        isActiveReportViewTable ? (
          <AtivitiesReportTableView
            onReportViewChange={onReportViewChange}
            isReportTableViewActive={isActiveReportViewTable}
            contractData={props.location?.state}
            timeSummary={timeSummary}
          />
        ) : (
          <ScreenShotsCapturedView
            onReportViewChange={onReportViewChange}
            isReportTableViewActive={isActiveReportViewTable}
            contractData={props.contractDetail}
            timeSummary={timeSummary}
          />
        ):''}
      </div>
    </>
  );
}

export default WorkReport;
