import React from "react";
import Heading from "../../../components/postProject/heading";
import "./createFreelancer.scss";
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
        <Heading heading={"Confirmation"}     icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/post_sticky.svg"}
                    color="#333333"
                    fontSize="26px"
                    fontWeight="600"
                    fontFamily="Raleway" />
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
              if(new URLSearchParams(props.location.search).get(
                "type"
              )==="update"){
                 props.history.push(`/freelancer-profile/${props.userId}`)
              }else{
                props.history.push("/");
                dispatch(updateRegisteredUserFlag({
                  type: "isRegisterAsFreelancer",
                  flag: true,
                }))
                dispatch(setActiveUserType("Freelancer"))
              }
             
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
