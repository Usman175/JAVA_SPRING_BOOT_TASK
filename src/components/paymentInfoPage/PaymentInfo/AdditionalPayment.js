import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function AdditionalPayment() {
  const classes = useStyles();

  return ( 
      <>
      {/* Additional */}
    <Grid container spacing={2}>   
      <Grid item container xs={12} sm={12}>
        <Grid item={12} container justifyContent="space-between">
          <Grid item={12} style={{ alignSelf: "center"}}>
            <Typography 
              className={classes.paymentHeading}
            >
              Additional
            </Typography>
          </Grid> 
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={12}>
        <Grid item={12} container justifyContent="space-between" className={classes.spacing_PaymentMethod}>
        <Grid 
          item={10} 
          style={{ alignSelf: "center", display:'flex',justifyContent: 'space-around' }}
          >
              <img 
              alt="Mastercard icon" 
              src={require("./assets/visa.svg")}
              />
            <Typography 
              className={classes.paymentText}
            >
             Visa card ending in 8989
            </Typography>
          </Grid> 
          <Grid Grid item={2} className={classes.AdditionalResponsiveButton}>
          <button
          type="button"
          className={`btn btn-outline-dark ${classes.setPrimary_button}`}
          color="primary"
        >
          Set as primary
        </button> &nbsp;
        <button
          type="button"
          className={`btn btn-outline-danger ${classes.remove_button_danger}`}
          color="primary"
        >
          Remove
        </button> 
           </Grid> 
        </Grid>
      </Grid>
      <Grid item xs={12} className="customer-grid-top-margin">
        <Divider
          className={`${classes.paymentMethodHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
        />
      </Grid>
    </Grid>


    {/* Discover Due */}
    <Grid container spacing={2}>    
      <Grid item container xs={12} sm={12}>
        <Grid item={12} container justifyContent="space-between" className={classes.spacing_PaymentMethod}>
        <Grid 
          item={10} 
          style={{ alignSelf: "center", display:'flex',justifyContent: 'space-around' }}
          >
              <img 
              alt="Mastercard icon" 
              src={require("./assets/discover.svg")}
              />
            <Typography 
              className={classes.paymentText}
            >
             Discover card ending in 8989
            </Typography>
          </Grid> 
          <Grid Grid item={2} className={classes.AdditionalResponsiveButton}>
          <button
          type="button"
          className={`btn btn-outline-dark ${classes.setPrimary_button}`}
          color="primary"
        >
          Set as primary
        </button> &nbsp;
        <button
          type="button"
          className={`btn btn-outline-danger ${classes.remove_button_danger}`}
          color="primary"
        >
          Remove
        </button> 
           </Grid> 
        </Grid>
      </Grid>
      <Grid item xs={12} className="customer-grid-top-margin">
        <Divider
          className={`${classes.paymentMethodHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
        />
      </Grid>
    </Grid>



    {/* American Card Due */}
    <Grid container spacing={2}>    
      <Grid item container xs={12} sm={12}>
        <Grid item={12} container justifyContent="space-between" className={classes.spacing_PaymentMethod}>
        <Grid 
          item={10} 
          style={{ alignSelf: "center", display:'flex',justifyContent: 'space-around' }}
          >
              <img 
              alt="Mastercard icon" 
              src={require("./assets/american_card.svg")}
              />
            <Typography 
              className={classes.paymentText}
            >
             American card ending in 8989
            </Typography>
          </Grid> 
          <Grid Grid item={2} className={classes.AdditionalResponsiveButton}>
          <button
          type="button"
          className={`btn btn-outline-dark ${classes.setPrimary_button}`}
          color="primary"
        >
          Set as primary
        </button> &nbsp;
        <button
          type="button"
          className={`btn btn-outline-danger ${classes.remove_button_danger}`}
          color="primary"
        >
          Remove
        </button> 
           </Grid> 
        </Grid>
      </Grid>
      <Grid item xs={12} className="customer-grid-top-margin">
        <Divider
          className={`${classes.paymentMethodHr} mt-4 mt-md-0 mt-lg-0 mt-xl-0 mt-sm-3`}
        />
      </Grid>
    </Grid>
    
    </>
  );
}

export default AdditionalPayment;

const useStyles = makeStyles((theme) => ({
    paymentHeading: {
    textAlign: "left",
    font: "normal normal normal 16px/21px Roboto",
    fontSize:'16px',
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,     
  },
  paymentText: {
    textAlign: "left",
    font: "normal normal normal 14px/19px Roboto",
    fontSize:'14px',
    letterSpacing: "0px",
    color: "#131212",
    opacity: 1,
    marginLeft:'25px',
    '@media(max-width: 595px)' : {
      marginLeft:'20px',
    } 
  }, 
  spacing_PaymentMethod: {
      padding: "20px 0"
  }, 
  setPrimary_button: {
      padding: '0 20px !important',
      background: '#F8F8F8 0% 0% no-repeat paddingBox !important', 
      height: '26px', 
      borderRadius:'21px', 
      font: 'normal normal normal 12px/16px Roboto',
      letterSpacing: 0, 
      opacity: 1 
  },
  remove_button_danger: {
    padding: '0 20px !important',
    background: '#F8F8F8 0% 0% no-repeat paddingBox !important', 
    height: '26px', 
    borderRadius:'21px', 
    font: 'normal normal normal 12px/16px Roboto',
    letterSpacing: 0,  
    opacity: 1 
  },
  paymentMethodHr: {
    color: "#B7B7B7",
    height: 2,
    margin: "25px 0 !important",
    width: "100%",
  },
  AdditionalResponsiveButton:{
    alignSelf: "center",
    '@media(max-width: 700px)' : {
        margin:'10px 0 0 0px',  
      }
  }

}));
