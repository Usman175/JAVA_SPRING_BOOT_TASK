import React, { Component } from "react";
import { onReduxLangaugeChange } from "../../store/action/action";
import { connect } from "react-redux";
class ImageBanner extends Component {
  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) {
      this.props.onLangaugeChange(langauge);
    }
  }

  onLangaugeDataChange = (language) => {
    localStorage.setItem("langauge", JSON.stringify(language));
    this.props.onLangaugeChange(language);
  };

  render() {
    let { languageType, language } = this.props;
    console.log(language);
    return (
      <>
        <section className="banner_sec">
          <ul className="cb-slideshow">
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
            <li>
              <span></span>
            </li>
          </ul>
          <div className="container-fluid">
            {language === "korean" ? (
              <div className="banner_text">
                <h2 className="pink_text korean">
                  {languageType.BANNER_MAIN_FIRST}
                </h2>
                <h2 className="pink_text korean">
                  {languageType.BANNER_MAIN_SECOND}
                </h2>
                <div className="blackBackground">
                  <p className="pink_text_p korean">
                    {languageType.BANNER_MAIN_THIRD}
                  </p>
                  <p className="pink_text_d korean">
                    {languageType.BANNER_MAIN_FORTH}
                  </p>
                </div>
                <a className="go_btn" title="">
                  다운로드
                </a>
              </div>
            ) : (
                <div className="banner_text">
                  <h2 className="pink_text">{languageType.BANNER_MAIN_FIRST}</h2>
                  <h2 className="pink_text">{languageType.BANNER_MAIN_SECOND}</h2>
                  <div className="blackBackground">
                    <p className="pink_text_p">
                      {languageType.BANNER_MAIN_THIRD}
                    </p>
                    <p className="pink_text_d">
                      {languageType.BANNER_MAIN_FORTH}
                    </p>
                  </div>
                  <a className="go_btn" title="">
                    다운로드
                </a>
                </div>
              )}

            <div className="row">
              <div className="col-md-4">
                <div className="banner_text">
                  {/* <h2 className="black_text">전문가를 고용하세요!</h2>
                  <span>프로젝트 관리 프로그램을 활용하여 실시간 채팅 및 파일 업무관리 관리 다양한 관리툴을 무료로 사용하실수 있습니다.</span> */}
                  {/* <a className="go_btn"  title="">
                    DOWNLOAD
                  </a> */}
                </div>
              </div>
              {/* <div className="col-md-4">
                <div className="banner_text quick_deal">
                  <h2 className="white_text">전문가를 고용하세요!</h2>
                  <span className="white_text">NO NEED TO LOGIN!</span>
                  <a className="go_btn"  title="">
                    GO!
                  </a>
                </div>
              </div> */}
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
  };
}
function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ImageBanner);
