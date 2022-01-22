import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CheckboxCard from "../checkboxCard/checkboxCard";
import { useDispatch, useSelector } from "react-redux";
import { projectPost_updateProjectType as updateProjectType } from "../../store/action/Project/projectActions";
const FreelancerTypeFilter = ({ freelancerTypes, onChange }) => {
  const [projectTypeItems, setProjectTypeItems] = useState([]); // [{name, title, checked}]
  const dispatch = useDispatch();

  const projectPost = useSelector((state) => state.projectStore.projectPost);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector(
    (state) => state.languageReducer
  );
  useEffect(() => {
    /*      debugger; */
    const newProjectTypeItems = [];
    freelancerTypes.forEach((projectType, index) => {
      if(projectType.value==="Any"){
      newProjectTypeItems.push({
        name: index,
        title: languageReducer.language==="English"?'Advanced Search':languageReducer.language==="Korean"?'상세 찾기':languageReducer.language==="Japanese"?'高度な検索':'Advanced Search',
        checked: false,
      });
    }else{
      newProjectTypeItems.push({
        name: index,
        title: projectType.text,
        checked: false,
      });
    }
    });

    setProjectTypeItems(newProjectTypeItems);
  }, []);

  useEffect(() => {
    let newProjectTypes = [...projectTypeItems];
    let filterType = newProjectTypes.filter((item) => item.checked === true)[0];
    if (filterType) {
      filterType.checked = false;
      let newProjectType = newProjectTypes.filter(
        (item) => item.title === projectPost.projectType
      )[0];
      if (newProjectType) {
        newProjectType.checked = true;
        setProjectTypeItems(newProjectTypes);
      }
    } else {
      let newProjectType = newProjectTypes.filter(
        (item) => item.title === projectPost.projectType
      )[0];
      if (newProjectType) {
        newProjectType.checked = true;
        setProjectTypeItems(newProjectTypes);
      }
    }
  }, [projectPost.projectType]);

  const onCheckboxCardChange = (event, type, index, name) => {
    dispatch(updateProjectType(name));
    onChange(event, type, index, name);
  };
  React.useEffect(() => {
    if (!projectTypeItems.length) return;
    const newProjectTypeItems = [...projectTypeItems];
    freelancerTypes.forEach((projectType, index) => {
      if(projectType.value==="Any"){
        newProjectTypeItems[index].title =languageReducer.language==="English"?'Advanced Search':languageReducer.language==="Korean"?'상세 찾기':languageReducer.language==="Japanese"?'高度な検索':'Advanced Search';
      }else{
        newProjectTypeItems[index].title = projectType.text;
      }
   
    });
    setProjectTypeItems(newProjectTypeItems);
  }, [languageType]);
  return (
    <div style={{ marginTop: "20px" }}>
    
      <CheckboxCard
        title="Freelancer Type"
        data={projectTypeItems}
        type="freelancerTypes"
        onChange={onCheckboxCardChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    freelancerTypes: state.languageReducer.freelancerTypes,
  };
};

export default connect(mapStateToProps)(FreelancerTypeFilter);
