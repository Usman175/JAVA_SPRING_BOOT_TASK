import React, { useEffect, useState } from "react";
import "../contractDetail.scss";
import { useSelector, useDispatch } from "react-redux";
import SubHeader from "../../../../components/subHeader/index";
import Skeleton from "../../../../components/skeleton/skeleton";
import TimeAndPayment from "../sharedComponents/timeAndPayment";
import WorkReport from "../sharedComponents/workReport";
import notifications from "../../../../utils/notifications";
import ContractDetail from '../sharedComponents/contractDetail'
function FreeContractDetailFreelancer(props) {
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [userProfile, setUserProfile] = useState({});
  const [projectDetail, setProjectDetail] = useState({});
  const [contractDetail, setContractDetail] = useState({});

  const dispatch = useDispatch();

  const onTabChangeHandle = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    if (props.location?.state?.projectContractId) {
      setUserProfile(props.location?.state?.userProfile);
      setProjectDetail(props.location?.state?.project);
      setContractDetail(props.location?.state);
    } else {
      props.history.push("/my-contracts");
      notifications.showWarning("Sorry not found!");
    }
    console.log(props, "dddd");
  }, []);
  return (
    <div className="contract-detail-client-area">
      <SubHeader />
      <section className="card_sec">
        <div className="bcknd_container">
          <div className="row">
            <div className="col-12 col-lg-2"></div>
            <div className="col-12 col-lg-8">
              <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />
              <div
                hidden={isSkeletonLoading}
                className="project_post invoice_tab work_card contract-detail-page"
              >
                <ul className="nav nav-pills">
                  <li className="nav-item" onClick={() => onTabChangeHandle(1)}>
                    <a
                      className={
                        activeTab === 1 ? "nav-link active" : "nav-link"
                      }
                    >
                      Time & Payments
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => onTabChangeHandle(2)}>
                    <a
                      className={
                        activeTab === 2 ? "nav-link active" : "nav-link"
                      }
                    >
                      Work Report
                    </a>
                  </li>
                  <li hidden className="nav-item" onClick={() => onTabChangeHandle(3)}>
                    <a
                      className={
                        activeTab === 3 ? "nav-link active" : "nav-link"
                      }
                    >
                      Contract Detail
                    </a>
                  </li>
                </ul>
                <div
                  className="tab-content workDiary_tab"
                  id="pills-tabContent"
                >
                  <div
                    className={
                      activeTab === 1
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    {activeTab === 1 && (
                      <TimeAndPayment
                        contractDetail={contractDetail}
                        projectDetail={projectDetail}
                        userProfile={userProfile}
                        {...props}
                      />
                    )}
                  </div>
                  <div
                    className={
                      activeTab === 2
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    style={{ display: activeTab != 2 ? "none" : "" }}
                  >
                    {activeTab === 2 && (
                      <WorkReport
                        contractDetail={contractDetail}
                        projectDetail={projectDetail}
                        userProfile={userProfile}
                        {...props}
                      />
                    )}
                  </div>
                  <div
                    className={
                      activeTab === 3
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                    style={{ display: activeTab != 3 ? "none" : "" }}
                  >
                    {activeTab === 3 && (
                      <ContractDetail
                        contractDetail={contractDetail}
                        projectDetail={projectDetail}
                        userProfile={userProfile}
                        {...props}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-2"></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FreeContractDetailFreelancer;
