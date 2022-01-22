import React, { Component } from "react";
import { connect } from "react-redux";
import { onReduxLangaugeChange } from "../../store/action/action";

class HowItWorks extends Component {
  render() {
    let { languageType, language } = this.props;
    return (
      <>
        <section className="work_sec">
          <div className="container-fluid">
            <h3 className="white_text text-center">
              {languageType.ULTIMATE_SOLUTION}
            </h3>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="deal_box">
                  <h5 className="white_text subtitle">
                    {languageType.TRUSTABLE_TITLE}
                  </h5>
                  <p className="white_text contents">
                    {languageType.TRUSTABLE_FIRST}
                  </p>
                  <p className="white_text contents">
                    {languageType.TRUSTABLE_SECOND}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="deal_box">
                  <h5 className="white_text subtitle">
                    {languageType.FLEXIBILITY_TITLE}
                  </h5>
                  <p className="white_text contents">
                    {languageType.FLEXIBILITY_FIRST}
                  </p>
                  <p className="white_text contents">
                    {languageType.FLEXIBILITY_SECOND}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="deal_box">
                  <h5 className="white_text subtitle">
                    {languageType.POWERFUL_SECURITY_TITLE}
                  </h5>
                  <p className="white_text contents">
                    {languageType.POWERFUL_SECURITY_FIRST}
                  </p>
                  <p className="white_text contents">
                    {languageType.POWERFUL_SECURITY_SECOND}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(HowItWorks);
