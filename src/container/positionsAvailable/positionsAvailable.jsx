import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import JobOfferCard from "../../components/jobOffers/jobOfferCard";
import JobOfferMenuItems from "../../components/jobOffers/jobOfferMenuItems";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import { GET_IMAGE_PREFIX } from "../../store/constants/constant";
import SubHeader from "../../components/subHeader";

class PositionsAvailable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [
        {
          id: 1,
          logo: `https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`,
          name: "SAMSUNG ELECTRONICS. INC",
          opportunity: "New Opportunity For React Developer",
          description: `(주)위솝 프론트앤드 개발자를 모십니다.(react-native) 모집부문 및 자격요건 담당업무 자격요건 인원 [담당업무] react-native 프론트를 담당하게 됩니다. - 현재 운영중인 샵솔과 개발중인 긱잡채용플랫폼 담당[근무부서 및 직급/직책]근무부서: 개발팀직급/직책: 팀원 [자격요건]경력사항: 경력(1년 이상 )`,
          offered: true,
          action: null,
        },
        {
          id: 2,
          logo: `https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`,
          name: "SAMSUNG ELECTRONICS. INC",
          opportunity: "New Opportunity For React Developer",
          description: `(주)위솝 프론트앤드 개발자를 모십니다.(react-native) 모집부문 및 자격요건 담당업무 자격요건 인원 [담당업무] react-native 프론트를 담당하게 됩니다. - 현재 운영중인 샵솔과 개발중인 긱잡채용플랫폼 담당[근무부서 및 직급/직책]근무부서: 개발팀직급/직책: 팀원 [자격요건]경력사항: 경력(1년 이상 )`,
          applied: true,
          action: null,
        },
        {
          id: 3,
          logo: `https://${GET_IMAGE_PREFIX}/postOrderIcon.svg`,
          name: "SAMSUNG ELECTRONICS. INC",
          opportunity: "New Opportunity For React Developer",
          description: `(주)위솝 프론트앤드 개발자를 모십니다.(react-native) 모집부문 및 자격요건 담당업무 자격요건 인원 [담당업무] react-native 프론트를 담당하게 됩니다. - 현재 운영중인 샵솔과 개발중인 긱잡채용플랫폼 담당[근무부서 및 직급/직책]근무부서: 개발팀직급/직책: 팀원 [자격요건]경력사항: 경력(1년 이상 )`,
          applied: true,
          action: null,
        },
      ],
    };
  }

  onMenuItemClick(type, id) {
    let oldPosition = this.state.positions;
    const positionIndex = oldPosition.findIndex((obj) => obj.id == id);
    oldPosition[positionIndex].action = type;
    this.setState({ positions: oldPosition });
    console.log(this.state.positions);
  }

  render() {
    return (
      <>
        <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12"></div>
              <div className="col-lg-8 col-md-12">
                <div className="our_work_hard">
                  <div className="SearchBar">
                    <div className="SearchTextbox">
                      <span>Search</span>
                      <input
                        type="text"
                        className="company_name"
                        placeholder="Business Category, Work, Company Name"
                      />
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </div>
                    <div className="SearchTextbox location">
                      <input type="text" className="" placeholder="Location" />
                      <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </div>
                    <button type="submit" class="btn search_btn">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2 col-md-12"></div>
              <div className="col-lg-8 col-md-12">
                <div className="our_work_hard work_card">
                  <div
                    className="row"
                    style={{ "margin-left": "0px", "margin-right": "0px" }}
                  >
                    {this.state.positions.map((position) => {
                      return (
                        <JobOfferCard
                          logo={position.logo}
                          companyName={position.name}
                          opportunity={position.opportunity}
                          description={position.description}
                          jobOfferMenuItems={
                            <JobOfferMenuItems
                              id={position.id}
                              onMenuItemClick={this.onMenuItemClick.bind(this)}
                            />
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 job-position-sidebar">
                {/* <RightTop />
              <RightBottom /> */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function mapDispatchProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchProps)(PositionsAvailable)
);
