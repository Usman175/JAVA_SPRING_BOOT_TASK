import React from "react";
import Heading from "../../../components/freelancerCreation/heading";
import "./clientRegistration.scss";
import { useDispatch } from "react-redux";
import {
  setActiveUserType,
  updateRegisteredUserFlag,
} from "../../../store/action/action";
export default function ConfirmationPage(props) {
  const dispatch=useDispatch()
  return (
    <div>
      <section className="card_sec" style={{ padding: "0px" }}>
        <Heading heading={"Confirmation"} step={"3"} shadow={true} />
      </section>
      <div class="post_form">
        <div className="confirmation-step-img-area">
          <center>
            {" "}
            <img
              className="customer-image-animation"
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
              props.history.push("/");
              dispatch(updateRegisteredUserFlag({
                type: "isRegisterAsClient",
                flag: true,
              }))
              dispatch(setActiveUserType("Client"))
          
            }}
            className="create-freelancer-bottom-steps-skip"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
