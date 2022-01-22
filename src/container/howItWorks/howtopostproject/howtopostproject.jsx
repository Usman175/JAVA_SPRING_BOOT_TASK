import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import SubHeader from "./../../../components/subHeader";
import CompanyRegisterComponent from "./companyregistercomponent";
import HourlyWork from '../hourlyWork';
import MilestoneWork from '../milestoneWork';
import WorkAtOffice from '../workAtOffice';
import ContestWork from '../contestWork';
import FreeContract from '../freeContract';
class HowToPostProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "DEFAULT",
    };
  }

 
  handleTabDefault = () => {
    this.setState({ activeTab: "DEFAULT" });
  }; 

  handleTabFREE_CONTRACT = () => {
    // update the state to FREE_CONTRACT
    this.setState({ activeTab: "FREE_CONTRACT" });
  };
  handleTabHOURLY_TEXT = () => {
    this.setState({ activeTab: "HOURLY_TEXT" });
  };
  handleTabMILESTONE_PROJECT_TYPE = () => {
    this.setState({ activeTab: "MILESTONE_PROJECT_TYPE" });
  };
  handleTabIN_OFFICE = () => {
    this.setState({ activeTab: "IN_OFFICE" });
  };
  handleTabCONTEST = () => {
    this.setState({ activeTab: "CONTEST_FOR_DESIGN_WORK" });
  };

  render() {
    let { languageType } = this.props;
    return (
      <>
        <SubHeader />
        <section className="header-line">
          <Container>
            <div className="header-line-title">
              {languageType.HOW_TO_POST_PROJECT}
              <p className="header-line-contents">
               {languageType.HOW_TO_POST_PROJECT_SUB}{" "}
              </p>
              <div className="Tabs_section_register_freelancer">
                <div className="Tabs">
                  {/* Tab nav */}
                  <ul className="nav_postProject">
                  <li
                      className={
                        this.state.activeTab === "DEFAULT" ? "active" : ""
                      }
                      onClick={this.handleTabDefault}
                    >
                      {languageType.POST_A_PROJECT}
                    </li>
                    <li
                      className={
                        this.state.activeTab === "FREE_CONTRACT" ? "active" : ""
                      }
                      onClick={this.handleTabFREE_CONTRACT}
                    >
                      {languageType.FREE_CONTRACT}
                    </li>
                    <li
                      className={
                        this.state.activeTab === "HOURLY_TEXT" ? "active" : ""
                      }
                      onClick={this.handleTabHOURLY_TEXT}
                    >
                      {languageType.HOURLY_TEXT} 
                    </li>
                    <li
                      className={
                        this.state.activeTab === "MILESTONE_PROJECT_TYPE" ? "active" : ""
                      }
                      onClick={this.handleTabMILESTONE_PROJECT_TYPE}
                    >
                      {languageType.MILESTONE_TEXT}
                    </li>
                    <li
                      className={
                        this.state.activeTab === "IN_OFFICE" ? "active" : ""
                      }
                      onClick={this.handleTabIN_OFFICE}
                    >
                      {languageType.IN_OFFICE}
                    </li>
                    <li
                      className={
                        this.state.activeTab === "CONTEST_FOR_DESIGN_WORK" ? "active" : ""
                      }
                      onClick={this.handleTabCONTEST}
                    >
                      {languageType.CONTEST_FOR_DESIGN_WORK}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section className="outlet">
          {this.state.activeTab === "" && (
            <CompanyRegisterComponent />
          )}
          {this.state.activeTab === "DEFAULT" && (
            <CompanyRegisterComponent />
          )}
          {this.state.activeTab === "FREE_CONTRACT" && (
            <FreeContract />
          )}
          {this.state.activeTab === "HOURLY_TEXT" && (
            <HourlyWork />
          )}
          {this.state.activeTab === "MILESTONE_PROJECT_TYPE" && (
            <MilestoneWork />
          )}
          {this.state.activeTab === "IN_OFFICE" && (
            <WorkAtOffice />
          )}
          {this.state.activeTab === "CONTEST_FOR_DESIGN_WORK" && (
            <ContestWork />
          )}
        </section>
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

export default connect(mapStateToProps, mapDispatchProps)(HowToPostProject);
