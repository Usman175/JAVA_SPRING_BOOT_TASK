import React, { useState } from "react";
import Heading from "../../../components/freelancerCreation/heading";
import Label from "../../../components/postProject/label";
import { DocumentTypeSelector, FilePicker } from "../../../components/forms";
import DropdownList from "../../../components/dropdowns/dropdownList";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import { useDispatch, useSelector } from "react-redux";
import v4 from "uuid";
import "./headHunter.scss";
export default function CreateFreelancerBasicInfo(props) {
  const [errorMessage, setErrorMessage] = useState({});
  const [professionalOverview, setProfessionalOverview] = useState("");
  const [skills, setSkills] = useState("");
  const [officePhoto, setOfficePhoto] = useState({});
  const [companyCertificate, setCompanyCertificate] = useState({});
  const [companyVideo, setCompanyVideo] = useState({});
  const [flag, setFlag] = useState(false);
  const [portfolio, setPortfolio] = useState([
    {
      id: v4(),
      selectedFile: null,
      fileObj: null,
      fileDetails: null,
      fileName: "",
      description: "",
    },
  ]);
  const [languageProficiency, setLanguageProficiency] = useState([
    {
      id: v4(),
      language: "",
      proficiency: "",
    },
  ]);

  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  const addMoreLanguageProficiency = () => {
    let languageProficiency1 = [...languageProficiency];
    languageProficiency1.push({ id: v4(), language: "", proficiency: "" });
    setLanguageProficiency([...languageProficiency1]);
  };
  const addMorePortfolio = () => {
    let portfolio1 = [...portfolio];
    portfolio1.push({
      id: v4(),
      selectedFile: null,
      fileObj: null,
      fileDetails: null,
      fileName: "",
      description: "",
    });
    setPortfolio(portfolio1);
  };

  const handleFolioFileChange = (e, index) => {
    let portfolioData = [...portfolio];
    let fileObj = {
      name: e.target?.files[0].name,
      size: e.target?.files[0].size,
      preview: URL.createObjectURL(e.target?.files[0]),
    };
    portfolioData[index] = {
      ...portfolioData[index],
      fileObj: e.target?.files[0],
      fileDetails: { ...fileObj },
      fileName: fileObj.name,
    };
    setPortfolio([...portfolioData]);
  };
  return (
    <div className="hourly_limit">
      <div className="position_rel">
        <Heading
          heading={"Basic Info"}
          icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/createmember.svg"}
          step={"2"}
          shadow={true}
        />
      </div>
      <div>
        <div className="collapse animaton-height show">
          <form
            className="post_form input_proposal_area"
            style={{ padding: "0px" }}
          >
            <div className="form-group">
              <Label
                title={languageType.TITLE_TEXT}
                compulsory={true}
                prefixBoxValid={errorMessage["skills"] ? false : true}
                prefixBoxInValid={errorMessage["skills"] ? true : false}
                primary={true}
                bold={true}
              ></Label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={skills}
                  maxLength="100"
                  onChange={(e) => {
                    let errorMessage = {};

                    if (!isValidString(e.target.value))
                      errorMessage["skills"] = null;
                    setSkills(e.target.value);
                    setErrorMessage(errorMessage);
                    setFlag(flag ? false : true);
                  }}
                  placeholder="Example : Web Developer"
                />
                {errorMessage.skills && (
                  <p className="text-danger"> {errorMessage.skills} </p>
                )}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "15px" }}>
              <Label
                title={"Write a Professional overview"}
                compulsory={true}
                prefixBoxValid={
                  errorMessage["professionalOverview"] ? false : true
                }
                prefixBoxInValid={
                  errorMessage["professionalOverview"] ? true : false
                }
                primary={true}
                bold={true}
              >
                {" "}
                <i className="fa fa-question-circle" aria-hidden="true" />
              </Label>
              <textarea
                rows="5"
                value={professionalOverview}
                placeholder={"Write a professional overview"}
                maxLength="1000"
                onChange={(e) => {
                  let errorMessage = {};
                  if (!isValidString(e.target.value))
                    errorMessage["professionalOverview"] = null;
                  setErrorMessage(errorMessage);
                  setProfessionalOverview(e.target.value);
                  setFlag(flag ? false : true);
                }}
                style={{ marginTop: "0px" }}
              />
              {errorMessage.professionalOverview && (
                <p className="text-danger">
                  {" "}
                  {errorMessage.professionalOverview}{" "}
                </p>
              )}
            </div>
            <br />
            <div className="row">
              <div className="col-12 col-md-4">
                <FilePicker
                  id="companyCertificate"
                  label="Certificates"
                  NotCompulsory={true}
                  fileName={companyCertificate.fileName}
                  onSelect={(file) => setCompanyCertificate(file)}
                />
              </div>
              <div className="col-12 col-md-4">
                <FilePicker
                  id="officePhoto"
                  label="Office Photo"
                  fileName={officePhoto.fileName}
                  onSelect={(file) => setOfficePhoto(file)}
                />
              </div>

              <div className="col-12 col-md-4">
                <FilePicker
                  id="companyVideo"
                  label="Company Introduction Video"
                  NotCompulsory={true}
                  fileName={companyVideo.fileName}
                  onSelect={(file) => setCompanyVideo(file)}
                />
              </div>
            </div>
            <br />
            <div className="">
              <div className="row edit_freelance_profile__baseTitle">
                <Label
                  title={"Add Languages & Proficiency"}
                  prefixBoxValid={true}
                  prefixBoxInValid={false}
                  primary={true}
                  bold={true}
                >
                  {" "}
                  <i className="fa fa-question-circle" aria-hidden="true" />
                </Label>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-5">
                      <label>Language</label>
                    </div>
                    <div className="col-md-5">
                      <label>Proficiency</label>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                </div>
                <div className="col-md-12">
                  {languageProficiency.map((languageproficiency, index) => (
                    <div key={index}>
                      <div className="row align-items-end">
                        <div className="col-md-5 py-1">
                          <div className="form-group">
                            <DropdownList
                              id={`language${index}`}
                              name={`language${index}`}
                              enableAutoCompleteSearch
                              value={languageproficiency.language}
                              selectItem={(value) => {
                                languageproficiency.language = value;
                                setLanguageProficiency(languageProficiency);
                                setFlag(flag ? false : true);
                              }}
                              items={[
                                { text: "Hindi", value: "Hindi" },
                                { text: "English", value: "English" },
                                { text: "Korean", value: "Korean" },
                                { text: "Gujarati", value: "Gujarati" },
                              ]}
                            />
                          </div>
                        </div>
                        <div className="col-md-5 py-1">
                          <div className="form-group">
                            <DropdownList
                              id={`proficiency${index}`}
                              name={`proficiency${index}`}
                              enableAutoCompleteSearch
                              value={languageproficiency.proficiency}
                              selectItem={(value) => {
                                languageproficiency.proficiency = value;
                                setLanguageProficiency(languageProficiency);
                                setFlag(flag ? false : true);
                              }}
                              items={[
                                {
                                  text: "Basic Knowledge",
                                  value: "Basic Knowledge",
                                },
                                { text: "Conversant", value: "Conversant" },
                                { text: "Proficient", value: "Proficient" },
                                { text: "Fluent", value: "Fluent" },
                                { text: "Bilingual", value: "Bilingual" },
                              ]}
                            />
                          </div>
                        </div>
                        <div
                          className="col-md-2 edit_freelance_profile__baseAction"
                          hidden={index < 0}
                        >
                          {languageProficiency &&
                            languageProficiency.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  let languageProficiencyList =
                                    languageProficiency.filter(
                                      (x) => x.id !== languageproficiency.id
                                    );
                                  setLanguageProficiency(
                                    languageProficiencyList
                                  );
                                  setFlag(flag ? false : true);
                                }}
                                className="btn save_btn"
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            )}
                          {(languageProficiency.length === index + 1 ||
                            languageProficiency.length === 1) &&
                          index < 3 ? (
                            <i
                              style={{
                                padding: "14px",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                addMoreLanguageProficiency();
                              }}
                              className="fa fa-plus"
                              aria-hidden="true"
                            ></i>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div hidden={true} className="mt-3">
              <div className="row edit_freelance_profile__baseTitle">
                <Label
                  title={"  Manage Portfolio"}
                  prefixBoxValid={true}
                  prefixBoxInValid={false}
                  primary={true}
                  bold={true}
                >
                  {" "}
                  <i className="fa fa-question-circle" aria-hidden="true" />
                </Label>
              </div>
              <div hidden={true} className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <label>Portfolio</label>
                    </div>
                    <div className="col-md-6">
                      <label>Description</label>
                    </div>
                    <div className="col-md-1"></div>
                  </div>
                </div>
                <div className="col-md-12">
                  {portfolio.map((folio, index) => (
                    <div key={folio.id}>
                      <div className="row">
                        <div className="col-md-4 py-1">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              style={{ paddingRight: "25px" }}
                              value={folio.fileName}
                              readOnly
                            />
                            <input
                              style={{ zIndex: "0" }}
                              id={`portfolioFile${index}`}
                              type="file"
                              accept="image/*"
                              className="form-control"
                              onChange={(e) => {
                                handleFolioFileChange(e, index);
                              }}
                              hidden
                            />
                            <button
                              type="button"
                              className="plusBtn btn"
                              onClick={() => {
                                document
                                  .getElementById(`portfolioFile${index}`)
                                  .click();
                              }}
                            >
                              <i
                                className="fa fa-plus-circle"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6 py-1">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              value={folio.description}
                              maxLength="500"
                              onChange={(e) => {
                                folio.description = e.target.value;
                                setPortfolio(portfolio);
                                setFlag(flag ? false : true);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-2 edit_freelance_profile__baseAction">
                          {portfolio && portfolio.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                let portfolioList = [
                                  ...portfolio.filter((x) => x.id !== folio.id),
                                ];
                                setPortfolio(portfolioList);
                              }}
                              className="btn save_btn"
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                          )}
                          {portfolio.length === index + 1 ||
                          portfolio.length === 1 ? (
                            <i
                              style={{
                                padding: "14px",
                                fontSize: "18px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                addMorePortfolio();
                              }}
                              className="fa fa-plus"
                              aria-hidden="true"
                            ></i>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {
                  <div className="col-md-12">
                    <div className="row">
                      {portfolio.map((folio, index) => {
                        if (folio.fileDetails !== null) {
                          return (
                            <div className="edit_freelance_profile__portfolioPreviewWrapper">
                              <div className="d-flex flex-column justify-content-center">
                                <img
                                  src={
                                    folio &&
                                    folio.fileDetails &&
                                    folio.fileDetails.preview
                                  }
                                  height={100}
                                  width={100}
                                />
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                }
              </div>
            </div>
            <br />

            {/*Portfolio Bind*/}

            <div className="form-group mt-5">
              <p className="clickhere_p">
                ** You may start using Simplywithus.net without further
                information, but we strongly advise fill more information to get
                more clients. If you want to add more information, please{" "}
                <a className="continue_click">click here</a>
              </p>
            </div>
            <div
              className="create-freelancer-bottom-steps"
              style={{ paddingRight: "30px" }}
            >
              <button
                onClick={() => {
                  props.handleBack("HeadHunterProfile");
                }}
                className="create-freelancer-bottom-steps-back"
              >
                Back
              </button>
              <button
                onClick={() => {
                  props.handleNext("ConditionSetup");
                  window.scrollTo({
                    top: "0",
                    behavior: "smooth",
                  });
                }}
                className="create-freelancer-bottom-steps-skip"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
