import React from "react"

import './proposals.scss'
export const ProposalTipCard = () => {
    return (
        <div>
            <div className="proposals-headings">
                <h3>MY PROPOSALS</h3>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-12 row align-items-center">
                    <img className="col-2 w-50" src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/u113.png"} style={{ objectFit: "contain", transform: "scale(0.7)" }} rounded="true" />
                    Your propose is being reviewed by clients. <br />
                    Proposals will be reviewed maximum 10 days from the closing date <br />
                    For local projects or an job interview, in case the client wish to interview, <br />
                    we will contact you individually.
                </div>
            </div>
        </div>
    )
}
