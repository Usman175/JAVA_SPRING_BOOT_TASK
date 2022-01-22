import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "uuid";
import { onReduxLangaugeChange } from "../../store/action/action";
import request from "../../utils/request";
import { ENDPOINT } from "../../utils/endpoint";
import { getOptions } from "../../utils/httpConfig";
import FreelancerTypeFilter from "../../components/freelancer/freelancerTypeFilter";
import LeftFreelancerContent from "./freelancerContents/leftFreelancerContent";
import MiddleFreelancerContent from "./freelancerContents/middleFreelancerContent";
import RightFreelancerContent from "./freelancerContents/rightFreelancerContent";
import Skeleton from "../../components/skeleton/skeleton";
import SkeletonAllFreelancer from "./skeletonAllFreelancer";
import DetailSection from "../../components/allFreelancers/detailSection";
import Pagination from "../../components/pagination";
import NoDataAvailable from "../../shared/error/not-data-available-new";
import SubHeader from "../../components/subHeader";
import FreelancerAdvanceSearch from '../../components/advanceSearch/allFreelancers'
import "./freelancer.scss"

class AllFreelancer extends Component {
  constructor(props) {
    super(props);

    let searchProject = new URLSearchParams(this.props.location.search).get(
      "searchProject"
    );
    let category = new URLSearchParams(this.props.location.search).get(
      "category"
    );
    let projectStatuses = new URLSearchParams(this.props.location.search).get(
      "status"
    );
    let projectStatusArray =
      projectStatuses !== "" &&
      projectStatuses !== null &&
      projectStatuses !== undefined
        ? projectStatuses.split(",")
        : [];

    this.state = {
      searchProject:
        searchProject !== null &&
        searchProject !== "" &&
        searchProject !== undefined
          ? searchProject
          : "",
      selectedCategory:
        category !== null && category !== "" && category !== undefined
          ? category
          : "",
      selectedProjectType: "",
      selectedProjectStatus: "",
      freelancerTypes: [],
      projectStatuses: [
        {
          name: "recruitment",
          title: "Recruitment",
          checked: projectStatusArray.includes("Recruitment") ? true : false,
        },
        {
          name: "onGoing",
          title: "On Going",
          checked: projectStatusArray.includes("On Going") ? true : false,
        },
        {
          name: "completed",
          title: "Completed",
          checked: projectStatusArray.includes("Completed") ? true : false,
        },
      ],
      mainExpansionPanelId: -1,
      subExpansionPanelId: -1,
      isSkeletonLoading: false,
      freelancerData: [],
      pagination: { pageSize: 10, pageNumber: 1, total: 20 },
      projectType: "",
      showAdvanceSearch:false,
      advanceSearchFilter: {
        freelancerType: "",
        businessCategory: "",
        country: "",
        basic:false,
        experience:"",
        skills:'',
        minHourlyRate:"",
        maxHourlyRate:""
      },
    };
  }


  componentWillMount() {
    let data = localStorage.getItem("langauge");
    let langauge = JSON.parse(data);
    if (langauge) this.props.onLangaugeChange(langauge);
    this.bindFreelancerTypes();
    this.getAllFreelancers("");
  }

  handleUpdateFilterValues=(value,type)=>{
    let advanceSearchFilter=this.state.advanceSearchFilter;
    let obj={
      ...advanceSearchFilter,
      [type]:value
    }
      this.setState({advanceSearchFilter:obj})
  }

  //#region Bind Events
  async bindFreelancerTypes() {
    let array = [];

    let freelancerTypes = new URLSearchParams(this.props.location.search).get(
      "type"
    );
    let projectTypeArray =
      freelancerTypes !== "" &&
      freelancerTypes !== null &&
      freelancerTypes !== undefined
        ? freelancerTypes.split(",")
        : [];

    Object.entries(this.props.freelancerTypes).map((item, index) => {
      let isChecked = projectTypeArray.includes(item[1]) ? true : false;
      array.push({
        name: item[0],
        title: item[1].text,
        checked: isChecked,
      });
      if (isChecked)
        this.state.selectedProjectType +=
          (this.state.selectedProjectType !== "" ? "," : "") + item[1].value;
    });

    this.setState({ freelancerTypes: array });
  }

  async getAllFreelancers(move, freelancerType) {
    this.setState({ isSkeletonLoading: true, freelancerData: [] });
    let pageNumber = this.state.pagination.pageNumber;
    let {advanceSearchFilter}=this.state;
    if (move === "next") {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNumber: this.state.pagination.pageNumber + 1,
        },
      });
      pageNumber = pageNumber + 1;
    } else if (move === "prev") {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNumber: this.state.pagination.pageNumber - 1,
        },
      });
      pageNumber = pageNumber - 1;
    }
    let queryString;
    if(!advanceSearchFilter.minHourlyRate || !advanceSearchFilter.maxHourlyRate){
      queryString = `?pageSize=${
        this.state.pagination.pageSize
      }&pageNumber=${pageNumber}&freelancerType=${
        freelancerType ? freelancerType : ""
      }&serviceScope=${advanceSearchFilter.businessCategory}&subServiceScope=&skills=${advanceSearchFilter.skills}&country=${advanceSearchFilter.country}&experience=${advanceSearchFilter.experience}`;
  
    }else{
      queryString = `?pageSize=${
        this.state.pagination.pageSize
      }&pageNumber=${pageNumber}&freelancerType=${
        freelancerType ? freelancerType : ""
      }&serviceScope=${advanceSearchFilter.businessCategory}&subServiceScope=&skills=${advanceSearchFilter.skills}&country=${advanceSearchFilter.country}&experience=${advanceSearchFilter.experience}&minHourlyRate=${advanceSearchFilter.minHourlyRate || ''}&maxHourlyRate=${advanceSearchFilter.maxHourlyRate|| ''}`;
    
    }

    let result = await request(
      `${ENDPOINT["GetAllFreelancers"]}` + queryString,
      getOptions({})
    );

    if (result.success) {
      let array = [
        ...result.result.organizations?result.result.organizations:[],
        ...result.result.freelancers?result.result.freelancers:[],
      ];

      /* organizations */
      array.map((element, i) => {
        if (element.skills && element.hasOwnProperty("skills")) {
          element.skills =
            element.skills !== undefined ||
            element.skills !== null ||
            element.skills !== ""
              ? element.skills
              : [];
        }
      });

      this.setState({
        isSkeletonLoading: false,
        freelancerData: array,
        pagination: {
          ...this.state.pagination,
          pageSize: this.state.pagination.pageSize,
          lastPkEvaluated: result.result.lastPkEvaluated,
          total: result.result.total,
        },
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      this.setState({ isSkeletonLoading: false });
    }
  }
  //#endregion Bind Events

  //#endregion Expansion

  //#region Change Event
  onCheckboxChangeHandleNew = (event, type, index, name) => {
    console.log(name, "name");
    this.setState({showAdvanceSearch:true})
    let freelancerType = name;
    if (name === "Any") {
      freelancerType = `IndividualFreelancer,Client,Organization,Headhunter`;
      this.setState({advanceSearchFilter:{...this.state.advanceSearchFilter,freelancerType:'All Freelancers'}})
    }
    if (name === "Company") {
      freelancerType = "Organization";
      this.getAllFreelancers("", freelancerType);
      this.setState({advanceSearchFilter:{...this.state.advanceSearchFilter,freelancerType:'Organization'}})
    }

    if (name === "Individual") {
      freelancerType = "IndividualFreelancer";
      this.getAllFreelancers("", freelancerType);
      this.setState({advanceSearchFilter:{...this.state.advanceSearchFilter,freelancerType:'IndividualFreelancer'}})
    }

  };

  // get all freelancers with advance search
  handleGetFreelancersWithAdvanceSearch=()=>{
    let {advanceSearchFilter}=this.state;
    let freelancerType=advanceSearchFilter.freelancerType;
    if(advanceSearchFilter.freelancerType==="All Freelancers" && advanceSearchFilter.freelancerType==="Any"){
      freelancerType = `IndividualFreelancer,Client,Organization,Headhunter`;
    }
    this.getAllFreelancers("", freelancerType);
  }


  render() {
    let {
      isSkeletonLoading,
      freelancerData,
      pagination,
      isPreviousPage,
      showAdvanceSearch,
      advanceSearchFilter
    } = this.state;

    return (
      <>
        <SubHeader />
        <section className="card_sec freelancer-card">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="row">
                  <div className="col-lg-12 col-md-6">
                    <FreelancerTypeFilter
                      onChange={this.onCheckboxChangeHandleNew}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <SkeletonAllFreelancer 
                count={this.state.pagination.pageSize}
                isSkeletonLoading={isSkeletonLoading}
                />
                
                <div className="skeletonLoading_mobile">
                  <Skeleton
                    count={this.state.pagination.pageSize}
                    isSkeletonLoading={isSkeletonLoading}
                  />
                </div>
                {
                  showAdvanceSearch ?
                  <div hidden={isSkeletonLoading}>
                  <FreelancerAdvanceSearch 
                  filter={advanceSearchFilter}
                  handleUpdateFilterValues={this.handleUpdateFilterValues}
                  handleGetFreelancersWithAdvanceSearch={this.handleGetFreelancersWithAdvanceSearch}
                  {...this.props}
                  />
                  </div>
                  :null
                }
                {freelancerData &&
                  freelancerData.length > 0 &&
                  freelancerData.map((freelancer, index) => (
                    <>
                      <div
                        className="card_box work_card client_detail"
                        key={`${v4()}`}
                        style={{ marginTop: index == 0 ? "20px" : "10px" }}
                      >
                        {/*Freelancer Header */}
                        <div className="row justify-content-between">
                          <div className="col-md-1 col-3">
                            <LeftFreelancerContent
                              freelancer={freelancer}
                              {...this.props}
                            />
                          </div>
                          <div className="col-md-7 col-9">
                            <MiddleFreelancerContent
                              freelancer={freelancer}
                              {...this.props}
                            />
                          </div>
                          <div className="col-md-4 text-right">
                            <RightFreelancerContent
                              freelancer={freelancer}
                              index={index}
                              {...this.props}
                            />
                          </div>
                        </div>

                        {/*Freelancer Detail */}
                        <div className="freelancer-detail-plus-icon">
                          <DetailSection
                            freelancer={freelancer}
                            index={index}
                          />
                        </div>
                      </div>
                    </>
                  ))}

                {!isSkeletonLoading && freelancerData?.length <= 0 && (
                  <NoDataAvailable
                    title="Sorry no Freelancer exist yet !"
                    buttonText="See all projects"
                    path="/project-post"
                  />
                )}
                {freelancerData?.length > 0 && (
                  <Pagination
                    isPreviousPage={isPreviousPage}
                    isPreviousPage={pagination.pageNumber > 1 ? true : false}
                    isNextPage={
                      pagination.pageNumber * pagination.pageSize <
                      pagination.total
                        ? true
                        : false
                    }
                    lastPkEvaluatedTrack={freelancerData}
                    pageNumber={pagination.pageNumber}
                    moveBack={() => this.getAllFreelancers("prev")}
                    moveNext={() => this.getAllFreelancers("next")}
                  />
                )}
              </div>
              <div className="col-lg-2 col-md-12">
                {/* <RightTop />
                <RightBottom /> */}
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

    freelancerTypes: state.languageReducer.freelancerTypes,
  };
}

function mapDispatchProps(dispatch) {
  return {
    onLangaugeChange: (langauge) => {
      dispatch(onReduxLangaugeChange(langauge));
    },
  };
}

export default connect(mapStateToProps, mapDispatchProps)(AllFreelancer);
