import React, { Component } from "react";
import "./noMatch.scss";
import {useSelector} from "react-redux";


const NoMatch=(props)=>{ 
  const languageType = useSelector(
      (state) => state.languageReducer.languageType 
  );
    return (
        <div className="no-match-page">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-6">
              <center>
            <img src={'https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/404-Icon.png'} />
            <button onClick={()=>props.history.push('/')}> {languageType.GO_TO_MAIN_PAGE} </button>
          </center>
              </div>
              <div className="col-12 col-md-3"></div>
            </div>
          </div>
          
        </div>
      );
}


export default NoMatch;
