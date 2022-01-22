import React from "react";
import "./registration.scss";
import notifications from "../../utils/notifications";
import { useSelector } from "react-redux";
function OptionalInfoHeadHunter(props) {
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  return (
    <div className="freelance-registration-optional">
      <div className="form-section-title">
        <h1>{languageType.OPT_INFO_TEXT}</h1>
        <img
          width={18}
          src={
            "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus.svg"
          }
        />
      </div>
      <p className="form-notes">{languageType.OPT_INFO_EXPLAIN_TEXT}</p>
      {props.optionalInfo.clientCompanies.map((item, index) => (
        <div className="client-companies">
          <div className="form-group row mb-3">
            <label for="no-employees" class="col-sm-3 col-form-label">
              <span className="form-label-icon text-left">
                <img
                  width={25}
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/users.svg"
                  }
                />
              </span>
              Client Company Name
            </label>
            <div class="col-sm-9">
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    placeholder={"Client Company Name"}
                    className="form-control "
                    id="no-employees"
                    value={item.companyName}
                    onChange={(e) => {
                      props.handleUpdateClientName(e.target.value, index);
                    }}
                    name="no-employees"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-2">
                  <a>
                    {(index == 0 &&
                      props.optionalInfo.clientCompanies.length === 1) ||
                    (index > 0 &&
                      props.optionalInfo.clientCompanies.length - 1 ===
                        index) ? (
                      <img
                        width={18}
                        src={
                          "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/plus-bold.svg"
                        }
                        onClick={() => props.handleAddMoreClientCompany()}
                        className="plus-icon"
                      />
                    ) : (
                      <i
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => props.handleRemoveClientCompany(index)}
                        className="fa fa-trash"
                      ></i>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row mb-3">
            <label for="homepage" class="col-sm-3 col-form-label">
              <span className="form-label-icon text-left">
                <img
                  width={22}
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/homepage.svg"
                  }
                />
              </span>
              Client Company URL
            </label>
            <div class="col-sm-9">
              <div className="row">
                <div className="col-lg-6">
                  <input
                    type="text"
                    value={`https://${item.companyUrl}`}
                    onChange={(e) => {
                      if (e.target.value != "https:/") {
                        props.handleUpdateClientCompanyUrl(
                          e.target.value?.replace("https://", ""),
                          index
                        );
                      }
                    }}
                    placeholder="Home Page Address"
                    className="form-control "
                    id="homepage"
                    name="homepage"
                  />
                </div>
                {/* <div className="col-lg-6">
                              <p className="mb-0 info-text">ex)Please, include prefix https://</p>
                            </div> */}
              </div>
            </div>
          </div>
          <div className="form-group row mb-3">
            <label for="award-certificate" class="col-sm-3 col-form-label">
              <span className="form-label-icon text-left">
                <img
                  width={25}
                  src={
                    "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/trophy.svg"
                  }
                />
              </span>
              Client Company Logo
            </label>
            <div class="col-sm-9">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-10">
                  <label
                    className="file-upload-area-label"
                    htmlFor={`AwardCertificate${index}`}
                  >
                    <div className="btn btn-dark w-100">
                      {" "}
                      {item.companyLogo
                        ? item.companyLogo
                        : "Client Company Logo"}{" "}
                    </div>
                  </label>
                  <input
                    id={`AwardCertificate${index}`}
                    accept=".png, .jpg, .jpeg,.pdf"
                    onChange={(e) => {
                      let size = e.target.files[0] ? e.target.files[0].size : 0;
                      if (size < 1048576) {
                        props.handleAddCLientCompaniesLogo(
                          e.target.files[0],
                          index,
                          e.target?.files[0]?.name
                        );
                      } else {
                        notifications.showWarning(
                          "Please select a file size of less than 1 MB."
                        );
                      }
                    }}
                    type="file"
                    className="file-upload-area"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OptionalInfoHeadHunter;
