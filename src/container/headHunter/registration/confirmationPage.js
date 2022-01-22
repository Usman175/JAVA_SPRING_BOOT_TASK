import React from "react";
import Heading from "../../../components/freelancerCreation/heading";
import "./headHunter.scss";

export default function ConfirmationPage(props) {
  return (
    <div>
      <section className="card_sec" style={{ padding: "0px" }}>
        {/* <div className="bcknd_container">
            <div className="row">
              <div className="col-xl-9 col-lg-12 col-md-12">
                <div className="project_post "> */}
        <Heading heading={"Confirmation"} step={"6"} shadow={true} />
      </section>
      <div class="post_form">
        {/* <div class="save_cancel" style={{marginTop:'200px'}}>
                <button type="submit"class="btn outline_btn">Confirm</button>
                <button onClick={()=>props.handleCreateClientAccount()} class="btn outline_btn">Back</button>
            </div> */}
        <div className="confirmation-step-img-area">
          <center>
            {" "}
            <img
              src={
                "https://dhihitu47nqhv.cloudfront.net/icons/cloud_confirm.svg"
              }
            />
          </center>
          <h3>Thank you for registration</h3>
        </div>
        <div
          className="create-freelancer-bottom-steps"
          style={{ marginTop: "100px" }}
        >
          <button
            onClick={() => {
              props.handleBack("HeaderHunterRegistration");
              window.scrollTo({
                top: "0",
                behavior: "smooth",
              });
            }}
            className="create-freelancer-bottom-steps-back"
          >
            Back
          </button>
          <button className="create-freelancer-bottom-steps-skip">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
