import React, { useState } from "react";
import "../report.scss";

const tableData = [
  {
    title: "ReactJs developer USA",
    day1: "4:10",
    day2: "",
    day3: "",
    day4: "1st Winner Award US$400.00",
    day5: "",
    day6: "",
    day7: "",
    hours: "8:20",
    fees: "-US$100.00",
    earning: "US$300.00",
  },
  {
    title: "ReactJs developer South Korea",
    day1: "",
    day2: "4:10",
    day3: "4:10",
    day4: "2st Winner Award US$400.00",
    day5: "",
    day6: "",
    day7: "",
    hours: "8:20",
    fees: "-US$100.00",
    earning: "US$300.00",
  },
];

function ContestProjects(props) {
  return (
    <>
      <div className="">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th scope="col"></th>
                <th scope="col">Thu 11/1</th>
                <th scope="col">
                  Pending{" "}
                  <i class="fa fa-question-circle" aria-hidden="true"></i>
                </th>
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
                      <td>{item.day4}</td>
                      <td className="fix-width-small">{item.earning}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="row no-margin total-content-wrapper">
          <div className="col-md-6 col-2 no-padding">Total</div>
          <div className="col-md-6 col-10 no-padding">
            <div className="total-content">
              <span className="fix-width-small">-US$300.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContestProjects;
