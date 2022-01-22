import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./officePhotos.scss";
function OfficeModalDetail(props) {
  const [index, setIndex] = useState(0);
  return (
    <Modal
      dialogClassName="portfolio-modal"
      show={props.showOfficePhotos}
      onHide={() => props.setShowOfficePhotos(false)}
      centered
      backdrop={true}
    >
      <Modal.Body className="hide_scroll_bar">
        <center>
          <div className="portfolio-contents">
            <h3>Office Photos</h3>
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
                  props.officePhoto[index] &&
                  `https://dhihitu47nqhv.cloudfront.net/${props.officePhoto[index]}`
                }
                alt=""
              />
              <i
                onClick={() => {
                  if (props.officePhoto.length - 1 > index) {
                    setIndex(index + 1);
                  }
                }}
                className="fa fa-angle-right"
              ></i>
            </div>
          </div>
        </center>
      </Modal.Body>
    </Modal>
  );
}

export default OfficeModalDetail;
