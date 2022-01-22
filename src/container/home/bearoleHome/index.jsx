import React, { Component } from "react";
import ReactDOM from "react-dom";
import IconBar from "../bearoleIconBar";
import { connect } from "react-redux";
import bearoleFirstImg from "../../../assets/img/bearoleHomeFirst.svg";
import bearoleHomeSecond from "../../../assets/img/bearoleHomeSecond.svg";
import bearoleHomeThird from "../../../assets/img/bearoleHomeThird.svg";
import computerDesktop from "../../../assets/img/computerDesktop.svg";
import mainPageOrchestrateCurve from "../../../assets/img/mainPageOrchestrateCurve.svg";
import mainPageOfficeWorkCurve from "../../../assets/img/mainPageOfficeWorkCurve.svg";
import mainPageHeadhunterCurve from "../../../assets/img/mainPageHeadhunterCurve.svg";
import mouseScroll from "../../../assets/img/mouseScroll.svg";
import { TOGGLE_FOOTER_SETTINGS } from "../../../store/constants/constant.js";
import "./bearoleHome.scss";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1200,
});

class BearoleHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      div1: true,
      div2: false,
      test: false,
    };
  }

  isBottom(el) {
    console.log("====window-Height====", window.innerWidth);
    if (this.state.div1) {
      this.setState({
        test: true,
      });
      return el.getBoundingClientRect().bottom + 50 <= window.innerHeight;
    } else if (this.state.test && this.state.div2) {
      if (window.innerWidth > 1800)
        return el.getBoundingClientRect().bottom <= -450;
      return el.getBoundingClientRect().bottom <= -250;
    }
  }

  componentDidMount() {
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const { div1, div2 } = this.state;
    if (div1) {
      const wrappedElement = document.getElementById("header");
      if (this.isBottom(wrappedElement)) {
        const div1 = ReactDOM.findDOMNode(this.refs.div1);
        window.scrollTo({ top: div1.offsetTop, left: 0, behavior: "smooth" });
        this.setState({
          div1: false,
          div2: true,
        });
      }
    }
    if (!div1 && div2) {
      const wrappedElement = document.getElementById("header2");
      if (this.isBottom(wrappedElement)) {
        const div2 = ReactDOM.findDOMNode(this.refs.div2);
        window.scrollTo({ top: div2.offsetTop, left: 0, behavior: "smooth" });
        this.setState({
          div2: false,
        });
      }
    }
  };
  render() {
    this.props.setFooterSetting();
    let { languageType } = this.props;
    return (
      <div className="bearole-home">
        <div
          ref={this.paneDidMount}
          className="bearole-home-container"
          id="header"
        >
          <div className="bearole-home-container-header">
            <IconBar />

            <div className="d-flex justify-content-between bearole-home-header-div">
              <div
                className="text-white w-50 bearole-home-header-div-sec1"
                data-aos="fade-up"
              >
                <p className="text-white bearole-home-header-h2">
                  {languageType.BEAROLE_VALUES_TIME}
                  <br />
                  {languageType.VALUE_OF_TIME}
                </p>
                <p className="bearole-home-header-p">
                  {languageType.FIND_AND_MATCH_PROJECT}
                </p>
                <p className="bearole-home-header-p">
                  {languageType.MAXIMIZE_WORK_EFFICIENCY}
                </p>
                <p className="bearole-home-header-p">
                  {languageType.WORKING_TOGETHER_AS_TEAM}
                </p>
                <button className="w-50 bearole-home-header-btn">
                  <img
                    className="bearole-home-header-btn-img"
                    src={computerDesktop}
                    alt="computer-desktop"
                  />
                  <span className="text-white bearole-home-header-btn-span">
                    {languageType.DESKTOP_DOWNLOAD}
                  </span>
                </button>
              </div>
              <div className="bearole-home-header-div-sec2" id="header2">
                <img src={bearoleFirstImg} alt="bearoleImg" className="mb-3" />
                <span className="text-white">
                  {languageType.BEAROLE_OFFERS_MORE}
                </span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center bearole-home-container-footer">
            <img
              src={mainPageOrchestrateCurve}
              alt="mainPageOrchestrateCurve"
            />
          </div>
          <div className="bearole-home-mouse-scroll-down d-flex justify-content-center align-items-center">
            <img src={mouseScroll} alt="mouseScroll" className="mouseScroll" />
            <span>Scroll down</span>
          </div>
        </div>
        <div ref="div1" className="bearole-home-container2">
          <div className="d-flex bearole-home-container2-header">
            <div className="w-50 bearole-home-container2-header-sec1">
              <img
                src={bearoleHomeSecond}
                alt="bearoleHomeSecond"
                className="bearoleHomeSecond"
              />
            </div>
            <div
              className=" bearole-home-container2-header-sec2"
              data-aos="fade-up"
            >
              <p className="bearole-home-container2-header-h2">
                {languageType.LOOKING_FOR}
              </p>
              <p className="bearole-home-container2-header-p">
                {languageType.TOOLS_PROVIDEDB_BEAROLE}
              </p>
              <p className="bearole-home-container2-header-p">
                {languageType.DO_YOU_HIRE_PEOPLE}
              </p>
              <p className="bearole-home-container2-header-p">
                {languageType.POSSIBLE_TO_OUTSOURCE}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center bearole-home-container-footer">
            <img src={mainPageOfficeWorkCurve} alt="mainPageOfficeWorkCurve" />
          </div>
          <div className="bearole-home-mouse-scroll-down d-flex justify-content-center align-items-center">
            <img src={mouseScroll} alt="mouseScroll" className="mouseScroll" />
            <span>Scroll down</span>
          </div>
        </div>
        <div ref="div2" className="bearole-home-container3">
          <div className="circle">
            <div className="circle1">
              <div className="circle2">
                {" "}
                <div className="circle3">
                  <div className="circle4">
                    {" "}
                    <div className="circle5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bearole-home-container3-header">
            <div className="d-flex justify-content-between bearole-home-header-div1">
              <div className="text-white w-50 bearole-home-header-div1-sec1">
                <div data-aos="fade-up">
                  <p className="text-white bearole-home-header3-h2">
                    {languageType.DESIGN_TO_HEADHUNTER}
                  </p>
                  <p className="bearole-home-header3-p">
                    {languageType.POSSIBLE_TO_OUTSOURCE}
                  </p>
                </div>
              </div>
              <div className="bearole-home-header3-div-sec2">
                <img
                  className="bearole-home-header3-div-sec2-img"
                  src={bearoleHomeThird}
                  alt="bearoleImg"
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center bearole-home-container3-footer">
            <img src={mainPageHeadhunterCurve} alt="mainPageHeadhunterCurve" />
          </div>
        </div>
        <div className="d-flex align-items-center container4">
          <div>
            <span>Unit 23-12, Korea</span>
          </div>
          <div>
            <span>Unit 23-12, Korea</span>
            <span>Delaware USA</span>
          </div>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}
const mapDispatchToProps = (dispatch) => ({
  setFooterSetting: (value) =>
    dispatch({ type: TOGGLE_FOOTER_SETTINGS, data: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BearoleHome);
