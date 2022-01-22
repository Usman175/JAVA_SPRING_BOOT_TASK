import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./freelancerCreation.scss";
function Heading({ heading, icon, active, step, shadow, iconFlag }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className="step-heading-main">
      <Grid item xs={2} sm={1}>
        <center>
          {" "}
          {step ? (
            <div className="step-prefix-label">{step}</div>
          ) : (
            <img src={icon} height="34" />
          )}
        </center>
      </Grid>
      <Grid item container xs={10} sm={11}>
        <Grid item={12} container justifyContent="space-between">
          <Grid item={12}>
            {iconFlag ? <img src={icon} height="40" /> : ""}
            <Typography
              className={`${classes.heading} step-heading-adjustment`}
            >
              {heading}
              {shadow ? <span className="step-heading-shadow"></span> : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider
          className={`${classes.hr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
        />
      </Grid>
    </Grid>
  );
}

export default Heading;

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "left",
    font: "normal normal 500 22px/29px Roboto",
    letterSpacing: "0px",
    color: "#669900",
    opacity: 1,
    "@media(max-width: 505px)": {
      font: "normal normal 500 18px/22px Roboto",
    },
    "@media(max-width: 395px)": {
      font: "normal normal 500 16px/22px Roboto",
      margin: '10px 8px 0 8px',
    },
    "@media(max-width: 335px)": {
      font: "normal normal 500 15px/22px Roboto", 
    },
    "@media(max-width: 300px)": {
      font: "normal normal 500 13px/10px Roboto",
      margin: '10px 0px 0 12px',
    },
  },
  hr: {
    color: "#B7B7B7",
    height: 2,
    marginBottom: 25,
    width: "96%",
  },
}));
