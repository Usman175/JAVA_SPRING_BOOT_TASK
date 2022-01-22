import React from "react";
import { useSelector } from "react-redux";
export default function Format(props) {
  const language = useSelector((state) => state.languageReducer.language);

  return (
    <>
      {props.currency === "USD" && (
        <div style={{ display: "inline",marginRight:'0px' }}>
          {props.currency === "USD" && language === "english" && "US$"}{" "}
          {props.currency === "USD" && language !== "english" && props.currency}
          {/* korean japanese  */}
        </div>
      )}
      {props.currency === "KRW" && language !== "korean" && (
        <img
          draggable={false}
          style={{ marginTop: "-3px", marginRight: "2px" }}
          src={
            props.redIcon
              ? "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icon-project-features.png"
              : "https://dhihitu47nqhv.cloudfront.net/icons/icon-project-features.svg"
          }
        />
      )}
      {props.currency === "JPY" && language !== "japanese" && props.currency}

      {props.number || props.number===0 && props.number !== " " ? (
        <>
          {new Intl.NumberFormat().format(props.number)}
          {props.currency === "USD" &&
          (props.number.toString().indexOf(".") === -1 ||
            props.number.toString().indexOf(".00") !== -1)
            ? ".00"
            : ""}
        </>
      ) : (
        props.number
      )}
      {props.currency !== "USD" && (
        <div style={{ display: "inline",marginRight:'0px' }}>
          {props.currency === "KRW" && language === "korean" && "원"}
          {props.currency === "JPY" && language === "japanese" && "円"}
          {props.currency !== "USD" &&
            props.currency !== "KRW" &&
            props.currency !== "JPY" &&
            props.currency}
        </div>
      )}
    </>
  );
}
