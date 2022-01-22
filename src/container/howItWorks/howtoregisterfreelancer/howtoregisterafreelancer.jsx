import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeader from "./../../../components/subHeader";
import ProjectTypeComponent from "./projecttypescomponent";
import CompanyTypeComponent from './companytypecomponent';
import { Container } from "react-bootstrap";

class HowToRegisterFreelancer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "ProjectTypeComponent",
    };
  }

  handleProjectTypeComponent = () => {
    // update the state to tab1
    this.setState({ activeTab: "ProjectTypeComponent" });
  };
  handleregisterCompanyOrg = () => { 
    this.setState({ activeTab: "registerCompanyOrg" });
  };

  render() {
    let { languageType } = this.props;
    console.log(languageType)
    return (
      <>
        <SubHeader />
        <section className="header-line">
          <Container>
            <div className="header-line-title">
             {languageType.HOW_TO_REGISTER_A_FREELANCER} 
              <p className="header-line-contents">
               {languageType.HOW_TO_REGISTER_A_FREELANCER_TITLE_CONTENTS_1}{" "}
              </p>
              <p className="header-line-contents-1">
               {languageType.HOW_TO_REGISTER_A_FREELANCER_TITLE_CONTENTS_2}{" "}
              </p>
              <div className="Tabs_section_register_freelancer">
                <div className="Tabs">
                  {/* Tab nav */}
                  <ul className="nav">
                    <li
                      className={
                        this.state.activeTab === "ProjectTypeComponent" ? "active" : ""
                      }
                      onClick={this.handleProjectTypeComponent}
                    >
                       {languageType.TO_REGISTER_AN_INDIVIDUAL_FREELANCER}
                    </li>
                    <li
                      className={
                        this.state.activeTab === "registerCompanyOrg" ? "active" : ""
                      }
                      onClick={this.handleregisterCompanyOrg}
                    >
                     {languageType.TO_REGISTER_A_COMPANY_FREELANCER}
                    </li>
                  </ul> 
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="about_sec">
          <div className="outlet">
            {this.state.activeTab === "ProjectTypeComponent" ? (
              <ProjectTypeComponent />
            ) : (
              <CompanyTypeComponent />
            )}
          </div>
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

export default connect(
  mapStateToProps,
  mapDispatchProps
)(HowToRegisterFreelancer);
