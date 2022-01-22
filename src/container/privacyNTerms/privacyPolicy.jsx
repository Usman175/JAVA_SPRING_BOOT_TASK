import React, { Component } from "react";
// Redux
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../store/action/action";
import { connect } from "react-redux";
import IconBar from "../home/iconBar";
import { Accordion, Card, Button } from "react-bootstrap";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errorMessage: {},
      isContestDetailActive: false,
    };
  }

  render() {
    return (
      <>
        <IconBar />

        <section className="service_sec private_sec">
          <div className="container">
            <p className="text white_bg">
              ㈜컬리는(이하 “회사”는) 개인정보 보호 관련 법령에 따라 고객의
              개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
              있도록 하기 위하여 다음과 같이 개인정보 처리방침을
              수립·공개합니다.
            </p>
            <Accordion className="tip_box p-0 border-0">
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <span>제 1장</span>개인정보의 수집 및 이용목적{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="">
                      <p className="text">
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며, 이용 목적이 변경되는 경우에는 법률에
                        따라 별도의 동의를 받는 등 필요한 조치를 이행할
                        예정입니다.
                      </p>
                      <div className="list_tbl ">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th width="300" className="text-center">
                                구분
                              </th>
                              <th className="text-center">목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">회원 가입</td>
                              <td className="text-center">
                                회원 가입의사 확인, 이용자 식별 및 본인여부,
                                회원자격 유지·관리, 계약 이행 및 약관변경 등의
                                고지를 위한 연락, 본인의사 확인 및 민원 등의
                                고객 고충 처리, 부정이용 방지, 비인가 사용방지
                                및 서비스 제공 및 계약의 이행, 서비스 이용 및
                                상담, 문의 등 원활한 의사소통 경로 확보, 맞춤형
                                회원 서비스 제공, 거점 기반 서비스 제공 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">
                                재화 또는 서비스 제공
                              </td>
                              <td className="text-center">
                                물품배송, 서비스 제공, 계약서 청구서 발송,
                                콘텐츠 제공, 맞춤서비스 제공, 본인인증,
                                연령인증, 요금결제·정산, 환불 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">마케팅 및 광고</td>
                              <td className="text-center">
                                {" "}
                                웹 페이지 접속빈도 파악 또는 회원의 서비스
                                이용에 대한 통계 이벤트 등 광고성 정보 전달
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      <span>제 1장</span>개인정보의 수집 및 이용목적{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div className="">
                      <p className="text">
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며, 이용 목적이 변경되는 경우에는 법률에
                        따라 별도의 동의를 받는 등 필요한 조치를 이행할
                        예정입니다.
                      </p>
                      <div className="list_tbl ">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th width="300" className="text-center">
                                구분
                              </th>
                              <th className="text-center">목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">회원 가입</td>
                              <td className="text-center">
                                회원 가입의사 확인, 이용자 식별 및 본인여부,
                                회원자격 유지·관리, 계약 이행 및 약관변경 등의
                                고지를 위한 연락, 본인의사 확인 및 민원 등의
                                고객 고충 처리, 부정이용 방지, 비인가 사용방지
                                및 서비스 제공 및 계약의 이행, 서비스 이용 및
                                상담, 문의 등 원활한 의사소통 경로 확보, 맞춤형
                                회원 서비스 제공, 거점 기반 서비스 제공 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">
                                재화 또는 서비스 제공
                              </td>
                              <td className="text-center">
                                물품배송, 서비스 제공, 계약서 청구서 발송,
                                콘텐츠 제공, 맞춤서비스 제공, 본인인증,
                                연령인증, 요금결제·정산, 환불 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">마케팅 및 광고</td>
                              <td className="text-center">
                                {" "}
                                웹 페이지 접속빈도 파악 또는 회원의 서비스
                                이용에 대한 통계 이벤트 등 광고성 정보 전달
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      <span>제 1장</span>개인정보의 수집 및 이용목적{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <div className="">
                      <p className="text">
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며, 이용 목적이 변경되는 경우에는 법률에
                        따라 별도의 동의를 받는 등 필요한 조치를 이행할
                        예정입니다.
                      </p>
                      <div className="list_tbl ">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th width="300" className="text-center">
                                구분
                              </th>
                              <th className="text-center">목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">회원 가입</td>
                              <td className="text-center">
                                회원 가입의사 확인, 이용자 식별 및 본인여부,
                                회원자격 유지·관리, 계약 이행 및 약관변경 등의
                                고지를 위한 연락, 본인의사 확인 및 민원 등의
                                고객 고충 처리, 부정이용 방지, 비인가 사용방지
                                및 서비스 제공 및 계약의 이행, 서비스 이용 및
                                상담, 문의 등 원활한 의사소통 경로 확보, 맞춤형
                                회원 서비스 제공, 거점 기반 서비스 제공 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">
                                재화 또는 서비스 제공
                              </td>
                              <td className="text-center">
                                물품배송, 서비스 제공, 계약서 청구서 발송,
                                콘텐츠 제공, 맞춤서비스 제공, 본인인증,
                                연령인증, 요금결제·정산, 환불 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">마케팅 및 광고</td>
                              <td className="text-center">
                                {" "}
                                웹 페이지 접속빈도 파악 또는 회원의 서비스
                                이용에 대한 통계 이벤트 등 광고성 정보 전달
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="3">
                      <span>제 1장</span>개인정보의 수집 및 이용목적{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <div className="">
                      <p className="text">
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며, 이용 목적이 변경되는 경우에는 법률에
                        따라 별도의 동의를 받는 등 필요한 조치를 이행할
                        예정입니다.
                      </p>
                      <div className="list_tbl ">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th width="300" className="text-center">
                                구분
                              </th>
                              <th className="text-center">목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">회원 가입</td>
                              <td className="text-center">
                                회원 가입의사 확인, 이용자 식별 및 본인여부,
                                회원자격 유지·관리, 계약 이행 및 약관변경 등의
                                고지를 위한 연락, 본인의사 확인 및 민원 등의
                                고객 고충 처리, 부정이용 방지, 비인가 사용방지
                                및 서비스 제공 및 계약의 이행, 서비스 이용 및
                                상담, 문의 등 원활한 의사소통 경로 확보, 맞춤형
                                회원 서비스 제공, 거점 기반 서비스 제공 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">
                                재화 또는 서비스 제공
                              </td>
                              <td className="text-center">
                                물품배송, 서비스 제공, 계약서 청구서 발송,
                                콘텐츠 제공, 맞춤서비스 제공, 본인인증,
                                연령인증, 요금결제·정산, 환불 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">마케팅 및 광고</td>
                              <td className="text-center">
                                {" "}
                                웹 페이지 접속빈도 파악 또는 회원의 서비스
                                이용에 대한 통계 이벤트 등 광고성 정보 전달
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <div className="" id="headingOne">
                  <h5 className="mb-0">
                    <Accordion.Toggle as={Button} variant="link" eventKey="4">
                      <span>제 1장</span>개인정보의 수집 및 이용목적{" "}
                      <i className="fa fa-angle-down" aria-hidden="true"></i>
                    </Accordion.Toggle>
                  </h5>
                </div>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <div className="">
                      <p className="text">
                        회사는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                        이용되지 않으며, 이용 목적이 변경되는 경우에는 법률에
                        따라 별도의 동의를 받는 등 필요한 조치를 이행할
                        예정입니다.
                      </p>
                      <div className="list_tbl ">
                        <table className="table table-bordered">
                          <thead className="thead-light">
                            <tr>
                              <th width="300" className="text-center">
                                구분
                              </th>
                              <th className="text-center">목적</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">회원 가입</td>
                              <td className="text-center">
                                회원 가입의사 확인, 이용자 식별 및 본인여부,
                                회원자격 유지·관리, 계약 이행 및 약관변경 등의
                                고지를 위한 연락, 본인의사 확인 및 민원 등의
                                고객 고충 처리, 부정이용 방지, 비인가 사용방지
                                및 서비스 제공 및 계약의 이행, 서비스 이용 및
                                상담, 문의 등 원활한 의사소통 경로 확보, 맞춤형
                                회원 서비스 제공, 거점 기반 서비스 제공 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">
                                재화 또는 서비스 제공
                              </td>
                              <td className="text-center">
                                물품배송, 서비스 제공, 계약서 청구서 발송,
                                콘텐츠 제공, 맞춤서비스 제공, 본인인증,
                                연령인증, 요금결제·정산, 환불 등
                              </td>
                            </tr>
                            <tr>
                              <td className="text-center">마케팅 및 광고</td>
                              <td className="text-center">
                                {" "}
                                웹 페이지 접속빈도 파악 또는 회원의 서비스
                                이용에 대한 통계 이벤트 등 광고성 정보 전달
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>

            {/* <ul className="list-unstyled text-center private_btn">
              <li className="on"><button type="button" className="outline_btn btn active" data-link="private_201013">16차 개인정보처리방침 (2020년 10월 13일)</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">개인정보처리방침</button></li>
              <li><button type="button" className="outline_btn btn">최초 개인정보처리방침</button></li>
            </ul> */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onProjectConfirmationDataHandle: (data) => {
      dispatch(onReduxProjectConfirmationDataHandle(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(PrivacyPolicy);
