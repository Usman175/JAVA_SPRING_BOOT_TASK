import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { Icon } from "./assets/PayPalInfo_Card.svg";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

function PaymentMethodSec() {
  const classes = useStyles();

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  return (
    <>
      {/* Balance Due */}
      <Grid container spacing={2} className={classes.paymentMethodGridMobile}>
        <Grid item xs={2} sm={1}>
          <img
            style={{ width: "18px" }}
            alt="heading icon"
            src={require("./assets/account_balance_cost_money.svg")}
          />
        </Grid>
        <Grid item container xs={10} sm={11} style={{ padding: "0" }}>
          <Grid item={12} container justifyContent="space-between">
            <Grid item={12} style={{ alignSelf: "center" }}>
              <Typography className={classes.paymentHeading}>
                 {languageType.BALANCE_DUE} 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={12}>
          <Grid
            item={12}
            container
            justifyContent="space-between"
            className={classes.paymentMethod_responsive}
          >
            <Grid item={10} style={{ alignSelf: "center" }}>
              <Typography
                className={classes.paymentText}
                style={{ marginLeft: "5px" }}
              >
                Your balance due is $0.00
              </Typography>
            </Grid>
            <Grid Grid item={2} style={{ alignSelf: "center" }}>
              <button
                type="button"
                className={`btn btn-outline-dark ${classes.payNow_button}`}
                color="primary"
              >
                Pay Now
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="customer-grid-top-margin">
          <Divider
            className={`${classes.paymentMethodHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
          />
        </Grid>
      </Grid>

      {/* Receiving Bank Account */}
      <Grid container spacing={2} className={classes.paymentMethodGridMobile}>
        <Grid item xs={2} sm={1}>
          <img
            style={{ width: "18px" }}
            alt="receiving_bank icon"
            src={require("./assets/receiving_banking.svg")}
          />
        </Grid>
        <Grid item container xs={10} sm={11} style={{ padding: "0" }}>
          <Grid item={12} container justifyContent="space-between">
            <Grid item={12} style={{ alignSelf: "center" }}>
              <Typography className={classes.paymentHeading}>
                {languageType.RECEIVING_BANK_ACCOUNT} 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={12}>
          <Grid
            item={12}
            container
            justifyContent="space-between"
            className={classes.paymentMethod_responsive_paypal}
          >
            <Grid
              item={12}
              className={classes.paymentMethod_margin_paypal}
              style={{ alignSelf: "center", display: "flex" }}
            >
              <img
                alt="receiving_bank icon"
                src={require("./assets/paypal.png")}
              />
              <Typography className={classes.paymentText}>
                Your balance due is $0.00
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="customer-grid-top-margin">
          <Divider
            className={`${classes.paymentMethodHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
          />
        </Grid>
      </Grid>

      {/* Payment Method Section */}
      <Grid container spacing={2} className={classes.paymentMethodGridMobile}>
        <Grid item xs={2} sm={1}>
          <img
            style={{ width: "22px" }}
            alt="Mastercard_ icon"
            src={require("./assets/payment_method.svg")}
          />
        </Grid>
        <Grid item container xs={10} sm={11} style={{ padding: "0" }}>
          <Grid item={12} container justifyContent="space-between">
            <Grid item={12} style={{ alignSelf: "center" }}>
              <Typography className={classes.paymentHeading}>
                {languageType.PAYMENT_METHOD}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={10} sm={11}>
          <Grid item={12} container justifyContent="space-between">
            <Grid item={12} style={{ alignSelf: "center" }}>
              <Typography className={classes.paymentTextMaster}>
                Your primary billing method is used all recurring payments
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={12}>
          <Grid
            item={12}
            container
            justifyContent="space-between"
            className={classes.paymentMethod_responsive}
          >
            <Grid
              item={10}
              style={{ alignSelf: "center" }}
              className={classes.MasterCardSvg_ending}
            >
              <img
                alt="Mastercard icon"
                className={classes.MasterCardSvg_Mobile}
                src={require("./assets/Mastercard_.svg")}
              />
              <Typography className={classes.paymentTextMasterEnding}>
                Mastercard ending in 8989
              </Typography>
            </Grid>
            <Grid item={2} style={{ alignSelf: "center", display: "flex" }}>
              <button
                type="button"
                className={`btn btn-outline-dark ${classes.payNow_button}`}
                color="primary"
              >
                Edit
              </button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={10} sm={11}>
          <Grid item={12} container justifyContent="space-between">
            <Grid item={12} style={{ alignSelf: "center" }}>
              <Typography className={classes.paymentTextMaster}>
                You need a primary billing method when you have active contracts
                or a balance due. to remove this one, set a new primary billing
                method first
              </Typography>
              <br />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="customer-grid-top-margin">
          <Divider
            className={`${classes.paymentMethodHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentMethodSec;

const useStyles = makeStyles((theme) => ({
  paymentHeading: {
    textAlign: "left",
    font: "normal normal normal 16px/21px Roboto",
    fontSize: "16px",
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    marginLeft: "-20px",
    "@media(max-width: 600px)": {
      marginLeft: "0",
    },
  },
  paymentMethodGridMobile: {
    padding: 0,
    "@media(max-width: 595px)": {
      padding: "0 0 0 3px",
    },
  },
  paymentText: {
    textAlign: "left",
    font: "normal normal normal 14px/19px Roboto",
    fontSize: "14px",
    marginLeft: "-10px",
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
  },
  paymentTextMasterEnding: {
    textAlign: "left",
    font: "normal normal normal 14px/19px Roboto",
    fontSize: "14px",
    marginLeft: "-10px",
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    "@media(max-width: 395px)": {
      fontSize: "12px",
    },
  },
  paymentTextMaster: {
    textAlign: "left",
    font: "normal normal normal 14px/19px Roboto",
    fontSize: "14px",
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    paddingLeft: "10px",
    "@media(max-width: 600px)": {
      paddingLeft: "3px",
    },
  },
  MasterCardSvg_ending: {
    display: "flex",
    justifyContent: "space-around",
    width: "35%",
    marginLeft: "-10px",
    "@media(max-width: 600px)": {
      width: "72%",
    },
    "@media(max-width: 390px)": {
      width: "66%",
      marginLeft: "0",
    },
    "@media(max-width: 330px)": {
      width: "76%",
      marginLeft: "0",
    },
  },
  MasterCardSvg_Mobile: {
    "@media(max-width: 390px)": {
      marginRight: "10px",
    },
    "@media(max-width: 330px)": {
      marginRight: "20px",
    },
  },
  payNow_button: {
    padding: "0 20px !important",
    background: "#F8F8F8 0% 0% no-repeat paddingBox !important",
    width: "110px",
    height: "26px",
    color: "#000 !important",
    borderRadius: "21px",
    font: "normal normal normal 12px/16px Roboto",
    letterSpacing: 0,
    color: "#131212",
    opacity: 1,
    "@media(max-width: 600px)": {
      margin: "10px 0 !important",
      width: "100px",
    },
    "@media(max-width: 390px)": {
      margin: "10px 0 !important",
      width: "90px",
    },
  },
  paymentMethodHr: {
    color: "#B7B7B7",
    height: 2,
    margin: "25px 0 !important",
    width: "100%",
    "@media(max-width: 590px)": {
      height: 1.5,
      margin: "30px 0 !important",
    },
  },
  paymentMethod_responsive: {
    "@media(max-width: 600px)": {
      display: "flex",
      flexDirection: "row",
    },
  },
  paymentMethod_responsive_paypal: {
    padding: "12px 0",
    "@media(max-width: 600px)": {
      display: "flex",
    },
  },
  paymentMethod_margin_paypal: {
    marginLeft: "-20px",
  },
}));
