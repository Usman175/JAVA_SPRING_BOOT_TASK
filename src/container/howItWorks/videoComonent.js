import React from 'react'
import './howItWorks.scss'
function VideoComponent(props){
    return(
       <div className="top-video-component-container">
            <div className="top-video-component-area">
      <video   style={{maxWidth:'100%',height:'auto'}}
         autoplay="true"
         loop="true"
         muted
         playsinline=""
        >
        <source src={props.image} type="video/mov" />
       <source src={props.image} type="video/ogg" />
        </video>
        </div>
        <h3>{props.title}</h3>
       </div>
    )
}
export default VideoComponent;