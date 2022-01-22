import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core"; 
import DateRangePicker from "../../../components/dateRangePicker";
import TransactionTable from "./TransactionTable" 
import { makeStyles } from "@material-ui/core/styles";
import "./transaction.scss"

function Transaction() {
  const classes = useStyles();

  return ( 
      <>
    <Grid container spacing={2}> 
      <Grid item xs={2} sm={1}>
        <img 
        style={{width:'35px'}} 
        height="60" 
        alt="heading icon" 
        src={require("./assets/transactionIcon.svg")}
        />
      </Grid>
      <Grid item container xs={10} sm={11}>
        <Grid item={12} container justifyContent="space-between" className={classes.TransactionContainer}>
          <Grid item={10} style={{ alignSelf: "center"}}>
            <Typography 
              className={classes.transactionHeading}
            >
              Transactions
            </Typography>
          </Grid> 
          <Grid item={2} style={{ alignSelf: "center"}}>
            <div 
              className={`${classes.DateRangePickerTransaction} no-padding`}
            >
                <DateRangePicker /> 
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className="customer-grid-top-margin">
        <Divider
          className={`${classes.transactionHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
        />
      </Grid>
      <Grid item container xs={12} sm={12}>
        <Grid item={12} container justifyContent="space-between">
          <Grid item={2} style={{ alignSelf: "center"}}> 
          </Grid> 
          <Grid item={10} style={{ alignSelf: "center"}}>
          <button
          type="button"
          className={`btn btn-outline-dark ${classes.setInvoices_button}`}
          color="primary"
        >
          Download Invoices
        </button>
          </Grid>
        </Grid>
      </Grid>
    </Grid> 

<div className={classes.TransactionTable}>
    <TransactionTable /> 
</div>
    </>
  );
}

export default Transaction;

const useStyles = makeStyles((theme) => ({
    transactionHeading: {
    textAlign: "left",
    font: "normal normal normal 20px/26px Roboto",
    fontSize:'20px',
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    padding: "10px 8px", 
    '@media(max-width: 700px)' : {
        padding: "15px 8px", 
      }
  },
  DateRangePickerTransaction: {
    textAlign: "left", 
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    padding: "10px 8px", 
  },
  TransactionTable: {
    padding:'10px 0 0 0', 
    width:'100%', 
  },
  setInvoices_button: {
    width: '167px',
    height: '28px',
    background: '#F8F8F8 0% 0% no-repeat paddingBox !important', 
    height: '26px', 
    borderRadius:'21px', 
    font: 'normal normal normal 12px/16px Roboto',
    letterSpacing: 0, 
    color: '#131212 !important',
    opacity: 1,
    border: '1px solid #707070' ,
    '&:hover': {
          color: "#fff !important",
       },
},
TransactionContainer: {
    '@media(max-width: 700px)' : {
        justifyContent: 'right',
      }
},
  transactionHr: {
    color: "#B7B7B7",
    height: 2,
    margin: '15px 0 !important',
    width: "100%",
    '@media(max-width: 700px)' : {
        height: 0,
      }
  },  
}));
