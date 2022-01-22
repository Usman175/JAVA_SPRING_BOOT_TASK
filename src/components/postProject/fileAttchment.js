import React from "react";
import './postProject.scss'
import {
    GET_IMAGE_PREFIX,
    GET_IMAGE_PREFIX1,
  } from "../../store/constants/constant";
const FileAttachments = (props) => {
    return (
        <div className="d-flex m-2 p-1  align-items-center ">
            <i class="fas fa-paperclip"></i>
           <a href={`https://${GET_IMAGE_PREFIX1}/${props.url}`} target={"_blank"}> <span className="flex-grow-1 px-3 file-attachment-item-link"> {props.url.split('/')[1]}  </span></a>
        </div>
    );
}

export default FileAttachments;
