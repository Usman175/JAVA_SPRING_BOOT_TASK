import React, { useState, useEffect } from "react";
import Label from "../../components/postProject/label";
import DropdownList from "../../components/dropdowns/dropdownList";
import { CountryList } from "../../utils/countrylist";
import "./work.scss";

function AddressManipulation(props) {
  const [selectCountry, setSelectedCountry] = useState(props.country);
  const [selectCty, setSelectedCity] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    if (props.country) {
      let country = CountryList.find((item) => item.name === props.country);
      if (country) {
        setCountryCode(country.dial_code);
        setSelectedCountry(props.country);
      }
      let countryId = props.countries.find(
        (item) => item.name === props.country
      );
      console.log(
        countryId,
        props.country,
        props.countries,
        CountryList,
        "countryId"
      );

      if (countryId) {
        props.bindCities(countryId.id);
      }
    }
  }, [props.country]);
  useEffect(() => {
    if (props.countries && props.countries.length > 0) {
      let countryId = props.countries.find(
        (item) => item.name === props.country
      );

      if (countryId) {
        props.bindCities(countryId.id);
      }
    }
  }, [props.countries]);

  const handleUpdateCity = (value) => {
    setSelectedCity(value);
  };
  /* bindCities */
  console.log(props.cities, "props.cities");
  return (
    <div className="post_form addressManipulation_formMobile">
      <div className="row">
        <div className="col-12 col-md-4">
          <div className="form-group">
            <Label
              title={props.languageType.COUNTRY_TEXT}
              compulsory={true}
            ></Label>
            <DropdownList
              enableAutoComplete
              enableAutoCompleteSearch
              id={`countries`}
              name={`countries`}
              value={selectCountry || props.country}
              selectItem={(value) => {
                setSelectedCountry(value);
                let countryId = props.countries.find(
                  (item) => item.name === value
                );
                if (countryId) {
                  props.bindCities(countryId.id);
                }
              }}
              items={CountryList.map((country) => ({
                text: country.name,
                value: country.name,
              }))}
            />
          </div>
        </div>
        <div className="col-12 col-md-2">
          <div className="form-group">
            <Label
              title={props.languageType.COUNTRY_CODE}
              compulsory={true}
            ></Label>
            <input
              type="text"
              className="form-control gray_bg"
              placeholder="Country Code"
              value={countryCode}
              maxLength="50"
              onChange={(e) => {
                setCountryCode(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <Label
              title={props.languageType.MOBILE_NO}
              compulsory={true}
            ></Label>
            <input
              type="text"
              className="form-control"
              placeholder="Mobile No"
              maxLength="10"
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <div className="save_cancel">
              <button
                type="button"
                className="btn cancel_btn verify_btn"
                style={{
                  position: "relative",
                  top: "29px",
                  background: "#0d2146",
                  minWidth: "100%",
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group custom-form-top-margin">
            <Label
              title={props.languageType.ADDRESS + "1"}
              compulsory={true}
            ></Label>
            <input type="text" className="form-control" placeholder="address" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group custom-form-top-margin">
            <Label
              title={props.languageType.ADDRESS + "2"}
              compulsory={true}
            ></Label>
            <input type="text" className="form-control" placeholder="address" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7 col-md-6">
          <div className="form-group">
            <Label
              title={props.languageType.CITY_TEXT}
              compulsory={true}
            ></Label>

            <DropdownList
              enableAutoComplete
              enableAutoCompleteSearch
              id={`cities`}
              name={`cities`}
              value={selectCty}
              selectItem={(value) => {
                handleUpdateCity(value);
              }}
              items={props.cities.map((city) => ({
                text: city.name,
                value: city.id,
              }))}
            />
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <div className="form-group">
            <Label
              title={props.languageType.POST_CODE}
              compulsory={true}
            ></Label>
            <input
              type="text"
              className="form-control"
              placeholder="postal code"
              maxLength="10"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-12"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div className="form-group">
              <div className="save_cancel">
                <button
                  type="button"
                  className="btn cancel_btn verify_btn registerAddress_btn"
                >
                  Register Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressManipulation;
