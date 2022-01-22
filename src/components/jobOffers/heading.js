import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Heading({ heading, icon, active }) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} sm={1}>
        <img src={icon} height="60" alt="heading icon" />
      </Grid>
      <Grid item container xs={10} sm={11}>
        <Grid item={12} container justifyContent="space-between">
          <Grid item={12} style={{ alignSelf: "center" }}>
            <Typography
              style={{ fontWeight: "700" }}
              className={classes.heading}
            >
              {heading}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="customer-grid-top-margin">
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
    font: "normal normal bold 18px/18px Roboto",
    letterSpacing: "0px",
    color: "#669900",
    opacity: 1,
  },
  hr: {
    color: "#B7B7B7",
    height: 2,
    marginBottom: 10,
    width: "100%",
  },
}));
