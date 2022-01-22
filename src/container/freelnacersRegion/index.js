import React, { useState, useEffect } from "react";
import "./freelnacersRegion.css";
import "./freelnacersRegion.scss";
import MapFreelancer from "./map";
import ProjectTypeBadge from "../../components/project/projectTypeBadge";
import Slider, { SliderTooltip } from "rc-slider";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../../components/subHeader"; 
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "./assets.less";
import DropDownModal from './selectionModal'
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
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NoDataAvailable from "../../shared/error/not-data-available-new";
import Skeleton from "../../components/skeleton/skeleton";
import Format from "../../components/numberFormat";
import Currency from "../../components/currency";
import FormatDWH from "../../components/formatDWH";

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
const matchingScop = [{
  name: "design",
  icon: "designColor.svg"
}, {
  name: "web",
  icon: "WebColor.svg"
}, {
  name: "legal",
  icon: "LawColor.svg"
}, {
  name: "marketing",
  icon: "marketingColor.svg"
}, {
  name: "video",
  icon: "VideoGoodColor.svg"
}, {
  name: "engineering",
  icon: "compassColor.svg"
}, {
  name: "translation",
  icon: "TranslationColor.svg"
}, {
  name: "writing",
  icon: "WritingColor.svg"
}, {
  name: "tutorial",
  icon: "onlineTeachingColor.svg"
}, {
  name: "realEstate",
  icon: "realestatecolor.svg"
}, {
  name: "admin",
  icon: "ClipColor.svg"
}, {
  name: "customerService",
  icon: "headsetColor.svg"
}, {
  name: "internationalTrade",
  icon: "InternationalTradeColor.svg"
}];

function FreelancersRegion(props) {
  const [modal, setModal] = useState(false)
  const [filterToggle, setFilterToggle] = useState(false);
  const [businessSubCategoryList, setBusinessSubCategoryList] = useState([]);
  const [businessCategory, setBusinessCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [allSubCategory, toggleAllSubCategory] = useState(false);
  const [ProjectType, setProjectType] = useState({});
  const [hourlyRate, setHourlyRate] = useState([10, 50]);
  const [dailyRate, setDailyRate] = useState([0, 500]);
  const [geoLocation,setGeoLocation] = useState('');
  const [loading,setLoading]=useState(false)

  const [pagination, setPagination] = useState({
    pageSize: 10,
    pageNumber: 1,
    total: 10,
  });
  const [projectData, setProjectData] = useState([]);

  const languageReducer = useSelector((state) => state.languageReducer);
  const authUser = useSelector((state) => state.authReducer);

  let iconName = matchingScop.filter((item) => item.name === businessCategory?.value);

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
        categoryData.splice(findIndex, 1)
      } else {
        categoryData.push(category)
      }
    } else {
      categoryData.push(category)
    }
    categoryData.find(function (item, i) {
      if (item.value !== "all") {
        checkCategory += 1;
      }
      else {
        findAllIndex = i;
      }
    })
    if (categoryData.length === businessSubCategoryList.length || (findAllIndex === -1 && checkCategory && checkCategory === businessSubCategoryList.length - 1)) {
      toggleAllSubCategory(true)
      setSelectedSubCategory(businessSubCategoryList)
    }
    else {
      if (findAllIndex !== -1) {
        categoryData.splice(findAllIndex, 1)
        toggleAllSubCategory(false)
      }
      setSelectedSubCategory(categoryData);
    }
  }

  useEffect(() => {
    setSelectedSubCategory([])
  }, [businessCategory])

  const onSelectAllSubCategory = () => {
    if (allSubCategory) {
      toggleAllSubCategory(false)
      setSelectedSubCategory([])
    } else {
      toggleAllSubCategory(true)
      let categoryData = [...businessSubCategoryList]
      setSelectedSubCategory(categoryData);
    }
  }
  useEffect(() => {
    if (authUser?.myAuth?.user?.userId) {
      getNearByProjects();
      setLoading(true)
    }
  }, [ProjectType, businessCategory, hourlyRate,dailyRate,geoLocation]);

  
  const getNearByProjects = async (move) => {
    let userId=authUser?.myAuth?.user?.userId;
    let distance= "50km"
    let pageNumber = pagination.pageNumber;
    if (move === "next") {
      setPagination({
        ...pagination,pageNumber:pagination.pageNumber + 1
      })
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      setPagination({
        ...pagination,pageNumber:pagination.pageNumber - 1
      })
      pageNumber = pageNumber - 1;
    }
    let projectTypes =ProjectType.value?ProjectType.value: "";
  let businessCategoryValue = businessCategory.value
    ? businessCategory.value
    : "";
    let minHourlyRate = hourlyRate[0] ? hourlyRate[0] : 10;
    let maxHourlyRate = hourlyRate[1] ? hourlyRate[1] : 50;
      let minDailyRate=dailyRate[0]?dailyRate[0]:0
      let maxDailyRate=dailyRate[1]?dailyRate[1]:500
    let result = await request(
      `${
        ENDPOINT["GetNerbyProjects"]
      }?distance=${distance}&userId=${userId}&pageNumber=${pageNumber}&pageSize=${pagination.pageSize}&projectType=${projectTypes}&businessCategory=${businessCategoryValue}&minHourlyRate=${minHourlyRate}&maxHourlyRate=${maxHourlyRate}&minDailyRate=${minDailyRate}&maxDailyRate=${maxDailyRate}&geoLocation=${geoLocation}`,
      getOptions({})
    );
    if (result.success) {
      setProjectData(result.result.entries);
      setPagination({
        pageNumber: result.result.pageNumber || result.result.pageNumer,
        pageSize: result.result.pageSize,
        total: result.result.total,
      });
      setLoading(false)
    }else{}
    setLoading(false)
  };
  const suggestionSelect=(result, lat, lng, text)=>{
    setGeoLocation(`${lat},${lng}`)
  console.log(result, lat, lng, text,"ddddddddd")
  }
  return (
    <>
    <SubHeader />
    <div className="freelancer-region-page">
      {/* <div className="bcknd_container"> */}
      <div className="region-top-bar">
        <p> Your current address vactine city korea , South korea </p>
        <div className="change-address-button">Change</div>
      </div>
      <div className="map-area">
        <MapFreelancer  
         savedLocation={authUser?.freelancerAuth?.location?.split(",") || authUser?.organizationAuth?.location?.split(",") }
         projectData={projectData} />
        <div className={!filterToggle ? "top-filter-maps top-filter-maps-wrapper top-filter-maps-close" : "top-filter-maps top-filter-maps-wrapper"}>
          <div className="top-search-area">
          <div className="auto-suggestion-input">
          <MapboxAutocomplete publicKey={process.env.REACT_APP_MAP_BOX_KEY}
                    inputClass='form-control search'
                    onSuggestionSelect={suggestionSelect}
                    // country='us'
                    placeholder="Area, subway, Train station"
                    resetSearch={false}/>

                    </div>
            <div className="search-icon-area">
              <i className="fa fa-search"></i>
            </div>
          </div>
          <div className="project-sub-filter-area">
            <div className="project-type-filter" onClick={() => setModal({ type: "projectType" })}>
              <div>Project Type</div>
              <i className="fa fa-angle-down"></i>
            </div>
            <div className="business-category-filter" onClick={() => setModal({ type: "scope" })}>
              <div>Business Category</div>
              <i className="fa fa-angle-down"></i>
            </div>
            <div className="sorting-filter" onClick={() => setFilterToggle(!filterToggle)}>
              <i className="fa fa-sliders"></i>
            </div>
          </div>

          <div className={!filterToggle ? "hidden-content" : "hidden-content open"} >
            <div className="filter-map-content">
              <div className="project-type-area">
                Project Type {ProjectType?.value ? <ProjectTypeBadge projectType={ProjectType?.value} /> : ""}
              </div>

              <div className="sub-business-category">
                Business Category {iconName.length ? <img src={imageUrl + iconName[0].icon} /> : ""} {businessCategory?.text ? businessCategory.text : ""} <br />
                <div class="d-flex align-items-center business-scope-area-12">

                  {businessSubCategoryList.map((data, index) =>
                    <div class="checkbox-for-business-scope">
                      <input
                        type="checkbox"
                        onChange={(e) => { (data.value === "all") ? onSelectAllSubCategory() : onSelectSubCategory(data) }}
                        checked={selectedSubCategory.length && selectedSubCategory.find(({ value }) => value === data.value) ? true : false}
                        className="custom-checkbox-styled"
                        id={`styled-checkbox-business-` + index}
                      />
                      <label for={`styled-checkbox-business-` + index}>{data.text}</label>
                    </div>
                  )}

                </div>
              </div>

              <div className="rang-box-rate">
                <h2>Hourly Rate</h2>
                <br />
                <Range
                  min={5}
                  max={50}
                  value={hourlyRate}
                  onChange={(value) => setHourlyRate(value)}
                  tipFormatter={(value) => `${value}$`}
                />
                <div className="rang-label-area">
                  <div className="rang-label-item">
                    <div className="label-bar"> | </div>
                    <div className="label-content">5$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '12%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">15$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '19%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">25$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '19%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">35$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '18%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">45$</div>

                  </div>
                  <div className="rang-label-item" style={{ textAlign: 'right' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content" style={{ marginRight: '-10px', marginLeft: '0px' }}>50$</div>
                  </div>

                </div>
              </div>
              <div className="rang-box-rate" style={{ borderBottom: 'none' }}>
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
                  <div className="rang-label-item" style={{ paddingLeft: '14%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">150$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '18%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">250$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '18%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">350$</div>

                  </div>
                  <div className="rang-label-item" style={{ paddingLeft: '16%' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content">450$</div>

                  </div>
                  <div className="rang-label-item" style={{ textAlign: 'right' }}>
                    <div className="label-bar"> | </div>
                    <div className="label-content" style={{ marginRight: '-10px', marginLeft: '0px' }}>500$</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="project-lists-area">
          <div className="project-lists-top">
            <h1>
              지역 목록 5개
            </h1>
            <div className="refresh-area">
              <i className="fa fa-refresh"></i>
            </div>
          </div>
          <div className="sub-heading">이 지역 최신 방</div>
          <div className="project-lists-detail">
            {projectData.map((item,index) => (
              <div className="project-lists-item">
                <div className="project-top-area">
                  <h3
                  onClick={()=>{
                    props.history.push(
                      "/project-detail-for-freelancer?projectId=" + item.projectId
                    );
                  }}
                  >{item.jobTitle?.slice(0,15)}{item.jobTitle.length>15?'...':''}</h3>
                  <ProjectTypeBadge projectType={item.projectType} />
                </div>
                <div className="project-amount-area">
                {item.projectType==="Milestone" && (
                      <>
                        {" "}
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          currency={item.currencyCode || 'USD'}
                          number={item.projectBudgetForMilestone}
                        />{" "}
                      </>
                    )}
                    {item.projectType==="Hourly"  && (
                      <>
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          currency={item.currencyCode || 'USD'}
                          number={item.fromSalary}
                        />{" "}
                        {item.fromSalary ? "-" : ""}{" "}
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          currency={item.currencyCode || 'USD'}
                          number={item.toSalary}
                        />{" "}
                        <>
                        {item.maximumWeekHours}
                        {item.maximumWeekHours ? (
                          <>
                            <FormatDWH
                              hrs
                              currency={item.currencyCode}
                            />
                            /
                            <FormatDWH
                              week
                              currency={item.currencyCode}
                            />
                          </>
                        ) : (
                          ""
                        )}{" "}
                      </>
                      </>
                    )}
                    {item.projectType==="FreeContract" && (
                      <div>
                        {/*    Daily Range : */}{" "}
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          number={item.minDailyRate}
                          currency={item.currencyCode || 'USD'}
                        />
                        ~<Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          number={item.maxDailyRate}
                          currency={item.currencyCode || 'USD'}
                        />
                        /
                        <FormatDWH
                          day
                          currency={item.currencyCode || 'USD'}
                        />
                        <br />
                        <div>
                        {/*    Hourly Range : */}{" "}
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          number={item.minHourlyRate}
                          currency={item.currencyCode || 'USD'}
                        />
                        ~<Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          number={item.maxHourlyRate}
                          currency={item.currencyCode || 'USD'}
                        />
                        /
                        <FormatDWH hr currency={item.currencyCode || 'USD'} />
                      </div>
                      </div>
                    )}
                    {item.projectType==="OfficeWork" && (
                      <>
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          currency={item.currencyCode || 'USD'}
                          number={item.fromSalary}
                        />{" "}
                        - <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          currency={item.currencyCode || 'USD'}
                          number={item.toSalary}
                        />
                        /
                        <FormatDWH
                          day
                          currency={item.currencyCode || 'USD'}
                        />
                      </>
                    )}
                    {item.projectType==="Contest" && (
                      <>
                        <Currency currency={item.currencyCode || 'USD'} />
                        <Format
                          currency={item.currencyCode || 'USD'}
                          currency={item.currencyCode || 'USD'}
                          number={item.winningAmount}
                        />{" "}
                      </>
                    )}
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
                          __html: item.jobDescription,
                        }}
                      ></p>
                    </ShowMoreText>
                </div>
                <div className="project-bottom-area">
                  <div className="project-bottom-first">
                    {item.projectType} <div className="skill-area">
                      {
                        item.skills.split(',').map((skill)=>(
                          <div className="skill"> {skill}</div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="search-button">
                    <i className="fa fa-search"></i>

                  </div>
                </div>
              </div>

            ))}
              {!loading &&projectData?.length <= 0  ?(
                  <NoDataAvailable
                    title="Sorry no project in your area!"
                    buttonText="View more projects"
                    path="/all-projects"
                    color={"#0d2146"}
                    {...props}
                  />
                ): <Skeleton
                count={4}
                isSkeletonLoading={loading}
              />}
                 
             

          </div>
          { projectData?.length > 0 && (
                  <Pagination
                    isPreviousPage={pagination.pageNumber > 1 ? true : false}
                    isNextPage={
                      pagination.pageNumber * pagination.pageSize <
                      pagination.total
                        ? true
                        : false
                    }
                    lastPkEvaluatedTrack={projectData}
                    pageNumber={pagination.pageNumber}
                    moveBack={() =>
                      getNearByProjects("prev")
                    }
                    moveNext={() =>
                      getNearByProjects("next")
                    }
                  />
                )}
        </div>
      </div>
      {/* </div> */}
      <DropDownModal modal={modal} projectScopes={languageReducer.projectScopes} projectTypes={languageReducer.projectTypes} setModal={setModal} selectedValue={modal ? (modal.type === "scope" ? businessCategory : ProjectType) : ""} onSelect={modal ? (modal.type === "scope" ? setBusinessCategory : setProjectType) : ""} setBusinessSubCategoryList={setBusinessSubCategoryList} />
    </div>
    </>
  );
}

export default FreelancersRegion;
