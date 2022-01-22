import React from "react";
import moment from "moment";

export const ProposalCard = ({ cardData, props }) => {
  const {
    projectId,
    projectTitle,
    projectType,
    projectScope,
    projectAmount,
    amount,
    projectExpectedCompletionDays,
    expectedCompletionDays,
    proposedDateTime,
    offerValidDateTime,
  } = cardData;
  let proposedDateTimeFormat = moment(proposedDateTime).format("DD-MMM-YYYY");
  let offerValidDateTimeFormat =
    moment(offerValidDateTime).format("DD-MMM-YYYY");

  return (
    <div className="card_box">
      <div className="row align-items-center">
        <h4
          className="col-8 underline_hover pl-0"
          style={{ color: "#4A4949", fontWeight: "700", fontStyle: "normal" }}
        >
          {projectTitle}
        </h4>
        <div
          className="col-4 text-right text-info align-self-start"
          onClick={() =>
            props.history.push("/project-proposal-detail?id=" + projectId)
          }
        >
          To View More details
        </div>
        <div className="d-flex mt-3 col-12 pl-0">
          <span className="pr-2 py-2 h6 text-muted font-weight-bold">
            {projectType}
          </span>
          <span className="p-2 h6 text-muted font-weight-bold">
            {projectScope}
          </span>
        </div>
        <div className="border-top border-bottom col-12 tab-container text-muted mb-3">
          <div className="tab-value text-right">Project Budget</div>
          <div className="tab-value">
            {projectAmount.trim() === "" ? 0 : projectAmount}
          </div>
          <div className="tab-value text-right">Proposed Amount</div>
          <div className="tab-value">{amount.trim() === "" ? 0 : amount}</div>
          <div className="tab-value text-right">Wished Completion</div>
          <div className="tab-value">
            {projectExpectedCompletionDays.trim() === "Days"
              ? "0 Days"
              : projectExpectedCompletionDays}
          </div>
          <div className="tab-value text-right">Estimated Period</div>
          <div className="tab-value">
            {expectedCompletionDays.trim() === "Days"
              ? "0 Days"
              : expectedCompletionDays}
          </div>
          <div className="tab-value text-right">Proposed Date</div>
          <div className="tab-value">{proposedDateTimeFormat}</div>
          <div className="tab-value text-right">Offer Valid Until</div>
          <div className="tab-value">{offerValidDateTimeFormat}</div>
        </div>
      </div>
    </div>
  );
};
