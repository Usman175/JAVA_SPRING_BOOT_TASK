import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core'


function Label({ title, compulsory, question }) {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.container}>
                <Grid item>
                    <label className={classes.label}>{title} </label>
                </Grid>
                {compulsory && <Grid item className={classes.starWrapper}>
                    <span className={classes.star}>*</span>
                </Grid>}
                {question && <Grid item className={classes.starWrapper}>
                    <i
                        className="fa fa-question-circle"
                        aria-hidden="true"
                    ></i>
                </Grid>}
            </Grid>


        </>
    );
}

export default Label;

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    label: {
        textAlign: 'left',
        font: 'normal normal bold 12px/16px Roboto',
        letterSpacing: '0px',
        color: '#707070 !important',
        opacity: 1,
    },
    star: {
        color: '#B51818',
        opacity: 1,
        width: 6
    },
    starWrapper: {
        margin: '0px 0px 3px 3px'
    }



}));