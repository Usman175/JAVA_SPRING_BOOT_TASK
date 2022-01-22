import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeader from "./../../../components/subHeader";
import HeadhunterDescriptionComponent from "../headhunterDescriptionComponent";
import ConsultantDescriptionComponent from '../consultantDescriptionComponent';
import { Container } from "react-bootstrap";

class HowToRegisterHeadhunter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "headhunterComponent",
    };
  }

  handleHeadhunterComponent = () => {
    // update the state to tab1
    this.setState({ activeTab: "headhunterComponent" });
  };
  handleConsultantComponent = () => { 
    this.setState({ activeTab: "consultantComponent" });
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
             {languageType.HOW_TO_REGISTER_A_HEADHUNTER} 
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
                        this.state.activeTab === "headhunterComponent" ? "active" : ""
                      }
                      onClick={this.handleHeadhunterComponent}
                    >
                       {languageType.HEADHUNTER_TEXT}
                    </li>
                    <li
                      className={
                        this.state.activeTab === "consultantComponent" ? "active" : ""
                      }
                      onClick={this.handleConsultantComponent}
                    >
                     {languageType.CONSULTANT_TEXT}
                    </li>
                  </ul> 
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="about_sec">
          <div className="outlet">
            {this.state.activeTab === "headhunterComponent" ? (
              <HeadhunterDescriptionComponent />
            ) : (
              <ConsultantDescriptionComponent />
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
)(HowToRegisterHeadhunter);
