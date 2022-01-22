import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import v4 from "uuid";
import React, { Component } from "react";
import { ReactNotifyAlert } from "react-notify-alert";
import "react-notify-alert/dist/index.css";
import { connect } from "react-redux";
import DeleteModal from "../../components/modals/deleteModal.js";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions, postOptions } from "../../utils/httpConfig";
import notifications from "../../utils/notifications";
import request from "../../utils/request";
import AddressManipulation from "./addressmanipulation";
import { isEmpty, stubTrue } from "lodash";
import moment from "moment";
import Heading from "../../components/postProject/heading";
import { selectSubScopes, selectSubScopesFromScope } from "../../utils/helpers";
import "./work.scss";
import SubHeader from '../../components/subHeader/index'
class MyRegion extends Component {
  myMap = React.createRef();
  myRange = React.createRef(30);
  constructor(props) {
    super(props);
    let sessionUserType = sessionStorage.getItem("userType");

    this.state = {
      openAlert: false,
      addNewAddressFlag: false,
      openDeleteAlert: false,
      currentLocation: {
        lat: 37.550844,
        lng: 126.988552,
      },
      countries: [],
      range: 30,
      zoom: 17,
      cities: [],
      coords: [
        { lat: 37.545936, lng: 126.977823, range: 100 },

        { lat: 37.556397, lng: 126.994634, range: 80 },

        { lat: 37.561474, lng: 126.979881, range: 50 },

        { lat: 37.583965, lng: 126.944493, range: 120 },
      ],
      postUserId: props.authUser?.myAuth?.user?.userId,
      projectsMapViewData: [],
      activeTab: 1,
      getAllLocations: {},
      businessCategory: "",
      businessCategories: [],
      isMain: false,
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 },
      ],
      bounds: {},
      markerHtml: "",
      infoHtml: "",
      alertSetting: { open: false, type: "", title: "", message: "" },
      currentAddress: {},
      userType: sessionUserType,
      pagination: { pageSize: 100, lastPkEvaluated: "", pageNumber: 1 },
      isSkeletonLoading: false,
      freelancerData: [],
      lastPkEvaluatedTrack: [],
      projectTypes: [],
      showingInfoWindow: true,
      activemarker: {},
    };
  }

  //Start onLOad
  async componentDidMount() {
    await this.BindAllLocations();
    await this.bindCountry();
    await this.getBusinessCategories();
  }
  //End onLoad

  async getBusinessCategories() {
    let categoryResponse = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=businessCategory`,
      getOptions({})
    );

    // debugger;
    if (categoryResponse.success) {
      this.setState({
        businessCategories:
          categoryResponse &&
          categoryResponse.result &&
          categoryResponse.result.data &&
          categoryResponse.result.data[0] &&
          categoryResponse.result.data[0].data,
      });
    } else {
      notifications.showError(categoryResponse && categoryResponse.message);
    }
  }

  //Start Bind General Setting
  bindCountry = async () => {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=Countries`,
      getOptions({})
    );
    if (result.success) {
      if (result.result.data.length > 0) {
        for (
          let index = 0;
          index < result.result.data[0].data.length;
          index++
        ) {
          const element = result.result.data[0].data[index];
          array.push({
            id: element.id,
            name: element.name,
          });
        }
        this.setState({ countries: array });
      } else {
        alert("No Country");
      }
    } else {
      alert("No Country");
    }
  };
  bindCities = async (countryId) => {
    let array = [];
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=city_country_` + countryId,
      getOptions({})
    );
    if (result.success) {
      if (result.result.data.length > 0) {
        for (
          let index = 0;
          index < result.result.data[0].data.length;
          index++
        ) {
          const element = result.result.data[0].data[index];
          array.push({
            id: element.id,
            name: element.name,
          });
        }
        this.setState({ cities: array });
      } else {
        alert("No City");
      }
    } else {
      alert("No City");
    }
  };

  //End Bind General Setting
  //Start Address Manage Function
  onAddressSubmit = async (data) => {
    let result = await request(
      `${ENDPOINT["GeneralSettings"]}?settingName=city_info_` + data.cityId,
      getOptions({})
    );
    if (result.success) {
      if (result.result.data.length > 0) {
        for (
          let index = 0;
          index < result.result.data[0].data.length;
          index++
        ) {
          const element = result.result.data[0].data[0].name;
          const info = JSON.parse(element);

          //Call CreateAddress as per LoginUserId
          var params = {
            city: info.name,
            street1: data.addressdetail,
            userId: this.state.postUserId,
            country: info.country_name,
            statename: info.state_name,
            isDefault: this.state.isMain,
            regionId: info.region,
            latitude: info.latitude,
            longitude: info.longitude,
          };

          let postresult = await request(
            ENDPOINT["PostUserAddress"],
            postOptions(params)
          );

          if (postresult.success) {
            this.closeModel();
            this.setState({
              alertSetting: {
                isOpen: true,
                type: result.success ? "success" : "failed",
                title: result.success ? "Success" : "Failed",
                infoText: "You have Successfully Added Address",
              },
            });
            //this.BindAllLocations();
          } else {
            notifications.showError(
              (postresult && postresult.message) || "Something went wrong"
            );
          }
        }
      }
    }
  };

  onUpdateAddress = async (data) => {
    data.isDefault = true;
    let postresult = await request(
      ENDPOINT["UpdateUserAddress"],
      postOptions(data)
    );

    if (postresult.success) {
      //this.BindAllLocations();
      this.setState({
        alertSetting: {
          isOpen: true,
          type: postresult.success ? "Success" : "Failed",
          title: postresult.success ? "Success" : "Failed",
          infoText: "You have Successfully Updated Address",
        },
      });
    } else {
      notifications.showError(postresult.message);
    }
  };

  onDeleteAddress = async (data) => {
    this.setState({ currentAddress: { ...data } }, () => {
      this.setState({ openDeleteAlert: true });
    });
  };

  //Tab Chane Function
  onTabChangeHandle = (selectedTab) => {
    this.setState({
      activeTab: selectedTab,
    });
  };

  //Start On Load Function
  BindAllLocations = async () => {
    let param = {
      userId: this.state.postUserId,
    };

    let result = await request(ENDPOINT["GetUserAddress"], postOptions(param));

    if (result.success) {
      this.setState({ getAllLocations: result.result });
      //Get Default Addresss and Bind Map

      if (result.result.length > 0) {
        let defaultLocation = result.result.filter(
          (item) => item.isDefault === true
        );

        if (defaultLocation != null) {
          if (defaultLocation.length > 0) {
            // debugger;
            let setDefaultLocation = {
              lat: parseFloat(defaultLocation[0].latitude, 10),
              lng: parseFloat(defaultLocation[0].longitude, 10),
            };

            let queryString =
              `?projectTypes=Office Work,Free Contract` +
              `&country=` +
              defaultLocation[0].country +
              `&city=` +
              defaultLocation[0].city +
              `&region=` +
              defaultLocation[0].regionId;

         

            this.setState({ currentLocation: setDefaultLocation });
          }
        }
        this.setState({ openAlert: false });
      } else {
        this.getUserLocation();
        this.setState({ openAlert: true });
      }
    } else {
      //this.getUserLocation();
      this.setState({ openAlert: true });
    }
  };
  getUserLocation() {
    if (navigator.geolocation) {
      //The working next statement.
      const scope = this;
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Set State to users position
          scope.setState({ currentLocation: scope.state.currentLocation });
        },
        function (e) {
          //Your error handling here
          console.log(e);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    }
  }

  //End On Load Function
  //Start Check Location
  componentWillUpdate(prevProps, nextState) {
    const prevRange = this.state.range;
    const nextRange = nextState.range;
    if (prevRange !== nextRange) {
      this.setState({ currentLocation: this.state.currentLocation });
    }
  }

  //End Check Location
  //Start Modal Actions
  closeModel = () => {
    this.setState({ currentAddress: {} });
    this.BindAllLocations();
    this.setState({
      alertSetting: { open: false, type: "", title: "", message: "" },
    });
  };

  openModal = () => {
    this.bindCountry();
    this.setState({ openAlert: true });
  };
  //End Modal Actions
  //Alert thing
  onActionHandle = async () => {
    let postResult = await request(
      ENDPOINT["DeleteUserAddress"],
      postOptions(this.state.currentAddress)
    );
    if (postResult.success) {
      this.setState({ openDeleteAlert: false });
    } else {
      notifications.showError(postResult && postResult.message);
    }
    this.closeModel();
  };
  //End




  handleAddNewAddress = () => {
    this.setState({ addNewAddressFlag: true });
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  };
  handleCancelAddress = () => {
    this.setState({ addNewAddressFlag: false });
  };

  render() {
    console.log("cun sas asm as sma ", this.state);
    //Start GOOGLE MAP
    const {
      currentLocation,
      userType,
      zoom,
      stores,
      activeTab,
      getAllLocations,
      addNewAddressFlag,
    } = this.state;
    const { lookUpData } = this.props;

    let { authUser, languageType } = this.props;
    //End GOOGLE MAP

    return (
      <>
      <SubHeader />
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-12 col-md-2"></div>
              <div className="col-lg-8 col-md-12">
                <div className="project_post">
                  <Heading
                    heading={"Register new address"}
                    color="#333333"
                    fontSize="26px"
                    fontWeight="600"
                    fontFamily="Raleway"
                    icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/addressIcon.svg"}
                    marginTop="6px"
                  
                  />
                  <br />
                  <AddressManipulation
                    handleCancelAddress={this.handleCancelAddress}
                    bindCities={this.bindCities}
                    cities={this.state.cities}
                    country={lookUpData.country}
                    countries={this.state.countries}
                    languageType={languageType}
                  />
                </div>

                <div className="project_post invoice_tab">
                  <div className="business_category post_form">
                    <div className="tab-content" id="pills-tabContent">
                      <Heading
                        heading={"All address"}
                        icon={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/resume1.png"}
                        color="#333333"
                        fontSize="26px"
                        fontWeight="600"
                        fontFamily="Raleway"
                      />
                      <button
                        type="submit"
                        className="btn cancel_btn my-3  "
                        onClick={
                          () => this.handleAddNewAddress()
                          // this.openModal()
                        }
                      >
                        Add New Address
                      </button>
                      <button
                        type="submit"
                        className="btn cancel_btn my-3 custom-address-button-margin"
                        onClick={() =>
                          this.props.history.push("/clients-region")
                        }
                      >
                        Client region
                      </button>
                      <button
                        type="submit"
                        className="btn cancel_btn my-3 custom-address-button2-margin"
                        onClick={() =>
                          this.props.history.push("/freelancers-region")
                        }
                      >
                        Freelancer region
                      </button>

                      <div className={"tab-pane fade show active"}>
                        <div className="business_category post_form registerAddress_tableMobile">
                          <div className="table-responsive detail_tbl feedback_tbl coupon_tbl">
                            {/*         My address list        */}
                            <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">No</th>
                                  <th scope="col">Main Address</th>
                                  <th scope="col">Region</th>
                                  <th scope="col">Country</th>
                                  <th scope="col">City</th>
                                  <th scope="col">Address Detail</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {getAllLocations &&
                                getAllLocations.length > 0 ? (
                                  getAllLocations.map((location, idx) => (
                                    <tr>
                                      <td>{idx + 1}</td>

                                      {location.isDefault == true ? (
                                        <td>
                                          <img
                                            width="30"
                                            height="-2px"
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/greenTick.svg"}
                                            alt="client-img"
                                            className="h-100"
                                          />{" "}
                                        </td>
                                      ) : (
                                        <td
                                          onClick={() =>
                                            this.onUpdateAddress(location)
                                          }
                                        >
                                          {" "}
                                          <img
                                            width="30"
                                            height="-2px"
                                            src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/tick.svg"}
                                            alt="client-img"
                                            className="h-100"
                                          />
                                        </td>
                                      )}

                                      <td>{location.regionId}</td>
                                      <td>{location.country}</td>
                                      <td> {location.city}</td>
                                      <td>
                                        {location.street1} {"  "}{" "}
                                        {location.street2} {location.statename}
                                      </td>

                                      <td>
                                        {" "}
                                        <button
                                          type="submit"
                                          className="btn cancel_btn"
                                          onClick={() =>
                                            this.onDeleteAddress(location)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      There is no data data to display
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-2"></div>
            </div>
          </div>
          <DeleteModal
            showModal={this.state.openDeleteAlert}
            ModalTitle={"Delete Address"}
            ModalMessage={"Are you sure to delete this Address ?"}
            emitToHideDeleteModal={(value) =>
              this.setState({ openDeleteAlert: value })
            }
            emitTheDeleteAction={() => this.onActionHandle()}
          />
          <ReactNotifyAlert
            isOpen={this.state.alertSetting.isOpen}
            type={this.state.alertSetting.type}
            title={this.state.alertSetting.title}
            infoText={this.state.alertSetting.infoText}
            onActionHandle={(e) => this.closeModel()}
          ></ReactNotifyAlert>
        </section> 
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    authUser: state.authReducer,
    userReducer: state.userReducer,
    activeRoute: state.routeStore.activeRoute,
    languageType: state.languageReducer.languageType,
    lookUpData: state.lookUp.lookUpData,
    languageReducer: state.languageReducer,

    // defaultAddress:state.lookUp.defaultAddress
  };
}

const WrappedContainer = GoogleApiWrapper({
  apiKey: "AIzaSyA8hPK8F-8BbO-8H6tQZuiopY5nYES1UR0",
  sensor: true,
})(MyRegion);

export default connect(mapStateToProps)(WrappedContainer);
