import React, { Component } from "react";
import Skeleton from "../../../../components/skeleton/skeleton.jsx";
import { connect } from "react-redux";
import "./finalWinners.scss";
import Format from "../../../../components/numberFormat/index.js";
class FinalWinners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showMenu: false,
      showMenu2: false,
      showMenu3: false,
      award: "",
      award2: "",
      award3: "",
    };
  }
  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  showMenuLink = (type) => {
    if (type === "btn1") {
      this.setState({
        showMenu: this.state.showMenu ? false : true,
      });
    } else if (type === "btn2") {
      this.setState({
        showMenu2: this.state.showMenu2 ? false : true,
      });
    } else {
      this.setState({
        showMenu3: this.state.showMenu3 ? false : true,
      });
    }
  };
  render() {
    const { languageType,finalWinners,projectDetail } = this.props;
    const { loading, award, award2, award3 } = this.state;
    const onLocalMenuItemClick = (type, award) => {
      if (type === "btn1") {
        this.setState({
          showMenu: this.state.showMenu ? false : true,
          award: award,
        });
      } else if (type === "btn2") {
        this.setState({
          showMenu2: this.state.showMenu2 ? false : true,
          award2: award,
        });
      } else {
        this.setState({
          showMenu3: this.state.showMenu3 ? false : true,
          award3: award,
        });
      }
    };
    return (
      <>
        {loading ? (
          <div className="m-4">
            <Skeleton count={1} isSkeletonLoading={loading} />
          </div>
        ) : (
          <div className="view-final-winners-img">
            {
              finalWinners && finalWinners.length>0 && finalWinners.map((item,index)=>{
                return   <div className="final-winners-img-view">
                <div className="final-winners-project-img-transition">
                  <div className="final-winners-project-img">
                    <img
                        src={item.documents[0]?item.documents[0]:
                     
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/img.png"
                        }
                      alt="project_img"
                      onClick={()=>this.props.handleShowDocuments(item.documents)}
                    />
                  </div>
                </div>
                
                <div className="final-winners-finalized">
               <div className="final-winners-finalized-left"><img
                     src={ item.freelancerProfileImage || 
                      "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/mypic.jpg"
                    }
                    alt="client_pic"
                    className="client_pic"
                  />
                     <p> {item.freelancerName} </p></div>
               <div className="final-winners-finalized-right">   {
                          item.proposalStatus=="ContestFirstPlace" &&  <>
                          {" "}
                          <img
                            src={
                              "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"
                            }
                            className="award-btn1"
                            alt="firstAward"
                          />
                          <span className="award-btn2"> <Format currency={this.props.projectDetail.currencyCode} number={this.props.projectDetail.winningAmount} />  </span>{" "}
                        </>
                        }</div>
                </div>

                <div className="final-winners-details-area">
           
                  {/* <div hidden className="dropdown">
                    <span
                      className="dropdown-toggle d-flex"
                      role="button"
                      type="button"
                      id="dropdownTest"
                      data-bs-toggle="dropdown"
                    >
                      <button
                        className="d-flex justify-content-around align-items-center"
                        onClick={() => this.showMenuLink(`btn${index}`)}
                      >
                        {award ? (
                          award === "firstAward" ? (
                            <>
                              {" "}
                              <img
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"
                                }
                                className="award-btn1"
                                alt="firstAward"
                              />
                              <span className="award-btn2"> US$300.00 </span>{" "}
                            </>
                          ) : award === "secondAward" ? (
                            <>
                              {" "}
                              <img
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/secondAward.svg"
                                }
                                className="award-btn1"
                                alt="secondAward"
                              />
                              <span className="award-btn2"> US$200.00 </span>{" "}
                            </>
                          ) : (
                            <>
                              {" "}
                              <img
                                src={
                                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/thirdAward.svg"
                                }
                                className="award-btn1"
                                alt="thirdAward"
                              />
                              <span className="award-btn2"> US$100.00 </span>{" "}
                            </>
                          )
                        ) : (
                          languageType.SELECT_TEXT
                        )}
                      </button>
                    </span>
                    <div
                      className={`${
                        this.state.showMenu === true ? "showMenu" : ""
                      } dropdown-menu`}
                      aria-labelledby="dropdownTest"
                    >
                      <span
                        className="dropdown-item"
                        onClick={() => onLocalMenuItemClick(`btn${index}`, "firstAward")}
                      >
                        <img
                          src={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/firstAward.svg"
                          }
                          className="awardSvg"
                          alt="firstAward"
                        />{" "}
                        US$300.00{" "}
                      </span>
                      <span
                        className="dropdown-item"
                        onClick={() =>
                          onLocalMenuItemClick(`btn${index}`, "secondAward")
                        }
                      >
                        <img
                          src={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/secondAward.svg"
                          }
                          className="awardSvg"
                          alt="secondAward"
                        />{" "}
                        US$200.00{" "}
                      </span>
                      <span
                        className="dropdown-item"
                        onClick={() => onLocalMenuItemClick(`btn${index}`, "thirdAward")}
                      >
                        <img
                          src={
                            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/thirdAward.svg"
                          }
                          className="awardSvg"
                          alt="thirdAward"
                        />{" "}
                        US$100.00{" "}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              })
            }
          
           
          </div>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
  };
}
function mapDispatchProps(dispatch) {}
export default connect(mapStateToProps, mapDispatchProps)(FinalWinners);
