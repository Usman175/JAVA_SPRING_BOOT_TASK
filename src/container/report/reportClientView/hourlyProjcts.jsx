import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import "../report.scss";


const dummyImage =
  "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png";

const tableData = [
  {
    title: "ReactJs developer USA",
    day1: "4:10",
    day2: "4:10",
    day3: "",
    day4: "",
    day5: "",
    day6: "",
    day7: "",
    hours: "8:20",
    earning: "US$300.00",
  },
  {
    title: "ReactJs developer South Korea",
    day1: "4:10",
    day2: "4:10",
    day3: "",
    day4: "",
    day5: "",
    day6: "",
    day7: "",
    hours: "8:20",
    earning: "US$300.00",
  },
];

function HourlyProjects(props) {
  return (
    <>
      <div className="HourlyProjectWrapper_pc">
        <table className="table table-responsive">
          <thead>
            <tr className="table-header">
              <th scope="col"></th>
              <th scope="col">Mon 11/1</th>
              <th scope="col">Tue 11/1</th>
              <th scope="col">Wed 11/1</th>
              <th scope="col">Thu 11/1</th>
              <th scope="col">Fri 11/1</th>
              <th scope="col">Sat 11/1</th>
              <th scope="col">Sun 11/1</th>
              <th scope="col">Hours</th>
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
                    <td>{item.day1}</td>
                    <td>{item.day2}</td>
                    <td>{item.day3}</td>
                    <td>{item.day4}</td>
                    <td>{item.day5}</td>
                    <td>{item.day6}</td>
                    <td>{item.day7}</td>
                    <td>{item.hours}</td>
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
              <span>16:40</span>
              <span className="fix-width-small">-US$300.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HourlyProjects;
