import React from "react";
import { connect } from "react-redux";
import BlobButton from "../../../../components/buttons/blobButton";
import Label from "../../../../components/postProject/label";

const ProjectLifeCycle = (props) => {
  const { languageType, selectedLifecycleStage, onLifecycleStageChange } =
    props;

  return (
    <>
      <Label title={languageType.WHAT_LIFE_CYCLE}></Label>
      <ul
        className="nav nav-tabs tab_menu w-a mb-3"
        id="pills-tab"
        role="tablist"
      >
        <li className="nav-item" onClick={() => onLifecycleStageChange(1)}>
          <BlobButton
            className={`nav-link ${
              selectedLifecycleStage === 1 || !selectedLifecycleStage
                ? "nav-link active"
                : "nav-link"
            }`}
            id="lifecycle1"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-home3"
            aria-selected="true"
            content={languageType.LIFE_CYCLE_1}
          />
        </li>
        <li className="nav-item" onClick={() => onLifecycleStageChange(2)}>
          <BlobButton
            className={`nav-link ${
              selectedLifecycleStage === 2 ? "nav-link active" : "nav-link"
            }`}
            id="lifecycle2"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-profile3"
            aria-selected="false"
            content={languageType.LIFE_CYCLE_2}
          />
        </li>
        <li className="nav-item" onClick={() => onLifecycleStageChange(3)}>
          <BlobButton
            className={`nav-link ${
              selectedLifecycleStage === 3 ? "nav-link active" : "nav-link"
            }`}
            id="lifecycle3"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-contact3"
            aria-selected="false"
            content={languageType.LIFE_CYCLE_3}
          />
        </li>
        <li className="nav-item" onClick={() => onLifecycleStageChange(4)}>
          <BlobButton
            className={`nav-link ${
              selectedLifecycleStage === 4 ? "nav-link active" : "nav-link"
            }`}
            id="lifecycle4"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-design3"
            aria-selected="false"
            content={languageType.LIFE_CYCLE_4}
          />
        </li>
        <li className="nav-item" onClick={() => onLifecycleStageChange(5)}>
          <BlobButton
            className={`nav-link ${
              selectedLifecycleStage === 5 ? "nav-link active" : "nav-link"
            }`}
            id="lifecycle5"
            data-toggle="pill"
            role="tab"
            aria-controls="pills-archite3"
            aria-selected="false"
            content={languageType.LIFE_CYCLE_5}
          />
        </li>
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    languageType: state.languageReducer.languageType,
  };
};

export default connect(mapStateToProps)(ProjectLifeCycle);
