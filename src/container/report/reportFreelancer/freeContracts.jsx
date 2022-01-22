import React, { useState } from "react";
import "../report.scss";

const tableData = [
  {
    title: "ReactJs developer USA",
    day1: [{ value: "100%" }, { value: "" }, { value: "Sub" }],
    day2: [{ value: "" }, { value: "4:10" }, { value: "" }],
    day3: [{ value: "" }, { value: "4:10" }, { value: "" }],
    day4: [{ value: "" }, { value: "" }, { value: "" }],
    day5: [{ value: "" }, { value: "" }, { value: "" }],
    day6: [{ value: "" }, { value: "" }, { value: "" }],
    day7: [{ value: "" }, { value: "" }, { value: "8:20" }],
    hours: [{ value: "5days/95%" }, { value: "8:20" }, { value: "5days/95%" }],
    earning: [
      { value: "US$300.00" },
      { value: "US$300.00" },
      { value: "US$300.00" },
    ],
  },
  {
    title: "ReactJs developer South Korea",
    day1: [{ value: "100%" }, { value: "" }, { value: "Sub" }],
    day2: [{ value: "" }, { value: "4:10" }, { value: "" }],
    day3: [{ value: "" }, { value: "4:10" }, { value: "" }],
    day4: [{ value: "" }, { value: "" }, { value: "" }],
    day5: [{ value: "" }, { value: "" }, { value: "" }],
    day6: [{ value: "" }, { value: "" }, { value: "" }],
    day7: [{ value: "" }, { value: "" }, { value: "8:20" }],
    hours: [{ value: "5days/95%" }, { value: "8:20" }, { value: "5days/95%" }],
    earning: [
      { value: "US$300.00" },
      { value: "US$300.00" },
      { value: "US$300.00" },
    ],
  },
];

function FreeContracts(props) {
  return (
    <>
      <div className="">
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
              <th scope="col">days/Ratio Hours</th>
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
                    <td className="fix-width flex">{item.title}</td>
                    <td className="sub-fields">
                      {item.day1.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day1.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.day2.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day2.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.day3.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day3.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.day4.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day4.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.day5.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day5.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.day6.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day6.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.day7.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.day7.length - 1 ? "last-child" : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.hours.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.hours.length - 1
                                ? "last-child"
                                : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                    <td className="sub-fields">
                      {item.earning.map((data, index) => {
                        return (
                          <div
                            className={`${
                              index === item.earning.length - 1
                                ? "last-child"
                                : ""
                            }`}
                          >
                            {data.value}
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="row no-margin total-content-wrapper">
          <div className="col-md-6 col-2 no-padding">Total</div>
          <div className="col-md-6 col-10 no-padding">
            <div className="total-content">
              <span>8:20</span>
              <span>5days/95%</span>
              <span className="fix-width-small">-US$300.00</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FreeContracts;
