import React from "react";
import Heading from "../../components/jobOffers/heading";

import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import "./jobOffers.scss";
export default function ApplyJob(props) {
  return (
    <section className="card_sec">
      <div className="bcknd_container">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="project_post work_card">
              <Heading heading="JOB APPLY" icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/jobIcon.png"} />
              <div className="input_proposal_area">
                <input
                  type="text"
                  placeholder="Title"
                />
                <textarea
                  name="textarea"
                  rows="8"
                  placeholder="Write a content"
                ></textarea>
                <div className="checkbox_area_for_mile_stone_bid">
                  <input type="checkbox" />
                  <label>Link up with my profile</label>
                </div>
                <div className="proposal_submit_area">
                  <button>Offer</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <RightTop />
            <RightBottom />
          </div>
        </div>
      </div>
    </section>
  );
}
