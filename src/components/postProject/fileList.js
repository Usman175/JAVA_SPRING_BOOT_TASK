import React from "react";

const FileList = ({ id, name, size, handleFileDelete }) => {
    return (
        <div className="d-flex m-2 p-1  align-items-center">
            <i class="fas fa-paperclip"></i>
            <span className="flex-grow-1 px-3"> {name} ({size} KB) </span>
            <i onClick={() => handleFileDelete(id)} className="fa fa-trash" style={{ color: "#690", cursor: "pointer" }} aria-hidden="true" />
        </div>
    );
}

export default FileList;
