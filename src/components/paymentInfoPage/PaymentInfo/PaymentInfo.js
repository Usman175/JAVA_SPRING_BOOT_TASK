import React, { useState } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import PaymentMethodSec from "./PaymentMethodSec";
import AdditionalPayment from "./AdditionalPayment";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

function PaymentInfo(props) {
  const [isBankAccountAdded, setIsBankAccountAdded] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
  );
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://my-site.com/order/123/complete",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const handleRedirect = () => {
    let currentUrl = window.location.href.replace(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ],
      ""
    );
    if (window.location.hostname === "localhost") {
      /*  just for local working */
      window.location.href = `https://www.syncbench.com/#/SetupAccount?callback=${currentUrl}&storeid=HOQF9I`;
      // window.location.href = `http://localhost:8080/#/SetupAccount?callback=${currentUrl}&storeid=HOQF9I`;
    } else {
      window.location.href = `https://www.syncbench.com/#/SetupAccount?callback=${currentUrl}&storeid=HOQF9I`;
    }
  };
  return (
    <>
    {/* {console.log(stripe,props,"stripe")} */}
      <Grid container spacing={2}>
        <Grid item xs={2} sm={1}>
          <img
            style={{ width: "38px" }}
            height="60"
            alt="heading icon"
            src={require("./assets/PayPalInfo_Card.svg")}
          />
        </Grid>
        <Grid item container xs={10} sm={11}>
          <Grid item={12} container justifyContent="space-between">
            <Grid item={12} style={{ alignSelf: "center" }}>
              <Typography className={classes.paymentHeading}>
                {languageType.PAYMENT_INFO}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="customer-grid-top-margin">
          <Divider
            className={`${classes.paymentHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
          />
        </Grid>
      </Grid>
      {isBankAccountAdded ? (
        <>
          <PaymentMethodSec />

          <div className={classes.additionalPayment}>
            <AdditionalPayment />
          </div>
        </>
      ) : (
        <div className={classes.BankAccountNotExistArea}>
        <center>
        <img className={classes.BankAccountNotExistAreaImage} src="https://dhihitu47nqhv.cloudfront.net/icons/bankaccount.svg" />
        <p className={classes.BankAccountNotExistAreaContent} > {languageType.SORRY_NOT_REGISTERED_ACCOUNT} </p>
          <div onClick={handleRedirect} className={classes.BankAccountNotExistAreaLink}> {languageType.CLICK_HERE_TO_SETUP} </div>
          </center>
        </div>
      )}
    </>
  );
}

export default PaymentInfo;

const useStyles = makeStyles((theme) => ({
  paymentHeading: {
    textAlign: "left",
    font: "normal normal normal 20px/26px Roboto",
    fontSize: "20px",
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    padding: "10px 8px",
  },
  additionalPayment: {
    padding: "10px 0 0 50px",
    width: "100%",
    "@media(max-width: 700px)": {
      padding: "10px 0 0 0px",
    },
  },
  paymentHr: {
    color: "#B7B7B7",
    height: 2,
    margin: "15px 0 !important",
    width: "100%",
    "@media(max-width: 700px)": {
      height: 1.5,
      margin: "30px 0 !important",
    },
  },
  BankAccountNotExistArea: {
    height: "100vh",
    width: "100%",
    paddingTop: "80px",
  },
  BankAccountNotExistAreaContent: {
    maxWidth: "45ch",
    textAlign: "left",
  },
  BankAccountNotExistAreaImage: {
    width: "100px",
    marginBottom: "30px",
  },
  BankAccountNotExistAreaLink: {
    cursor: "pointer",
    marginTop: "25px",
    fontWeight: "500",
  },
}));
