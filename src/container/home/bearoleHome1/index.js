import React, { useEffect, useState } from "react";
import "./bearoleHome1.scss";
import "./css/custom.css";
import { connect } from "react-redux";
import NotifyModal from "../../../components/notifyModal";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_FOOTER_SETTINGS } from "../../../store/constants/constant.js";
import AOS from "aos";
import "aos/dist/aos.css";
import IconBar from "../bearoleIconBar";

AOS.init({
  duration: 1200,
});

function BearoleHome(props) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  useEffect(() => {
    dispatch({ type: TOGGLE_FOOTER_SETTINGS, data: "" });
  }, []);
  return (
    <div className="bearole-home content-main-lg content-main-xs">
      <div className="bearole-home-container" id="header">
        <div className="bearole-home-container-header">
          <IconBar />
        </div>
      </div>
      <section className="banner_sec position-relative">
        <div class="bcknd_container_home_page" style={{ marginTop: "0px" }}>
          <div class="row">
            <div
              class="col-md-12 col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div class="banner_text1">
                <h2 class="white_text">
                  <span class="d-flex align-items-start">
                    <span>베어롤은</span>{" "}
                    <img
                      src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/free.svg"
                      className="free-icon-tablet"
                      alt=""
                      style={{ width: "12%" }}
                    />
                  </span>
                  <span class="green_light_text">시간의 가치</span>를 소중히
                  합니다.
                </h2>
                <p class="white_text">
                  개발업무, 디자인, 회계업무, 무역업무등 이제 사무직 전문가를
                  시간제, 일당제, 마일스톤 별로, 또는 프로젝트 별로 고용하세요.
                  팀을 운영하고 필요한 업무를 부여합니다.
                </p>
                <p class="white_text">
                  예상못한 추가 업무를 견적 때문에 어쩔수 없이 품질을 희생하거나
                  <br />
                  <span class="green_light_text">
                    추가비용이 무시되거나 열정페이가 강요되지 않습니다.
                  </span>
                </p>
                <p class="white_text">
                  고객의 입장에선 미안해서 말못하고 품질을 희생하실 필요가
                  없습니다.
                  <br />
                  <span class="green_light_text">
                    요구사항을 더 상세히 또는 변경 요구
                  </span>
                  할수 있어 <span class="green_light_text">WIN WIN</span> 하실수
                  있습니다.
                </p>
                <button
                  onClick={() => setShow(true)}
                  class="btn btn-tablet"
                  type="button"
                >
                  <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/pc.svg" alt="" />
                  데스크탑 다운로드
                </button>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-6 d-none d-lg-block d-xl-block"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div class="design_img">
                <p class="white_text ml-auto">
                  <span class="green_light_text">팀 워크가 필요하시나요?</span>{" "}
                  맞춤형인재를 찾고 프로젝트에
                  <br />
                  내/외부 인력을 동시에 관리할수 있습니다.
                </p>
                <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/bnr_img.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mainPc_sec">
        <div class="bcknd_container" style={{ marginTop: "0px" }}>
          <div class="row align-items-center">
            <div
              class="col-md-5 col-lg-5 design_img1"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <img
                src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/pose09_male.png"
                alt=""
                style={{ width: "60%", marginBottom: "30px" }}
              />
            </div>
            <div
              class="col-md-7 col-lg-7"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <div class="tab_list">
                <h2 class="white_text">
                  시간과 견적때문에 <br className="lineBreak_BearoleHomeMobile" /> 업무 품질을{" "}
                  <span class="green_light_text d-block">희생하시나요?</span>
                </h2>
                <p class="white_text">
                  고객과 업무 목표를 상담하고 합리적인 플랜으로 당당히 가지고
                  있는{" "}
                  <span class="green_light_text">
                    업무 능력을 발휘하실수 있습니다.
                  </span>
                </p>
                <p class="white_text">
                  베어롤이 귀하의 업무를 모니터링하고 고객의 니즈를 위한
                  업무임을 증빙하고 설득하실수 있습니다.
                </p>

                <div class="media cup_media">
                  <div class="media_left">
                    <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/cup.svg" alt="" />
                  </div>
                  <div class="media-body">
                    <p class="white_text">
                      그동안 외주업무에 실망하셨나요?
                      <br />
                      예상못한 추가 업무를 견적 때문에 어쩔수 없이
                      <br />
                      품질을 희생하거나{" "}
                      <span class="green_light_text">
                        추가 비용이 무시되거나 열정페이를 강요하지 않습니다.
                      </span>
                    </p>
                    <p class="white_text">
                      고객의 입장에선 미안해서 말못했던 요구사항을 더{" "}
                      <span class="green_light_text">
                        상세히 또는 변경 요구
                      </span>{" "}
                      할수 있어 <span class="green_light_text">WIN WIN</span>{" "}
                      하실수 있습니다.
                    </p>
                    <p class="white_text">
                      이제는 따뜻한 아메리카노 한잔과 함께 더 좋은 품질을
                      고객에게 제공하실수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="loc_sec" >
        <div class="bcknd_container">
          <div class="row align-items-center">
            <div
              class="col-md-7 col-lg-7"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div class="tab_list OfficeWorkSecMobile" >
                <h2 class="white_text">
                  사무업무도{" "}
                  <span class="green_light_text">가까운 <br className="lineBreak_BearoleHomeMobile" /> 주변에서</span>
                  <br />
                  단시간 장기업무를 <br className="lineBreak_BearoleHomeMobile1" /> 찾으세요.
                </h2>
                <p class="white_text">
                  주말에 투잡을 뛰고 싶은데 너무 멀어 감당이 안되시나요?
                </p>
                <p class="white_text">
                  주변에 많은 사무업무 아르바이트 또는 프로젝트를 베어롤{" "}
                  <span class="green_light_text">위치기반 서비스</span>로 찾을수
                  있습니다.
                </p>
                <p class="white_text">
                  <span class="green_light_text">
                    일당제 사무업무, 시간제 사무업무, 자유계약등을 통해
                  </span>{" "}
                  숨겨진 가치를 발굴하세요.
                </p>
                <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/mouse.svg" alt="" />
              </div>
            </div>
            <div
              class="col-md-5 col-lg-5 text-left mapHomeImg"
              data-aos="fade-up"
              data-aos-duration="1200" 
            >
              <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/map.png" alt=""  />
            </div>
          </div>
        </div>
      </section>
      <section class="msg_sec">
        <div class="bcknd_container" style={{ marginTop: "0px" }}>
          <div class="row align-items-center">
            <div
              class="col-md-5 col-lg-5 malePoseImg"
              data-aos="fade-right"
              data-aos-duration="1200" 
            >
              <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/pose03_male.png" alt="" />
            </div>
            <div
              class="col-md-7 col-lg-7"
              data-aos="fade-up"
              data-aos-duration="1200"  
            >
              <div class="tab_list msg_box">
                <h2 class="white_text">
                  글로벌 업무 수행 경험으로
                  <br className="lineBreak_BearoleHomePc" />
                  <span class="green_text">업무 캐리어</span>를 쌓으세요.
                </h2>
                <div class="media msg_media">
                  <div class="media-body">
                    <p class="white_text">
                      베어롤에 등록된 전문가들이 해외 프로젝트 업무 수주에
                      도움을 드립니다.
                    </p>
                    <p class="white_text">
                      해외의 많은 업체들이 한국의 전문 인력을 필요로 하고
                      있습니다.
                    </p>
                    <p class="white_text">
                      <span class="green_light_text">
                        글로벌 진출을 꿈꾸신다면
                      </span>{" "}
                      미리 경험하면서 업무 캐리어를 쌓을수 있습니다.
                    </p>
                  </div>
                  <div class="media_right">
                    <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/success.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer_sec">
        <div class="container">
          <div class="text-center">
            <a href="#" title="">
              ©Bearole
            </a>
            <a href="#" title="">
              | &nbsp; 한국 파트너 (주) 피엘케이소프트
            </a>
            <a href="#" title="">
              | &nbsp; Syncbench Inc. USA
            </a>
            <a href="#" title="">
              | &nbsp; Terms
            </a>
            <a href="#" title="">
              | &nbsp; English
            </a>
            <a href="#" title="" class="ftrM_l">
              한국어
            </a>
            <a href="#" title="" class="ftrM_l">
              日本語
            </a>
          </div>
        </div>
      </footer>
      <NotifyModal show={show} setShow={setShow} />
    </div>
  );
}

export default BearoleHome;
