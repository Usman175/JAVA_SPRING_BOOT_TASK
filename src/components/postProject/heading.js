import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./postProject.scss";
function Heading({
  heading,
  icon,
  active,
  step,
  shadow,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  marginTop,
  nonBorder
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={`${classes.container} "step-heading-main"`}>
      <Grid item container xs={2} sm={1} md={1}>
        {step ? (
          <div className="step-prefix-label">{step}</div>
        ) : (
          <img
            style={{ marginTop: marginTop ? marginTop : "" }}
            src={icon}
            height="38"
          />
        )}
      </Grid>
      <Grid item container xs={10}>
        <Grid item={12} container justifyContent="space-between">
          <Grid item={12}>
            <Typography
              className={`${classes.heading} step-heading-adjustment`}
              style={{
                color: color ? color : "",
                fontSize: fontSize ? fontSize : "",
                fontWeight: fontWeight ? fontWeight : "",
                fontFamily: fontFamily ? fontFamily : "",
              }}
            >
              {heading}
              {shadow ? <span className="step-heading-shadow"></span> : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid hidden={nonBorder?true:false} item className="step-divider-adjustment" xs={12}>
        <Divider
          className={`${classes.hr} mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3 mt-xs-0`}
        />
      </Grid>
    </Grid>
  );
}

export default Heading;

const useStyles = makeStyles((theme) => ({
  container:{
    "@media(max-width: 505px)": { 
      alignItems: "center !important",
    },
  },
  heading: {
    textAlign: "left",
    font: "normal normal 600 22px/29px Roboto",
    letterSpacing: "0px",
    color: "#669900",
    opacity: 1,  
    "@media(max-width: 505px)": {
      fontSize: '18px !important',    
    },
    "@media(max-width: 395px)": {
      fontSize: '16px !important',  
    },
    "@media(max-width: 335px)": {
      fontSize: '16px !important',  
    },
    "@media(max-width: 300px)": {
      fontSize: '13px !important',  
    },
  },
  hr: {
    color: "#B7B7B7",
    height: 2,
    marginBottom: 25,
    width: "96%",
    marginTop:'1.5rem',
    "@media(max-width: 795px) and (min-width: 605px)": { 
      width: "98.5%",
    },
    "@media(max-width: 505px)": { 
      marginTop:'0.2rem',
    },
  },
}));
