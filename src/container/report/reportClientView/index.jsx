import React, { useState } from "react";
import SubHeader from "../../../components/subHeader";
import Popover from "@mui/material/Popover";
import DropdownList from "../../../components/dropdowns/dropdownList";
import HourlyProjects from "./hourlyProjcts";
import OfficewrokProjects from "./officewrokProjects";
import FreeContracts from "./freeContracts";
import MilestoneProjects from "./milestoneProjects";
import ContestProjects from "./contestProjects";
import DateRangePicker from "../../../components/dateRangePicker";
import "../report.scss";

const typeList = [
  { value: "01", text: "Hourly Projects" },
  { value: "02", text: "Free Contracts" },
  { value: "03", text: "Milestone Projects" },
  { value: "04", text: "Contest Projects" },
  { value: "05", text: "Officework Projects" },
];

function ReportClientView(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState("Hourly Projects");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedByPopoverContent = () => {
    return (
      <div
        className="popover-wapper"
        onClick={() => {
          setAnchorEl(null);
        }}
      >
        {typeList.map((item, index) => {
          return (
            <li onClick={() => setType(item.text)} key={index}>
              {item.text}
            </li>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <SubHeader />
      <section
        className="card_sec reports-wrapper"
        style={{ minHeight: "100vh" }}
      >
        <div className="bcknd_container">
          <div className="row">
            <div className="col-lg-2 col-md-12"></div>
            <div className="col-lg-8 col-md-12">
              <div className="project_post reports-content-wrapper">
                <div className="report-header row no-margin">
                  <div className="col-md-6 no-padding">
                    <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/document.svg"} alt="document" />
                    <span>Weekly Summary</span>
                  </div>
                  <div className="col-md-6 no-padding">
                    <DateRangePicker />
                  </div>
                </div>
                <div className="report-content">
                  <img src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/time.svg"} alt="time-icon" />
                  <span>{type ? type : "Hourly Projects"}</span>
                  <img
                    src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/dropdown.svg"}
                    alt="time-icon"
                    className="ml-5 reponsive"
                    onClick={handleClick}
                  />
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    {selectedByPopoverContent()}
                  </Popover>
                </div>
                {type === "Hourly Projects" && <HourlyProjects />}
                {type === "Free Contracts" && <FreeContracts />}
                {type === "Milestone Projects" && <MilestoneProjects />}
                {type === "Officework Projects" && <OfficewrokProjects />}
                {type === "Contest Projects" && <ContestProjects />}
              </div>
            </div>
            <div className="col-lg-2 col-md-12"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReportClientView;
