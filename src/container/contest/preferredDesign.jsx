import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import RightTop from "../../components/rightbar/rightTop";
import RightBottom from "../../components/rightbar/rightBottom";
// Redux
import {
  onReduxRouteChange,
  onReduxProjectConfirmationDataHandle,
} from "../../store/action/action";
import { connect } from "react-redux";
import notifications from "../../utils/notifications";
import { v4 } from "uuid";

class PreferredDesign extends Component {
  constructor(props) {
    super(props);
    const images = [];
    for (let i = 0; i < 16; i++) {
      images.push({
        id: v4(),
        img: `https://source.unsplash.com/collection/151521/200x170?${i}`,
      });
    }
    this.state = {
      max: 5,
      min: 1,
      currentData: 0,
      isCheckedValidate: false,
      styles: images,
      selectedStyles: [],
    };
  }

  checkValidationCheckbox(event) {
    let isSelected = event.currentTarget.checked;
    const styleId = event.currentTarget.dataset.id;
    if (isSelected) {
      if (this.state.currentData < this.state.max) {
        this.setState({
          currentData: this.state.currentData + 1,
          selectedStyles: [
            ...this.state.selectedStyles,
            this.state.styles.find((s) => s.id === styleId),
          ],
        });
      } else {
        event.preventDefault();
        event.currentTarget.checked = false;
        notifications.showError("You can only select maximum of 5 styles.");
      }
    } else {
      if (this.state.currentData > this.state.min) {
        this.setState({
          currentData: this.state.currentData - 1,
          selectedStyles: this.state.selectedStyles.filter(
            (s) => s.id !== styleId
          ),
        });
      } else {
        this.setState({
          currentData: this.state.currentData - 1,
          selectedStyles: this.state.selectedStyles.filter(
            (s) => s.id !== styleId
          ),
        });
      }
    }
    this.setState({ isCheckedValidate: event.currentTarget.checked });
    return;
  }

  onPageRedirectHandle = (redirectTo) => {
    if (!this.state.currentData) {
      notifications.showError("Select atleast one style.");
      return;
    }
    let confirmationData = {
      projectType: "contest",
      title: "Design My logo",
      confirmationType: "Guranteed",
      privateText: "yes",
      award: {
        first: "1st US$499.00",
        second: "2nd US$159.00",
        third: "3rd US$100.00",
      },
      promotion: "US$79.00",
      blind: "US$39.00",
      total: " US$798.00",
    };
    let newurl = redirectTo;
    let searchString = "?projectType=contest";
    this.props.onProjectConfirmationDataHandle(confirmationData);
    this.props.onRouteChange(redirectTo);
    this.props.history.push({
      pathname: newurl,
      search: searchString,
      state: this.state.selectedStyles,
    });
    notifications.showSuccess("Style selected successfully.");
  };
  render() {
    return (
      <>
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="project_post style_place">
                  <div className="style_label">
                    <div className="row align-items-center mb-5">
                      <div className="col-md-6">
                        <label>You can select maxium 5 styles</label>
                      </div>
                      <div className="col-md-6">
                        <div className="text-right save_cancel">
                          <button type="button" className="btn cancel_btn">
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn save_btn"
                            onClick={() =>
                              this.onPageRedirectHandle("/confirm-project")
                            }
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="style_box">
                    <div className="row align-items-center">
                      {this.state.styles.map((e, index) => {
                        return (
                          <div className="col-md-3" key={e.id}>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="exampleCheck"
                              data-id={e.id}
                              id={`exampleCheck${index}`}
                              onChange={this.checkValidationCheckbox.bind(this)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`exampleCheck${index}`}
                            >
                              <img src={e.img} alt="" />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12">
                <RightTop />
                <RightBottom />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    languageType: state.languageReducer.languageType,
    language: state.languageReducer.language,
    activeRoute: state.routeStore.activeRoute,
  };
}
function mapDispatchProps(dispatch) {
  return {
    onRouteChange: (activeRoute) => {
      dispatch(onReduxRouteChange(activeRoute));
    },
    onProjectConfirmationDataHandle: (data) => {
      dispatch(onReduxProjectConfirmationDataHandle(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(PreferredDesign);
