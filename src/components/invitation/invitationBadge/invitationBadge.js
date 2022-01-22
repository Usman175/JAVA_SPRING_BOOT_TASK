import React from 'react'
import './invitationBadge.scss'
function InvitationBadge(props) {
    let {content,from,type}=props;
    return (
        <div className={`invitation-badge ${type+"-"+from}`}>
              {content}
        </div>
    )
}

export default InvitationBadge
