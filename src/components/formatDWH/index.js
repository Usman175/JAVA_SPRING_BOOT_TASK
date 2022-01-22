import React from "react";
import { useSelector } from "react-redux";
import "./formatDWH.scss";
function FormatDWH(props) {
  const language = useSelector((state) => state.languageReducer.language);

  return (
    <div className="formatDWH">
      {/*  for days */}
      {props.days
        ? props.currency === "USD" && language === "english"
          ? "days"
          : props.currency === "KRW" && language === "korean"
          ? "일"
          : props.currency === "JPY" && language === "japanese"
          ? "日"
          : "days"
        : null}

      {/*  for day */}
      {props.day
        ? props.currency === "USD" && language === "english"
          ? "day"
          : props.currency === "KRW" && language === "korean"
          ? "일"
          : props.currency === "JPY" && language === "japanese"
          ? "日"
          : "day"
        : null}

      {/*  for hr */}
      {props.hr
        ? props.currency === "USD" && language === "english"
          ? "hr"
          : props.currency === "KRW" && language === "korean"
          ? "시간"
          : props.currency === "JPY" && language === "japanese"
          ? "時間"
          : "hr"
        : null}

      {/*  for hrs */}
      {props.hrs
        ? props.currency === "USD" && language === "english"
          ? "hrs"
          : props.currency === "KRW" && language === "korean"
          ? "시간"
          : props.currency === "JPY" && language === "japanese"
          ? "時間"
          : "hrs"
        : null}

      {/*  for hrs */}
      {props.week
        ? props.currency === "USD" && language === "english"
          ? "week"
          : props.currency === "KRW" && language === "korean"
          ? "주"
          : props.currency === "JPY" && language === "japanese"
          ? "週"
          : "week"
        : null}
    </div>
  );
}

export default FormatDWH;

/*  currency must be  */

/*  currency type   USD  KRW JPY  */

/* days     day       hr      hrs      week   English */
/* 날       일      시간     시간      주       korean */
/* 日々     日々      時間      時間     週     japan */
