import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "../report.scss";

const tableData = [
  {
    title: "ReactJs developer USA",
    day1: "4:10",
    day2: "2nd milestone US$400.00",
    day3: "",
    day4: "",
    day5: "",
    day6: "",
    day7: "3nd milestone US$400.00",
    hours: "8:20",
    fees: "-US$100.00",
    earning: "US$300.00",
  },
  {
    title: "ReactJs developer South Korea",
    day1: "",
    day2: "3nd milestone US$400.00",
    day3: "4:10",
    day4: "",
    day5: "",
    day6: "",
    day7: "3nd milestone US$400.00",
    hours: "8:20",
    fees: "-US$100.00",
    earning: "US$300.00",
  },
];

const dummyImage =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";

function MilestoneProjects(props) {
  return (
    <>
      <div className="">
        <table className="table table-responsive">
          <thead>
            <tr className="table-header">
              <th scope="col"></th>
              <th scope="col">Tue 11/1</th>
              <th scope="col">Sat 11/1</th>
              <th scope="col">Fees</th>
              <th scope="col">Pending <i class="fa fa-question-circle" aria-hidden="true"></i></th>
            </tr>
          </thead>
          <tbody>
            {tableData &&
              tableData.length > 0 &&
              tableData.map((item, index) => {
                return (
                  <tr
                    className={`v-center ${
                      index === tableData.length - 1 ? "separator" : ""
                    }`}
                  >
                    <td className="fix-width flex-center">
                      <Avatar alt="user1" src={dummyImage} />
                      <span className="ml-2">{item.title}</span>
                    </td>
                    <td>{item.day2}</td>
                    <td>{item.day7}</td>
                    <td className="fix-width-small highlight-text">
                      {item.fees}
                    </td>
                    <td className="fix-width-small">{item.earning}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="row no-margin total-content-wrapper">
          <div className="col-md-6 col-2 no-padding">Total</div>
          <div className="col-md-6 col-10 no-padding">
            <div className="total-content">
              <span className="highlight-text">-US$100.00</span>
              <span className="fix-width-small">-US$300.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MilestoneProjects;
