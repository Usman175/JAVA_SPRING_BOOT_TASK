import React, { useEffect, useState } from "react";
import SubHeader from "../../components/subHeader";
import CheckboxCard from "../../components/checkboxCard/checkboxCard.jsx";
import PaymentInfo from "../../components/paymentInfoPage/PaymentInfo/PaymentInfo";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
import Skeleton from "../../components/skeleton/skeleton";
import Transaction from "../../components/paymentInfoPage/Transactions/transaction";
import Services from "../../components/paymentInfoPage/Services/services";
import Tax from "../../components/paymentInfoPage/Tax/tax";
import "./paymentInfoPage.scss";

const PaymentInfoPage = (props) => {
  const [paymentInfoStatus, setPaymentInfoStatus] = useState([]);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("Payment Info");

  useEffect(() => {
    const paymentArray = [
      {
        name: "0",
        title: "Payment Info",
        checked: true,
      },
      {
        name: "1",
        title: "Transactions",
        checked: false,
      },
      {
        name: "2",
        title: "Tax",
        checked: false,
      },
      {
        name: "3",
        title: "Services",
        checked: false,
      },
    ];
    setPaymentInfoStatus(paymentArray);
  }, []);

  const onCheckboxChangeHandle = (event, type, index, title) => {
    setIsSkeletonLoading(true);
    const myArr = paymentInfoStatus.map((arr) => {
      if (arr.title === title) {
        arr.checked = true;
      } else {
        arr.checked = false;
      }
      return arr;
    });
    setPaymentInfoStatus(myArr);
    setPaymentStatus(title);
    setIsSkeletonLoading(false);
  };
  return (
    <>
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-lg-2 col-md-12">
              <div className="row ">
                <div className="col-lg-12 job-offer-status-sidebar">
                  <CheckboxCard
                    title=""
                    data={paymentInfoStatus}
                    type="paymentInfoStatus"
                    onChange={onCheckboxChangeHandle}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
              <div
                hidden={isSkeletonLoading}
                className="our_work_hard job-offer-work-hard work_card"
              >
                <div
                  className="row paymentInfoPage_topClass"
                >
                  {isSkeletonLoading ? (
                    <></>
                  ) : paymentStatus === "Payment Info" ? (
                    <PaymentInfo {...props} />
                  ) : paymentStatus === "Transactions" ? (
                    <Transaction />
                  ) : paymentStatus === "Tax" ? (
                    <Tax />
                  ) : (
                    <Services /> 
                  )}
                </div>
                <div
                  className="row"
                  style={{ "margin-left": "0px", "margin-right": "0px" }}
                  hidden={true}
                >
                  <PaymentInfo />
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 job-offer-sidebar">
              {/* <RightTop />
              <RightBottom /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentInfoPage;
