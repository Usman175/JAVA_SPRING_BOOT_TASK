import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";
import notifications from "../../utils/notifications";
import SearchBox from "../timezoneSearchBox";
import {useSelector} from "react-redux";

let timeZones = moment.tz
  .names()
  .filter((tz) =>
    tz.match(
      /^(((Africa|America|Antarctica|Asia|Australia|Europe|Arctic|Atlantic|Indian|Pacific)\/.+)|(UTC))$/
    )
  );

export const AddManualTime = (props) => {
  const history = useHistory();
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    date: "",
    timeZone: "",
    startTime: "",
    endTime: "",
    memo: "",
  });
  const [errorMessage, setErrorMessage] = useState({ date: "" });
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    setTimezones(timeZones);
  }, [timeZones]);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
);
  const handleValidate = () => {
    let formIsValid = true;
    let errorMessage = {};
    if (!data.date) {
      formIsValid = false;
      errorMessage["date"] = languageType.THIS_FIELD_REQUIRED;
    }
    if (!data.timeZone) {
      formIsValid = false;
      errorMessage["timeZone"] = languageType.THIS_FIELD_REQUIRED;
    }
    if (!data.startTime) {
      formIsValid = false;
      errorMessage["startTime"] = languageType.THIS_FIELD_REQUIRED;
    }
    if (!data.endTime) {
      formIsValid = false;
      errorMessage["endTime"] = languageType.THIS_FIELD_REQUIRED;
    }
    if (!data.memo) {
      formIsValid = false;
      errorMessage["memo"] = languageType.THIS_FIELD_REQUIRED;
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  };
  const handleSave =async () => {
    if (handleValidate()) {
      setLoading(true)
      let sessionStartTime = moment(
        new Date(`${data.date} ${data.startTime + ":00"}`),
        "YYYY-MM-DD hh:mm:ss zz"
      )
        .tz(data.timeZone)
        .toISOString();
      let sessionEndTime = moment(
        new Date(`${data.date} ${data.endTime + ":00"}`),
        "YYYY-MM-DD hh:mm:ss zz"
      )
        .tz(data.timeZone)
        .toISOString();
      let obj = {
        userId: props.contractData.userProfile.userId,
        contractId:  props.contractData.projectContractId,
        contractType:props.contractData.project.projectType,
        sessionStartTime: sessionStartTime,
        sessionEndTime: sessionEndTime,
        memo: data.memo,
      };
      let result = await request(
        `${ENDPOINT["AddManualTime"]}`,
        postOptions(obj)
      );
      if (result.success) {
        setLoading(false)
        notifications.showSuccess(languageType.MANUAL_TIME_ADDED)
        return props.handleClose();

      } else {
        setLoading(false)
        notifications.showError(languageType.SOME_ERROR_TRY_AGAIN)
      }
    
      
    }
  };

  const handleChange = (type, e) => {
    setData({ ...data, [type]: e.target.value });
    setErrorMessage({ ...errorMessage, [type]: "" });
  };

  return (
    <>
      <form className="post_form AddManualTime_formLabelMobile" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={data?.date}
                onChange={(e) => handleChange("date", e)}
              />
              {errorMessage.date && (
                <p className="text-danger">{errorMessage.date}</p>
              )}
              {/* <input
                type="text"
                className="form-control"
                // value={this.state.title}
                placeholder="Job Title"
                maxLength="100"
                // onChange={(e) => this.handleChange("title", e)}
              /> */}
              {/* {this.state.errorMessage.title && (
                <p className="text-danger"> {this.state.errorMessage.title} </p>
              )} */}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Timezone</label>
              <SearchBox
                id="timezone"
                name="timezone"
                placeholder="Select timezone"
                value={data?.timeZone}
                selectItem={(value) => {
                  setData({ ...data, timeZone: value });
                  setErrorMessage({ ...errorMessage, timeZone: "" });
                }}
                items={timezones}
              />
              {errorMessage.timeZone && (
                <p className="text-danger">{errorMessage.timeZone}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Start time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={data?.startTime}
                    onChange={(e) => handleChange("startTime", e)}
                  />
                  {errorMessage.startTime && (
                    <p className="text-danger">{errorMessage.startTime}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label>End time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={data?.endTime}
                    onChange={(e) => handleChange("endTime", e)}
                  />
                  {errorMessage.endTime && (
                    <p className="text-danger">{errorMessage.endTime}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <label>Memo</label>
              <textarea
                className="form-control"
                value={data?.memo}
                style={{ height: 38 }}
                onChange={(e) => handleChange("memo", e)}
              />
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-md-6">
                  {errorMessage.memo && (
                    <p className="text-danger">{errorMessage.memo}</p>
                  )}
                </div>
                <div className="col-lg-6 col-sm-6 col-md-6">
                  <p> {1000 - data?.memo?.length + " "}character remaining</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-md-10 col-sm-12 justify-content-right">
            <p>
              Note: Manual time does not quality for Jungle work Hourly
              protection
            </p>
          </div>
        </div>
      </form>
      <div className="save_cancel text-center mb-0 AddManualTime_btnMobile">
        <button type="button" className="btn save_btn" onClick={handleSave}>
          Save{" "}
          {loading ? (
            <i
              style={{ marginLeft: "5px" }}
              className="fa fa-spinner fa-spin"
            ></i>
          ) : (
            ""
          )}
        </button>
        <button
          type="button"
          className="btn cancel_btn"
          onClick={props.handleClose}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
