import React, { useState } from "react";
import { v4 } from "uuid";
import Modal from "react-bootstrap/Modal";
import NoDataAvailable from "../../../../../shared/error/not-data-available-new";
import Skeleton from "../../../../../components/skeleton/skeleton";
import SkeletonFreelancerExtensionPortfolio from "./skeletonFreelancerExtensionPortfolio";
import { getProfileImage } from "../../../../../utils/getProfileUrl";
import '../../freelancerContents.scss'
function Portfolios(props) {
  const [modalData, setModalData] = useState('');
  const [show, setShow] = useState(false);

  let { freelancer,portfolioData } = props;

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setModalData('')
          setShow(false)}}
        aria-labelledby="example-custom-modal-styling-title"
        centered
        dialogClassName="jungle-modal"
        contentClassName="jungle-modal-content-notify"
      >
             <span onClick={()=>setShow(false)} className="custom-close">
                x
              </span>
        <Modal.Body>
          <div className="modal-dialog modal-lg" style={{border:'none'}}>
         
              <div className="modal-body">
                <img  alt="" 
                 src={getProfileImage(modalData.portfolioImage)}
                 className="portfolio-modal-image"
               />
                </div>
              <div className="modal-footer d-block">  <p>
                {modalData?.description}
                    </p>
              </div>
         
          </div>
        </Modal.Body>
      </Modal>
      
      <SkeletonFreelancerExtensionPortfolio count={1} isSkeletonLoading={props.loading} />
      <div className="skeletonLoading_mobile">
        <Skeleton count={2} isSkeletonLoading={props.loading} />
      </div>
      {( !props.loading && portfolioData && portfolioData.length > 0) 
      // || (previousProjects.length>0) 
      ? (
        <>
          <div className="row text-center">
            {portfolioData.map((portfolio, index) => (
              <>
                <div
                  key={`${v4()}`}
                  className="col-12 col-md-4 col-lg-3"
                  onClick={() => {
                    setModalData(portfolio)
                    setShow(true);
                  }}
                  style={{cursor:'pointer'}}
                >
                  <a data-toggle="modal" data-target="#exampleModal">
                    <img
                      src={getProfileImage(portfolio.portfolioImage)}
                      alt=""
                      className="portfolio-image-all-freelancer"
                    />
                  </a>
                  <br />
                  <span>{ portfolio?.description.slice(0,18)}{portfolio?.description.length>18?'...':''}</span>
                </div>
              </>
            ))}
          </div>
        </>
      ):!props.loading?
      <NoDataAvailable minHeight="20vh" title="The freelancer did not update portfolio yet." />:null
      }
    </>
  );
}

export default Portfolios;
