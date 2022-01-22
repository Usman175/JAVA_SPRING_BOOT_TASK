import React from "react";
import DropdownList from "../../../../components/dropdowns/dropdownList";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from "../../../../components/radioButton/radio";
import * as actions from "../../../../store/action/Project/projectActions";
import Label from "../../../../components/postProject/label";
const probationEnglishText = {
  heading: "Probation Period",
  subHeading1:
    "During the probation period, only 70% of the contract amount will be paid to the freelancer",
  subHeading2:
    "However, if the contract doesn't last long according to the agreed period, the escrowed 30% will be reverted back to freelancer.",
  subHeading3:
    "The feedback will not be allowed if the contract ends with the probation period",
};
const probationKoreanText = {
  heading: "인턴 기간",
  subHeading1: "수습기간 동안 계약금액의 70%만 프리랜서에게 지급",
  subHeading2:
    "단, 약정 기간에 따라 계약이 오래 지속되지 않을 경우, 에스크로된 30%는 프리랜서로 반환됩니다.",
  subHeading3: "수습 기간으로 계약이 종료되는 경우 피드백이 허용되지 않습니다.",
};
const probationJapanText = {
  heading: "試用期間",
  subHeading1:
    "試用期間中は、契約金額の70％のみがフリーランサーに支払われます。",
  subHeading2:
    "ただし、合意された期間に従って契約が長く続かない場合、エスクローされた30％はフリーランサーに戻されます。",
  subHeading3: "契約が試用期間で終了した場合、フィードバックは許可されません",
};
export default function ProbationPeriod() {
  const [applyProbation, setApplyProbation] = React.useState("no");
  const [probationPeriod, setProbationPeriod] = React.useState("");
  const [applyProbationPeriod, setApplyProbationPeriod] = React.useState("");
  const [ProbationAlert, setProbationAlert] = React.useState(false);
  const dispatch = useDispatch();
  // data from reducers
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);
  const projectPost = useSelector((state) => state.projectStore.projectPost);
  // console.log(projectPost, "project")
  const onFieldChange = (field, value) => {
    dispatch(actions.projectPost_updateProbationPeriod(field, value));
  };
  return (
    <div className="row align-items-center" style={{ marginTop: "10px" }}>
      <div className="col-12 col-md-4">
        <div className="form-group">
          <Label
            title={languageType.PROJECT_PERIOD}
            prefixBoxValid={true}
            icon="https://dhihitu47nqhv.cloudfront.net/icons/sixmonths.svg"
            color="#333333"
          >
            {" "}
          </Label>
          <DropdownList
            id="projectPeriod"
            name="projectPeriod"
            enableAutoCompleteSearch
            value={projectPost.probationPeriod.projectPeriod}
            selectItem={(value) => {
              onFieldChange("projectPeriod", value);
            }}
            items={languageReducer.projectPeriod}
          />
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div>
          <div className="form-group">
            <Label
              icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/business_growth_chart.svg"}
              color="#333333"
              prefixBoxValid={true}
              title={
                <div>
                  {languageType.APPLY_PROBATION_PERIOD}?{" "}
                  <Tooltip
                    style={{ backgroundColor: "black" }}
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => setProbationAlert(false)}
                    open={ProbationAlert}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    placement="top"
                    title={
                      <span style={{ color: "white", padding: "25px" }}>
                        <center>
                          {" "}
                          <h3
                            style={{
                              color: "white",
                              fontSize: "18px",
                              fontWeight: "700",
                            }}
                          >
                            {languageReducer.language === "english"
                              ? probationEnglishText.heading
                              : languageReducer.language === "korean"
                              ? probationKoreanText.heading
                              : probationJapanText.heading}
                          </h3>
                        </center>
                        <p style={{ color: "white", padding: "0px 11px" }}>
                          {" "}
                          {languageReducer.language === "english"
                            ? probationEnglishText.subHeading1
                            : languageReducer.language === "korean"
                            ? probationKoreanText.subHeading1
                            : probationJapanText.subHeading1}
                        </p>
                        <br />
                        <p style={{ color: "white", padding: "0px 11px" }}>
                          {languageReducer.language === "english"
                            ? probationEnglishText.subHeading2
                            : languageReducer.language === "korean"
                            ? probationKoreanText.subHeading2
                            : probationJapanText.subHeading2}
                        </p>
                        <br />
                        <p style={{ color: "white", padding: "0px 11px" }}>
                          {languageReducer.language === "english"
                            ? probationEnglishText.subHeading3
                            : languageReducer.language === "korean"
                            ? probationKoreanText.subHeading3
                            : probationJapanText.subHeading3}
                        </p>
                      </span>
                    }
                    arrow
                  >
                    <i
                      onMouseOut={() => setProbationAlert(false)}
                      onMouseOver={() => setProbationAlert(true)}
                      style={{ color: "black", cursor: "help" }}
                      className="fa fa-question-circle"
                    ></i>
                  </Tooltip>{" "}
                </div>
              }
            ></Label>
            <div style={{ margin: "10px 0px" }}>
              <span style={{ marginRight: "30px" }}>
                <Radio
                  handleSelect={(value) => {
                    if( projectPost.probationPeriod.projectPeriod === "Over 3 months (long term)" ){ 
                    onFieldChange("isApply", "yes");
                    }
                  }}
                  name="period-option"
                  id="s-option-hourly-period"
                  checked={
                    (projectPost.probationPeriod.isApply === "yes") && (projectPost.probationPeriod.projectPeriod === "Over 3 months (long term)") ? true : false
                  }
                  label={"Yes"}
                  compulsory={false}
                  disableCustomControl={true} 
                  disabled={
                    (projectPost.probationPeriod.isApply === "yes") && (projectPost.probationPeriod.projectPeriod === "Over 3 months (long term)") ? true : false
                  }
                />
              </span>
              <span style={{ marginRight: "30px" }}>
                <Radio
                  handleSelect={(value) => {
                    onFieldChange("isApply", "no");
                  }}
                  name="period-option"
                  id="s-option-hourly-period1"
                  checked={
                    projectPost.probationPeriod.isApply === "no" ? true : false
                  }
                  label={"No"}
                  compulsory={false}
                  disableCustomControl={true}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="form-group">
          <Label
            title={languageType.APPLY_PROBATION_PERIOD + "?"}
            prefixBoxValid={true}
            icon="https://dhihitu47nqhv.cloudfront.net/icons/chalendarwithclock.svg"
            color="#333333"
            width="28px"
          >
            {" "}
          </Label>
          <DropdownList
            id="probationPeriod"
            name="probationPeriod"   
            value={projectPost.probationPeriod.probationPeriod}
            selectItem={(value) => {
              onFieldChange("probationPeriod", value);
            }}
            disabled={
              (projectPost.probationPeriod.isApply === "yes") && (projectPost.probationPeriod.projectPeriod === "Over 3 months (long term)") ? false : true
            }
            items={languageReducer.applyProbationPeriod}
          />
        </div>
      </div>
      
      {(projectPost.probationPeriod.projectPeriod !== "Over 3 months (long term)") && (
      <p style={{maxWidth: '100%', marginLeft: '1rem'}} className="text-danger">
        Probation period is only applicable for long term project 
      </p>
      )}
    </div>
  );
}
