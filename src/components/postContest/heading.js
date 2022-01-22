import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Heading({ heading, icon }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item>
        <img src={icon} height="30" />
      </Grid>
      <Grid item>
        <Typography className={classes.heading}>{heading}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.hr} />
      </Grid>
    </Grid>
  );
}

export default Heading;

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "left",
    font: "normal normal bold 22px/29px Roboto",
    letterSpacing: "0px",
    color: "#669900",
    opacity: 1,
  },
  hr: {
    color: "#B7B7B7",
    height: 2,
    marginBottom: 25,
  },
}));
