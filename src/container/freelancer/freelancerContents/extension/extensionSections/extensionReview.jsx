import React from "react";
import NoDataAvailable from "../../../../../shared/error/not-data-available-new";
import moment from "moment";
import Skeleton from "../../../../../components/skeleton/skeleton";
import Rating from '@material-ui/lab/Rating';
import ShowMoreText from "react-show-more-text";
import "../../freelancerContents.scss";
function ExtensionReview(props) {
  return (
    <>
      <Skeleton count={2} isSkeletonLoading={props.loading} />
      {!props.loading && props.reviewData.length > 0 ? (
        props.reviewData.map((review) => (
          <>
            <div className="client_review">
              <label className="feedback-top-label" >
                {review?.jobTitle}
                <span className="amount-review">
                  {review?.currencyCode + " "}
                  {review?.projectAmount || "0.00"}
                </span>
               <div className="feed-back-rating-rating">
               <Rating readOnly  name="Client feedback" defaultValue={parseInt(review?.projectContracts[0]?.freelancerFeedback?.totalScore || "0")/20*5}  />
               </div>
              </label>
              <p>
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
                          __html: review?.projectContracts[0]?.freelancerFeedback?.feedbackMessage,
                        }}
                      ></p>
                    </ShowMoreText></p>

              <label className="flag_usa">
              {review?.projectContracts[0]?.freelancerFeedback?.client?.firstName}{" "}
              {review?.projectContracts[0]?.freelancerFeedback?.client?.lastName}
                <span>
                  <img
                    src={`https://raw.githubusercontent.com/lipis/flag-icons/299c91aab31700b139cd83bb89205e8316c0ab55/flags/4x3/${review?.projectContracts[0]?.freelancerFeedback?.client?.addressInfo?.userCountryCode?.toLowerCase()}.svg`}
                    alt=""
                    style={{border:'1px solid lightgray'}}
                  />
                </span>
                {moment(review?.projectContracts[0]?.freelancerFeedback?.createdDateTime).fromNow()}.
              </label>
            </div>
          </>
        ))
      ) :!props.loading? (
        <NoDataAvailable
          minHeight="20vh"
          title="The freelancer has no review at the moment."
        />
      ):null}
    </>
  );
}

export default ExtensionReview;
