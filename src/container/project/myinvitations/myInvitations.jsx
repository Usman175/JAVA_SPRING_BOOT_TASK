import React, { Component } from "react";
import "./myInvitations.scss";
import { connect } from "react-redux";
import ProposalInvitationCard from "./invitationCard/proposalInvitation";
import DirectInvitation from "./invitationCard/directInvitation";
import CompanyInvitation from "./invitationCard/companyInvitation";
import Skeleton from "../../../components/skeleton/skeleton.jsx";
import SkeletonInvitation from "./skeletonInvitation";
import SkeletonContractOffers from "./skeletonContractOffers";
import SubHeader from "../../../components/subHeader";
import NoDataAvailable from "../../../shared/error/not-data-available-new";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import { getOptions, postOptions } from "../../../utils/httpConfig";
import Pagination from "../../../components/pagination";
import notifications from "../../../utils/notifications";
import { SliderData_headerInvitation } from "./headerData";
class MyInvitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      loading: false,
      setLoading: false,
      activeTab: "forProposal" /* CompanyInvitation direct forProposal */,
      invitationLoading: false,
      companyInvitationLoading: false,
      directionInvitationData: [],
      proposalInvitationData: [],
      companyInvitationData: [],
      companyInvitationPagination: { pageSize: 10, pageNumber: 1, total: 10 },
      proposalInvitationPagination: { pageSize: 10, pageNumber: 1, total: 10 },
      pagination: { pageSize: 10, pageNumber: 1, total: 10 },
      freelancerId: props.authUser?.freelancerAuth?.individualFreelancerId
        ? props.authUser?.freelancerAuth?.individualFreelancerId
        : "",
    };
  }

  nextSlideHeader = () => {
    this.setState({
      current:
        this.state.current === SliderData_headerInvitation.length - 1
          ? 0
          : this.state.current + 1,
    });
  };

  prevSlideHeader = () => {
    this.setState({
      current:
        this.state.current === 0
          ? SliderData_headerInvitation.length - 1
          : this.state.current - 1,
    });
  };

  handleActive = (tab) => {
    this.setState({ activeTab: tab });
  };

  componentDidMount() {
    this.getDirectInvitationDetail();
    this.GetPropposalInvitationsByFreelancer();
    this.getCompanyInvitation();

    if (!Array.isArray(SliderData_headerInvitation) || SliderData_headerInvitation.length <= 0) {
      return null;
    }
  }

  getCompanyInvitation = async () => {
    if (this.state.freelancerId) {
      this.setState({ companyInvitationLoading: true });

      let result = await request(
        `${ENDPOINT["GetOrganizationInvitesByFreelancer"]}?individualFreelancerId=${this.state.freelancerId}`,
        postOptions()
      );
      if (result.success) {
        this.setState({
          companyInvitationLoading: false,
          companyInvitationData: result.result,
        });
      } else {
        this.setState({ companyInvitationLoading: false });
        notifications.showError(
          result.message || "Some problems occur please try again later"
        );
      }
    }
  };
  GetPropposalInvitationsByFreelancer = async (move) => {
    this.setState({ invitationLoading: true });

    let pageNumber = this.state.proposalInvitationPagination.pageNumber;
    if (move === "next") {
      this.setState({
        proposalInvitationPagination: {
          ...this.state.proposalInvitationPagination,
          pageNumber: this.state.proposalInvitationPagination.pageNumber + 1,
        },
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      this.setState({
        proposalInvitationPagination: {
          ...this.state.proposalInvitationPagination,
          pageNumber: this.state.proposalInvitationPagination.pageNumber - 1,
        },
      });
      pageNumber = pageNumber - 1;
    }

    let result = await request(
      `${ENDPOINT["GetPropposalInvitationsByFreelancer"]}?freelancerReferenceId=${this.state.freelancerId}&pageNumber=${pageNumber}&pageSize=${this.state.proposalInvitationPagination.pageSize}`
    );
    if (result?.entries) {
      this.setState({
        invitationLoading: false,
        proposalInvitationPagination: {
          pageNumber: result.pageNumber,
          total: result.total,
          pageSize: result.pageSize,
        },
        proposalInvitationData: result?.entries || [],
      });
    } else {
      this.setState({ invitationLoading: false });
    }
  };

  getDirectInvitationDetail = async (move) => {
    this.setState({ setLoading: true });

    let pageNumber = this.state.pagination.pageNumber;
    if (move === "next") {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNumber: this.state.pagination.pageNumber + 1,
        },
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNumber: this.state.pagination.pageNumber - 1,
        },
      });
      pageNumber = pageNumber - 1;
    }

    let result = await request(
      `${ENDPOINT["GetContractsByFreelancer"]}?freelancerReferenceId=${this.state.freelancerId}&status=Offered&pageNumber=${pageNumber}&pageSize=${this.state.pagination.pageSize}`
    );
    if (result.success) {
      this.setState({
        setLoading: false,
        pagination: {
          pageNumber: result.result.pageNumer,
          total: result.result.total || 0,
          pageSize: result.result.pageSize,
        },
        directionInvitationData: result.result.entries,
      });
    } else {
      this.setState({
        setLoading: false,
        pagination: {
          pageNumber: 0,
          total: 0,
        },
      });
    }
  };

  handleProposalInvitationSuccess = () => {
    this.setState({
      proposalInvitationPagination: {
        ...this.state.proposalInvitationPagination,
        total: this.state.proposalInvitationPagination.total - 1,
      },
    });
  };
  handleDirectInvitationSuccess = () => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        total: this.state.pagination.total - 1,
      },
    });
  };
  handleCompanyInvitationSuccess = (organizationId) => {
    let companyInvitations = [...this.state.companyInvitationData];
    this.setState({
      companyInvitationData: companyInvitations.filter(
        (item) => item.organizationId != organizationId
      ),
    });
  };

  render() {
    const { languageType } = this.props;
    const {
      loading,
      setLoading,
      activeTab,
      freelancerId,
      pagination,
      directionInvitationData,
      proposalInvitationData,
      invitationLoading,
      proposalInvitationPagination,
      companyInvitationLoading,
      companyInvitationPagination,
      companyInvitationData,
      current,
    } = this.state;
    return (
      <>
        <SubHeader />
        {/* {loading ? (
          <div className="m-2">
            <Skeleton count={3} isSkeletonLoading={true} />
          </div>
        ) : ( */}{" "}
        {/* commented hugeSize skeleton to use another while on this page */}
        <div className="bcknd_container">
          <div className="row d-flex justify-content-center">
            <div className="col-0 col-lg-2"></div>
            <div className="col-12 col-lg-8 invitationOfferMob">
              <section className="card-section w-100">
                <div className="my-invitation">
                  <div className="my-invitation-card">
                    <div className="client_detail ">
                      <div className="my-invitation-header">
                        <img
                          src={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/invitation.svg"
                          }
                          alt="invititation"
                        />
                        <span>{languageType.INVITATIONS_OFFERS} </span>
                      </div>
                      <div className="invitation-section">
                        <div className="invitation-section-tabs">
                          <div
                            title={
                              activeTab === "forProposal"
                                ? "Selected tab"
                                : "select tab"
                            }
                            onClick={() => this.handleActive("forProposal")}
                            className={`invitation-section-tabs-item ${
                              activeTab === "forProposal" ? "active" : ""
                            }`}
                          >
                            {languageType.INVITATIONS_TEXT}{" "}
                            <span
                              hidden={invitationLoading}
                              className="invitation-counting"
                            >
                              {this.state.proposalInvitationPagination.total}
                            </span>
                          </div>
                          <div
                            title={
                              activeTab === "direct"
                                ? "Selected tab"
                                : "select tab"
                            }
                            onClick={() => this.handleActive("direct")}
                            className={`invitation-section-tabs-item ${
                              activeTab === "direct" ? "active" : ""
                            }`}
                          >
                            {languageType.CONTRACT_OFFER_TEXT}{" "}
                            <span
                              hidden={setLoading}
                              className="invitation-counting"
                            >
                              {pagination.total}
                            </span>
                          </div>
                          <div
                            title={
                              activeTab === "CompanyInvitation"
                                ? "Selected tab"
                                : "select tab"
                            }
                            onClick={() =>
                              this.handleActive("CompanyInvitation")
                            }
                            className={`invitation-section-tabs-item ${
                              activeTab === "CompanyInvitation" ? "active" : ""
                            }`}
                          >
                            {languageType.FULL_TIME_POSITION}{" "}
                            <span
                              hidden={companyInvitationLoading}
                              style={{ marginRight: "0px" }}
                              className="invitation-counting"
                            >
                              {companyInvitationData.length}
                            </span>
                          </div>
                        </div>
                        {/* my invitation tabs for mobile */}
                        {/*  */}
                        <div className="Headingsection_slider_invitationOffer invitation-section-tabs-mobile">
                          {SliderData_headerInvitation.map((slide, index) => {
                            return (
                              <>
                                <i
                                  className="fa fa-angle-right arrowRightSlider_showInvitationHeading_button"
                                  onClick={this.nextSlideHeader}
                                ></i>
                                {this.state.current > 0 && (
                                <i
                                  className="fa fa-angle-left arrowLeftSlider"
                                  onClick={this.prevSlideHeader}
                                ></i>
                                )}
                                <div
                                  className={
                                    index === this.state.current
                                      ? "slide active"
                                      : "slide"
                                  }
                                  key={index}
                                >
                                  {index === this.state.current && (
                                    <div
                                      title={
                                        activeTab === `${slide.tab}`
                                          ? "Selected tab"
                                          : "select tab"
                                      }
                                      onClick={() =>
                                        this.handleActive(`${slide.tab}`)
                                      }
                                      className={`invitation-section-tabs-item-mobile ${
                                        activeTab === `${slide.tab}`
                                          ? "active"
                                          : ""
                                      }`}
                                    >
                                      {slide.header}{" "}
                                      <span
                                        hidden={invitationLoading}
                                        className="invitation-counting"
                                      >
                                        {
                                          this.state
                                            .proposalInvitationPagination.total
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {/*  */}

                        {/*  */}
                        <div className="tab-detail-area">
                          {activeTab === "CompanyInvitation" && (
                            <div>
                              {" "}
                              {companyInvitationLoading ? (
                                <div className="m-2">
                                  <Skeleton
                                    count={4}
                                    isSkeletonLoading={companyInvitationLoading}
                                  />
                                </div>
                              ) : (
                                <div className="client-details">
                                  {companyInvitationData &&
                                  companyInvitationData.length > 0 ? (
                                    companyInvitationData.map((ele) => (
                                      <CompanyInvitation
                                        name={
                                          ele.companyName || "Company name N/A"
                                        }
                                        desc={ele.companyIntroduction}
                                        time={ele.invitationDate}
                                        invitationData={ele}
                                        handleCompanyInvitationSuccess={
                                          this.handleCompanyInvitationSuccess
                                        }
                                        {...this.props}
                                        type="hire"
                                      />
                                    ))
                                  ) : (
                                    <NoDataAvailable
                                      title={
                                        languageType.NO_INVITATION_EXIST_YET
                                      }
                                      buttonText={languageType.VIEW_MORE_JOBS}
                                      path="/all-projects"
                                      color={"#0d2146"}
                                      {...this.props}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {activeTab === "forProposal" && (
                            <div>
                              {" "}
                              {invitationLoading ? (
                                <>
                                  <div className="m-2 skeletonLoading_mobile">
                                    <Skeleton
                                      count={4}
                                      isSkeletonLoading={invitationLoading}
                                    />
                                  </div>

                                  <SkeletonInvitation
                                    count={4}
                                    isSkeletonLoading={invitationLoading}
                                  />
                                </>
                              ) : (
                                <div className="client-details">
                                  {proposalInvitationData &&
                                  proposalInvitationData.length > 0 ? (
                                    proposalInvitationData.map((ele) => (
                                      <ProposalInvitationCard
                                        name={
                                          ele.userProfile?.userName ||
                                          "Client name N/A"
                                        }
                                        desc={ele.message}
                                        time={ele.invitationDate}
                                        invitationData={ele}
                                        handleProposalInvitationSuccess={
                                          this.handleProposalInvitationSuccess
                                        }
                                        {...this.props}
                                        type="hire"
                                      />
                                    ))
                                  ) : (
                                    <NoDataAvailable
                                      title={
                                        languageType.NO_INVITATION_EXIST_YET
                                      }
                                      buttonText={languageType.VIEW_MORE_JOBS}
                                      path="/all-projects"
                                      color={"#0d2146"}
                                      {...this.props}
                                    />
                                  )}

                                  {proposalInvitationData?.length > 0 && (
                                    <Pagination
                                      isPreviousPage={
                                        proposalInvitationPagination.pageNumber >
                                        1
                                          ? true
                                          : false
                                      }
                                      isNextPage={
                                        proposalInvitationPagination.pageNumber *
                                          proposalInvitationPagination.pageSize <
                                        proposalInvitationPagination.total
                                          ? true
                                          : false
                                      }
                                      lastPkEvaluatedTrack={
                                        proposalInvitationData
                                      }
                                      pageNumber={
                                        proposalInvitationPagination.pageNumber
                                      }
                                      moveBack={() =>
                                        this.GetPropposalInvitationsByFreelancer(
                                          "prev"
                                        )
                                      }
                                      moveNext={() =>
                                        this.GetPropposalInvitationsByFreelancer(
                                          "next"
                                        )
                                      }
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {activeTab === "direct" && (
                            <div>
                              {setLoading ? (
                                <>
                                  <div className="m-2 skeletonLoading_mobile">
                                    <Skeleton
                                      count={3}
                                      isSkeletonLoading={setLoading}
                                    />
                                  </div>

                                  <SkeletonContractOffers
                                    count={3}
                                    isSkeletonLoading={setLoading}
                                  />
                                </>
                              ) : (
                                <div className="client-details">
                                  {directionInvitationData &&
                                  directionInvitationData.length > 0 ? (
                                    directionInvitationData.map((ele) => (
                                      <DirectInvitation
                                        name={"Asim"}
                                        desc={"dsfsd"}
                                        time={""}
                                        {...this.props}
                                        invitationDetail={ele}
                                        handleDirectInvitationSuccess={
                                          this.handleDirectInvitationSuccess
                                        }
                                        getDirectInvitationDetail={
                                          this.getDirectInvitationDetail
                                        }
                                        type="direct"
                                      />
                                    ))
                                  ) : (
                                    <NoDataAvailable
                                      title={
                                        languageType.NO_INVITATION_EXIST_YET
                                      }
                                      buttonText={languageType.VIEW_MORE_JOBS}
                                      path="/all-projects"
                                      color={"#0d2146"}
                                      {...this.props}
                                    />
                                  )}

                                  {directionInvitationData?.length > 0 && (
                                    <Pagination
                                      isPreviousPage={
                                        pagination.pageNumber > 1 ? true : false
                                      }
                                      isNextPage={
                                        pagination.pageNumber *
                                          pagination.pageSize <
                                        pagination.total
                                          ? true
                                          : false
                                      }
                                      lastPkEvaluatedTrack={
                                        directionInvitationData
                                      }
                                      pageNumber={pagination.pageNumber}
                                      moveBack={() =>
                                        this.getDirectInvitationDetail("prev")
                                      }
                                      moveNext={() =>
                                        this.getDirectInvitationDetail("next")
                                      }
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-0 col-lg-2"></div>
          </div>
        </div>
        {/* )} */}
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
function mapDispatchProps() {}
export default connect(mapStateToProps, mapDispatchProps)(MyInvitations);
