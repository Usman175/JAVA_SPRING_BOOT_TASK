import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import LightCloseIcon from "../../assets/img/LightCloseIcon.svg";
import DropdownList from "../dropdowns/dropdownList";

export default class LocationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryId: "",
      cityId: "",
      citylist: [],
      addressdetail: "",
      errorMessage: {},
    };
  }

  cleanUp() {
    this.setState({
      countryId: "",
      cityId: "",
      citylist: [],
      addressdetail: "",
      errorMessage: {},
    });
  }

  handleValidation() {
    let { languageType } = this.props;
    let errorMessage = {};
    let formIsValid = true;

    if (!this.state.countryId || this.state.countryId.length <= 0) {
      formIsValid = false;
      errorMessage["country"] = languageType.REQUIRED_MESSAGE;
    } else if (
      !this.state.cityId ||
      this.state.cityId === null ||
      this.state.cityId === ""
    ) {
      formIsValid = false;
      errorMessage["city"] = languageType.REQUIRED_MESSAGE;
    } else if (
      !this.state.addressdetail ||
      this.state.addressdetail === null ||
      this.state.addressdetail === ""
    ) {
      formIsValid = false;
      errorMessage["addressdetail"] = languageType.REQUIRED_MESSAGE;
    }

    this.setState({ errorMessage: errorMessage });
    console.log(this.state.errorMessage);
    return formIsValid;
  }

  async onPageRedirectHandle() {
    if (this.handleValidation()) {
      this.props.onsubmit(this.state);
    }
  }

  render() {
    let {
      countries,
      show,
      handleClose,
      bindCities,
      cities,
      onsubmit,
      languageType,
    } = this.props;

    let { countryId } = this.state;

    return (
      <Modal
        show={this.props.show}
        centered
        size={"md"}
        backdrop={true}
        contentClassName="jungle-modal-content p-0 w-100"
      >
        <Modal.Header
          className="position-relative d-flex align-items-center addAddress_modal__header"
          // closeButton={handleCloseButton}
        >
          <span
            onClick={() => {
              this.cleanUp();
              this.props.handleClose();
            }}
            className="custom-close custom-position d-flex justify-content-center align-items-center"
          >
            <img src={LightCloseIcon} height={30} />
          </span>
        </Modal.Header>

        <Modal.Body className="p-0 welcome-body">
          <div className="px-3 pb-3 px-md-5">
            <h5 className="headeraddress">Add your location</h5>

            <DropdownList
              id="country"
              name="country"
              enableAutoCompleteSearch
              placeHolder="Country"
              className="addressbox "
              value={this.state.countryId}
              selectItem={(value) => {
                this.props.bindCities(value);
                this.setState({ countryId: value, cityId: "" });
              }}
              items={this.props.countries.map((country) => ({
                text: country.name,
                value: country.id,
              }))}
            />

            {this.state.errorMessage.country && (
              <p className="addAddress_modal__errorMsg">
                {this.state.errorMessage.country}
              </p>
            )}

            <DropdownList
              id="city"
              name="city"
              enableAutoCompleteSearch
              placeHolder="City"
              disabled={!countryId && true}
              className={`addressbox ${!countryId ? "cursor-NA" : ""}`}
              value={this.state.cityId}
              selectItem={(value) => {
                this.setState({ cityId: value });
              }}
              items={this.props.cities.map((city) => ({
                text: city.name,
                value: city.id,
              }))}
            />
            {this.state.errorMessage.city && (
              <p className="addAddress_modal__errorMsg">
                {this.state.errorMessage.city}
              </p>
            )}
            <textarea
              className="addressbox form-control"
              id="addressdetail"
              rows="3"
              placeholder="Address Detail"
              onChange={(e) => {
                this.setState({ addressdetail: e.target.value });
              }}
            />

            {this.state.errorMessage.addressdetail && (
              <p className="addAddress_modal__errorMsg">
                {this.state.errorMessage.addressdetail}
              </p>
            )}

            <div className="save_cancel form-group">
              <button
                type="submit"
                className="btn cancel_btn "
                onClick={() => {
                  this.onPageRedirectHandle();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
