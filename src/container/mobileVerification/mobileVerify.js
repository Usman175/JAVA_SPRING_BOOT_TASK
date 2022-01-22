import React, { Component, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Select, TextField } from "@material-ui/core";
import { CountryList } from "../../utils/countrylist";
import "react-notify-alert/dist/index.css";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "./mobileVerification.scss";
import { ReactNotifyAlert } from "react-notify-alert";
import AOS from "aos"
import 'aos/dist/aos.css';

AOS.init({
  duration: 1200,
});


const useStyles = () => ({
  mobileContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "50px",
  },
  phoneNumberWrap: {
    "& .MuiSelect-outlined": {
      height: "20px",
      paddingBottom: "10px",
      paddingTop: "9px",
    },
  },
  textFiledWrap: {
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      boxShadow: "0 0 0 0.2rem rgb(0 123 255 / 25%)",
      outline: "none",
      borderColor: "transparent !important",
    },
  },
});

class VerifyMobile extends Component {
  constructor(props) {
    super(props);
    this.myRef = createRef();
    this.state = {
      isVerifySuccess: false,
      isMobileVerify: false,
      verifycation: ["", "", "", "", "", ""],

      phoneBtnText: "Send OTP",
      selectedDialNumber: props.location?.state?.countryCode ? props.location.state.countryCode:"",
      phoneData: {
        country: "India",
        ipaddress: "114.31.164.239",
        phNumber: this.props.location?.state?.mobileNumber,
        phoneNumber: this.props.location?.state?.mobileNumber,
        phoneotp: "",
      },
      loading: false,
      loading1: false,
      notifyAlertData: {
        open: false,
        type: "confirm",
        title: "",
        message: "",
        complete: false,
      },
    };
  }

  onCountryChange = (item) => {
    let selectedCountry = CountryList.filter(
      (x) => x.code.toLowerCase() == item.target.value.toLowerCase()
    );
    console.log(selectedCountry," selectedCountry.code")
    this.setState({ selectedDialNumber: selectedCountry[0]?.dial_code });
    
 
  };

  handlePhoneVerification = async () => {
    let { phoneData, phoneBtnText, selectedDialNumber, verifycation } =
      this.state;

    if (phoneBtnText === "Verify") {
      this.setState({ loading1: true });
      let otp = "";
      let scope = this;
      verifycation.map((x) => (otp += x));
      window.confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          // swal("Success", "Successfully verified!", "success");
          this.setState({ loading1: false });
          scope.setState({
            isMobileVerify: true,
            notifyAlertData: {
              open: true,
              type: "success",
              title: "",
              message: "Successfully verified!",
            },
          });
          setTimeout(() => {
            this.props.handleNext();
          }, 1000);
        })
        .catch((error) => {
          scope.setState({
            loading1: false,
            notifyAlertData: {
              open: true,
              type: "fail",
              title: "",
              message: "Invalid OTP.",
            },
          });
        });
    } else {
      this.setState({ loading: true });
      const scope = this.props;
      let recaptcha = await new firebase.auth.RecaptchaVerifier("captcha", {
        size: "invisible",
      });
      let dialCode = CountryList.find((x) => x.code == selectedDialNumber);
      let number = `${dialCode ? dialCode["dial_code"] : ""}${
        phoneData["phoneNumber"]
      }`;

      let ConfirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(number, recaptcha);
      window.confirmationResult = ConfirmationResult;
      this.setState({ loading: false });
      this.setState({
        phoneBtnText: "Verify",
        notifyAlertData: {
          open: true,
          type: "success",
          title: "",
          complete: true,
          message: `Verification code \n send to ${number}`,
        },
      });
    }
  };

  renderInputVerifycation = () => {
    const { verifycation } = this.state;
    return (
      <div ref={this.myRef}>
        {verifycation.map((item, index) => (
          <input
            key={index}
            className="varification-input-box"
            maxLength="1"
            value={item}
            onChange={(e) =>
              this.handleChangeVerifycation(index, e.target.value)
            }
          />
        ))}
      </div>
    );
  };

  handleChange = (event) => {
    const { phoneData } = { ...this.state };
    phoneData[event.target.name] = event.target.value;
    this.setState({ phoneData });
  };

  handleChangeVerifycation = (id, value) => {
    let { verifycation } = this.state;
    const newValue = typeof value === "string" ? value.trim() : "";
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      this.setState(({ verifycation }) => {
        const newVerifycation = [...verifycation];
        newVerifycation[id] = newValue;
        return {
          verifycation: newVerifycation,
        };
      });
      if (this.state.verifycation.length > id + 1 && newValue) {
        this.myRef.current.children[id + 1].select();
      }
    }

    if (
      verifycation[0] !== "" &&
      verifycation[1] !== "" &&
      verifycation[2] !== "" &&
      verifycation[3] !== "" &&
      verifycation[4] !== "" &&
      value !== ""
    ) {
      //   this.props.onMobileVarifiedOrNot(true);
    } else {
      //   this.props.onMobileVarifiedOrNot(false);
    }
  };

  onNotifyActionHandle = (action) => {
    const { notifyAlertData } = { ...this.state };
    if (notifyAlertData.complete) {
      this.props.history.push({
        pathname: `/${this.props.location?.state?.path}`,
        phoneVerified: true,
      });
    }

    this.setState({
      notifyAlertData: {
        open: false,
        type: "",
        title: "",
        message: "",
      },
    });
  };

  handleNext = () => {
    // window.scrollTo(top);
    this.setState({
      isVerifySuccess: true,
    });
  };

componentDidMount(){
  if(!this.state.selectedDialNumber){
   
  }
  CountryList.map((item)=>{
    if(item.code===this.props.lookUpData?.lookUpData.countryCode){
      this.setState({selectedDialNumber:item.dial_code})
    }
  })
}

  render() {
    let {
      isVerifySuccess,
      phoneData,
      phoneBtnText,
      selectedDialNumber,
      isMobileVerify,
      verifycation,
      notifyAlertData,
    } = this.state;
    let { selectedPayment, authReducer, classes } = this.props;
    let user = this.props.authReducer?.myAuth?.user;

    return (
      <div id="Mobile-Verification" className={classes.mobileContainer}>
        <div className="container py-5">
          {!isVerifySuccess ? (
            <div data-aos="fade-up" className="mob-verification">
              <p className="mob-header">Mobile Verification</p>
              <div className="content-container">
                <div className="varification-details ">
                  <Select
                    native
                    size="small"
                    value={selectedDialNumber}
                    fullWidth={true}
                    disabled={false}
                    className={`small-input-box ${classes.phoneNumberWrap}`}
                    variant="outlined"
                    onChange={this.onCountryChange}
                  >
                    {CountryList.map((x) => (
                      <option
                        value={x.dial_code}
                      >{`${x.name} (${x?.dial_code})`}</option>
                    ))}
                  </Select>
                  <div className="mt-3 d-flex">
                    <TextField
                      variant="outlined"
                      className={`small-input-box mobile-text-box mb-3 ${classes.textFiledWrap}`}
                      disabled={false}
                      fullWidth
                      placeholder="mobile no. without country code"
                      name="phoneNumber"
                      value={phoneData["phoneNumber"]}
                      onChange={this.handleChange}
                    />
                    <div
                      className="verify-mobile-button"
                      onClick={() => this.handlePhoneVerification()}
                    >
                      {phoneBtnText != "Verify" && (
                        <Button className="button-style verify-btn">
                          {phoneBtnText}{" "}
                          {this.state.loading ? (
                            <i className="fa fa-spinner fa-spin"></i>
                          ) : (
                            ""
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="varification-input">
                  <div className="help-text">
                    Check your mobile phone, and enter 6 digit code.
                  </div>

                  <div id="captcha" className="captcha-wrap" />
                  <div className="d-flex align-items-center justify-content-between">
                    {this.renderInputVerifycation()}
                    <div>
                      <img
                        height="50px"
                        src={
                          verifycation.includes("")
                            ? "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/phone.png"
                            : "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/verifiedPhone.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="btnWrap">
                {/*<button className="btn-black btn-outline-black" onClick={() => this.props.history.goBack()}>back</button>*/}
                <button
                  className="btn-black"
                  disabled={isMobileVerify ? false : verifycation.includes("")}
                  onClick={
                    isMobileVerify
                      ? () => this.handleNext()
                      : () => this.handlePhoneVerification()
                  }
                >
                  {isMobileVerify ? "next" : "Verify"}
                  {this.state.loading1 ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="d-flex-column align-items-center justify-content-center text-center"
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              <img
                style={{ width: "25%", marginBottom: "30px" }}
                src="https://dxnqsgisijbjj.cloudfront.net/chattingroom/img/applogo/jungletalkEn.png"
              />
              <br />
              Congratulation! {user?.profileName}!<br />
              You have created new account with us
              <br />
              <br />
              Click here to go to your channel page
            </div>
          )}
        </div>
        <ReactNotifyAlert
          isOpen={notifyAlertData.open}
          type={notifyAlertData.type}
          title={notifyAlertData.title}
          infoText={notifyAlertData.message}
          onActionHandle={(e) => this.onNotifyActionHandle(e)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.languageReducer.language,
    authReducer: state.authReducer,
    lookUpData:state.lookUp
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(VerifyMobile));
