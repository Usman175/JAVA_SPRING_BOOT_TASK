import React, { Component } from "react";
import "react-notify-alert/dist/index.css";

import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../store/action/action";
import { connect } from "react-redux";
import DropdownList from "../../components/dropdowns/dropdownList";
import { ReactNotifyAlert } from "react-notify-alert";
import "./contactUs.scss";
import SubHeader from "../../components/subHeader";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertSetting: { open: false, type: "", title: "", message: "" },
      fields: {
        select: "",
        title: "",
        email: "",
        comments: "",
        contact_number: "",
        emailReceiving: false,
      },
      inputFields: [{ id: "inputFile1", value: "" }],
      select: "",
      showWarning: false,
      selectError: false,
      titleError: false,
      contactNumberError: false,
      commentsError: false,
      loading: false,
    };
  }

  handleChange(fieldData, value) {
    let fields = this.state.fields;
    fields[fieldData] = value;
    this.setState({ fields: fields });
  }

  toggleEmailReceiving = () => {
    let fields = this.state.fields;
    fields.emailReceiving = !fields.emailReceiving;
    this.setState({ fields: fields });
  };

  addUploadInput = () => {
    let inputFields = this.state.inputFields;
    if (inputFields.length === 3) {
      this.setState({ showWarning: true });
    } else {
      inputFields.push({
        id: "inputFile" + (inputFields.length + 1),
        value: "",
      });
      this.setState({ showWarning: false, inputFields: inputFields });
    }
  };

  onFileChange = (e, i) => {
    let files = e.target.files;
    let inputFields = this.state.inputFields;
    inputFields[i].value = files[0];
    this.setState({ inputFields: inputFields });
  };

  validateSelect = () => {
    const { fields } = this.state;
    if (!fields.select) {
      this.setState({ selectError: true });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    } else {
      console.log("1");
      return true;
    }
  };

  validateTitle = () => {
    const { fields } = this.state;
    if (!fields.title) {
      this.setState({ titleError: true });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    } else {
      console.log("2");
      return true;
    }
  };

  validateContact = () => {
    const { fields } = this.state;
    if (!fields.contact_number && fields.select) {
      if (fields.select == "01" || fields.select == "02") {
        this.setState({ contactNumberError: true });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return false;
      } else {
        console.log("3");
        return true;
      }
    } else return true;
  };

  validateComments = () => {
    const { fields } = this.state;
    if (!fields.comments) {
      this.setState({ commentsError: true });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return false;
    } else {
      console.log("4");
      return true;
    }
  };

  closeModel = () => {
    this.setState({
      alertSetting: { open: false, type: "", title: "", message: "" },
    });
  };

  sendEmail = () => {
    if (
      this.validateSelect() &&
      this.validateTitle() &&
      this.validateContact() &&
      this.validateComments()
    ) {
      this.setState({ loading: true });
      this.setState({
        alertSetting: {
          isOpen: true,
          type: "Success",
          title: "Success",
          infoText: "You have Successfully posted your complain",
        },
      });
    }
  };

  render() {
    const { inputFields, showWarning } = this.state;
    const { languageType } = this.props;
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12"></div>
              <div className="col-lg-8 col-md-12">
                <div className="list_tbl project_post">
                  <h4 className="title_h4">{languageType.CONTACT_US}</h4>
                  <div className=" table-responsive">
                    <table className="table m-0 tbl_form contactUs_tableForm_mobile">
                      <tbody className="">
                        <tr>
                          <th width="110" className="gray_bg border-top-0">
                            {languageType.SUBJECT_TEXT}
                          </th>
                          <td className="border-top-0">
                            <div className="width175">
                              <DropdownList
                                id="select"
                                name="select"
                                enableAutoCompleteSearch
                                placeHolder={languageType.SELECT_TEXT}
                                className={`form-control ${
                                  this.state.selectError ? "error" : ""
                                }`}
                                value={this.state.fields["select"]}
                                selectItem={(value) => {
                                  this.handleChange("select", value + "");
                                  this.setState({ selectError: false });
                                }}
                                items={[
                                  {
                                    text: languageType.CLAIM_TEXT,
                                    value: "01",
                                  },
                                  {
                                    text: languageType.ABOUT_YOUR_PAYMENT,
                                    value: "02",
                                  },
                                  {
                                    text: languageType.REPORT_BUG,
                                    value: "03",
                                  },
                                  {
                                    text: languageType.MEMBERSHIP_TEXT,
                                    value: "04",
                                  },
                                  {
                                    text: languageType.BUSINESS_INQUIRY,
                                    value: "05",
                                  },
                                  {
                                    text: languageType.OTHERS_TEXT,
                                    value: "06",
                                  },
                                ]}
                              />
                            </div>
                            <input
                              type="text"
                              class={`form-control mb-0 ${
                                this.state.titleError ? "error" : ""
                              }`}
                              placeholder={languageType.WRITE_THE_TITLE}
                              onChange={(e) => {
                                this.handleChange("title", e.target.value);
                                this.setState({ titleError: false });
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th width="110" class="gray_bg">
                            {languageType.CONTRACT_NO}
                          </th>
                          <td class="">
                            <div class="d-flex">
                              <input
                                type="text"
                                class={`form-control width175 mb-0 mr-2 ${
                                  this.state.contactNumberError ? "error" : ""
                                }`}
                                placeholder=""
                                onChange={(e) => {
                                  this.handleChange(
                                    "contact_number",
                                    e.target.value
                                  );
                                  this.setState({ contactNumberError: false });
                                }}
                              />
                              <button type="submit" class="btn save_btn">
                                {languageType.SEARCH}
                              </button>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th width="110" class="gray_bg">
                            {languageType.EMAIL}
                          </th>
                          <td class="">
                            <div class="d-flex align-items-center">
                              <input
                                type="text"
                                class="form-control width205 mb-0 mr-2"
                                placeholder=""
                                onChange={(e) => {
                                  this.handleChange("email", e.target.value);
                                }}
                              />
                              <div class="check_box">
                                <div class="form-check">
                                  <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="exampleCheck"
                                    onChange={() => {
                                      this.toggleEmailReceiving();
                                    }}
                                  />
                                  <label
                                    class="form-check-label receive_thisEmail_mobile"
                                    for="exampleCheck"
                                  >
                                    {languageType.RECEIVE_THIS_EMAIL}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {/* <tr>
                        <th width="110" class="gray_bg">문자메시지</th>
                        <td class="">
                          <div class="d-flex align-items-center">
                            <input type="text" class="form-control width175 mb-0 mr-2" placeholder="010-2386-0974" />
                            <div class="check_box">
                              <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">답변수신을 문자메시지로 받겠습니다.</label>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr> */}
                        <tr>
                          <th width="110" class="gray_bg">
                            {languageType.CONTENTS_TEXT}
                          </th>
                          <td class="">
                            <strong class="tit qna_public">
                              {languageType.PLEASE_READ_INQUIRY}
                            </strong>
                            <dl class="list qna_public">
                              <dt>{languageType.CLAIM_PAYMENT_TEXT}</dt>
                              <dd>
                                <span>{languageType.YOU_HAVE_CONTRACT_NO}</span>
                              </dd>
                            </dl>
                            <dl class="list" id="branchByVersion15">
                              <dt>{languageType.REPLY_TEXT}</dt>
                              {/* <dd class="old" style={{ display: "none" }}>
                                <span>
                                  샛별 지역 : 배송일 전날 19시까지
                                  <br />
                                  택배 지역 : 배송일 전날 18시까지
                                  <br />
                                  고객행복센터(1644-1107)/ 1:1문의 게시판/
                                  카카오톡(마켓컬리) 으로 취소 요청 바랍니다.
                                </span>
                                <span>
                                  {languageType.WE_TRYING_GET_BACK_INQUIRY_24HOURS}
                                </span>
                                <span>
                                  {languageType.HOWEVER_TAKE_MORE_TOO_MANY_INQUIRY}
                                </span>
                                <span>
                                  We sincerely appreciate your patience in
                                  advance
                                </span>
                              </dd> */}
                              <dd class="new">
                                <br />
                                <span>
                                  {languageType.WE_TRYING_GET_BACK_INQUIRY_24HOURS}
                                </span>
                                <span>
                                  {languageType.HOWEVER_TAKE_MORE_TOO_MANY_INQUIRY}
                                </span>
                                <span>
                                  {languageType.WE_YOUR_PATIENCE_ADVANCE}
                                </span>
                              </dd>
                            </dl>
                            {/* <dl class="list">
                            <dt>배송</dt>
                            <dd>
                              <span>주문 완료 후 배송 방법(샛별 / 택배)은 변경이 불가능합니다.</span>
                              <span>배송일 및 배송시간 지정은 불가능합니다. (예약배송 포함)</span>
                              <p class="info">※ 전화번호, 이메일, 주소, 계좌번호 등의 상세 개인정보가 문의 내용에 저장되지 않도록 주의해 주시기 바랍니다.</p>
                            </dd>
                          </dl> */}
                            <textarea
                              class={`form-control height475 ${
                                this.state.commentsError ? "error" : ""
                              }`}
                              rows="3"
                              onChange={(e) => {
                                this.handleChange("comments", e.target.value);
                                this.setState({ commentsError: false });
                              }}
                            ></textarea>
                          </td>
                        </tr>
                        <tr>
                          <th width="110" class="gray_bg">
                            {languageType.IMAGE_TEXT}
                          </th>
                          <td class="">
                            {inputFields.map((obj, i) => (
                              <div class="d-flex align-items-center file_upload">
                                <span>{i + 1}</span>
                                <input
                                  type="file"
                                  className="form-control-file"
                                  id={obj.id}
                                  name={obj.name}
                                  onChange={(e) => this.onFileChange(e, i)}
                                />
                                {i === 0 && (
                                  <a
                                    href="javascript:"
                                    onClick={() => this.addUploadInput()}
                                  >
                                    <img
                                      src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/add.gif"
                                      alt=""
                                    />
                                  </a>
                                )}
                              </div>
                            ))}
                            {showWarning && (
                              <div className="text-warning mt-2 font-weigth-600">
                                {languageType.YOU_CAN_UPLOAD_3FILES}
                              </div>
                            )}
                            <div class="text">
                              {languageType.YOU_MAY_UPLOAD_3FILES}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="text-right mt-1">
                    <button
                      type="submit"
                      class="btn save_btn mw-150"
                      onClick={() => {
                        this.sendEmail();
                      }}
                    >
                      {languageType.SEND_TEXT}{" "}
                      {this.state.loading && (
                        <i className="fa fa-spinner fa-spin"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12"></div>
            </div>
          </div>
        </section>
        <ReactNotifyAlert
          isOpen={this.state.alertSetting.isOpen}
          type={this.state.alertSetting.type}
          title={this.state.alertSetting.title}
          infoText={this.state.alertSetting.infoText}
          onActionHandle={(e) => this.closeModel()}
        ></ReactNotifyAlert>
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
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onProjectConfirmationDataHandle: (data) => {
      dispatch(onReduxProjectConfirmationDataHandle(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(ContactUs);
