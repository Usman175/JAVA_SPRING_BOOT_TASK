import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import request from "../../utils/request";
import {ENDPOINT} from "../../utils/endpoint";
import {getOptions} from "../../utils/httpConfig";

class UserCard extends Component {

    constructor() {
        super();
        this.state = {
            imgUrl: 'https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/individual.png'
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.projectObj?.userProfileURL && !this.state.imgUrl) {
            this.getProfileURL(this.props.projectObj.userProfileURL)
        }
    }

    getProfileURL = async (image) => {
        if (image.includes('https://')) return
        let result = await request(ENDPOINT['S3KeyToURL'] + '?key=' + image, getOptions());
        if (result.success) {
            this.setState({ imgUrl: result.result.split('?')[0]})
        }
    }

  render() {
    let { userObj }  = this.props;
     return (
      <div className="card_box checkbox-card">
        <div className="row flex-column justify-content-between align-items-center">
          <div className="col-md-12 ">
            <h5>User Info</h5>
          </div>
          <div className="d-flex w-100">
            <div className="w-75 d-flex flex-fill align-items-center justify-content-center">
                <img
                    src={userObj?.userProfileUrl && userObj?.userProfileUrl.includes('https://') ? userObj.userProfileUrl.split('?')[0] : this.state.imgUrl}
                    alt=""
                    className="w-100 rounded-circle userinfo-border"
                />
            </div>
            <div className="flex-fill p-1 pl-3 w-100">
              <div className="h6 font-weight-bold text-muted" style={{ wordBreak: "break-word" }}>
                {userObj?.userName}
              </div>
                <label className="text-danger">
                    {userObj?.userReviews?.length > 0 &&
                    Number(userObj?.userReviews[0]?.freelancerUserNoOfStar) > 0 ?
                    Array(Number(userObj?.userReviews[0]?.freelancerUserNoOfStar))
                        .fill()
                        .map((_, i) => (
                            <i className="fa fa-star" aria-hidden="true" key={i} />
                        )) :
                        Array(5)
                            .fill()
                            .map((_, i) => (
                                <i className="far fa-star" aria-hidden="true" key={i} />
                            ))}
                </label>
              <div className="div">78%</div>
            </div>
          </div>
          <div
            className="align-self-start mt-2"
            style={{ color: "#499ab3" }}
            onClick={() => userObj.userId && this.props.history.push(`/edit-freelancer/${userObj.userId}`)}
          >
            Edit your profile
        </div>
        </div>
      </div>
    )
  }
}
export default withRouter(UserCard);
