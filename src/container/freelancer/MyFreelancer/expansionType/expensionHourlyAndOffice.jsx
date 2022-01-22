import React, { Component } from "react";

class ExpensionHourlyAndOffice extends Component {
  render() {
    return (
      <>
        <div className="terms_box">
          <div className="myContest">
            <div className="work_date save_cancel">
              <span>Terms</span>
            </div>
            <div className="hourly_rate">
              <div className="d-flex align-items-center">
                <label className="titleBold">Location : </label>
                <span>unit 234, Medi Street, Vitoria Australia</span>
              </div>
              <div className="d-flex align-items-center">
                <label className="titleBold">Attendance : </label>
                <span>3 days per wee</span>
              </div>
              <div className="d-flex align-items-center">
                <label className="titleBold">Equipment : </label>
                <span>Provided by project owner</span>
              </div>
              <div className="d-flex align-items-center">
                <label className="titleBold">Weekend Rate : </label>
                <span>Saturday: 150% </span>
                <span>Sundady: 200%</span>
              </div>
            </div>
          </div>
          <div className="work_date">
            <a title="">
              <i className="fa fa-angle-left" aria-hidden="true"></i>
            </a>
            <span>13th April ~ 18th April 2020</span>
            <a title="">
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="week_tbl">
            <table className="table text-center">
              <thead>
                <tr>
                  <th className="text-left" scope="col">
                    3/7
                  </th>
                  <th scope="col">Mon</th>
                  <th scope="col">Tue</th>
                  <th scope="col">Wed</th>
                  <th scope="col">Thur</th>
                  <th scope="col">Fri</th>
                  <th scope="col" className="red_text">
                    Sat
                  </th>
                  <th scope="col" className="red_text">
                    Sun
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left"></td>
                  <td>13/4</td>
                  <td>13/4</td>
                  <td>13/4</td>
                  <td>13/4</td>
                  <td>13/4</td>
                  <td>13/4</td>
                  <td>13/4</td>
                </tr>
                <tr>
                  <td className="text-left">Sonny</td>
                  <td>
                    <span className="green_dot"></span>
                  </td>
                  <td></td>
                  <td>
                    <span className="green_dot"></span>
                  </td>
                  <td></td>
                  <td>
                    <span className="green_dot"></span>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default ExpensionHourlyAndOffice;
