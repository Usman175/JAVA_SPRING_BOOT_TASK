import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./portfolio.scss";
function PortFolioModalDetail(props) {
  const [index, setIndex] = useState(0);
  return (
    <Modal
      dialogClassName="portfolio-modal"
      show={props.showPortfolio}
      onHide={() => props.setShowPortfolio(false)}
      centered
      backdrop={true}
    >
      <Modal.Body className="hide_scroll_bar">
        <center>
          <div className="portfolio-contents">
            <h3>Project Name</h3>
            <div className="image-area">
              <i
                onClick={() => {
                  if (index != 0) {
                    setIndex(index - 1);
                  }
                }}
                className="fa fa-angle-left"
              ></i>
              <img
                src={
                  props.portfolio[index]?.projectUrl ||
                  props.portfolio[index]?.fileDetails
                }
                alt=""
              />
              <i
                onClick={() => {
                  if (props.portfolio.length - 1 > index) {
                    setIndex(index + 1);
                  }
                }}
                className="fa fa-angle-right"
              ></i>
            </div>

            <p> {props.portfolio[index]?.description} </p>
          </div>
        </center>
      </Modal.Body>
    </Modal>
  );
}

export default PortFolioModalDetail;
