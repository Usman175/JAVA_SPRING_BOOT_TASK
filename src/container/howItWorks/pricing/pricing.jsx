import React, { Component } from "react";
import { connect } from "react-redux";
import SubHeader from "./../../../components/subHeader"; 
import PricingSection from './pricingSection';
import { Container } from "react-bootstrap";

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "headhunterComponent",
    };
  } 

  render() {
    let { languageType } = this.props; 
    return (
      <>
        <SubHeader />
        <section className="header-line" hidden={true}>
          <Container>
            <div className="header-line-title">
             Pricing
              <p className="header-line-contents">
               {languageType.HOW_TO_REGISTER_A_FREELANCER_TITLE_CONTENTS_1}{" "}
              </p>
              <p className="header-line-contents-1">
               {languageType.HOW_TO_REGISTER_A_FREELANCER_TITLE_CONTENTS_2}{" "}
              </p> 
            </div>
          </Container>
        </section>
 
          <div className="outlet"> 
            <PricingSection />
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

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Pricing);
