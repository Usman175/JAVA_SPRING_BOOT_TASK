import React, { lazy, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Footer from "./components/navigation/footer.jsx";
import Home from "./container/home/home.jsx";
import NavigationBar from "./components/navigation/navigationBar.jsx";
import NoMatch from "./container/404-page/noMatch.jsx";
import Layout from "./components/navigation/layout";
// stripe payment method comp
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import WelcomeModal from "./components/modals/welcomeModal";
import {
  onSetClientFreelancerData,
  updateRegisteredUserFlag,
} from "./store/action/action";
//react-notify
import { ReactNotifyAlert } from "react-notify-alert";
import {
  getLookUpDataRequestCleanUp,
  getDefaultAddressDataRequest,
} from "./store/action/LookUp/lookUpActions.js";
import { REACT_ALERT } from "./store/constants/constant";
import {
  getLookUpData,
  getDefaultAddressData,
} from "./store/middlewares/LookUp/getLookUpData.js";
import { getRegisterUserTypes, hitApiGetUser ,getUserToken } from "./services/userService";
//utils.
import { GetAuth, SetCrossData } from "./utils/auth";
import { ENDPOINT } from "./utils/endpoint";
import request from "./utils/request";
import { getOptions } from "./utils/httpConfig";

// Redux
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from "./store/index";
import {
  onSelectedChannelHandle,
  onMyChannelListHandle,
  onSetCrossDomainData,
  setRegisteredUserTypes,
} from "./store/action/action";
import Howtoregisterafreelancer from "./container/howItWorks/howtoregisterfreelancer/howtoregisterafreelancer.jsx";
import Howtopostproject from "./container/howItWorks/howtopostproject/howtopostproject";
import Pricing from "./container/howItWorks/pricing/pricing";
import Howtoregisterheadhunter from "./container/howItWorks/howtoregisterheadhunter/howtoregisterheadhunter";
import MilestoneWork from "./container/howItWorks/milestoneWork.jsx";
import ContestWork from "./container/howItWorks/contestWork.jsx";
import HourlyWork from "./container/howItWorks/hourlyWork.jsx";
import ManagerWork from "./container/howItWorks/managerWork.jsx";
import DisputeWork from "./container/howItWorks/disputeWork.jsx";
import WorkAtOffice from "./container/howItWorks/workAtOffice.jsx";
import FreeContract from "./container/howItWorks/freeContract.jsx";
import PrivacyPolicy from "./container/privacyNTerms/privacyPolicy.jsx";
import TermsOfUse from "./container/privacyNTerms/termsOfUse";
import { validate } from "uuid";
import { postOptions } from "./utils/httpConfig";
import notifications from "./utils/notifications";
import PrivateRoute from "./shared/auth/private-route";

// slider styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import firebase from "firebase";
// Lazy loading routes
const OrganizationRegistration = lazy(() =>
  import("./container/Organization/registration")
);
const VerifyMobile = lazy(() =>
  import("./container/mobileVerification/mobileVerify")
);

const ContestFeaturedPosts = lazy(() =>
  import("./container/project/featuredContest/contestPosts")
);

const AllMyPosts = lazy(() =>
  import("./container/project/allMyPosts/allMyPosts.jsx")
);

const AllResume = lazy(() => import("./container/resume/resume.js"));
const AllProjects = lazy(() =>
  import("./container/project/allprojects/allProjects.jsx")
);
const InterestedProjects = lazy(() =>
  import("./container/project/interestedProject")
);
const MyInvitations = lazy(() =>
  import("./container/project/myinvitations/myInvitations.jsx")
);
const MyContest = lazy(() =>
  import("./container/project/mycontest/myContest.jsx")
);
const MyContestList = lazy(() =>
  import("./container/project/mycontetlist/mycontestList.js")
);
const HireCompany = lazy(() =>
  import("./container/project/hire/hireCompany.jsx")
);
const AllFreelancer = lazy(() =>
  import("./container/freelancer/allFreelancer.jsx")
);
const AllPackages = lazy(() => import("./container/contest/allPackages.jsx"));
const MyProposal = lazy(() =>
  import("./container/freelancer/proposals/myProposal.jsx")
);
const MyOffer = lazy(() => import("./container/freelancer/offers/myOffer.jsx"));
const OfferDetail = lazy(() =>
  import("./container/freelancer/offers/offerDetail.jsx")
);
const CreateOffer = lazy(() => import("./container/jobOffers/createOffer"));
const HireFreelancer = lazy(() =>
  import("./container/project/hire/hireFreelancer")
);
const ClientRegistration = lazy(() =>
  import("./container/client/clientRegistration")
);
const ClientSettings = lazy(() =>
  import("./container/client/clientSetting/clientSettings")
);
const RegistrationStartWith = lazy(() =>
  import("./container/startWith/registrationStartWidth")
);
const paymentInfo = lazy(() =>
  import("./container/paymentInfoPage/paymentInfo.jsx")
);
const ConfirmProject = lazy(() =>
  import("./container/contest/confirmProject.jsx")
);
const StartWith = lazy(() => import("./container/startWith/basicStartWidth"));

const CreateContestProject = lazy(() =>
  import("./container/contest/createProject")
);
const CreateFreelancer = lazy(() =>
  import("./container/freelancer/createFreelancer/index")
);

const HeadHunterRegistration = lazy(() =>
  import("./container/headHunter/registration/index")
);
const HeaderHunterProfile = lazy(() =>
  import("./container/headHunter/headhunterProfile/index")
);
const DisputeMain = lazy(() =>
  import("./container/report/dispute/disputeMain.jsx")
);
const Evaluation = lazy(() => import("./container/evaluation/evaluation.jsx"));
const EditEvaluation = lazy(() =>
  import("./container/evaluation/editEvaluation")
);
const HelpCenter = lazy(() => import("./container/helpCenter/helpCenter.jsx"));
const HelpDetail = lazy(() => import("./container/helpCenter/helpDetail.jsx"));

const HourlyContractDetail = lazy(() =>
  import("./container/client/contractDetail/hourlyContract")
);
const HourlyContractDetailFreelancer = lazy(() =>
  import("./container/freelancer/contractDetail/hourlyContract")
);
const MileStoneContractDetail = lazy(() =>
  import("./container/client/contractDetail/milestoneContract")
);
const MileStoneContractDetailFreelancer = lazy(() =>
  import("./container/freelancer/contractDetail/milestoneContract")
);
const FreeContractDetailClient = lazy(() =>
  import("./container/client/contractDetail/freeContract")
);
const FreeContractDetailFreelancer = lazy(() =>
  import("./container/freelancer/contractDetail/freeContract")
);
const OfficeContractDetailClient = lazy(() =>
  import("./container/client/contractDetail/officeContract")
);
const OfficeContractDetailFreelancer = lazy(() =>
  import("./container/freelancer/contractDetail/officeContract")
);
const Refund = lazy(() => import("./container/freelancer/refund"));
const ProjectClientDetailNew = lazy(() =>
  import("./container/project/projectDetails/projectClientDetail")
);

const ProjectFreelancerDetail = lazy(() =>
  import("./container/project/projectDetails/projectFreelancerDetail")
);

const HourlyReport = lazy(() =>
  import("./container/freelancer/hourly/hourlyReport.jsx")
);
// const Invoice = lazy(() => import("./container/report/invoice/invoice.jsx"));
const InvoiceDetail = lazy(() =>
  import("./container/report/invoice/invoiceDetail.jsx")
);
const MilestoneMain = lazy(() =>
  import("./container/freelancer/milestone/mileStoneMain")
);
const MyClient = lazy(() => import("./container/report/client/myClient.jsx"));
// const MyContest = lazy(() => import("./container/contest/MyContest.jsx"));

const MyFreelancer = lazy(() =>
  import("./container/freelancer/MyFreelancer/myFreelancer.jsx")
);
const MyProject = lazy(() => import("./container/project/myproject/myProject"));
const MyRegion = lazy(() => import("./container/work/myRegion.jsx"));
const PackageDesign = lazy(() =>
  import("./container/contest/packageDesign.jsx")
);
const PackageDesignDetail = lazy(() =>
  import("./container/contest/packageDesignDetail.jsx")
);

const PreferredDesign = lazy(() =>
  import("./container/contest/preferredDesign.jsx")
);

const ProjectBlog = lazy(() => import("./container/project/projectBlog.jsx"));
const Profession = lazy(() => import("./container/profession.jsx"));
const PostProjectProposal = lazy(() =>
  import("./container/project/projectProposals/postProjectProposal")
);
const ProjectProposalDetail = lazy(() =>
  import(
    "./container/project/projectProposals/projectProposalDetails/projectProposalDetail.jsx"
  )
);
const ProjectPost = lazy(() =>
  import("./container/project/projectpost/projectPost.jsx")
);
const ProjectPostHourly = lazy(() =>
  import(
    "./container/project/projectpost/projectpostdetail/projectPostHourly.jsx"
  )
);
const ProjectPostMileStone = lazy(() =>
  import(
    "./container/project/projectpost/projectpostdetail/projectPostMileStone.jsx"
  )
);
const ProjectPostOffice = lazy(() =>
  import(
    "./container/project/projectpost/projectpostdetail/projectPostOffice.jsx"
  )
);
const FreelancersRegion = lazy(() => import("./container/freelnacersRegion"));
const ClientRegion = lazy(() => import("./container/clientsRegion"));
const ProjectFreeContractOffice = lazy(() =>
  import(
    "./container/project/projectpost/projectpostdetail/projectPostFreeContract.jsx"
  )
);
const OrganizationProfile = lazy(() =>
  import("./container/Organization/organizationProfilePage")
);
const ProjectPostDetails = lazy(() =>
  import(
    "./container/project/projectpost/projectpostdetail/projectPostDetails.jsx"
  )
);
const CompanyInviteFreelancer = lazy(() =>
  import("./container/Organization/organizationProfilePage/inviteFreelancer")
);
const AcceptCompanyInvite = lazy(() =>
  import("./container/Organization/organizationProfilePage/acceptInvitation")
);
const TalentSearch = lazy(() => import("./container/talentSearch"));
const MyTalent = lazy(() => import("./container/talentSearch/myTalent"));
const ResumePage = lazy(() => import("./container/talentSearch/resumePage"));
const FreelancerProfile = lazy(() =>
  import("./container/freelancer/freelancerProfile")
);
const CLientProfile = lazy(() =>
  import("./container/client/clientProfile/clientProfile")
);
const ReportMain = lazy(() => import("./container/report/reportMain.jsx"));
const ReportFreelancer = lazy(() =>
  import("./container/report/reportFreelancer")
);
const ReportClientView = lazy(() =>
  import("./container/report/reportClientView")
);

const TransactionByClient = lazy(() =>
  import("./container/report/paymentInfo/transactionsByClient/index.js")
);

const WorkDetail = lazy(() =>
  import("./container/freelancer/hourly/workDetail.jsx")
);
// const Feedbacks = lazy(() =>
//   import("./container/report/feedback/Feedback.jsx")
// );
const Feedbacks = lazy(() =>
  import("./container/report/feedback/feedbacks.jsx")
);
const DisputeAndClaims = lazy(() =>
  import("./container/report/feedback/disputeAndClaims.jsx")
);
const RefundAndDisputeCase = lazy(() =>
  import("./container/report/feedback/refundAndDisputeCase.jsx")
);

const ContactUs = lazy(() => import("./container/contactUs/contactUs.jsx"));

const CompanyLogin = lazy(() => import("./container/companyAdmin/adminLogin"));
const CompanyDashboard = lazy(() =>
  import("./container/companyAdmin/adminDashboard")
);

const JobOffers = lazy(() => import("./container/jobOffers/jobOffers.jsx"));
const PositionsAvailable = lazy(() =>
  import("./container/positionsAvailable/positionsAvailable.jsx")
);

const ApplyJob = lazy(() => import("./container/jobOffers/applyJob.js"));

const CurrencyDisplay = lazy(() => import("./components/currencyDisplay"));
const stripePromise = loadStripe(
  "pk_test_51KFfGUJCcWze56aAEz7LPAzkESeq1AL0GZBcnan6WeCiKVoztFfxk6qu5FQUD6IkLngHdbx9VzHZP2ZIw6NN4T1k00M5LFfnLy"
);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
    };
  }
  async componentDidMount() {
    const { callGetLookUpData } = this.props;
    let lookupData = await callGetLookUpData();
    await this.userAuthenticate();
    await this.initialPageAPICall();
    this.onKeyManager();
  }
  onKeyManager = async () => {
    var data = ["FIREBASE_API_KEY", "FIREBASE_AUTH_DOMAIN"];
    var result = await request(ENDPOINT["GetKeyValue"], postOptions(data));
    if (!firebase.apps.length) {
      if (result.result) {
        firebase.initializeApp({
          apiKey: result.result["FIREBASE_API_KEY"],
          authDomain: result.result["FIREBASE_AUTH_DOMAIN"],
        });
      }
    } else {
      firebase.app();
    }
  };
  userAuthenticate = async () => {
    if (window.location.href.split("crossdata=")[1]) {
      const result = await request(
        `${ENDPOINT["GetCrossDomain"]}?crosskey=${window.location.href
          .split("crossdata=")[1]
          .replace(/[\/\\#]/g, "")}`,
        getOptions({})
      );
      if (result["crossKey"]) {
        let res = SetCrossData(result["crossData"]);
        if (res) {
          this.props.onSetCrossDomainData("");

          //  debugger
          let userId = JSON.parse(result["crossData"])?.MY_AUTH?.user?.userId;
          if (!userId && JSON.parse(result["crossData"])?.MY_AUTH) {
            userId = JSON.parse(JSON.parse(result["crossData"])?.MY_AUTH).user
              ?.userId;
          }
          if (userId) {
            const response = await getRegisterUserTypes(userId);

            if (response.success) {
              this.props.setRegisteredUserTypes(response.result);
            }
             getUserToken(userId)
            const userResult = await hitApiGetUser(userId);
            if (userResult.success) {
              localStorage.setItem(
                "freelancer_auth",
                JSON.stringify(userResult.result)
              );
              // checking if Freelancer is registered or not
              if (
                userResult.result?.freelancerData?.individualFreelancerId &&
                !localStorage.IndividaulFreelancerRegistrationInfo
              ) {
                if (
                  userResult.result?.freelancerData?.activeStatus === "Active"
                ) {
                  //  set data in redux is freelancer is registered
                  this.props.updateRegisteredUserFlag({
                    type: "isRegisterAsFreelancer",
                    flag: true,
                  });
                }
              }
              // checking if Organization is registered or not
              if (
                userResult.result?.organizationData?.organizationId &&
                !localStorage.CompanyRegistrationInfo
              ) {
                this.props.updateRegisteredUserFlag({
                  type: "isRegisterAsOrganization",
                  flag: true,
                });
              }
              // checking if Client is registered or not
              if (
                userResult.result?.clientData?.clientId &&
                !localStorage.clientRegistrationInfo
              ) {
                this.props.updateRegisteredUserFlag({
                  type: "isRegisterAsClient",
                  flag: true,
                });
              }
              this.props.onSetClientFreelancerData("");
            }
          }
        }
      }
    }
  };

  initialPageAPICall = async () => {
    let user = GetAuth();
    if (user) {
      let userinfo = user["user"];
      if (
        (userinfo?.userType?.toLowerCase() === "user" ||
          userinfo?.userType?.toLowerCase() === "freelancer") &&
        window.location.href.includes("crossdata=") &&
        window.location.pathname === "/"
      ) {
        window.location.href = "/myproject";
      }
      let result = await request(
        `${ENDPOINT["GetChannelInfo"]}?userid=${userinfo["userId"]}`,
        getOptions({})
      );
      if (result["result"]) {
        this.props.onSelectedChannelHandle(result["result"][0]);
        this.props.onMyChannelListHandle(result["result"]);
      }

      let params = {
        userId: userinfo["userId"],
      };
      this.props.callDefaultAddress(params);
    }
  };

  async componentWillReceiveProps(props, next) {
    if (props.isGuest !== this.props.isGuest && this.props.isGuest === false) {
      await this.userAuthenticate();
      await this.initialPageAPICall();
    }
    return true;
  }

  componentWillUnmount() {
    const { callGetLookUpClean } = this.props;
    callGetLookUpClean();
  }

  /*cross domain data sharing end*/

  onActionHandle = (e) => {
    this.props.onReactAlert({ open: false, type: "", title: "", message: "" });
  };

  toggleOpenAlert = (val) => {
    this.setState({
      openAlert: val,
    });
  };

  onCloseModal = async () => {
    const userData = JSON.parse(localStorage.getItem("MY_AUTH"));
    const userRegionData = JSON.parse(localStorage.getItem("MY_COUNTRY"));

    const userParam = {
      userId: userData?.user?.userId,
      sk: "",
      userType: "Client",
      firstName: userData?.user?.firstName,
      lastName: userData?.user?.lastName,
      userTitle: "",
      userBio: "",
      userPassword: "",
      emailId: userData?.user?.email,
      phoneNo: userData?.user?.mobileNo,
      userName: userData?.user?.profileName,
      address: "",
      userCountry: userRegionData?.name,
      userCountryCode: userRegionData?.code,
      userState: "",
      userCity: "",
      userProfileUrl: "",
      skills: "",
      isIndividualUser: false,
      isActive: true,
      organizationId: "",
      professionalField: "",
      userPostalCode: "",
      professionalOverview: "",
      languageProficiency: "",
      portfolio: "",
      certifications: "",
      educations: "",
      employments: "",
      employmentHistory: "",
      wouldLikeToGetJobProposal: false,
      wishedWorkingConditionCountry: "",
      wishedWorkingConditionCity: "",
      wishedWorkingConditionAreaOfWork: "",
      wishedWorkingConditionFromSalary: "",
      wishedWorkingConditionToSalary: "",
      languageTests: "",
      programmingLanguage: "",
      programmingLanguageLevel: "",
    };
    let result = await request(ENDPOINT["CreateUser"], postOptions(userParam));
    if (result.success) {
      this.setState({ userId: result.result, isResumeTabVisible: null });
    } else notifications.showError(result.message);
  };

  onGoClick = async () => {
    const userData = JSON.parse(localStorage.getItem("MY_AUTH"));
    const userRegionData = JSON.parse(localStorage.getItem("MY_COUNTRY"));
    let sessionUserType = sessionStorage.getItem("userType");

    const userParam = {
      userId: userData?.user?.userId,
      sk: "",
      userType: sessionUserType,
      firstName: userData?.user?.firstName,
      lastName: userData?.user?.lastName,
      userTitle: "",
      userBio: "",
      userPassword: "",
      emailId: userData?.user?.email,
      phoneNo: userData?.user?.mobileNo,
      userName: userData?.user?.profileName,
      address: "",
      userCountry: userRegionData?.name,
      userCountryCode: userRegionData?.code,
      userState: "",
      userCity: "",
      userProfileUrl: "",
      skills: "",
      isIndividualUser: false,
      isActive: true,
      organizationId: "",
      professionalField: "",
      userPostalCode: "",
      professionalOverview: "",
      languageProficiency: "",
      portfolio: "",
      certifications: "",
      educations: "",
      employments: "",
      employmentHistory: "",
      wouldLikeToGetJobProposal: false,
      wishedWorkingConditionCountry: "",
      wishedWorkingConditionCity: "",
      wishedWorkingConditionAreaOfWork: "",
      wishedWorkingConditionFromSalary: "",
      wishedWorkingConditionToSalary: "",
      languageTests: "",
      programmingLanguage: "",
      programmingLanguageLevel: "",
    };
    let result = await request(ENDPOINT["CreateUser"], postOptions(userParam));
    if (result.success) {
      this.setState({ userId: result.result, isResumeTabVisible: null });
    } else notifications.showError(result.message);
  };

  render() {
    const { reactalert, hasFooterShow } = { ...this.props };
    const baseHref = document
      .querySelector("base")
      .getAttribute("href")
      .replace(/\/$/, "");

    const options = {
      // passing the client secret obtained from the server
      clientSecret:
        "{{pi_1Dpeav2eZvKYlo2CwsowXp2k_secret_GvmBEoWO7yqbjMgU0YrwLtgDR}}",
    };

    return (
      <div className={this.props.language?.replace('"', "")}>
        <Router basename={baseHref}>
          <Elements stripe={stripePromise} options={options}>
            <NavigationBar
              toggleOpenAlert={this.toggleOpenAlert}
              openAlert={this.state.openAlert}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/how-to-post-a-project"
                component={Howtopostproject}
              />
              <Route path="/pricing" component={Pricing} />
              <Route
                path="/how-to-register-a-headhunter"
                component={Howtoregisterheadhunter}
              />
              <Route
                path="/how-to-register-a-freelancer"
                component={Howtoregisterafreelancer}
              />
              <Route path="/milestone-work" component={MilestoneWork} />
              <Route path="/contest-work" component={ContestWork} />
              {/* <Route path="/work-at-office" component={WorkAtOffice} /> */}
              <Route path="/hourly-work" component={HourlyWork} />
              <Route path="/free-contract" component={FreeContract} />
              <Route path="/manager-work" component={ManagerWork} />
              <Route path="/dispute-work" component={DisputeWork} />
              <Route path="/term-of-use" component={TermsOfUse} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />

              <Layout
                path="/all-freelancer"
                isPrivate={true}
                isClient={true}
                component={AllFreelancer}
              />
              <Layout
                path="/all-my-posts"
                isPrivate={true}
                isClient={true}
                component={AllMyPosts}
              />

              <Layout
                path="/featured-contest"
                isPrivate={true}
                isClient={true}
                component={ContestFeaturedPosts}
              />

              {/* this page is not complete  */}
              {/* <Layout path="/all-resume" component={AllResume} /> */}
              <Layout path="/all-projects" component={AllProjects} />
              <Layout path="/interested-projects" component={InterestedProjects} />
              <Layout
                path="/invitations-offers"
                isPrivate={true}
                isFreelancer={true}
                component={MyInvitations}
              />
              <Layout path="/my-contest" component={MyContest} />
              <Layout
                path="/hire-company"
                isPrivate={true}
                isFreelancer={true}
                component={HireCompany}
              />
              {/*  we are not using this page yet */}
              <Layout path="/all-packages" component={AllPackages} />
              {/*  This page is not implemented yet */}
              <Layout
                path="/talent-search"
                isPrivate={true}
                isClient={true}
                component={TalentSearch}
              />
              {/*  This page is not implemented yet */}
              <Layout
                path="/my-talent"
                isPrivate={true}
                isClient={true}
                isFreelancer={true}
                component={MyTalent}
              />

              {/*  This page is not implemented yet */}
              <Layout path="/user-resume" component={ResumePage} />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/my-proposals"
                component={MyProposal}
              />
              {/*  we are not using this page yet */}
              {/* <Layout
              isPrivate={true}
              isClient={true}
              isFreelancer={true}
              path="/my-offers"
              component={MyOffer}
            /> */}

              <Layout
                isPrivate={true}
                isClient={true}
                path="/create-fulltime-Offer"
                component={CreateOffer}
              />
              {/* this is old page we are not using */}
              {/* <Layout
              isPrivate={true}
              path="/offer-detail"
              isFreelancer={true}
              component={OfferDetail}
            /> */}
              <Layout path="/confirm-project" component={ConfirmProject} />

              <Layout
                path="/post-contest-project"
                isPrivate={true}
                isClient={true}
                component={CreateContestProject}
              />
              <Layout path="/create-freelancer" component={CreateFreelancer} />
              <Layout path="/start-with" component={StartWith} />
              <Layout
                path="/register-headhunter"
                component={HeadHunterRegistration}
              />
              {/* This is static page yet we will integrate this when will registration complete */}
              <Layout
                path="/headhunter-profile"
                component={HeaderHunterProfile}
              />
              {/* this page is static we are not using page */}
              <Layout
                isPrivate={true}
                isClient={true}
                path="/transaction-client"
                component={TransactionByClient}
              />
              {/* old page */}
              {/* <Layout path="/dispute-main" component={DisputeMain} /> */}

              <Layout
                isPrivate={true}
                isClient={true}
                isFreelancer={true}
                path="/evaluation"
                component={Evaluation}
              />
              <Layout
                isPrivate={true}
                isClient={true}
                isFreelancer={true}
                path="/edit-evaluation"
                component={EditEvaluation}
              />
              <Layout path="/help-center" component={HelpCenter} />
              <Layout path="/help-detail" component={HelpDetail} />
              <Layout
                isPrivate={true}
                path="/mobile-verify"
                component={VerifyMobile}
              />

              <Layout
                isPrivate={true}
                isClient={true}
                path="/project-detail-for-client"
                component={ProjectClientDetailNew}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/project-detail-for-freelancer"
                component={ProjectFreelancerDetail}
              />
              {/* this is new static page we */}
              <Layout
                isPrivate={true}
                path="/freelancer-refund"
                component={Refund}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/hourly-contract-detail-client"
                component={HourlyContractDetail}
              />
              {/* for freelancer hourly contract detail HourlyContractDetailFreelancer */}
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/hourly-contract-detail-freelancer"
                component={HourlyContractDetailFreelancer}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/milestone-contract-detail-client"
                component={MileStoneContractDetail}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/milestone-contract-detail-freelancer"
                component={MileStoneContractDetailFreelancer}
              />
              {/* for client free contract detail */}
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/free-contract-detail-client"
                component={FreeContractDetailClient}
              />
              {/* for freelancer free contract detail */}
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/free-contract-detail-freelancer"
                component={FreeContractDetailFreelancer}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/office-contract-detail-client"
                component={OfficeContractDetailClient}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/office-contract-detail-freelancer"
                component={OfficeContractDetailFreelancer}
              />
              {/* this old page we are not using */}
              {/* <Layout
              isPrivate={true}
              path="/office-work-detail"
              component={HourlyReport}
            /> */}
              {/* this old page we are not using */}
              {/*   <Layout
              isPrivate={true}
              path="/milestone-details"
              component={MilestoneMain}
            /> */}
              {/* this link is old not using  */}
              {/*  Not sure about this page */}
              <Layout path="/invoiceDetail" component={InvoiceDetail} />

              {/* Not using this link  */}
              {/* <Layout path="/milestone-report" component={MilestoneMain} /> */}
              {/* This empty component yet may be we will use next */}
              {/* <Layout path="/myclient" component={MyClient} /> */}
              <Layout
                path="/mycontest"
                isPrivate={true}
                isFreelancer={true}
                isClient={true}
                component={MyContest}
              />
              <Layout
                path="/mycontest-list"
                isPrivate={true}
                isClient={true}
                component={MyContestList}
              />
              <Layout
                path="/my-freelancers"
                isPrivate={true}
                isClient={true}
                component={MyFreelancer}
              />
              <Layout path="/hire-freelancer" component={HireFreelancer} />
              <Layout
                path="/my-contracts"
                isPrivate={true}
                isFreelancer={true}
                isClient={true}
                component={MyProject}
              />
              <Layout
                path="/company-invite-freelancer"
                isPrivate={true}
                isFreelancer={true}
                component={CompanyInviteFreelancer}
              />
              {/* this is black page eyt */}
              <Layout
                path="/invitation/accept-company-invitation"
                component={AcceptCompanyInvite}
              />

              <Layout path="/myregion" isPrivate={true} component={MyRegion} />

              {/* Not sure about these may we will use in future */}
              {/* <Layout path="/package-design" component={PackageDesign} />
            <Layout
              path="/package-design-detail"
              component={PackageDesignDetail}
            /> 
            <Layout path="/preferred-design" component={PreferredDesign} />*/}
              {/* this is static component not sure about this component */}
              <Layout path="/project-blog" component={ProjectBlog} />
              <Layout
                path="/profession"
                isPrivate={true}
                isClient={true}
                component={Profession}
              />
              <Layout
                isPrivate={true}
                isClient={true}
                path="/project-post"
                component={ProjectPost}
              />

              <Layout
                path="/project-post-proposal"
                component={PostProjectProposal}
              />

              {/* FreelancersRegion */}
              <Layout
                path="/freelancers-region"
                component={FreelancersRegion}
              />

              <Layout path="/clients-region" component={ClientRegion} />

              <Layout
                path="/project-proposal-detail"
                component={ProjectProposalDetail}
              />
              <Layout
                path="/user-registration"
                component={RegistrationStartWith}
              />
              <Layout
                path="/client-registration"
                component={ClientRegistration}
              />
              {/*  this static component page not sure about this */}
              <Layout path="/client-settings" component={ClientSettings} />

              <Layout
                /* isPrivate={true} */ path="/organization-registration"
                component={OrganizationRegistration}
              />
              {/* Not using this link */}
              {/* <Layout
              path="/edit-organization-registration/:organizationId"
              component={OrganizationRegistration}
            /> */}
              <Layout
                isPrivate={true}
                path="/organization-profile/:organizationId"
                component={OrganizationProfile}
              />
              <Layout
                isPrivate={true}
                isFreelancer={true}
                path="/freelancer-profile/:freelancerId"
                component={FreelancerProfile}
              />
              <Layout
                isPrivate={true}
                isClient={true}
                path="/client-profile/:clientId"
                component={CLientProfile}
              />
              <Layout
                path="/project-post-details"
                component={ProjectPostDetails}
              />
              <Layout
                path="/project-post-hourly"
                component={ProjectPostHourly}
              />
              <Layout
                path="/project-post-milestone"
                component={ProjectPostMileStone}
              />
              <Layout
                path="/project-post-office"
                component={ProjectPostOffice}
              />
              <Layout
                path="/project-post-free-contract"
                component={ProjectFreeContractOffice}
              />
              <Layout
                isPrivate={true}
                path="/report-main"
                component={ReportMain}
              />
              <Layout
                path="/myreport_freelancer"
                component={ReportFreelancer}
              />
              <Layout path="/myreport_client" component={ReportClientView} />
              {/* <Layout path="/feedback-claims" component={Feedbacks} /> */}
              <Layout path="/dispute-claims" component={DisputeAndClaims} />
              <Layout path="/feedbacks" component={Feedbacks} />
              <Layout
                path="/refund-and-dispute-case"
                component={RefundAndDisputeCase}
              />
              {/* Not using this link */}
              {/*   <Layout path="/hourly-work-detail" component={WorkDetail} /> */}
              <Layout path="/contact-us" component={ContactUs} />
              <Layout
                isPrivate={true}
                path="/company-admin-login"
                component={CompanyLogin}
              />
              <Layout
                isPrivate={true}
                path="/company-dashboard"
                component={CompanyDashboard}
              />
              <Layout
                path="/job-applications"
                isPrivate={true}
                isFreelancer={true}
                component={JobOffers}
              />
              <Layout
                path="/job-positions-available"
                isPrivate={true}
                isFreelancer={true}
                component={PositionsAvailable}
              />
              <Layout path="/apply-job" component={ApplyJob} />
              {/* Not using component this was just for demo */}
              {/*  <Layout
              exact
              path="/currency-display"
              component={CurrencyDisplay}
            /> */}
              <Layout path="/payment-transactions" component={paymentInfo} />
              {/* <Redirect to="/" /> */}
              <Route component={NoMatch} />
            </Switch>
            <WelcomeModal
              defaultOpen={this.state.openAlert}
              onCloseModal={this.onCloseModal}
              onGoClick={this.onGoClick}
            />
            {hasFooterShow && <Footer />}
          </Elements>
        </Router>

        <ReactNotifyAlert
          isOpen={reactalert["open"]}
          type={reactalert["type"]}
          title={reactalert["title"]}
          infoText={reactalert["message"]}
          onActionHandle={(e) => this.onActionHandle(e)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="d-none"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}

// export default App;
const mapStateToProps = (state) => {
  return {
    // language: state.data.language,
    hasFooterShow: state.settingReducer.hasFooterShow,
    reactalert: state.settingReducer.reactalert,
    mystate: state.settingReducer.test,
    authReducer: state.authReducer,
    language: state.languageReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReactAlert: (obj) => {
      dispatch({ type: REACT_ALERT, data: obj });
    },
    onSelectedChannelHandle: (channel) => {
      dispatch(onSelectedChannelHandle(channel));
    },
    onMyChannelListHandle: (list) => {
      dispatch(onMyChannelListHandle(list));
    },
    onSetCrossDomainData: (data) => {
      dispatch(onSetCrossDomainData(data));
    },
    setRegisteredUserTypes: (data) => {
      dispatch(setRegisteredUserTypes(data));
    },
    callGetLookUpData: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(
              getLookUpData(position.coords.latitude, position.coords.longitude)
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },

    callGetLookUpClean: () => {
      dispatch(getLookUpDataRequestCleanUp());
    },
    callDefaultAddress: (payload) => {
      dispatch(getDefaultAddressData(payload));
    },
    updateRegisteredUserFlag: (data) => {
      dispatch(updateRegisteredUserFlag(data));
    },
    onSetClientFreelancerData: (data) => {
      dispatch(onSetClientFreelancerData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
