import React from "react";
import Skeleton from "./skeleton/skeleton.jsx";
class FallBackComponent extends React.Component {
  render() {
    return (
      <div className="bcknd_container lazy_skeleton">
        <Skeleton count={3} isSkeletonLoading={true} />
      </div>
    );
  }
}

export default FallBackComponent;
