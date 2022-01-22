import React, { Component } from "react";
import { connect } from "react-redux";

class HeadhunterDescriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { languageType } = this.props;
    return (
      <> 
        <section className="about_sec">
          <div className="container">
            <h3 className="title_h3 text-center">
              {languageType.WHAT_IS_HEADHUNTER} 
            </h3>
            <h6 className="text">
              {languageType.WHAT_IS_HEADHUNTER_CONTENTS_1}
            </h6>
            <h6 className="text">
               Bearole.com does not involve in any contracts made between the recruiting companies and candidates. There is no process Bearole participates in 
               inspecting, providing recruiting information or posting job availability. Therefore it is your obligation to find out the genuinity of the information.   
                 
            </h6>
            <p className="text"></p>

            <div className="blog_box">
              <div className="media">
                <div className="media-left">
                  <img
                    src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/blog.jpg"
                    alt=""
                  />
                </div>
                <div className="media-body">
                  <h5>1. Register your company as a headhunter.</h5>
                  <p className="blog_info">
                    컬리는 미각적, 심미적으로 만족감을 주면서 사람의 몸에 이로운
                    상품이 우리의 삶까지 변화시킬 수 있다고 믿습니다. 내가 먹고
                    쓰는 것이 곧 ‘나’이니까요. 안정성, 맛, 상업성 등 여러 면에서
                    만족스러울 만한, 최상의 상품을 고르기 위해 직접 먹어보고
                    사용해보며 여러 차례에 걸쳐 꼼꼼하게 검증합니다.
                  </p>
                  <a href="#">
                    컬리의 품질 기준 더 알아보기{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="media">
                <div className="media-left">
                  <img
                    src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/blog2.jpg"
                    alt=""
                  />
                </div>
                <div className="media-body">
                  <h5>2. 물류 혁신을 통해 최상의 품질로 전해드립니다.</h5>
                  <p className="blog_info">
                    오늘 주문하면 내일 아침 도착하는 샛별배송은 물류의 혁신이
                    없었다면 불가능한 일이었죠. 샛별배송을 포함한 Kurly Fresh
                    Solution은 산지에서 식탁까지의 시간을 줄이고, 온도를 제어해
                    상품의 가치를 극대화합니다. 좋은 상품을 가장 좋은 상태로
                    고객님께 전해드리는 것. 컬리가 배송 시간부터 포장재까지
                    물류의 모든 것을 혁신한 이유이자, 컬리의 물류가 가지는
                    가치입니다.
                  </p>
                  <a href="#">
                    Kurly Fresh Solution 더 알아보기{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="media">
                <div className="media-left">
                  <img
                    src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/blog3.jpg"
                    alt=""
                  />
                </div>
                <div className="media-body">
                  <h5>3. 같은 품질에서 최선의 가격을 제공합니다.</h5>
                  <p className="blog_info">
                    소비자에게는 품질만큼 가격도 좋은 상품의 기준이 됩니다.
                    하지만 생산자가 배제된 최저가 정책은 정답이 될 수 없습니다.
                    컬리가 업계 최초로 도입한 100% 생산자 직거래 및 매입 방식은
                    유통 중 발생하던 재고 손실을 최소화해 동일 품질의 상품을
                    가장 낮은 가격에 판매할 수 있도록 해줍니다.
                  </p>
                  <a href="#">
                    가격 정책 및 직거래 매입 방식 더 알아보기{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="media">
                <div className="media-left">
                  <img
                    src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/blog4.jpg"
                    alt=""
                  />
                </div>
                <div className="media-body">
                  <h5>4. 고객의 행복을 먼저 생각합니다.</h5>
                  <p className="blog_info">
                    컬리는 오늘의 만족을 넘어 고객님의 삶 속에서 행복을 드리는
                    서비스로 남기를 바랍니다. 그래서 오늘의 회사를 위한 일보다
                    장기적으로 소비자에게 옳은 일을 합니다. 고객만족보장제도는
                    고객님의 현재는 물론 미래까지도 세심하게 케어하고 싶은
                    컬리의 의지입니다.
                  </p>
                  <a href="#">
                    고객만족보장제도 더 알아보기{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="media">
                <div className="media-left">
                  <img
                    src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/blog5.jpg"
                    alt=""
                  />
                </div>
                <div className="media-body">
                  <h5>5. 지속 가능한 유통을 실현해 나갑니다.</h5>
                  <p className="blog_info">
                    좋은 먹거리는 깨끗한 환경에서, 좋은 상품은 생산자에게
                    합리적인 유통 구조에서 시작되기에 마켓컬리는 환경, 상품,
                    사람의 선순환을 이루는 지속 가능한 유통을 고민합니다. 지속
                    가능한 상품 선정부터 생산자와의 동반 성장, 친환경 포장재
                    개발, 사회에 대한 기여까지 장기적으로 소비자와 생산자
                    모두에게 옳은 일을 하기 위해 노력합니다.
                  </p>
                  <a href="#">
                    지속 가능한 유통 더 알아보기{" "}
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
              <div className="media">
                <div className="media-left">
                  <img
                    src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/blog6.jpg"
                    alt=""
                  />
                </div>
                <div className="media-body">
                  <h5>6. 함께 변화를 주도하고 새로운 기회를 만듭니다.</h5>
                  <p className="blog_info">
                    컬리는 최고의 인재들이 모여 산업을 바꾸고 이를 통해 가치를
                    창출하는 것이 기업의 존재 이유임을 믿습니다. 오늘의 작은
                    문제들을 넘겨보지 않고, 주도적으로 문제를 해결해나가며
                    컬리와 함께 의미있는 변화를 이끌어나갈 당신을 기다립니다.
                  </p>
                  <a href="#">
                    컬리의 인재상 더 알아보기{" "}
                    <i className="fa fa-external-link" aria-hidden="true"></i>
                  </a>
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
  };
}
function mapDispatchProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchProps)(HeadhunterDescriptionComponent);
