import React, { useState } from "react";
import moment from "moment";
import "./dateRangePicker.scss";

function DateRangePicker() {
  const currentWeekStart = moment().startOf("week").toDate();
  const currentWeekEnd = moment().endOf("week").toDate();
  const [startOfWeek, setStartOfWeek] = useState(currentWeekStart);
  const [endOfWeek, setEndOfWeek] = useState(currentWeekEnd);
  const [week, setWeek] = useState(1);

  const prevDate = () => {
    setStartOfWeek(
      currentWeekStart.setDate(currentWeekStart.getDate() - week * 7)
    );
    setEndOfWeek(currentWeekEnd.setDate(currentWeekEnd.getDate() - week * 7));
    setWeek(week + 1);
  };
  const nextDate = () => {
    if (week > 1) {
      setStartOfWeek(
        currentWeekStart.setDate(currentWeekStart.getDate() - (week - 2) * 7)
      );
      setEndOfWeek(
        currentWeekEnd.setDate(currentWeekEnd.getDate() - (week - 2) * 7)
      );
      setWeek(week - 1);
    }
  };

  return (
    <>
      <div className="date-picker-wrapper">
        <div onClick={() => prevDate()}>
          <i class="fas fa-angle-left arrows"></i>
        </div>
        <input
          type="text"
          className="data-picker"
          readonly
          value={
            moment(startOfWeek).format("DD-MMM") +
            " - " +
            moment(endOfWeek).format("DD-MMM-YYYY")
          }
        />
        <div onClick={() => nextDate()}>
          <i class="fas fa-angle-right arrows"></i>
        </div>
      </div>
    </>
  );
}

export default DateRangePicker;
