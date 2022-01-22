import React, { useState } from "react";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import "./adminDashboard.scss";
import GeneralTab from "./generalTab";
import TeamTab from "./teamTab";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";

function CompanyDashboard(props) {
  const [activeTab, setActiveTab] = useState("General"); 
  const [organizationDetail, setOrganizationDetail] = useState({});
  const [OrganizationFreelancers, setOrganizationFreelancers] = useState([]);
  const [organizationTeams, setOrganizationTeams] = useState([]);
  const handleActive = (tab) => {
    setActiveTab(tab);
  };
  const handleSetOrganizationTeam = (teams) => {
    setOrganizationTeams(teams); 
  };  

  React.useEffect(() => {
    getCompanyDetail(); 
  }, []);

  const getCompanyDetail = async () => {
    let organizationId = props.match.params.organizationId;
    if (organizationId) {  
      let result = await request(
        `${ENDPOINT["GetOrganization"]}?organizationId=${organizationId}`,
        getOptions()
      );
      if (result.success) {  
        setOrganizationDetail(result.result);  
      } else { 
      }
    } 
  };   

  return (
    <div className="companyDashboardPage">
      <div className="bcknd_container">
        <div className="row">
          <div className="col-md-12 col-lg-1"></div>
          <div className="col-12 col-lg-10">
            <div className="company-section">
              <div className="company-section_topArea">
                <div>
                  <h2> 
                     {organizationDetail.companyName ? organizationDetail.companyName : 'ABC Company'} 
                  </h2>
                  <h5>Admin Board</h5>
                </div>
                <div>
                  <button className="btn company-section_btnOrganization">
                  Go to Headhunter site
                  </button>
                </div>
              </div>
              <div className="company-section-tabs">
                <div
                  title={
                    activeTab === "General" ? "Selected tab" : "select tab"
                  }
                  onClick={() => handleActive("General")}
                  className={`company-section-tabs-item ${
                    activeTab === "General" ? "active" : ""
                  }`}
                >
                  General
                </div>
                <div
                  title={activeTab === "Team" ? "Selected tab" : "select tab"}
                  onClick={() => handleActive("Team")}
                  className={`company-section-tabs-item ${
                    activeTab === "Team" ? "active" : ""
                  }`}
                >
                  Team
                </div>
              </div>
              <div className="tab-detail-area">
                {activeTab === "General" && (
                  <GeneralTab
                    organizationTeams={organizationTeams}
                    {...props}
                    handleSetOrganizationTeam={handleSetOrganizationTeam}
                    setOrganizationFreelancers={setOrganizationFreelancers}
                  />
                )}
                {activeTab === "Team" && (
                  <TeamTab
                    handleSetOrganizationTeam={handleSetOrganizationTeam}
                    {...props}
                    OrganizationFreelancers={OrganizationFreelancers}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-1"></div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;
