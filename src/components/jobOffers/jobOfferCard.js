import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ShowMoreText from "react-show-more-text";

function JobOfferCard({
  logo,
  companyName,
  opportunity,
  description,
  jobOfferMenuItems,
  badge = null,
}) {
  const classes = useStyles();

  return (
    <div className="new-job-offercard">
      <div className="offercard-row">
        <div className="span">
          <img src={logo} alt="" className={classes.image} />
        </div>
        <div className="col">
          <div className={classes.moreDetail}>
            <div className={`${classes.dropDownIcon} dropdown`}>
              <span
                className="dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
              >
                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
              </span>
              {jobOfferMenuItems}
            </div>
          </div>
          <h5 className="new-job-offercard-title">
            {companyName}
            {badge ?? <div className={classes.badge}>{badge}</div>}
          </h5>
          <span className="new-job-offercard-subtitle">{opportunity}</span>
          <ShowMoreText
            lines={2}
            more="show more"
            less={"show less"}
            className={`${classes.description}`}
            anchorClass="view-more-less"
            expanded={false}
          >
            {description}
          </ShowMoreText>
        </div>
      </div>
    </div>
  );
}

export default JobOfferCard;

const useStyles = makeStyles((theme) => ({
  description: {
    maxWidth: "90%",
  },
  moreDetail: {
    position: "absolute",
    right: "0",
    top: "0",
  },
  dropDownIcon: {
    padding: "10px",
  },
  image: {
    width: "61px",
    marginLeft: "20px",
  },
}));
