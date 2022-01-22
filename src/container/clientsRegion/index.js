import React, { useState, useEffect } from "react";
import "./clientsRegion.css";
import "./clientsRegion.scss";
import MapFreelancer from "./map";
import ProjectTypeBadge from "../../components/project/projectTypeBadge";
import SubHeader from "../../components/subHeader";
import Slider, { SliderTooltip } from "rc-slider";
import { useDispatch, useSelector } from "react-redux";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Status from "../../components/status/status";
import Pagination from "../../components/pagination";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import ShowMoreText from "react-show-more-text";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import {
  getOptions,
  postOptions,
  postMultipartFile,
} from "../../utils/httpConfig";
import {
  GET_IMAGE_PREFIX,
  GET_IMAGE_PREFIX1,
} from "../../store/constants/constant";

import "./assets.less";
import DropDownModal from "./selectionModal";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NoDataAvailable from "../../shared/error/not-data-available-new";
import Skeleton from "../../components/skeleton/skeleton";
import { getProfileImage } from "../../utils/getProfileUrl";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const imageUrl = "https://dxnqsgisijbjj.cloudfront.net/jungleworks/image/";
const matchingScop = [
  {
    name: "design",
    icon: "designColor.svg",
  },
  {
    name: "web",
    icon: "WebColor.svg",
  },
  {
    name: "legal",
    icon: "LawColor.svg",
  },
  {
    name: "marketing",
    icon: "marketingColor.svg",
  },
  {
    name: "video",
    icon: "VideoGoodColor.svg",
  },
  {
    name: "engineering",
    icon: "compassColor.svg",
  },
  {
    name: "translation",
    icon: "TranslationColor.svg",
  },
  {
    name: "writing",
    icon: "WritingColor.svg",
  },
  {
    name: "tutorial",
    icon: "onlineTeachingColor.svg",
  },
  {
    name: "realEstate",
    icon: "realestatecolor.svg",
  },
  {
    name: "admin",
    icon: "ClipColor.svg",
  },
  {
    name: "customerService",
    icon: "headsetColor.svg",
  },
  {
    name: "internationalTrade",
    icon: "InternationalTradeColor.svg",
  },
];

function ClientRegion(props) {
  const [modal, setModal] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const [businessSubCategoryList, setBusinessSubCategoryList] = useState([]);
  const [businessCategory, setBusinessCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [allSubCategory, toggleAllSubCategory] = useState(false);
  const [freelancerType, setFreelancerType] = useState({});
  const languageReducer = useSelector((state) => state.languageReducer);
  const [loading, setLoading] = useState(false);
  const [hourlyRate, setHourlyRate] = useState([10, 50]);
  const [dailyRate, setDailyRate] = useState([0, 500]);
  const [geoLocation,setGeoLocation] = useState('');
  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
    total: 10,
  });
  const [freelancers, setFreelancers] = useState([]);
  let iconName = matchingScop.filter(
    (item) => item.name === businessCategory?.value
  );
  const authUser = useSelector((state) => state.authReducer);

  const onSelectSubCategory = (category) => {
    let categoryData = [...selectedSubCategory];
    let checkCategory = 0;
    let findAllIndex = -1;
    if (selectedSubCategory.length) {
      let findIndex = -1;
      categoryData.find(function (item, i) {
        if (item.value === category.value) {
          findIndex = i;
          return i;
        }
      });
      if (findIndex !== -1) {
        categoryData.splice(findIndex, 1);
      } else {
        categoryData.push(category);
      }
    } else {
      categoryData.push(category);
    }
    categoryData.find(function (item, i) {
      if (item.value !== "all") {
        checkCategory += 1;
      } else {
        findAllIndex = i;
      }
    });
    if (
      categoryData.length === businessSubCategoryList.length ||
      (findAllIndex === -1 &&
        checkCategory &&
        checkCategory === businessSubCategoryList.length - 1)
    ) {
      toggleAllSubCategory(true);
      setSelectedSubCategory(businessSubCategoryList);
    } else {
      if (findAllIndex !== -1) {
        categoryData.splice(findAllIndex, 1);
        toggleAllSubCategory(false);
      }
      setSelectedSubCategory(categoryData);
    }
  };

  useEffect(() => {
    setSelectedSubCategory([]);
  }, [businessCategory]);

  useEffect(() => {
    if (authUser?.myAuth?.user?.userId) {
      getNearByFreelancers();
      setLoading(true);
    }
  }, [freelancerType, businessCategory, hourlyRate,dailyRate,geoLocation]);

  const onSelectAllSubCategory = () => {
    if (allSubCategory) {
      toggleAllSubCategory(false);
      setSelectedSubCategory([]);
    } else {
      toggleAllSubCategory(true);
      let categoryData = [...businessSubCategoryList];
      setSelectedSubCategory(categoryData);
    }
  };
  const getNearByFreelancers = async (move) => {
    let userId = authUser?.myAuth?.user?.userId;
    let distance = "50km";
    let pageNumber = pagination.pageNumber;
    if (move === "next") {
      setPagination({
        ...pagination,
        pageNumber: pagination.pageNumber + 1,
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      setPagination({
        ...pagination,
        pageNumber: pagination.pageNumber - 1,
      });
      pageNumber = pageNumber - 1;
    }
    let freelancerTypes =
      freelancerType.value === "Any"
        ? `IndividualFreelancer,Client,Organization,Headhunter`
        : freelancerType.value
        ? freelancerType.value
        : "";
    let businessCategoryValue = businessCategory.value
      ? businessCategory.value
      : "";
    let minHourlyRate = hourlyRate[0] ? hourlyRate[0] : 10;
    let maxHourlyRate = hourlyRate[1] ? hourlyRate[1] : 50;
      let minDailyRate=dailyRate[0]?dailyRate[0]:0
      let maxDailyRate=dailyRate[1]?dailyRate[1]:500
    let result = await request(
      `${ENDPOINT["GetNearbyFreelancers"]}?distance=${distance}&userId=${userId}&pageNumber=${pageNumber}&pageSize=${pagination.pageSize}&freelancerType=${freelancerTypes}&businessCategory=${businessCategoryValue}&minHourlyRate=${minHourlyRate}&maxHourlyRate=${maxHourlyRate}&minDailyRate=${minDailyRate}&maxDailyRate=${maxDailyRate}&geoLocation=${geoLocation}`,
      getOptions({})
    );
    if (result.success) {
      setFreelancers(result.result.entries);
      setPagination({
        pageNumber: result.result.pageNumber || result.result.pageNumer,
        pageSize: result.result.pageSize,
        total: result.result.total,
      });
      setLoading(false);
    } else {
    }
    setLoading(false);
  };

const suggestionSelect=(result, lat, lng, text)=>{
  setGeoLocation(`${lat},${lng}`)
console.log(result, lat, lng, text,"ddddddddd")
}
  return (
    <>
      <SubHeader />
      <div className="client-region-page">
        {/* <div className="bcknd_container"> */}
        <div className="region-top-bar">
          <p> Your current address vactine city korea , South korea </p>
          <div className="change-address-button">Change</div>
        </div>
        <div className="map-area">
          <MapFreelancer
            savedLocation={authUser?.clientAuth?.location?.split(",")}
            freelancers={freelancers}
          />
          <div
            className={
              !filterToggle
                ? "top-filter-maps top-filter-maps-wrapper top-filter-maps-close"
                : "top-filter-maps top-filter-maps-wrapper"
            }
          >
            <div className="top-search-area">
            <div className="auto-suggestion-input">
            <MapboxAutocomplete publicKey={process.env.REACT_APP_MAP_BOX_KEY}
                    inputClass='form-control search'
                    onSuggestionSelect={suggestionSelect}
                    // country='us'
                    placeholder="Area, subway, Train station"
                    resetSearch={false}/>
            </div>
              {/* <input type="text" placeholder="Area, subway, Train station" /> */}
              <div className="search-icon-area">
                <i className="fa fa-search"></i>
              </div>
            </div>
            <div className="project-sub-filter-area">
              <div
                className="project-type-filter"
                onClick={() => setModal({ type: "projectType" })}
              >
                <div>Freelancer Type</div>
                <i className="fa fa-angle-down"></i>
              </div>
              <div
                className="business-category-filter"
                onClick={() => setModal({ type: "scope" })}
              >
                <div>Business Category</div>
                <i className="fa fa-angle-down"></i>
              </div>
              <div
                className="sorting-filter"
                onClick={() => setFilterToggle(!filterToggle)}
              >
                <i className="fa fa-sliders"></i>
              </div>
            </div>
            <div
              className={
                !filterToggle ? "hidden-content" : "hidden-content open"
              }
            >
              <div className="filter-map-content">
                <div className="project-type-area">
                  Freelancer Type{" "}
                  {freelancerType?.value ? (
                    <div className="freelancer-type-badge">
                      {freelancerType?.value}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="sub-business-category">
                  Business Category{" "}
                  {iconName.length ? (
                    <img src={imageUrl + iconName[0].icon} />
                  ) : (
                    ""
                  )}{" "}
                  {businessCategory?.text ? businessCategory.text : ""} <br />
                  <div class="d-flex align-items-center business-scope-area-12">
                    {businessSubCategoryList.map((data, index) => (
                      <div class="checkbox-for-business-scope">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            data.value === "all"
                              ? onSelectAllSubCategory()
                              : onSelectSubCategory(data);
                          }}
                          checked={
                            selectedSubCategory.length &&
                            selectedSubCategory.find(
                              ({ value }) => value === data.value
                            )
                              ? true
                              : false
                          }
                          className="custom-checkbox-styled"
                          id={`styled-checkbox-business-` + index}
                        />
                        <label for={`styled-checkbox-business-` + index}>
                          {data.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rang-box-rate">
                  <h2>Hourly Rate</h2>
                  <br />
                  <Range
                    min={5}
                    max={50}
                    defaultValue={[5, 100]}
                    value={hourlyRate}
                    onChange={(value) => setHourlyRate(value)}
                    tipFormatter={(value) => `${value}$`}
                  />
                  <div className="rang-label-area">
                    <div className="rang-label-item">
                      <div className="label-bar"> | </div>
                      <div className="label-content">5$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "12%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">15$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "19%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">25$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "19%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">35$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "18%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">45$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ textAlign: "right" }}
                    >
                      <div className="label-bar"> | </div>
                      <div
                        className="label-content"
                        style={{ marginRight: "-10px", marginLeft: "0px" }}
                      >
                        50$
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rang-box-rate" style={{ borderBottom: "none" }}>
                  <h2>Daily Rate</h2>
                  <br />
                  <Range
                    min={50}
                    max={500}
                    value={dailyRate}
                    onChange={(value) => setDailyRate(value)}
                    tipFormatter={(value) => `${value}$`}
                  />
                  <div className="rang-label-area">
                    <div className="rang-label-item">
                      <div className="label-bar"> | </div>
                      <div className="label-content">50$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "14%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">150$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "18%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">250$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "18%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">350$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ paddingLeft: "16%" }}
                    >
                      <div className="label-bar"> | </div>
                      <div className="label-content">450$</div>
                    </div>
                    <div
                      className="rang-label-item"
                      style={{ textAlign: "right" }}
                    >
                      <div className="label-bar"> | </div>
                      <div
                        className="label-content"
                        style={{ marginRight: "-10px", marginLeft: "0px" }}
                      >
                        500$
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-lists-area">
            <div className="project-lists-top">
              <h1>지역 목록 5개</h1>
              <div className="refresh-area">
                <i className="fa fa-refresh"></i>
              </div>
            </div>
            <div className="sub-heading">이 지역 최신 방</div>
            <div className="project-lists-detail">
              {freelancers.map((item, index) => (
                <div className="freelancer-lists-item">
                  <div className="left-profile-area">
                    <span className="freelancer-profile-area">
                      <BootstrapTooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        arrow
                        placement="left"
                        title={item.userName}
                      >
                        <img
                          src={getProfileImage(item.userProfileUrl)}
                          alt=""
                          className="freelancer-profile-img"
                        />
                      </BootstrapTooltip>

                      <Status status={"online" || "offline"} />
                      {item.individualFreelancerId ? (
                        <div className="individual-label">Individual</div>
                      ) : (
                        <div className="company-label">Company</div>
                      )}
                    </span>
                  </div>
                  <div className="right-area">
                    <div className="project-top-area">
                      <h3>{item.userTitle}</h3>
                      <div className="search-button">
                        <i className="fa fa-search"></i>
                      </div>
                    </div>
                    <div className="project-amount-area">
                      US$ {item.profileHourlyRate || "0"}/hr~US${" "}
                      {item.profileDailyRate || "0"}/day
                    </div>
                    <div className="project-detail-ara">
                      <ShowMoreText
                        lines={2}
                        more="show more"
                        less={"show less"}
                        className="content-css"
                        anchorClass="view-more-less"
                        expanded={false}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.professionalOverview,
                          }}
                        ></p>
                      </ShowMoreText>
                    </div>
                  </div>
                </div>
              ))}
              {!loading && freelancers?.length <= 0 ? (
                <NoDataAvailable
                  title="Sorry no freelance in your area!"
                  buttonText="View more freelancers"
                  path="/all-freelancer"
                  color={"#0d2146"}
                  {...props}
                />
              ) : (
                <Skeleton count={4} isSkeletonLoading={loading} />
              )}
              {freelancers?.length > 0 && (
                <Pagination
                  isPreviousPage={pagination.pageNumber > 1 ? true : false}
                  isNextPage={
                    pagination.pageNumber * pagination.pageSize <
                    pagination.total
                      ? true
                      : false
                  }
                  lastPkEvaluatedTrack={freelancers}
                  pageNumber={pagination.pageNumber}
                  moveBack={() => getNearByFreelancers("prev")}
                  moveNext={() => getNearByFreelancers("next")}
                />
              )}
            </div>
          </div>
        </div>
        {/* </div> */}
        <DropDownModal
          modal={modal}
          projectScopes={languageReducer.projectScopes}
          freelancerTypes={languageReducer.freelancerTypes}
          setModal={setModal}
          selectedValue={
            modal
              ? modal.type === "scope"
                ? businessCategory
                : freelancerType
              : ""
          }
          onSelect={
            modal
              ? modal.type === "scope"
                ? setBusinessCategory
                : setFreelancerType
              : ""
          }
          setBusinessSubCategoryList={setBusinessSubCategoryList}
        />
      </div>
    </>
  );
}

export default ClientRegion;
