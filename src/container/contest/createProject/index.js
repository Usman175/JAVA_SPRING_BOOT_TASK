import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubHeader from "../../../components/subHeader";
import "./createProject.scss";
import "../contest.scss";
import Heading from "../../../components/postProject/heading";
import BasicContestInfo from "./basicContestInfo";
import AdvanceContestInfo from "./advanceContestInfo";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import {
  getOptions,
  postOptions,
  postMultipartFile,
} from "../../../utils/httpConfig";
import { Flag } from "@material-ui/icons";
import notifications from "../../../utils/notifications";
import Skeleton from "../../../components/skeleton/skeleton";

function CreateContestProject(props) {
  const [tab, setTab] = useState("basic"); // basic or advance
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSkeltonLoading, setIsSkeltonLoading] = useState(false);
  const [contestDetail, setContestDetail] = useState({
    projectId: new URLSearchParams(props.location.search).get("id"),
    projectType: "Contest",
    jobTitle: "",
    contestDesignType: "",
    contestDesignStyles: "",
    contestDesignStyleSamples: [],
    contestDesignRequirement: "",
    contestDesignPreferenceAttachFileName: "",
    contestDesignPreferenceAttachFile: "",
    maleFemalePercentage: "50",
    youngMaturePercentage: "50",
    modernClassicPercentage: "50",
    luxuryPublicPercentage: "50",
    simpleComplexPercentage: "50",
    abstractConcretePercentage: "50",
    isGuaranteed: true,
    contestFirstPass: "",
    contestComfortingMoney: "",
    isPrivateNDAContest: true,
    privateContestNDADocument: "",
    privateContestNDADocumentName: "",
    isSecondPrice: false,
    isThirdPrice: false,
    currencyCode: "",
    secondPlacePrizeCurrency: "",
    thirdPlacePrizeCurrency: "",
    winningAmount: "",
    secondPlacePrize: "",
    thirdPlacePrize: "",
    isPromoted: false,
    promotedToMoreFreelancerPrice: "",
    isFeaturedContest: false,
    featuredContestPrice: "",
    isBlind: false,
    blindPrice: "",
    submissionExpirationDate: "",
    activeStatus: "",
    projectStatus: "",
    promotedPrice: "US$79",
    featuredContestPrice: "US$49",
    blindPrice: "US$39",
    contestFirstPass:'',
    contestComfortingMoney:'',
    excludeComfortMoney:false
  });
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  const authUser = useSelector((state) => state.authReducer);

  const handleBack = (value) => {
    setTab(value);
  };
  useEffect(() => {
    if (contestDetail.projectId) {
      setIsSkeltonLoading(true);
      handleGetProjectDetail(contestDetail.projectId);
    }
  }, []);
  const handleGetProjectDetail = async (projectId) => {
    let result = await request(
      `${ENDPOINT["GetProject"]}?projectId=` +
        projectId +
        `&userId=${authUser?.myAuth?.user?.userId}`,
      getOptions({})
    );
    if (result.success) {
      setIsSkeltonLoading(false);
      setContestDetail({ ...contestDetail, ...result.result });
      console.log(result.result, "resultresultresult");
    } else {
      setIsSkeltonLoading(false);
    }
  };
  const handleSubmitContest = async () => {
    setLoading(true);
    let contestData = new FormData();
    contestData.append("postUserId", authUser?.clientAuth?.clientId);
    contestData.append("projectId", contestDetail.projectId);
    contestData.append("projectType", contestDetail.projectType);
    contestData.append("jobTitle", contestDetail.jobTitle);
    contestData.append("contractType", 'Contest');
    contestData.append("contestDesignStyles", contestDetail.contestDesignType);
    contestData.append(
      "contestDesignRequirement",
      contestDetail.contestDesignRequirement
    );

   contestData.append(
      "contestDesignStyleSamples",
      JSON.stringify(contestDetail.contestDesignStyleSamples),
    );

    contestData.append(
      "contestDesignPreferenceAttachFile",
      contestDetail.contestDesignPreferenceAttachFile
    );
    contestData.append(
      "maleFemalePercentage",
      contestDetail.maleFemalePercentage
    );
    contestData.append(
      "youngMaturePercentage",
      contestDetail.youngMaturePercentage
    );
    contestData.append(
      "modernClassicPercentage",
      contestDetail.modernClassicPercentage
    );
    contestData.append(
      "luxuryPublicPercentage",
      contestDetail.luxuryPublicPercentage
    );
    contestData.append(
      "simpleComplexPercentage",
      contestDetail.simpleComplexPercentage
    );
    contestData.append(
      "abstractConcretePercentage",
      contestDetail.abstractConcretePercentage
    );

    contestData.append(
      "contestFirstPass",
      contestDetail.contestFirstPass
    );
    contestData.append(
      "contestComfortingMoney",
      contestDetail.contestComfortingMoney
    );

    contestData.append("isGuaranteed", contestDetail.isGuaranteed);
    contestData.append("contestFirstPass", contestDetail.contestFirstPass);
    contestData.append(
      "isPrivateNDAContest",
      contestDetail.isPrivateNDAContest
    );
    contestData.append(
      "privateContestNDADocument",
      contestDetail.privateContestNDADocument
    );
    contestData.append("currencyCode", contestDetail.currencyCode);
    contestData.append("winningAmount", contestDetail.winningAmount);
    contestData.append("secondPlacePrize", contestDetail.secondPlacePrize);
    contestData.append("thirdPlacePrize", contestDetail.thirdPlacePrize);
    contestData.append("isPromoted", contestDetail.isPromoted);
    contestData.append(
      "promotedToMoreFreelancerPrice",
      contestDetail.promotedToMoreFreelancerPrice
    );
    contestData.append("isFeaturedContest", contestDetail.isFeaturedContest);
    contestData.append(
      "featuredContestPrice",
      contestDetail.featuredContestPrice
    );
    contestData.append("excludeComfortMoney", contestDetail.excludeComfortMoney);
    contestData.append("isBlind", contestDetail.isBlind);
    contestData.append("blindPrice", contestDetail.blindPrice);
    contestData.append(
      "submissionExpirationDate",
      contestDetail.submissionExpirationDate
    );
    contestData.append("activeStatus", contestDetail.activeStatus);
    contestData.append("projectStatus", contestDetail.projectStatus);
    let result;
    if (contestDetail.projectId) {
      result = await request(
        ENDPOINT["UpdateContestProject"],
        postMultipartFile(contestData)
      );
    } else {
      result = await request(
        ENDPOINT["CreateContestProject"],
        postMultipartFile(contestData)
      );
    }

    if (result.success) {
      setLoading(false);
      props.history.push(`/mycontest-list`
        // `/project-detail-for-freelancer?projectId=${result.result}`
      );
    } else {
      setLoading(false);
      notifications.showError("Error occurred please again later");
    }
  };
  return (
    <>
      <SubHeader />

      <div className="create-contest-type-project-page">
        <section className="card_sec">
          <div className="bcknd_container">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8 col-md-12">
                <Skeleton count={5} isSkeletonLoading={isSkeltonLoading} />
                <div
                  hidden={isSkeltonLoading}
                  className="project_post post-design-contest-wrapper"
                >
                  <Heading
                    heading={
                      tab === "basic"
                        ? languageType.DESIGN_CONTEST
                        : languageType.DESIGN_CONTEST_step2
                    }
                    icon={`https://dhihitu47nqhv.cloudfront.net/icons/contestIcon.svg`}
                  />
                  <div className="post_form packg_form post-design-contest-form">
                    {tab === "basic" ? (
                      <BasicContestInfo
                        contestDetail={contestDetail}
                        setContestDetail={setContestDetail}
                        {...props}
                        setTab={setTab}
                      />
                    ) : (
                      <AdvanceContestInfo
                        setContestDetail={setContestDetail}
                        contestDetail={contestDetail}
                        loading={loading}
                        handleBack={handleBack}
                        handleSubmitContest={handleSubmitContest}
                        {...props}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CreateContestProject;
