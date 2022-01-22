import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import "./postProject.scss";

function Label({
  title,
  compulsory,
  question,
  prefixBoxValid,
  prefixBoxInValid,
  primary,
  bold,
  fontSize,
  icon,
  color,
  width,
  marginLeft,
}) {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.Container}>
        <Grid item>
          {icon ? (
            <img
              className="label_icon"
              style={{
                width: width ? width : "",
                marginLeft: marginLeft ? marginLeft : "",
              }}
              src={icon}
            />
          ) : prefixBoxValid || prefixBoxInValid ? (
            prefixBoxValid ? (
              <div className="valid-label-prefix-box"></div>
            ) : (
              <div className="in-valid-label-prefix-box"></div>
            )
          ) : null}
          <label
            style={{
              fontWeight: bold ? "bold" : "",
              fontSize: fontSize ? fontSize : "",
              color: color ? color : "",
            }}
            className={`${classes.label} ${
              primary ? "customer-primary-label" : ""
            }`}
          >
            {title}
          </label>
        </Grid>
        {compulsory && (
          <Grid item className={classes.starWrapper}>
            <span className={classes.star}>*</span>
          </Grid>
        )}
        {question && (
          <Grid item className={classes.starWrapper}>
            <i className="fa fa-question-circle" aria-hidden="true"></i>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default Label;

const useStyles = makeStyles((theme) => ({
  Container: {
    display: "flex",
    alignItems: "center",
    '@media(max-width:855px) and (min-width:505px)':{
        flexWrap: 'wrap !important', 
    },
  },
  label: {
    textAlign: "left",
    font: "normal normal bold 14px/16px Roboto",
    letterSpacing: "0px",
    color: "#707070",
    opacity: 1,
  },
  star: {
    color: "#B51818",
    opacity: 1,
    width: 6,
  },
  starWrapper: {
    margin: "0px 0px 3px 3px",
  },
}));
