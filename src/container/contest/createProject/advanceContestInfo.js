import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Label from "../../../components/postProject/label";
import { v4 } from "uuid";
import DropdownList from "../../../components/dropdowns/dropdownList";
import notifications from "../../../utils/notifications";
import "../contest.scss";
let currencies = [
  {
    text: "USD",
    value: "USD",
  },
  {
    text: "원화결제",
    value: "KRW",
  },
  {
    text: "JPY",
    value: "JPY",
  },
];

let FirstPassOption = [
  {
    text: "5%",
    value: "5",
  },
  {
    text: "10%",
    value: "10",
  },
  {
    text: "15%",
    value: "15",
  },
  {
    text: "20%",
    value: "20",
  },
  {
    text: "25%",
    value: "25",
  },
  {
    text: "30%",
    value: "30",
  },
];


function AdvanceContestInfo(props) {
  const [errorMessage, setErrorMessage] = useState({});
  let { contestDetail } = props;
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  const onFileChange = (e) => {
    props.setContestDetail({
      ...contestDetail,
      privateContestNDADocument: e.target.files[0],
      privateContestNDADocumentName: e.target.files[0].name,
    });
  };

  const handleChange = (field, e, value) => {
    props.setContestDetail({ ...contestDetail, [field]: e.target.value });

    if(field==="contestComfortingMoney"){
      if(contestDetail.contestFirstPass && (e.target.value < Number(contestDetail.contestFirstPass)*5)){

        setErrorMessage({...errorMessage,contestComfortingMoney:`Min comforting amount should be greater than ${Number(contestDetail.contestFirstPass)*5}`})
      }else{
        setErrorMessage({...errorMessage,contestComfortingMoney:''})
      }
   
    }
    if(field==="secondPlacePrize"){
      if(contestDetail.secondPlacePrize && (Number(contestDetail.secondPlacePrize)>Number(contestDetail.winningAmount))){
        setErrorMessage({...errorMessage,secondPlacePrize:'Second place prize should be less than winning amount'})
      }else{
        setErrorMessage({...errorMessage,secondPlacePrize:''})
      }
    }
    if(field==="thirdPlacePrize"){
      if(contestDetail.thirdPlacePrize && (Number(contestDetail.thirdPlacePrize)>Number(contestDetail.secondPlacePrize))){
        setErrorMessage({...errorMessage,thirdPlacePrize:'Third place prize should be less than second place prize'})
      }else{
        setErrorMessage({...errorMessage,thirdPlacePrize:''})
      }
    }
  };
  const handleChange1 = (field, value) => {
    props.setContestDetail({ ...contestDetail, [field]: value });
 
  };
  const formatCurrency = (value = 0, currency = "USD") => {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(Number(value));
  };
  const handleValidation = () => {
    let errorMessage = {};
    let formIsValid = true;

    if (!contestDetail.currencyCode) {
      formIsValid = false;
      errorMessage["currencyCode"] = languageType.REQUIRED_MESSAGE;
    }
    if (!contestDetail.winningAmount || contestDetail.winningAmount < 0) {
      formIsValid = false;
      errorMessage["winningAmount"] = languageType.REQUIRED_MESSAGE;
    }
    if (!contestDetail.contestFirstPass || contestDetail.contestFirstPass < 0) {
      formIsValid = false;
      errorMessage["contestFirstPass"] = languageType.REQUIRED_MESSAGE;
    }

    // if (!contestDetail.contestComfortingMoney || contestDetail.contestComfortingMoney < 0) {
    //   formIsValid = false;
    //   errorMessage["contestComfortingMoney"] = languageType.REQUIRED_MESSAGE;
    // }
    if(contestDetail.secondPlacePrize){
      if(contestDetail.secondPlacePrize && (Number(contestDetail.secondPlacePrize)>Number(contestDetail.winningAmount))){
        formIsValid = false;
        errorMessage["secondPlacePrize"] = 'Second place prize should be less than winning amount';
      }
    }
    if(contestDetail.thirdPlacePrize){
      if(contestDetail.thirdPlacePrize && (Number(contestDetail.thirdPlacePrize)>Number(contestDetail.secondPlacePrize))){
        formIsValid = false;
        errorMessage["thirdPlacePrize"] = 'Third place prize should be less than second place prize';
      }
    }
    setErrorMessage(errorMessage);
    return formIsValid;
  };
  const handleSubmitContest = () => {
    if (handleValidation()) {
      props.handleSubmitContest();
    }
  };

  return (
    <div className={"collapse animaton-height show mt-5"}>
      <div className="contest_bodr">
        <div className="row">
          <div className="col-md-7">
            <h4 className="heading_h4">{languageType.GUARANTEED} :</h4>
            <div className="yes_no d-flex justify-content-between">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customcheck1"
                  name="prop1"
                  required
                  checked={contestDetail.isGuaranteed}
                  onChange={() =>
                    props.setContestDetail({
                      ...contestDetail,
                      isGuaranteed: !contestDetail.isGuaranteed,
                    })
                  }
                />
                <label className="custom-control-label" htmlFor="customcheck1">
                  {languageType.YES_TEXT}
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck2"
                  name="prop2"
                  required
                  checked={!contestDetail.isGuaranteed}
                  onChange={() =>
                    props.setContestDetail({
                      ...contestDetail,
                      isGuaranteed: !contestDetail.isGuaranteed,
                    })
                  }
                />
                <label className="custom-control-label" htmlFor="customCheck2">
                  {languageType.NO_TEXT}
                </label>
              </div>
            </div>
            <p>{languageType.GUARANTEED_DETAIL}</p>
            <br />
            <div className="row mb_20">
            <div className="col-md-6 label_AdvanceContextInfo_Mobile">
                <Label 
                  title="First Pass"
                  compulsory={true}
                  prefixBoxValid={errorMessage["currencyCode"] ? false : true}
                  prefixBoxInValid={errorMessage["currencyCode"] ? true : false}
                  primary={true}
                  icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/subScopeIcon.svg"}
                  color="#333333"
                />
                <DropdownList
                  id="contestFirstPass"
                  name="contestFirstPass"
                  enableAutoCompleteSearch
                  placeHolder={"Select pass %"}
                  value={contestDetail.contestFirstPass}
                  style={{ width: "100%" }}
                  selectItem={(value) => {
                    handleChange1("contestFirstPass", value);
                  }}
                  items={FirstPassOption}
                />
                {errorMessage.contestFirstPass && (
                  <p className="text-danger">{errorMessage.contestFirstPass}</p>
                )}
              </div>
              <div className="col-md-6">
                <Label
                  // title={languageType.SELECT_CURRENCY}
                  title="Currency"
                  compulsory={true}
                  prefixBoxValid={errorMessage["currencyCode"] ? false : true}
                  prefixBoxInValid={errorMessage["currencyCode"] ? true : false}
                  primary={true}
                  icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/subScopeIcon.svg"}
                  color="#333333"
                />
                <DropdownList
                  id="currencyCode"
                  name="currencyCode"
                  enableAutoCompleteSearch
                  placeHolder={languageType.SELECT_CURRENCY}
                  value={contestDetail.currencyCode}
                  style={{ width: "100%" }}
                  selectItem={(value) => {
                    handleChange1("currencyCode", value);
                  }}
                  items={currencies}
                />
                {errorMessage.currencyCode && (
                  <p className="text-danger">{errorMessage.currencyCode}</p>
                )}
              </div>  
              <br />
            </div>
            <p style={{fontSize:'16px',maxWidth:'1500ch'}}> Would you like to exclude comforting money ? :</p>
            <div className="yes_no d-flex justify-content-between">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="excludeComfortMoney"
                  name="prop1"
                  required
                  checked={contestDetail.excludeComfortMoney}
                  onChange={() =>
                    props.setContestDetail({
                      ...contestDetail,
                      excludeComfortMoney: !contestDetail.excludeComfortMoney,
                    })
                  }
                />
                <label className="custom-control-label" htmlFor="excludeComfortMoney">
                  {languageType.YES_TEXT}
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="excludeComfortMoney1"
                  name="prop2"
                  required
                  checked={!contestDetail.excludeComfortMoney}
                  onChange={() =>
                    props.setContestDetail({
                      ...contestDetail,
                      excludeComfortMoney: !contestDetail.excludeComfortMoney,
                    })
                  }
                />
                <label className="custom-control-label" htmlFor="excludeComfortMoney1">
                  {languageType.NO_TEXT}
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <p className="green_text desc_p">{languageType.DESCRIPTION}</p>
            <p className="desc_p">{languageType.GUARANTEED_DETAIL_DES_1}</p>
            <p className="desc_p">{languageType.GUARANTEED_DETAIL_DES_2}</p>
            <p className="desc_p">{languageType.GUARANTEED_DETAIL_DES_3}</p>
            <p className="desc_p">{languageType.GUARANTEED_DETAIL_DES_4}</p>
          </div>
        </div>
      </div>
      <div className="contest_bodr">
        <div className="row">
          <div className="col-md-7">
            <h4 className="heading_h4">{languageType.PRIVATE_CONTEST} :</h4>
            <div className="yes_no d-flex justify-content-between">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customcheck3"
                  name="PrivateContestTypeProps1"
                  required
                  checked={contestDetail.isPrivateNDAContest}
                  onChange={() =>
                    props.setContestDetail({
                      ...contestDetail,
                      isPrivateNDAContest: !contestDetail.isPrivateNDAContest,
                    })
                  }
                />
                <label className="custom-control-label" htmlFor="customcheck3">
                  {languageType.YES_TEXT}
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customcheck4"
                  name="PrivateContestTypeProps2"
                  required
                  checked={!contestDetail.isPrivateNDAContest}
                  onChange={() =>
                    props.setContestDetail({
                      ...contestDetail,
                      isPrivateNDAContest: !contestDetail.isPrivateNDAContest,
                    })
                  }
                />
                <label className="custom-control-label" htmlFor="customcheck4">
                  {languageType.NO_TEXT}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group upload_file">
                  <p>{languageType.PRIVATE_CONTEST_DETAIL}</p>
                </div>
              </div>

              <div className="row mt_20">
                <div className="col-md-12">
                  <div className="form-group upload_file">
                    <label
                      htmlFor="exampleFormControlFile1"
                      style={{
                        left: "10px",
                        height: "10px",
                        paddingTop: "15px",
                      }}
                      className="advanceContent_uploadLabelMob"
                    >
                      <i className="fa fa-upload" aria-hidden="true"></i>
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={(e) => onFileChange(e)}
                    />

                    <span
                      style={{
                        float: "left",
                        marginLeft: 50,
                      }}
                    >
                      {contestDetail.privateContestNDADocumentName &&
                        contestDetail.privateContestNDADocumentName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <p className="green_text desc_p">{languageType.DESCRIPTION}</p>
            <p className="desc_p">{languageType.PRIVATE_CONTEST_DES_1} </p>
            <p className="desc_p">{languageType.PRIVATE_CONTEST_DES_2}</p>
          </div>
        </div>
      </div>
      <div className="contest_bodr">
        <div className="row">
          <div className="col-md-7">
            <h4 className="heading_h4">PRIZE</h4>
            <div className="row mb_20">
              <div className="col-md-4 label_AdvanceContextInfo_Mobile">
                <Label
                  // title={languageType.SELECT_CURRENCY}
                  title="Currency"
                  compulsory={true}
                  prefixBoxValid={errorMessage["currencyCode"] ? false : true}
                  prefixBoxInValid={errorMessage["currencyCode"] ? true : false}
                  primary={true}
                />
                <DropdownList
                  id="currencyCode"
                  name="currencyCode"
                  enableAutoCompleteSearch
                  placeholder={languageType.SELECT_CURRENCY}
                  value={contestDetail.currencyCode}
                  style={{ width: "100%" }}
                  selectItem={(value) => {
                    handleChange1("currencyCode", value);
                  }}
                  items={currencies}
                />
                {errorMessage.currencyCode && (
                  <p className="text-danger">{errorMessage.currencyCode}</p>
                )}
              </div>
              <div className="col-md-8">
                <Label
                  // title={languageType.AMOUNT_OF_WINNING}
                  title={"Amount"}
                  compulsory={true}
                  prefixBoxValid={errorMessage["winningAmount"] ? false : true}
                  prefixBoxInValid={
                    errorMessage["winningAmount"] ? true : false
                  }
                  primary={true}
                />
                <input
                  type="text"
                  className="form-control "
                  placeholder={languageType.WINNING_AMOUNT}
                  style={{ height: 38, width: "100%" }}
                  value={contestDetail.winningAmount}
                  maxLength="10"
                  onChange={(e) => handleChange("winningAmount", e)}
                />
                {errorMessage.winningAmount && (
                  <p className="text-danger">{errorMessage.winningAmount}</p>
                )}
                {/* </div> */}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  margin: "10px",
                }}
              >
                {contestDetail.winningAmount &&
                  contestDetail.currencyCode &&
                  formatCurrency(
                    contestDetail.winningAmount,
                    contestDetail.currencyCode
                  )}
              </div>
            </div>
            <h4 className="heading_h4 mt_30">
              {languageType.ADD_SECOND_THIRD_PRIZE}
            </h4>

            <div className="yes_no d-flex justify-content-between">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customcheck5"
                  name="PrizeType1"
                  required
                  checked={contestDetail.isSecondPrice}
                  onChange={() => {
                    props.setContestDetail({
                      ...contestDetail,
                      isSecondPrice: !contestDetail.isSecondPrice,
                    });
                  }}
                />
                <label className="custom-control-label" htmlFor="customcheck5">
                  {languageType.YES_TEXT}
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customcheck6"
                  name="PrizeType2"
                  required
                  checked={!contestDetail.isSecondPrice}
                  onChange={() => {
                    props.setContestDetail({
                      ...contestDetail,
                      isSecondPrice: !contestDetail.isSecondPrice,
                    });
                  }}
                />
                <label className="custom-control-label" htmlFor="customcheck6">
                  {languageType.NO_TEXT}
                </label>
              </div>
            </div>
            {contestDetail.isSecondPrice && (
              <div className="align-items-center inline_form">
                <div className="d-flex align-items-center ADD_SECOND_THIRD_PRIZE_Mobile">
                  <label>
                    {languageType.SECOND_PLACE}
                    <span
                      className="compulsory"
                      hidden={!contestDetail.isSecondPrice}
                    ></span>
                  </label>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <DropdownList
                        id="currencyCode"
                        name="currencyCode"
                        enableAutoCompleteSearch
                        placeholder="Select currencyCode"
                        value={contestDetail.secondPlacePrizeCurrency}
                        style={{ width: 70 }}
                        selectItem={(value) => {
                          handleChange1("secondPlacePrizeCurrency", value);
                        }}
                        items={currencies}
                      />
                      {errorMessage.secondPlacePrizeCurrency && (
                        <p className="text-danger">
                          {errorMessage.secondPlacePrizeCurrency}
                        </p>
                      )}
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control ADD_SECOND_THIRD_PRIZE_Input_Mobile"
                        placeholder={"amount"}
                        value={contestDetail.secondPlacePrize}
                        maxLength="10" 
                        onChange={(e) => handleChange("secondPlacePrize", e)}
                      />
                      {errorMessage.secondPlacePrize && (
                        <p className="text-danger">
                          {errorMessage.secondPlacePrize}
                        </p>
                      )}
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      {contestDetail.secondPlacePrize &&
                        contestDetail.secondPlacePrizeCurrency &&
                        formatCurrency(
                          contestDetail.secondPlacePrize,
                          contestDetail.secondPlacePrizeCurrency
                        )}
                    </div>
                  </div>
                </div>
                <div
                  className=" d-flex align-items-center"
                  style={{ marginTop: "10px" }}
                >
                  <label>
                    {languageType.THIRD_PLACE}
                    <span
                      className="compulsory"
                      hidden={!contestDetail.isThirdPrice}
                    ></span>
                  </label>
                  <div className="d-flex align-items-center">
                    <div className="">
                      <DropdownList
                        id="currencyCode"
                        name="currencyCode"
                        enableAutoCompleteSearch
                        placeholder="Select currencyCode"
                        value={contestDetail.thirdPlacePrizeCurrency}
                        style={{ width: 70 }}
                        selectItem={(value) => {
                          handleChange1("thirdPlacePrizeCurrency", value);
                        }}
                        items={currencies}
                      />
                      {errorMessage.thirdPlacePrizeCurrency && (
                        <p className="text-danger">
                          {errorMessage.thirdPlacePrizeCurrency}
                        </p>
                      )}
                    </div>
                    <div className="">
                      <input
                        type="text"
                        className="form-control ADD_SECOND_THIRD_PRIZE_Input_Mobile"
                        placeholder={"amount"}
                        value={contestDetail.thirdPlacePrize}
                        maxLength="10" 
                        onChange={(e) => handleChange("thirdPlacePrize", e)}
                      />
                      {errorMessage.thirdPlacePrize && (
                        <p className="text-danger">
                          {errorMessage.thirdPlacePrize}
                        </p>
                      )}
                    </div>
                    <div style={{ fontSize: "16px" }}>
                      {contestDetail.thirdPlacePrize &&
                        contestDetail.thirdPlacePrizeCurrency &&
                        formatCurrency(
                          contestDetail.thirdPlacePrize,
                          contestDetail.thirdPlacePrizeCurrency
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-5">
            <p className="green_text desc_p">{languageType.DESCRIPTION}</p>
            <p className="desc_p">{languageType.ADD_SECOND_THIRD_PRIZE_DES}</p>
          </div>
        </div>
      </div>
      <div className="contest_bodr">
        <div className="promotion_box">
          <div className="row">
            <div className="col-md-7">
              <h4 className="heading_h4">{languageType.PROMOTION_TEXT}</h4>
              <div className="yes_no d-flex justify-content-between">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customcheck7"
                    required
                    value={contestDetail.isPromoted}
                    checked={contestDetail.isPromoted}
                    onChange={(e) =>
                      props.setContestDetail({
                        ...contestDetail,
                        isPromoted: !contestDetail.isPromoted,
                      })
                    }
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customcheck7"
                  >
                    {languageType.CONTEST_PROMOTED}
                  </label>
                </div>
                <label>{contestDetail.promotedPrice}</label>
              </div>
            </div>
            <div className="col-md-5">
              <p className="green_text desc_p">{languageType.DESCRIPTION}</p>
              <p className="desc_p">{languageType.PROMOTED_CONTEST_DES}</p>
            </div>
          </div>
        </div>
        <div className="promotion_box">
          <div className="row">
            <div className="col-md-7">
              <div className="yes_no d-flex justify-content-between">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customcheck8"
                    value={contestDetail.isFeaturedContest}
                    checked={contestDetail.isFeaturedContest}
                    onChange={(e) =>
                      props.setContestDetail({
                        ...contestDetail,
                        isFeaturedContest: !contestDetail.isFeaturedContest,
                      })
                    }
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customcheck8"
                  >
                    {languageType.CONTEST_FEATURED}
                  </label>
                </div>
                <label>{contestDetail.featuredContestPrice}</label>
              </div>
            </div>
            <div className="col-md-5">
              <p className="desc_p">{languageType.CONTEST_FEATURED_DES}</p>
            </div>
          </div>
        </div>
        <div className="promotion_box">
          <div className="row align-items-center">
            <div className="col-md-7">
              <div className="yes_no d-flex justify-content-between">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customcheck9"
                    value={contestDetail.isBlind}
                    checked={contestDetail.isBlind}
                    onChange={(e) =>
                      props.setContestDetail({
                        ...contestDetail,
                        isBlind: !contestDetail.isBlind,
                      })
                    }
                    required
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customcheck9"
                  >
                    {languageType.BLIND_TEXT}
                  </label>
                </div>
                <label>{contestDetail.blindPrice}</label>
              </div>
            </div>
            <div className="col-md-5">
              <p className="desc_p">{languageType.BLIND_DETAIL}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="save_cancel proposal-submission-buttons">
        <div
          type="submit"
          onClick={() => {
            props.handleBack("basic");
          }}
          className="back-button"
        >
          <i className="fa fa-angle-left"></i>
        </div>
        <button
          onClick={() => {
            handleSubmitContest();
          }}
          className="btn contest-project-post-btn"
        >
          {" "}
          Submit
          {props.loading ? <i className="fa fa-spinner fa-spin"></i> : ""}{" "}
        </button>
      </div>
    </div>
  );
}

export default AdvanceContestInfo;
