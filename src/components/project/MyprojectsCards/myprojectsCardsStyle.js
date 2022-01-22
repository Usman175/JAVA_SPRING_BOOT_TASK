import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  Container: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    padding: "20px 25px 10px 25px",
    marginTop: "10px",
    boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)",
    display: "flex",
    position: 'relative',
    "&:hover": {
      boxShadow: "3px 3px 3px rgba(117, 117, 117, 0.349)",
    },
    "@media(max-width: 1150px) and (min-width: 900px)": {
      width: "875px", 
      position:'relative',
      left:'50%',
      transform:'translateX(-50%)',
    },
    "@media(max-width: 2000px) and (min-width: 900px)": {
      minHeight: "205px", 
    },
    "@media(max-width: 900px) and (min-width: 700px)": {
      minHeight: "205px", 
    },
    "@media(max-width: 595px)": {
      display: "flex",
      flexDirection: "column",
      padding: "20px 15px 10px 15px",
    },
    "@media(max-width: 395px)": {
      display: "flex",
      flexDirection: "column",
      padding: "20px 10px 10px 10px",
    },
    "@media(max-width: 335px)": {
      display: "flex",
      flexDirection: "column",
      padding: "20px 5px 10px 8px",
    },
  },
  MainContainer: {
    marginRight: 20,
    "@media(max-width: 595px)": {
      marginRight: 10,
    },
  },
  HeaderWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeadingWrapper: {
    display: "flex",
    alignItems: "center",
  },
  MileStonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Mainheader: {
    fontWeight: 500,
    fontSize: "21px",
    color: "#0d2146",
    margin: "0px 18px 0px 12px",
    cursor: "pointer",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "25ch",
    "@media(max-width: 595px)": {
      fontSize: "16px",
      maxWidth: "22ch",
      margin: "0px 12px 0px 10px",
    },
    "@media(max-width: 395px)": {
      maxWidth: "18ch",
    },
    "@media(max-width: 335px)": {
      fontSize: "16px",
      maxWidth: "14ch",
    },
  },
  MileStoneHeader: {
    fontWeight: 500,
    fontSize: "21px",
    color: "#0d2146",
    margin: "0px 18px 0px 12px",
    cursor: "pointer",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: "25ch",
    "@media(max-width: 595px)": {
      fontSize: "16px",
      maxWidth: "23ch",
      margin: "0px 12px 0px 10px",
    },
    "@media(max-width: 395px)": {
      fontSize: "16px",
      maxWidth: "18ch",
    }, 
    //  for galaxy fold
    "@media(max-width: 335px)": {
      fontSize: "16px",
      maxWidth: "14ch",
    },
  },
  BtnWrapper: {
    background: "#7b7bf3",
    width: 70,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    color: "white",
  },
  HourlyBtnWrapper: {
    background: "#7337f2",
    width: 70,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    color: "white",
  },
  MilestoneBtnWrapper: {
    background: "#f6495a",
    width: 70,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    color: "white",
  },
  FreeBtnWrapper: {
    background: "#0d2146",
    width: 70,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    color: "white",
  },
  ContestbtnWrapper: {
    background: "#44500c",
    width: 70,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    color: "white",
  },
  ClockIcon: {
    reSize: "contain",
    width: 23,
    height: 23,
  },
  Hourly: {
    fontSize: 10,
  },
  ProjectInfo: {
    marginTop: 20,
    width: 500,
    "@media(max-width: 595px)": {
      width: "100%",
    },
  },
  PaidText: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#0D0D0D",
    marginRight: 15,
    letterSpacing: "0px",
    "@media(max-width: 335px)": {
      fontSize: "12px",
    },
  },
  HoursText: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#0D0D0D",
    letterSpacing: "0px",
    "@media(max-width: 335px)": {
      fontSize: "12px",
    },
  },
  PaidMilestone: {
    fontSize: 13,
    fontWeight: 500,
    color: "#0d2146",
    letterSpacing: "0px",
    margin: "0px 0px 0px 30px",
    "@media(max-width: 595px)": {
      fontSize: 12,
      margin: "0px 0px 0px 20px",
    },
    "@media(max-width: 395px)": { 
      margin: "0px 0px 0px 20px",
    },
    "@media(max-width: 335px)": {
      margin: "0px 0px 0px 10px",
    },
  },
  Wrapper: {
    display: "flex",
    "@media(min-width: 800px)": {
      position: 'absolute',
      bottom: '10px',   
    },
  },
  ProgressBarWrapper: {
    display: "flex",
    alignItems: "center",
  },
  horizantalLine: {
    borderLeft: "1px solid #c8c7c7",
    height: 174,
    position: "absolute",
    left: "64%",
  },
  AttendanceText: {
    fontSize: 14,

    fontWeight: 500,
    color: "#0D0D0D",
    letterSpacing: "0px",
    marginLeft: 15,
    "@media(max-width: 335px)": {
      fontSize: "12px",
      marginLeft: 8,
    },
  },
  AmountText: {
    fontSize: 14,

    fontWeight: 500,
    color: "#0D0D0D",
    letterSpacing: "0px",
    marginTop: 10,
  },
  houlryWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 5,
  },
  hourlyRate: {
    color: "0D0D0D",
    fontWeight: "Medium",
    fontSize: 11,
    margin: 0,
  },
  dailyRate: {
    color: "0D0D0D",
    fontWeight: "500",
    fontSize: 12,
    margin: 0,
  },
  contestWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contestWrapper1: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  CheckIcon: {
    width: 23,
    height: 23,
  },
  RestartCheckIcon: {
    width: 15,
    height: 15,
    marginLeft: 20,
    cursor: "pointer",
  },
  verifiedIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
    "@media(max-width: 335px)": {
      marginRight: 5,
    },
  },
  SelectedText: {
    fontSize: 14,
    color: "#0D0D0D",
    margin: 0,
    fontWeight: "500",
    "@media(max-width: 335px)": {
      fontSize: 12,
    },
  },
  ImgWrapper: {
    marginLeft: 20,
    "@media(max-width: 335px)": {
      marginLeft: 15,
    },
  },
  ImgWrapper1: {
    marginLeft: 40,
  },
  contentCssContractCards:{
    "@media(min-width:595px)":{
      marginBottom: '3.4rem',
    },
  },
  contestWaitingMessage: {
    backgroundColor: "#110648",
    height: "auto", 
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "white",
    "@media(max-width: 300px)": {
      height: "auto",
      padding: "10px 5px",
    },
    "@media(min-width: 1050px)": { 
      width:'500px',
    }, 
    "@media(min-width: 800px)": {
      position: 'absolute',
      bottom: '3px',  
      height: '50px',
      marginBottom:'10px',
    },
    "@media(max-width: 1100px) and (min-width: 900px)": { 
      width:'500px',
    },
    "@media(max-width: 900px) and (min-width: 750px)": { 
      width:'auto',
    },
    "@media(max-width: 595px)": {
      width: "100%",
    },
  },
  TextWrapper: {
    display: "flex",
    alignItems: "center",
  },
  Alretwrapper: {
    position: "relative",
    top: "10px",
    background: "#F44336",
  },
  AlertText: {
    margin: "0px 0px 0px 22px",
    fontSize: 12,
    padding: 2,
    color: "#FFFFFF",
  },
  CheckIconVerify: {
    width: 23,
    height: 23,
    marginRight: 13,
  },

  //CONTACTINFO STYLING

  ContractInfoContainer: {
    marginTop: 5,
    paddingLeft: "15px",
    "@media(max-width: 700px)": {
      borderLeft: "2px solid lightgray",
    },
  },

  contractsCardDetailRightAreaPcView: {
    display: "block",
    borderLeft: "2px solid lightgray",
    "@media(max-width: 700px)": {
      display: "none",
    },
  },

  contractsCardDetailRightAreaMobileView: {
    display: "none",
    "@media(max-width: 700px)": {
      display: "block",
    },
  },

  iconRight_showProjectType_MyContractsCardClient: {
    "@media(max-width:695px)": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      margin: "5px 0",
    },
  },

  iconRight_showProjectType_button: {
    "@media(max-width:695px)": {
      border: "1px solid #ccc",
      borderRadius: "50%", 
      width: "25px",
      color: "red",
      fontSize: "22px",
      alignItems: "center",
      textAlign: "center",
      height: "25px",
      justifyContent: "center",
      alignSelf: "center",
      display: "flex",
    },
  },

  ContractNoTitle: {
    fontWeight: 500,
    fontSize: "12px",
    color: "#0d2146",
    opacity: 1,
    marginBottom: 15,
    "& span":{
      "@media(max-width:595px)": {
        lineHeight: "1.6", 
      },
    },
  },
  EscrowedAmountText: {
    fontWeight: 400,
    fontSize: 14,
    color: "#040404",
    marginTop: 12,
  },

  ContractWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  Avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: "4px",
    cursor: "pointer",
  },
  AvatarFreeContract: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: "4px",
    objectFit: "cover",
    cursor: "pointer",
  },
  TextAvatar: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: "4px",
    objectFit: "cover",
    backgroundColor: "#993366",
    color: "white",
    fontSize: "13px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "500",
    cursor: "pointer",
  },
  awardedIcon: {
    marginRight: "5px",
    width: "20px",
    marginTop: "5px",
  },
  awardedWaitingIcon: {
    marginRight: "15px",
    width: "29px",
    marginTop: "5px",

    "@media(max-width: 595px)": {
      marginTop: "-3px",
    },
  },
  awardedNoApplicantText: {
    fontSize: "14px",
    fontWeight: "500",
  },
  awardedWaitingText: {
    marginBottom: "0px",
    fontSize: "13px",

    "@media(max-width: 595px)": {
      fontSize: '12px', 
      lineHeight: 1,
    },

  },
  DummyImg: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: "4px",
    marginBottom: 5,
    cursor: "pointer",
    marginTop: "8px",
  },
  ContractTitle: {
    fontWeight: 500,
    fontSize: "12px",
    color: "#0D0D0D",
    margin: 0,
  },
  DepositBtn: {
    marginTop: 20,
    width: 185,
    height: 35,
    "&.MuiButton-root": {
      backgroundColor: "#0d2146",
      color: "white",
      borderRadius: "2px",
      textTransform: "capitalize",
      fontSize: 13,
      "&:hover": {
        backgroundColor: "#0d2146",
      },
    },
  },
  ReleaseBtn: {
    width: 185,
    height: 35,
    marginTop: 5,
    "&.MuiButton-root": {
      backgroundColor: "#377B0B",
      color: "white",
      borderRadius: "2px",
      textTransform: "capitalize",
      fontSize: 13,
      "&:hover": {
        backgroundColor: "#377B0B",
      },
    },
  },
  Wrapperhourly: {
    display: "flex",
  },
}));
