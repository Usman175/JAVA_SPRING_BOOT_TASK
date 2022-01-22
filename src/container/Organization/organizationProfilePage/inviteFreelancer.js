import React from "react";
import Invitation from "../registration/invitation";
import { useSelector } from "react-redux";
import SubHeader from "../../../components/subHeader";
function CompanyInviteFreelancer(props) {
  const authReducer = useSelector((state) => state.authReducer);
  return (
    <>
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-12 col-md-2"></div>
            <div className="col-12 col-md-8">
              <div className="companyInviteToFreelancer project_post work_card">
                <Invitation
                  CompanyId={authReducer.organizationAuth?.organizationId}
                  type="profile"
                  {...props}
                />
              </div>
            </div>
            <div className="col-12 col-md-2"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompanyInviteFreelancer;
