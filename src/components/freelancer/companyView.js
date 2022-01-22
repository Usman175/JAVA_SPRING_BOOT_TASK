import React from 'react'
import "./freelancer.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import moment from "moment";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      zIndex: 999999,
    },
  }));
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }

function CompanyView(props) {
    let { userProfile,contractDetail}=props

    const handleRedirectFreelancer = (data) => {
        if (data.individualFreelancerId) {
          props.history.push(`/freelancer-profile/${data.individualFreelancerId}`);
        } else if (data.organizationId) {
          props.history.push(`/organization-profile/${data.organizationId}`);
        }
      };
    return (
        <div className='company-freelancers-view-contract-detail'>
          <div className='company-freelancers-view'>
            <div className='next-icon'>
            <i className="fa fa-angle-right "></i>
              </div>  
          {
              ["","",""].map((item,index)=>(
                <div className='freelancer-view-contract'>
                <div className="media align-items-center mediaCompanyView_clientDetail_mobile">
                 <div className="media-left d-flex align-items-center justify-content-center">
                   <img
                     className="image-placement-contract"
                     src={
                       userProfile?.userProfileUrl
                         ? `https://dhihitu47nqhv.cloudfront.net/${userProfile?.userProfileUrl}`
                         : "https://dhihitu47nqhv.cloudfront.net/profileimage/64205290-20ef-4083-8d04-02033194bf73.png"
                     }
                     alt="profile"
                     style={{ fontSize: "15px" }}
                   />
                 </div>
                 <div className="media-body post_modal">
                   <BootstrapTooltip
                     PopperProps={{
                       disablePortal: true,
                     }}
                     arrow
                     placement="top"
                     title={"Open freelancer profile"}
                   >
                     <h5
                       onClick={() => handleRedirectFreelancer(userProfile)}
                       className="profile-name-contact"
                     >
                       {userProfile?.firstName + " " + userProfile?.lastName}
                     </h5>
                   </BootstrapTooltip>
                   <div className="contract-profile-content-rating">
                   <Rating
                     name="User rating"
                     value={3}
                     readOnly
                     emptyIcon={<StarBorderIcon fontSize="inherit" />}
                   />
                   </div>
                   <p className="contract-profile-content">
                     {" "}
                    <img src="https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/icons/location_pin_icon.svg" />&nbsp;
                    {userProfile?.addressInfo?.userCity}&nbsp; &nbsp;
                     {userProfile?.addressInfo?.userCountry} 
                   </p>
                   {/* Not using this may in future */}
                
                 </div>
               </div>
               <div className="contract-no-client-contract-detail">
                     Contract No: <span>{contractDetail?.projectContractId}</span>
                   </div>
                   <div className='freelancer-view-contract-badge'>
                       Active
                   </div>
                </div>
              ))
          }
          </div>  
           <div className="freelancer-select-area"
      >
        <span>
          <i className="fa fa-angle-left "></i>
        </span>
        <span>{moment().format("dddd, MMM D, YYYY")}</span>
        <span>
          <i className="fa fa-angle-right "></i>
        </span>
      </div>
      <div className='company-total-badge-area'>
      <div className='company-total-badge'> Company Total</div> 
      </div>
        </div>
    )
}

export default CompanyView
