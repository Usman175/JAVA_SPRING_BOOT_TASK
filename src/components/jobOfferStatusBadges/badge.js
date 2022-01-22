import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Badge({ label, icon, styleChip }) {
  const classes = useStyles();
  return (
    <Chip
      label={label}
      className={classes.chip}
      style={styleChip}
      icon={icon}
    />
  );
}

export default Badge;

const useStyles = makeStyles((theme) => ({
  chip: {
    marginLeft: "100px",
    height: "27px",
    padding: "10px",
  },
}));
