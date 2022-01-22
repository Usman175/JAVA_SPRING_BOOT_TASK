import React from 'react'
import './freelancer.scss'
import Label from "../postProject/label";
import {useSelector} from "react-redux";
function CreateFreelancerDocumentPicker(props) {
  const languageType = useSelector(
    (state) => state.languageReducer.languageType 
);
    return (
        <div className="new-portfolio-kYC">
        <div className="row post_form">
          <div className="col-12 col-md-3" style={{paddingRight:'0px'}}>
            <div className="portfolio-area-icon">
              <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/portfolio.png" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="document-upload-area">
              <p>
                {languageType.KYC_EXPLAIN_TEXT}
              </p>
              <br />
             </div>
          </div>
          <div className="col-12 col-md-3">
   
              <div className="add-file-new_box ">
              
                <p>KYC Photo</p>
                <input
                  id={`portfolioFile${props.type}`}
                  type="file"
                  accept="image/*"
           
                  onChange={(e) => {
                    props.handleKYCPhotoChange(e);
                  }}
                  hidden
                />
                 
              <center>
              <i onClick={() => {
                    document.getElementById(`portfolioFile${props.type}`).click();
                  }} className="fa fa-plus-circle" aria-hidden="true"></i>
                  <br />
                <input
                  type="text"
          
                  className="title-hide-more-line"
                  value={
                    props.KYCPhoto
                      ? props.KYCPhoto?.split('/')[props.KYCPhoto?.split('/').length-1]
                      : ""
                  }
                  readOnly
                />
              </center>
            
              </div>
                 {
                   props.fileUploading?.kycProvePhoto && <center><p><i className='fa fa-spinner fa-spin'></i> Uploading</p></center>
                 }
           </div>
        </div>
      </div>
    
    )
}

export default CreateFreelancerDocumentPicker
