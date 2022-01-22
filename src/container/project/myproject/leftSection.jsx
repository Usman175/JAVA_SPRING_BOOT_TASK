import React, { Component } from "react";
import { connect } from "react-redux";
import { ProjectType, ProjectTypeConst } from "../../../utils/projectConst";
import Currency from "../../../components/currency";
import Format from "../../../components/numberFormat";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import FormatDWH from "../../../components/formatDWH";
class LeftSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { projectObj, languageType, index,projectContractId,hourlyRate,finalizedMilestoneAmount ,finalizedSalarayAmount } = this.props;
    let isFreeContract = projectObj.projectType === ProjectType.FreeContract;
    let iscontest = projectObj.projectType === ProjectType.Contest;
    let isMilestone = projectObj.projectType === ProjectType.Milestone;
    let isOfficeWork= projectObj.projectType === ProjectType.OfficeWork;
    let isHourly= projectObj.projectType === ProjectType.Hourly;
    console.log("leftSection",projectObj)
    return (
      <>
        <div className="left-content-wrapper">
          <div className="contract">
            <p className="mb-2">Contract No.: {projectContractId}</p>
          </div>
          <h4>
            <span style={{ marginRight: "5px" }}>Project Type</span>{" "}
            <ProjectTypeBadge
              projectType={projectObj.projectType || `Hourly`}
            />
          </h4>
          <h4>
            <>
              <div className="flex align-items-center">
                <h4 className="mr-2">Contract:</h4>
                <div hidden={isMilestone || isOfficeWork}>
                  <Currency currency={projectObj.currencyCode} />
                  {(isHourly || isFreeContract) &&<Format currency={projectObj.currencyCode} number={hourlyRate} />}
                  {(isHourly || isFreeContract) ? "/" : ""}
                  {(isHourly || isFreeContract) && <FormatDWH
                    hr={iscontest ? null : "hr"}
                    currency={projectObj.currencyCode}
                  />}
                </div>
                
              {isMilestone && (
                <div >
                  <Currency currency={projectObj.currencyCode} />
                  <Format currency={projectObj.currencyCode} number={finalizedMilestoneAmount || "0.00"} />
                
                </div>
              )}
               {isOfficeWork && (
                <div >
                  <Currency currency={projectObj.currencyCode} />
                  <Format currency={projectObj.currencyCode} number={finalizedSalarayAmount || "0.00"} />/day
                
                </div>
              )}
              </div>

              {isFreeContract && (
                <div className="amount-day">
                  <Currency currency={projectObj.currencyCode} />
                  <Format currency={projectObj.currencyCode} number={hourlyRate} />
                  {"/"}
                  <FormatDWH day currency={projectObj.currencyCode} />
                </div>
              )}
            </>
          </h4>
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
function mapDispatchProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchProps)(LeftSection);
