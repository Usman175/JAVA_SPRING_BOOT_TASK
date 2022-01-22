import React, { Component } from "react";
import { v4 } from "uuid";
import ShowMoreText from "react-show-more-text";
import "./freelancerContents.scss";
import Format from "../../../components/numberFormat";
import { onReduxLangaugeChange } from "../../../store/action/action";

class MiddleFreelancerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSKills: 4,
    };
  }
  bindSkill = (skills) => {
    let html = [];
    let skillCount = 4;
    let skillLine = Math.ceil(skills.length / skillCount);

    for (var i = 1; i <= skillLine; i++) {
      let skillsPerLine = skills.slice(skillCount * (i - 1), skillCount * i);
      html.push(
        <div
          key={`${v4()}`}
          className="d-flex justify-content-between skills_btn custom-skills-area"
        >
          {skillsPerLine.map((skill, index) => (
            <a key={`${v4()}`} title="">
              {skill.skillName}
            </a>
          ))}
        </div>
      );
    }
    return html;
  };

  render() {
    let { showSKills } = this.state;
    let { freelancer, languageType } = this.props;
    return (
      <>
        <div className="design_work freelancer_skillNameArea_mobile" style={{ paddingLeft: "41px" }}>
          <h3
            onClick={() => {
              if (freelancer.organizationId) {
                this.props.history.push(
                  `/organization-profile/${freelancer.organizationId}`
                );
              }
              if (freelancer.individualFreelancerId) {
                this.props.history.push(
                  `/freelancer-profile/${freelancer.individualFreelancerId}`
                );
              }
            }}
            className="green_text underline_hover title-hide-more-lineifreealncer"
            title={
              freelancer.organizationId && freelancer.companyTitle
                ? freelancer.companyTitle
                : freelancer.userTitle && freelancer.userTitle != " "
                ? freelancer.userTitle
                : "Highly Skilled .Net Developer "
            }
          >
            {freelancer.companyInfo && freelancer.companyInfo
              ? freelancer.companyInfo.companyIntroductionTitle
              : freelancer.userTitle && freelancer.userTitle != " "
              ? freelancer.userTitle
              : "Highly Skilled .Net Developer "}
          </h3>
          <div className="progress_value award_value d-flex align-items-center freelancer-stats-area">
            <label style={{ width: "40%" }}>
              {languageType?.HOURLY_RATE} :{" "}
              <span>
                {" "}
                <Format
                  number={freelancer?.profileHourlyRate || "12.00"}
                  currency={freelancer.currencyCode || "USD"}
                />{" "}
              </span>
            </label>
            <label style={{ width: "40%" }}>
              {languageType?.DAILY_RATE} :{" "}
              <span>
                {" "}
                <Format
                  number={freelancer?.profileDailyRate || "120.00"}
                  currency={freelancer.currencyCode || "USD"}
                />
              </span>
            </label>
          </div>
          <div className="freelancer_textArea_skillShow_Pc">
            <ShowMoreText
              lines={2}
              more="show more"
              less={"Show Less"}
              className="content-css showMorePc_freelancerText"
              anchorClass="view-more-less"
              expanded={false}
            >
              <p>
                {freelancer.companyInfo?.companyIntroductionContents
                  ? freelancer.companyInfo.companyIntroductionContents
                  : freelancer.professionalOverview &&
                    freelancer.professionalOverview != " "
                  ? freelancer.professionalOverview
                  : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown"}
              </p>
            </ShowMoreText>

            <div
              hidden={freelancer.organizationId}
              className="freelancer-skills-area"
            >
              {freelancer.skills && freelancer.skills.length > 1 ? (
                <div className="d-flex  skills_btn custom-skills-area">
                  {freelancer.skills.map((item, index) => {
                    if (index < showSKills) {
                      return <a key={index}> {item.skillName} </a>;
                    }
                  })}
                  {freelancer.skills.length > 4 ? (
                    showSKills === 4 ? (
                      <div
                        title={"Show more skills"}
                        className="custom-plus_btn"
                        onClick={() => this.setState({ showSKills: 20 })}
                      >
                        +
                      </div>
                    ) : (
                      <div
                        className="custom-plus_btn"
                        title={"Show less skills"}
                        onClick={() => this.setState({ showSKills: 4 })}
                      >
                        -
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className="d-flex justify-content-between skills_btn custom-skills-area">
                  <a title="">JAVA</a>
                  <a title="">C#</a>
                  <a title="">HTML</a>
                </div>
              )}
            </div>
          </div>
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
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default MiddleFreelancerContent;
