import { slice, subStr, toString, toInteger } from "lodash";
import React, { useState } from "react";

const cutEveryFourDigits = (value) => {
  if (toString(value).length === 4) {
    const valueString = toString(value);
    const firstPart = slice(valueString, 0, 1)[0];
    const secondPart = "천";
    const thirdPart = valueString.substr(1);
    const newValue = `${firstPart}${secondPart}${thirdPart} `;
    return newValue;
  } else return value;
};

const getManwonAndRemainingWon = (value) => {
  //condition 1,222,200======> 122만 2,200원
  const manwon = `${toInteger(value / 10000)}만`;
  const remaningwon = value % 10000;
  return `${manwon}${!remaningwon ? "원" : `${remaningwon}원`}`;
};

const resolveMan = (value) => {
  //condition 22222 ======> 2만 2,200원
  const man = toInteger(value / 10000);
  const remainingMan = value % 10000; // what remained here is won
  debugger;

  return `${man ? `${cutEveryFourDigits(man)}만` : ""}${cutEveryFourDigits(
    remainingMan
  )}원`;
};

const resolveSib = (value) => {
  //condition 222220 ======> 2십2만 2,200원
  const sib = toInteger(value / 100000);
  const remainingSib = value % 100000;
  return `${sib ? `${cutEveryFourDigits(sib)}` : ""}${resolveMan(
    remainingSib
  )}`;
};

const resolveBaeg = (value) => {
  //condition 2222200 ======> 2백2십2만 2,200원
  const baeg = toInteger(value / 1000000);
  const remainingBaeg = value % 1000000;
  return `${baeg ? `${cutEveryFourDigits(baeg)}` : ""}${resolveSib(
    remainingBaeg
  )}`;
};

const resolveCheon = (value) => {
  //condition 22222200 ======> 2천2백2십2만 2,200원
  const cheon = toInteger(value / 10000000);
  const remainingCheon = value % 10000000;
  return `${cheon ? `${cutEveryFourDigits(cheon)}천` : ""}${resolveBaeg(
    remainingCheon
  )}`;
};

const resolveEog = (value) => {
  //condition 122,222,200======> 1억2천2백2십2만 2,200원
  const eog = toInteger(value / 100000000);
  const remaningeog = value % 100000000;

  return `${eog ? `${cutEveryFourDigits(eog)}억` : ""}${resolveCheon(
    remaningeog
  )}`;
};

const CurrencyDisplay = () => {
  const [currency, setCurrency] = useState(0);

  const onChange = (e) => {
    const value = toInteger(e.target.value);
    if (value < 10000) {
      setCurrency(`${value}원`);
    } else if (value < 100000000) {
      //manwon
      setCurrency(getManwonAndRemainingWon(value));
    } else if (value <= 1000000000000) {
      setCurrency(resolveEog(value));
    } else {
      setCurrency("Invalid Amount entered");
    }
  };
  return (
    <div className="my-5 d-flex justify-content-center">
      <input type="text" onChange={onChange} />
      <p className="h1 ml-4">{currency}</p>
    </div>
  );
};

export default CurrencyDisplay;
