import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CheckboxCard from "../checkboxCard/checkboxCard";
import { useDispatch, useSelector } from "react-redux";
import { projectPost_updateProjectType as updateProjectType } from "../../store/action/Project/projectActions";
const ProjectTypeFilter = ({ projectTypes, onChange, projectTypeFlag }) => {
  const [projectTypeItems, setProjectTypeItems] = useState([]); // [{name, title, checked}]
  const [allProjectType, setAllProjectType] = useState({
    checked: false,
    name: 5,
    title: "All Projects",
  });
  const dispatch = useDispatch();

  const projectPost = useSelector((state) => state.projectStore.projectPost);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  useEffect(() => {
    /*      debugger; */
    const newProjectTypeItems = [];
    projectTypes.forEach((projectType, index) => {
      newProjectTypeItems.push({
        name: index,
        title: projectType.text,
        checked: false,
      });
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

    if (projectTypeFlag) {
      if (projectTypeFlag != "All Projects" && projectTypeFlag != "") {
        dispatch(
          updateProjectType(
            projectTypeFlag?.replace(/([A-Z]+)/g, " $1").replace(/^ /, "")
          )
        );
        setAllProjectType({ ...allProjectType, checked: false });
      }
    }
  }, [projectPost.projectType]);

  const onCheckboxCardChange = (event, type, index, name) => {
    if (name === "All Projects") {
      onChange(event, type, index, "");
      dispatch(updateProjectType("All Projects"));
      setAllProjectType({ ...allProjectType, checked: true });
    } else {
      dispatch(updateProjectType(name.replace(/\s/g, "")));
      onChange(event, type, index, name.replace(/\s/g, ""));
      setAllProjectType({ ...allProjectType, checked: false });
    }
  };
  React.useEffect(() => {
    if (!projectTypeItems.length) return;
    const newProjectTypeItems = [...projectTypeItems];
    projectTypes.forEach((projectType, index) => {
      newProjectTypeItems[index].title = projectType.text;
    });
    setProjectTypeItems(newProjectTypeItems);
  }, [languageType]);

  return (
    <div style={{ marginTop: "20px" }}>
      <CheckboxCard
        title="Project Type"
        data={[
          allProjectType,
          ...projectTypeItems.map((item) => {
            if (allProjectType.checked) {
              item.checked = false;
              return item;
            }
            return item;
          }),
        ]}
        languageType={languageType}
        type="projectTypes"
        onChange={onCheckboxCardChange}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projectTypes: state.languageReducer.projectTypes,
  };
};

export default connect(mapStateToProps)(ProjectTypeFilter);
