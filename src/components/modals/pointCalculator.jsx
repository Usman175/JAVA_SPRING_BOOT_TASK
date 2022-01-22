import React, { useState, useEffect } from "react";
import DropdownList from "../dropdowns/dropdownList";

export const Header = () => {
  return (
    <div className="w-100 font-weight-bold m-0 p-0 h4 text-center">
      Jungle Point Calculator
    </div>
  );
};

export const Body = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState({
    USD: {
      SYM: "$",
      CUR: 1.0,
      JP: 1.37,
      CTY: "US",
    },
    JPY: {
      SYM: "¥",
      CUR: 1.0,
      JP: 0.013,
      CTY: "JP",
    },
    KRW: {
      SYM: "₩",
      CUR: 1.0,
      JP: 0.00116,
      CTY: "KR",
    },
  });
  useEffect(() => {
    setShow(false);
  }, [currency, value, setShow]);
  return (
    <div className="m-1 point-calculator">
      <p className="text-success">
        {`${rate[currency].CTY} ${rate[currency].SYM}${rate[currency].CUR} `}is
        equavalent to {rate[currency].JP} Jungle point and it is fixed ratio
        with Sigapore Dollar
      </p>
      <div className="d-flex">
        <div className="">
          {/* <select
            name="currency"
            className="form-control mr-1"
            id=""
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
            <option value="KRW">KRW</option>
          </select> */}
          <DropdownList
            id="currency"
            name="currency"
            enableAutoCompleteSearch
            className="mr-1"
            placeholder="Estimated currency"
            value={currency}
            selectItem={(value) => {
              setCurrency(value);
            }}
            items={[
              {
                text: "USD",
                value: "USD",
              },
              {
                text: "JPY",
                value: "JPY",
              },
              {
                text: "KRW",
                value: "KRW",
              },
            ]}
          />
        </div>
        <input
          type="number"
          name="currency-value"
          className="form-control"
          placeholder="Amount"
          id=""
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {show && !value && (
        <p className="text-danger mt-1">Currency value is a required field.</p>
      )}
      {value && show ? (
        <div className="text-center h5 mt-3 mb-0">
          {rate[currency].SYM} {value} ={" "}
          {(+value * rate[currency].JP).toFixed(3)} Jungle Points
        </div>
      ) : (
        <button
          className="btn save_btn w-100 mt-3 mb-0"
          onClick={() => setShow(true)}
        >
          Calculate
        </button>
      )}
    </div>
  );
};
