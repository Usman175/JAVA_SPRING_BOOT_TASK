import React from 'react';
import './style.scss'

class NoDataAvailable extends React.Component {

    render() {
        return (
           <div className="no-record-area-new"  >
                <div className="no-applicant-are-project-detail" style={{minHeight:this.props.minHeight?this.props.minHeight:''}}>
                 <div  className="forFreelancer_detailArea">
                 <div className="no-applicant-are-project-detail-left">
                      <img
                        alt="No Application"
                        src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/noApplicant.svg"
                      />
                    </div>
                    <div className="no-applicant-are-project-detail-right">
                      <div>
                        <h5>{this.props.title}</h5>
                        <center>
                          {
                            this.props.buttonText &&
                            <button style={{backgroundColor:this.props.color?this.props.color:""}} onClick={()=>this.props.history?.push(this.props.path)}>
                              {this.props.buttonText}
                            </button>
                          }
                        </center>
                      </div>
                    </div>
                 </div>
                  </div>
           </div>
        );
    }
}

export default NoDataAvailable;