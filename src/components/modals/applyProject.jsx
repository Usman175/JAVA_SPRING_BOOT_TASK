import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DropdownList from "../dropdowns/dropdownList";

export const ApplyProject = ({ handleClose }) => {
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [completion, setCompletion] = useState("");
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    setSubmit(false);
  }, [amount, completion, setSubmit]);
  return (
    <>
      <div className="job_offer budget_modal">
        <div className="job_detail" style={{ paddingRight: 35 }}>
          <h2>Web Development</h2>
          <form className="post_form">
            <label>
              <span>Budget : </span>
              <span>US$1,500.00</span>
            </label>
            <div className="form-group">
              <input
                type="text"
                placeholder="The amount you bid"
                className="form-control"
                style={{ height: 38 }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {submit && !amount && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-8">
                  <input
                    type="text"
                    placeholder="Estimated Figure"
                    className="form-control"
                    style={{ height: 38 }}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <DropdownList
                    id="day"
                    name="day"
                    enableAutoCompleteSearch
                    placeholder="Day"
                    value={completion}
                    selectItem={(value) => {
                      setCompletion(value);
                    }}
                    items={[
                      {
                        text: "Day",
                        value: "Day",
                      },
                      {
                        text: "Week",
                        value: "Week",
                      },
                      {
                        text: "Month",
                        value: "Month",
                      },
                    ]}
                  />
                </div>
                {submit && !completion && (
                  <p className="text-danger">This field is required</p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div
          className="save_cancel text-center"
          style={{ marginTop: "70px", marginLeft: "43px" }}
        >
          <button
            onClick={() =>
              amount && completion
                ? history.push("/all-projects")
                : setSubmit(true)
            }
            type="button"
            className="btn save_btn"
            data-dismiss="modal"
          >
            Ok
          </button>
          <button
            onClick={handleClose}
            type="button"
            className="btn cancel_btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
