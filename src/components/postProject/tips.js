import React from 'react';
import { connect } from 'react-redux';
import './postProject.scss'

const TipsInfo = ({ languageType, }) => {
    return (
        <div className="tips-post-project-area">
            <h6>{languageType.TIP_POST_PROJECT}
            <div className="step-heading-shadow"></div>
            </h6>
            <div className="d-flex align-items-center justify-content-between">
                <img 
                 src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/happysns.svg"
                />
            </div>
           
           
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        languageType: state.languageReducer.languageType,
    };
};

export default connect(mapStateToProps)(TipsInfo);
