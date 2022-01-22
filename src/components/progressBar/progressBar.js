import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 8,
    borderRadius: 5,
    width: 197,
    overflow: "hidden",
    border: "1px solid  #0d2146",
    transition: "5s ease-out",
    transitionDelay: "2s",
    "@media(max-width: 855px) and (min-width: 695px)": {
      width: 172,
    },
    "@media(max-width: 395px)": {
      width: 157,
    },
    "@media(max-width: 378px)": {
      width: 147,
    },
    "@media(max-width: 335px)": { // iphone 5se
      width: 140,
    },
    "@media(max-width: 299px)": { // galaxy fold 5se
      width: 120,
    },
  },
  colorPrimary: {
    backgroundColor: "white",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#0d2146",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {},
});

export default function CustomizedProgressBars({ Milestone }) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);
  const [progress1, setProgress1] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress > 50) {
          return oldProgress;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
      setProgress1((oldProgress) => {
        if (oldProgress > 100) {
          return oldProgress;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 250);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <BorderLinearProgress
        variant="determinate"
        value={Milestone === "paid" ? progress : progress1}
      />
      {/* <p className={classes.ProjectCompletedText}>Project Completed</p> */}
    </div>
  );
}
