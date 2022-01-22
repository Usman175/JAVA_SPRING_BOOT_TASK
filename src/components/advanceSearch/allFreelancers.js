import React, { useState, useEffect } from "react";
import "./advanceSearch.scss";
import DropdownList from "../dropdowns/dropdownList";
import FreelancerTypeBadge from "../freelancer/freelancerTypeBadge";
import { useSelector } from "react-redux";
import { CountryList } from "../../utils/countrylist";
import { ENDPOINT } from "../../utils/endpoint";
import request from "../../utils/request";
import { getOptions, postOptions } from "../../utils/httpConfig";
import { GetAmountPerDay, GetAmountPerHour } from "../../utils/currency";
function FreelancerAdvanceSearch(props) {
  const [Skills, setSKills] = useState([]);
  const languageReducer = useSelector((state) => state.languageReducer);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  useEffect(() => {
    bindSkills();
  }, []);
  const bindSkills = async () => {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=Skills`,
      getOptions({})
    );
    if (result.success) {
      for (let index = 0; index < result.result.data[0].data.length; index++) {
        const element = result.result.data[0].data[index];
        array.push({
          text: element.name,
          value: element.name.toString(),
        });
      }
      setSKills(array);
    }
  };
  return (
    <div className="card_box">
      <div className="freelancer-advance-search">
        <div className="top-dropdown">
          <div className="filter-top-item">
            <label> Selected Freelancer type : </label>
            <div className="filter-dropdown-width">
              <FreelancerTypeBadge
                freelancerType={
                  props.filter.freelancerType || "All Freelancers"
                }
              />
              <DropdownList
                noborder
                id="projectType"
                name="projectType"
                placeholder="projectType"
                value={props.filter.freelancerType}
                items={languageReducer.freelancerTypes.map((item) => {
                  if (item.value === "Any") {
                    return {
                      text: "All Freelancers",
                      value: "All Freelancers",
                    };
                  } else {
                    return { text: item.text, value: item.value };
                  }
                })}
                selectItem={(value) => {
                  props.handleUpdateFilterValues(value, "freelancerType");
                }}
              />
            </div>
          </div>
          <div className="filter-top-item1">
            <label> Business Category : </label>
            <div className="filter-dropdown-width">
              <DropdownList
                noborder
                id="businessCategory"
                name="businessCategory"
                placeHolder="All Categories"
                value={props.filter.businessCategory}
                items={languageReducer.projectScopes}
                selectItem={(value) => {
                  props.handleUpdateFilterValues(value, "businessCategory");
                }}
              />
            </div>
          </div>
          <div className="filter-top-item2">
            <label> Country: </label>
            <div className="filter-dropdown-width">
              <DropdownList
                enableAutoComplete
                noborder
                id="Country"
                name="Country"
                placeHolder="Any Country"
                value={props.filter.country}
                items={CountryList.map((item) => ({
                  text: `${item.name.slice(0, 16)}${
                    item.name.length > 16 ? "..." : ""
                  }`,
                  value: item.name,
                }))}
                selectItem={(value) => {
                  props.handleUpdateFilterValues(value, "country");
                }}
              />
            </div>
          </div>
        </div>
        <div className="selected-filters-area">
          {props.filter.projectType && (
            <div className="selected-filters-area-item">
              {" "}
              {props.filter.projectType}
              <span
                onClick={() => props.handleFilterProject("", "projectType")}
              >
                X
              </span>{" "}
            </div>
          )}
          {props.filter.country && (
            <div className="selected-filters-area-item">
              {props.filter.country}{" "}
              <span
                onClick={() => props.handleUpdateFilterValues("", "country")}
              >
                X
              </span>{" "}
            </div>
          )}
          {props.filter.businessCategory && (
            <div className="selected-filters-area-item">
              {props.filter.businessCategory}{" "}
              <span
                onClick={() =>
                  props.handleUpdateFilterValues("", "businessCategory")
                }
              >
                X
              </span>{" "}
            </div>
          )}
        </div>
      </div>
      <div className="all-freelancer-search-by-area">
        <p>Search By </p>
        <div
        hidden
          onClick={() =>
            props.handleUpdateFilterValues(!props.filter.basic, "basic")
          }
          className={`all-freelancer-search-by-area-item ${
            props.filter.basic === true ? "active" : ""
          }`}
        >
          <i className="fa fa-circle" /> Basic
        </div>
        <div className="filter-dropdown-width">
          <DropdownList
            enableAutoComplete
            id="yearOfExperience"
            name="yearOfExperience"
            placeHolder="Experience"
            value={props.filter.experience}
            items={[
              { text: languageType.LESS_THAN_2, value: "2" },
              { text: languageType.LESS_THAN_3, value: "3" },
              { text: languageType.LESS_THAN_5, value: "4" },
              { text: languageType.LESS_THAN_10, value: "5" },
              { text: languageType.Over_10, value: "10" },
            ]}
            selectItem={(value) => {
              props.handleUpdateFilterValues(value, "experience");
            }}
          />
        </div>
        <div className="filter-dropdown-width1">
          <DropdownList
            enableAutoComplete
            id="Skills"
            name="Skills"
            placeHolder="Skills"
            value={props.filter.skills}
            items={Skills}
            selectItem={(value) => {
              props.handleUpdateFilterValues(value, "skills");
            }}
          />
        </div>
        <div className="filter-dropdown-width2">
          <DropdownList
             enableAutoComplete
            id="minHourlyRateFilter"
            name="minHourlyRateFilter"
            placeHolder="From Amount"
            value={props.filter.minHourlyRate}
            selectItem={(value) => {
              props.handleUpdateFilterValues(value, "minHourlyRate");
            }}
            items={GetAmountPerHour("USD")}
          />
        </div>
        <div className="filter-dropdown-width2">
          <DropdownList
             enableAutoComplete
            id="maxHourlyRateFilter"
            name="maxHourlyRateFilter"
            placeHolder={languageType.TO_AMOUNT}
            value={props.filter.maxHourlyRate}
            selectItem={(value) => {
              props.handleUpdateFilterValues(value, "maxHourlyRate");
            }}
            items={GetAmountPerHour("USD").filter((item)=>Number(item.value)>Number(props.filter.minHourlyRate))}
          />
        </div>
        <div className="advance-search-filter" onClick={()=>props.handleGetFreelancersWithAdvanceSearch()}>
         <i className="fa fa-search"></i> Search
        </div>
      </div>
    </div>
  );
}

export default FreelancerAdvanceSearch;
