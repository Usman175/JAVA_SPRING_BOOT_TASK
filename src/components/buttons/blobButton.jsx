import React from "react";

const BlobButton = (props) => {
  const removeProps = (obj, propsToRemove) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (propsToRemove.indexOf(key) === -1) newObj[key] = obj[key];
    });
    return newObj;
  };

  const { content, image } = props;
  let others = removeProps(props, "content");
  others = removeProps(props, "image");
  others.className = "blob-btn " + others.className;
  return (
    <>
      <a {...others}>
        <div className="d-flex">
          {image && (
            <div
              className="blob-image p-0"
              style={{ backgroundImage: `url('${image}')` }}
            ></div>
          )}
          <div className="blob-content">{content}</div>
        </div>
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
            <span className="blob-btn__blob"></span>
          </span>
        </span>
      </a>
    </>
  );
};

export default BlobButton;
