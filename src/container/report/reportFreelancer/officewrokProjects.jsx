import React, { useState } from "react";
import "../report.scss";

const tableData = [
  {
    title: "ReactJs developer USA",
    day1: "4:10",
    day2: "",
    day3: "",
    day4: "",
    day5: "",
    day6: "",
    day7: "",
    days: "3d/75%",
    fees: "-US$100.00",
    earning: "US$300.00",
  },
  {
    title: "ReactJs developer South Korea",
    day1: "",
    day2: "4:10",
    day3: "4:10",
    day4: "",
    day5: "",
    day6: "",
    day7: "",
    days: "3d/75%",
    fees: "-US$100.00",
    earning: "US$300.00",
  },
];
function OfficewrokProjects(props) {
  return (
    <>
      <div className="OfficeWorkProjectWrapper_pc">
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
              <th scope="col">Days</th>
              <th scope="col">Fees</th>
              <th scope="col">pending</th>
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
                    <td className="fix-width">{item.title}</td>
                    <td>{item.day1}</td>
                    <td>{item.day2}</td>
                    <td>{item.day3}</td>
                    <td>{item.day4}</td>
                    <td>{item.day5}</td>
                    <td>{item.day6}</td>
                    <td>{item.day7}</td>
                    <td>{item.days}</td>
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
              <span>3d/75%</span>
              <span className="highlight-text">-US$100.00</span>
              <span className="fix-width-small pr-0">-US$300.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OfficewrokProjects;
