import React, { Component } from "react";

class CheckboxCard extends Component {
  render() {
    let { title, data, type, question, languageType } = this.props;
    return (
      <div className="card_box checkbox-card">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-12 ">
            <h5>{title}</h5>
          </div>
          {data &&
            data.length > 0 &&
            data.map((obect, index) => (
              <div className="col-md-12 col-4 columnPadding_mobile_customCheckbox" key={index}>
                <div className="custom-control custom-checkbox">
                  <input
                    style={{ cursor: "pointer" }}
                    type="checkbox"
                    className="custom-control-input"
                    name={obect.name}
                    onChange={(event) => {
                      this.props.onChange(event, type, index, obect.title);
                    }}
                    checked={obect.checked}
                    id={obect.name}
                    required
                  />
                  <label className="custom-control-label" htmlFor={obect.name}>
                    {" "}
                    {obect.title === "All Projects"
                      ? languageType.ALL_PROJECTS
                      : obect.title + " "}{" "}
                    {/*  {obect.title+ " "} */}
                    {question && index > 0 && (
                      <i
                        className="fa fa-question-circle"
                        aria-hidden="true"
                      ></i>
                    )}
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default CheckboxCard;
