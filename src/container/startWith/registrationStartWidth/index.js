import React, { Component } from "react";
import { connect } from "react-redux";
import LoginRequired from "../../../components/modals/loginRequired";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../../store/constants/constant";

import "./registrationStartWidth.scss";
class RegistrationStartWith extends Component {
  constructor(props) {
    super(props);
    let userType=new URLSearchParams(this.props.location.search).get("type");
    this.state = {
      //userType: new URLSearchParams(this.props.location.search).get("type"),
      userType: sessionStorage.getItem("registeredUserType"),
      freelancerType: userType==="Headhunter"?"Agent":userType==="Organization"?"Organization":"Indivisual",
      organizationType: "Company",
      isAccept: false,
      errorMessage: {},
    };
  }

  async onFreelancerTypeChange(freelancerType) {
    this.setState({ freelancerType: freelancerType });
  }

  setOrganizationType(organizationType) {
    this.setState({ organizationType: organizationType });
  }

  handleChange(fieldData, e) {
    let errorMessage = {};
    let { languageType } = this.props;

    if (fieldData === "isAccept") {
      var isAccept = e.target.value === "true" ? false : true;
      if (!isAccept) errorMessage.isAccept = languageType.REQUIRED_MESSAGE;
      this.setState({ isAccept: isAccept, errorMessage: errorMessage });
    }
  }

  async onPageRedirectHandle() {
    if (this.state.freelancerType === "Organization") {
      let redirectTo =
        "organization-registration?type=" + this.state.organizationType;
      this.props.history.push(redirectTo);
    } else if (this.state.freelancerType === "Indivisual") {
      let redirectTo = "create-freelancer";
      this.props.history.push(redirectTo);
    } else {
      let redirectTo =
        "register-headhunter?type=" + this.state.organizationType;
      this.props.history.push(redirectTo);
    }
    window.scrollTo({
      top: "0px",
      behavior: "smooth",
    });
  }
  componentDidMount() {
    console.log(this.props.authUser, "authUser");
  }

  render() {
    let { languageType, authUser } = this.props;
    let { freelancerType, organizationType } = this.state;
    console.log(authUser, authUser);
    return (
      <>
        {/* {console.log(authUser, "authUser")} */}
        {authUser.myAuth != null ? (
          <section className="card_sec userRegistration-page">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="userRegistration-page-area">
                    <h4>{languageType.USER_REGISTRATION} </h4>
                    <div className="user-selection-area">
                      <h6 className="mb-20">
                        {languageType.PLEASE_SELECT_ENTITY}
                      </h6>
                      <div className="user-selection-type">
                        <div
                          onClick={() => {
                            this.setOrganizationType("Company");
                            this.onFreelancerTypeChange("Indivisual");
                          }}
                          className={`user-selection-type-item  ${
                            freelancerType === "Indivisual" ? "active" : ""
                          }`}
                        >
                          <div className="user-selection-type-card">
                            <img
                              src={`https://${GET_IMAGE_PREFIX}/youngman_glasses.svg`}
                            />
                          </div>
                          <p>{languageType.INDIVIDUAL_TEXT}</p>
                        </div>
                        <div
                          onClick={() => {
                            this.setOrganizationType("Company");
                            this.onFreelancerTypeChange("Organization");
                          }}
                          className={`user-selection-type-item  ${
                            freelancerType === "Organization" ? "active" : ""
                          }`}
                        >
                          <div className="user-selection-type-card">
                            <img
                              style={{ marginRight: "-44px" }}
                              src={`https://${GET_IMAGE_PREFIX1}/smalleye_girl.svg`}
                            />
                            <img
                              style={{ marginLeft: "-44px" }}
                              src={`https://${GET_IMAGE_PREFIX}/avata_boywithglasses.svg`}
                            />
                          </div>
                          <p>{languageType.COMPANY_OR_TEAM}</p>
                        </div>

                        <div
                          onClick={() => {
                            this.onFreelancerTypeChange("Agent");
                            this.setOrganizationType("Agency");
                          }}
                          className={`user-selection-type-item  ${
                            freelancerType === "Agent" ? "active" : ""
                          }`}
                        >
                          <div className="user-selection-type-card">
                            <img
                              src={`https://${GET_IMAGE_PREFIX}/avata_boywithglasses.svg`}
                            />
                          </div>
                          <p>{languageType.HEADHUNTER_TEXT}</p>
                        </div>
                      </div>
                    </div>
                    <div className="term-conditions-heading-box">
                      <div className="term-conditions-heading-box-heading">
                        <div className="term-conditions-heading-box-heading-top">
                          <img
                            src={`https://${GET_IMAGE_PREFIX}/avata_boywithglasses.svg`}
                          />
                          <h4>
                            {languageType.WHY_TEXT}{" "}
                            <span style={{ color: "rgb(89 132 187)" }}>
                              {" "}
                              {languageType.SITE_NAME}
                            </span>{" "}
                            {languageType.JUNGLEWORKS_BETTER}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="user-registration-term-conditions">
                      <ul>
                        <li>
                          <i class="fa fa-star"></i>{" "}
                          <span>
                            {" "}
                            팀 또는 회사에 소속된 개인은 회사가 설정한 조건에
                            따라 한정된 시간에만 근무가 허용됩니다.
                          </span>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>{" "}
                          <span>
                            {" "}
                            회사에 소속된 개인이 소속된 업무를 진행할 경우,
                            고객의 피드백 평가는 회사로 주어집니다. 개인
                            프로파일에는 영향을 미치지 않습니다.
                          </span>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>{" "}
                          <span>
                            에이전트는 업무가 성사될 경우 합의된 조건에 따라
                            개인 또는 회사또는 클라이어트로 부터 수수료를
                            받습니다. 업무자의 업무가 아니라 에이전트가 제공한
                            서비스에 관련하여만 양쪽에 평가를 받으며 중계되어
                            업무를 진행하는 회사 또는 개인에게 업무평가는 별도로
                            진행됩니다.
                          </span>
                        </li>
                        <li>
                          <i class="fa fa-star"></i>{" "}
                          <span>
                            클라이언트는 외부팀과 또는 개인을 하나의 팀으로
                            조직하는 다양한 방식이 존재합니다.
                          </span>
                        </li>
                        <li style={{ color: "#D82020" }}>
                          <i
                            style={{ color: "#D82020" }}
                            class="fa fa-star"
                          ></i>{" "}
                          <span>
                            다른사람의 ID를 도용하거나 실제 계약된 업무자 대신
                            클라이언트의 사전 동의 없이 다른 사람이 서비스를
                            제공하는 행위는 엄격히 제한하고 있습니다.
                          </span>
                        </li>
                      </ul>
                      <p
                        onClick={() =>
                          this.props.history.push("/privacy-policy")
                        }
                      >
                        {languageType.CLICK_TO_SEE_TERMS_READ_MORE}
                      </p>
                    </div>
                    <div className="terms-condition-checkbox">
                      <input
                        className="custom-checkbox-styled"
                        checked={this.state.isAccept}
                        onChange={(e) => this.handleChange("isAccept", e)}
                        id="styled-checkbox-1"
                        type="checkbox"
                        value={this.state.isAccept}
                      />
                      <label for="styled-checkbox-1"></label>
                      <p>{languageType.CLICK_TO_SEE_TERMS_BOX_CHECK}</p>
                    </div>
                    {this.state.errorMessage.isAccept && (
                      <p
                        style={{ paddingLeft: "31px", marginTop: "-28px" }}
                        className="text-danger"
                      >
                        {" "}
                        {this.state.errorMessage.isAccept}{" "}
                      </p>
                    )}
                    <div className="submit-button">
                      <button
                        onClick={() => {
                          let errorMessage = {};
                          if (!this.state.isAccept) {
                            errorMessage["isAccept"] =
                              languageType.REQUIRED_MESSAGE;
                            this.setState({ errorMessage: errorMessage });
                          } else this.onPageRedirectHandle();
                        }}
                      >
                        {languageType.NEXT_DAUM}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <LoginRequired defaultOpen={true} />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    authUser: state.authReducer,
  };
}
function mapDispatchProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchProps)(RegistrationStartWith);
