import React, { useState } from "react";
import "./allprojects.scss";
import DropdownList from "../../../components/dropdowns/dropdownList";
import ProjectTypeBadge from "../../../components/project/projectTypeBadge";
import { useSelector } from "react-redux";
import { CountryList } from "../../../utils/countrylist";
function TopFilter(props) {
  const languageReducer = useSelector((state) => state.languageReducer);

  return (
    <div className="card_box project_filterArea_allProjects">
      <div className="projects-top-filters-area">
        <div className="top-dropdown">
          <div className="filter-top-item">
            <label> Selected Project type : </label>
            <div className="filter-dropdown-width">
              <ProjectTypeBadge
                projectType={props.filter.projectType || "All Projects"}
              />
              <DropdownList
                noborder
                enableAutoCompleteSearch
                id="projectType"
                name="projectType"
                placeholder="projectType"
                value={props.filter.projectType}
                items={languageReducer.projectTypes}
                selectItem={(value) => {
                  props.handleFilterProject(value, "projectType");
                }}
              />
            </div>
          </div>
          <div className="filter-top-item1">
            <label> Business Category : </label>
            <div className="filter-dropdown-width">
              <DropdownList
                noborder
                enableAutoCompleteSearch
                id="businessCategory"
                name="businessCategory"
                placeHolder="All Categories"
                value={props.filter.businessCategory}
                items={languageReducer.projectScopes}
                selectItem={(value) => {
                  props.handleFilterProject(value, "businessCategory");
                }}
              />
            </div>
          </div>
          <div className="filter-top-item2">
            <label> Country: </label>
            <div className="filter-dropdown-width">
              <DropdownList
                enableAutoComplete
                enableAutoCompleteSearch
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
                  props.handleFilterProject(value, "country");
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
              <span onClick={() => props.handleFilterProject("", "country")}>
                X
              </span>{" "}
            </div>
          )}
          {props.filter.businessCategory && (
            <div className="selected-filters-area-item">
              {props.filter.businessCategory}{" "}
              <span
                onClick={() =>
                  props.handleFilterProject("", "businessCategory")
                }
              >
                X
              </span>{" "}
            </div>
          )}
        </div>
        <div className="all-project-top-filter-area">
          <p>Search By </p>
          <div
            onClick={() => props.handleSortFilter("Basic")}
            className={`all-project-top-filter-area-item ${
              props.sortFilter === "Basic" ? "active" : ""
            }`}
          >
            <i className="fa fa-circle" /> Basic
          </div>
          <div
            onClick={() => props.handleSortFilter("High Amount")}
            className={`all-project-top-filter-area-item ${
              props.sortFilter === "High Amount" ? "active" : ""
            }`}
          >
            <i className="fa fa-circle" /> High Amount
          </div>
          <div
            onClick={() => props.handleSortFilter("End Soon")}
            className={`all-project-top-filter-area-item ${
              props.sortFilter === "End Soon" ? "active" : ""
            }`}
          >
            <i className="fa fa-circle" /> End Soon
          </div>
          <div
            onClick={() => props.handleSortFilter("Matching Skills")}
            className={`all-project-top-filter-area-item ${
              props.sortFilter === "Matching Skills" ? "active" : ""
            }`}
          >
            <i className="fa fa-circle" /> Matching Skills
          </div>
          <div
            onClick={() => props.handleSortFilter("Location")}
            className={`all-project-top-filter-area-item ${
              props.sortFilter === "Location" ? "active" : ""
            }`}
          >
            <i className="fa fa-circle" /> Location
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopFilter;
