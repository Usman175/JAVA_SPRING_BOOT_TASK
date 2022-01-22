import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
// Redux
import {
  onReduxLangaugeChange,
  onReduxRouteChange,
} from "../../store/action/action";
import { connect } from "react-redux";
import "./footerStyle.scss";

class Footer extends Component {
  render() {
    return (
      <>
        <footer className="footer_sec">
          <div className="container">
            <div className="text-center">
              <a className="footer_logo">
                <img
                  src="https://dhihitu47nqhv.cloudfront.net/icons/bearolewhite.png"
                  alt=""
                />
              </a>
            </div>
            <div className="row">
              <div className="col-md-4 foot_logos">
                <h5>Family site</h5>
                <div className="row">
                  <div className="col-4">
                    <a title="">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/jungle_toons.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-4">
                    <a title="">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/jungle_news.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-4">
                    <a title="">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/logo_foot.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-4">
                    <a title="">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/jungle_video.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-4">
                    <a title="">
                      <img
                        src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/simpotal.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-lg-6">
                <div className="footer_menu">
                  <div className="row pt-5">
                    <div className="col-lg-4 col-md-4 col-4">
                      <Link
                        to="/term-of-use"
                        className="text-white"
                        onClick={() => this.props.onRouteChange("/term-of-use")}
                      >
                        이용약관
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-5 col-4  footerLinks_adjustMobile">
                      <Link
                        to="/privacy-policy"
                        className="text-white"
                        onClick={() =>
                          this.props.onRouteChange("/privacy-policy")
                        }
                      >
                        개인정보처리방침
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-3 col-4 footerLinks_adjustMobileCol3">
                      <Link
                        to="/help-center"
                        className="text-white"
                        onClick={() => this.props.onRouteChange("/help-center")}
                      >
                        이용안내
                      </Link>
                    </div>
                  </div>
                  <p>
                    Office: 1 Raffles Place #44-01A , One Raffles Place Tower
                    One, Delaware United State 048616 © {new Date().getFullYear()} Bearole Inc.
                  </p>
                </div>
              </div>
              <div className="col-md-3 col-lg-2 social_icon_margin">
                <h5>Social media</h5>
                <div className="social_icon">
                  <a title="">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/t.png"
                      alt=""
                    />
                  </a>
                  <a title="">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/yahoo.png"
                      alt=""
                    />
                  </a>
                  <a title="">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/zalo.png"
                      alt=""
                    />
                  </a>
                  <a title="">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/line.png"
                      alt=""
                    />
                  </a>
                  <a title="">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/fb.png"
                      alt=""
                    />
                  </a>
                  <a title="">
                    <img
                      src="https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/insta.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
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
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchProps)(Footer));
