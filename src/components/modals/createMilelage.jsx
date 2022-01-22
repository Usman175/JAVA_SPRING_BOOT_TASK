import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const CreateMilelage = ({ handleClose }) => {
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [submit, setSubmit] = useState(false);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  useEffect(() => {
    setSubmit(false);
  }, [date, amount, title, setSubmit]);
  const handleSubmit = () => {
    if (date && amount && title) {
      handleClose();
    } else {
      setSubmit(true);
    }
  };
  return (
    <>
      <div className="text-center" style={{ width: 342, margin: "auto" }}>
        <h4 className="">{languageType.CREATE_NEW_MILESTONE}</h4>
        <form className="post_form">
          <div className="form-group">
            <input
              type="date"
              placeholder="Due Date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {submit && !date && (
              <p className="text-danger">This field is required.</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {submit && !amount && (
              <p className="text-danger">This field is required.</p>
            )}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setTitle(e.target.value)}
            >
              {title}
            </textarea>
            {submit && !title && (
              <p className="text-danger">This field is required.</p>
            )}
          </div>
          <div className="save_cancel">
            <button
              type="button"
              className="btn btn-sm save_btn"
              onClick={handleSubmit}
            >
              OK
            </button>
            <button
              type="button"
              className="btn btn-sm cancel_btn"
              data-dismiss="modal"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
