import React, { Component } from "react";
import { v4 } from "uuid";

class ExtensionLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPanelExpanded: true,
    };
  }
  onDataExapandHandle = () => {
    let { isPanelExpanded } = this.state;
    this.setState({
      isPanelExpanded: !isPanelExpanded
    })
  }
  render() {
    let { isPanelExpanded } = this.state;
    let { freelancer } = this.props;
    return (
      <>
        <div className="tested_skill">
          <div className="position_rel">
            <h4 className="green_text">
              Tested Skills
              <span className="viewDetail" onClick={() => this.onDataExapandHandle()}>
                <a className="plus_btn" role="button" aria-expanded="true" aria-expanded={isPanelExpanded}  > + </a>
              </span>
            </h4>
          </div>
          <div className={isPanelExpanded ? "collapse animaton-height show" : "collapse animaton-height"}  >
            <div className="testSkill_lbl">

              {
                freelancer.skills &&
                freelancer.skills.length > 0 &&
                freelancer.skills.map((skill, index) =>
                  <label key={`${v4()}`} className="d-flex justify-content-between">
                    <span>{skill}</span>
                    <span>Top 20%</span>
                  </label>
                )
              }
              { /*
              <label className="d-flex justify-content-between">
                <span>HTML</span>
                <span>Top 20%</span>
              </label>
              <label className="d-flex justify-content-between">
                <span>ASP.NET</span>
                <span>Top 20%</span>
              </label>
              <label className="d-flex justify-content-between">
                <span>PHP</span>
                <span>Top 20%</span>
              </label>
              <label className="d-flex justify-content-between">
                <span>HTML</span>
                <span>Top 20%</span>
              </label>
              <label className="d-flex justify-content-between">
                <span>C#</span>
                <span>Top 20%</span>
              </label>
               */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExtensionLeft;
