import React from "react";
import { Col, Row } from "react-bootstrap";
import "./documentTypeSelector.scss";

const CommonCard = ({
  title,
  icon,
  bottomText,
  bottomIcon,
  selectedValue,
  name,
  onSelect,
  CheckBoxId,
  checkBoxValue,
}) => (
  <div className="col-12 col-md-4 px-5 px-md-0  customer-border">
    <input
      class="styled-checkbox"
      onChange={(e) => {
        if (e.target.checked) {
          onSelect(name);
        } else {
          onSelect("");
        }
      }}
      checked={selectedValue === name ? true : false}
      id={CheckBoxId}
      type="checkbox"
      value={checkBoxValue}
    />
    <label for={CheckBoxId}></label>
    <div
      className={`card-area ${selectedValue === name ? "active" : "disable"}`}
    >
      <div className="national-card-back-shadow"></div>
      <div className="nation-card-front">
        <Row>
          <Col xs="12">
            <h3>{title}</h3>
          </Col>
          <Col xs="4">
            <div className="nation-card-front-icon">
              <i className={icon}></i>
            </div>
          </Col>
          <Col xs="8">
            <div className="nation-card-front-icon">
              <div className="align-bars-license w-100">
                <div className="align-bars-lower w-75"></div>
                <div className="align-bars-opper w-100"></div>
                <div className="align-bars-lower w-75"></div>

                <div className="align-bars-lower1 w-50"></div>
                <div className="nation-card-front-icon-date ">
                  <div className="mt-1">{bottomText}</div>
                  <i className={bottomIcon}></i>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
);

const DocumentTypeSelector = ({
  onSelect,
  selectedValue,
  errorMessage,
  disableHeading,
}) => {
  return (
    <div className="freelancer-document-selection">
      <div
        hidden={disableHeading}
        className="freelancer-document-selection-heading"
      >
        <h4 className="text-capitalize">
          <div className="label-initial-general"></div> Document Type{" "}
          <span className="label-compulsory-icon">*</span>
        </h4>
        <div></div>
      </div>
      {errorMessage && <p className="text-danger"> {errorMessage} </p>}
      <div className="row">
        <CommonCard
          selectedValue={selectedValue}
          name="nationalId"
          title="Identity Card"
          icon="fa fa-user"
          bottomText="29.07.2021"
          bottomIcon="fa fa-circle"
          onSelect={onSelect}
          CheckBoxId="styled-checkbox-1"
          checkBoxValue="value1"
        />
        <div
          className="col-12 col-md-4 customer-border"
          style={{ borderRight: "0px" }}
        >
          <input
            class="styled-checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                onSelect("passport");
              } else {
                onSelect("");
              }
            }}
            checked={selectedValue === "passport" ? true : false}
            id="styled-checkbox-2"
            type="checkbox"
            value="value1"
          />
          <label for="styled-checkbox-2"></label>
          <div
            className={`card-area ${
              selectedValue === "passport" ? "active" : "disable"
            }`}
          >
            <div className="licenseCard-left-shadow"></div>
            <div className="license-card-front-detail">
              <h3>Passport</h3>
              <center>
                <i className="fa fa-globe"></i>
                <div className="align-bars-license">
                  <div className="align-bars-opper"></div>
                  <div className="align-bars-lower mr-auto w-75"></div>
                </div>
              </center>
            </div>
            <div className="licenseCard-right-shadow"></div>
          </div>
        </div>

        <CommonCard
          onSelect={onSelect}
          selectedValue={selectedValue}
          name="license"
          title="Driving License"
          icon="fa fa-car"
          bottomText=""
          bottomIcon="fa fa-camera-retro"
          CheckBoxId="styled-checkbox-3"
          checkBoxValue="value1"
        />
      </div>
    </div>
  );
};

export default DocumentTypeSelector;
