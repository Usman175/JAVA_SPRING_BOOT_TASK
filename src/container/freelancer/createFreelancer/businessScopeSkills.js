import React, { useState } from "react";
import Heading from "../../../components/freelancerCreation/heading";
import Label from "../../../components/postProject/label";
import DropdownList from "../../../components/dropdowns/dropdownList";
import notifications from "../../../utils/notifications";
import { isNumeric, isValidString } from "../../../utils/validationConfig";
import { useDispatch, useSelector } from "react-redux";
import { selectSubScopes } from "../../../utils/helpers";
import Skeleton from "../../../components/skeleton/skeleton";
import request from "../../../utils/request";
import { ENDPOINT } from "../../../utils/endpoint";
import {
  getOptions,
  postMultipartFile,
  postOptions,
} from "../../../utils/httpConfig";

import "./createFreelancer.scss";
export default function SkillAndBusinessStep(props) {
  const [projectScope, setProjectScope] = useState("");
  const [subScope, setSubScope] = useState([]);
  const [selectedSubScopes, setSelectedSubScopes] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [Skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [OneToThree, setOneToThree] = useState([]);
  const [FourToSix, setFourToSix] = useState([]);
  const [SevenToTen, setSevenToTen] = useState([]);
  const [MoreThanTen, setMoreThanTen] = useState([]);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const languageReducer = useSelector((state) => state.languageReducer);

  React.useEffect(() => {
    getFreelancerDetail();
  }, []);

  const getFreelancerDetail = async () => {
    if (props.userId) {
      setIsSkeletonLoading(true);
      let result = await request(
        `${ENDPOINT["GetIndividualFreelancer"]}?individualFreelancerId=${props.userId}`,
        getOptions()
      );
      if (result.success && result.result) {
        setIsSkeletonLoading(false);
        if (result.result.skills && result.result.skills.length > 0) {
          handleUpdateSkills(result.result.skills);
        }
        if (result.result.serviceScopes && result.result.serviceScopes[0]) {
          setProjectScope(result.result.serviceScopes[0].serviceScope);
          setSelectedSubScopes(result.result.serviceScopes[0].subServiceScope);
          setSubScope(
            selectSubScopes(
              result.result.serviceScopes[0].serviceScope,
              languageReducer.projectScopes
            )
          );
        }
        // console.log(result,"result")
      } else {
        setIsSkeletonLoading(false);
      }
    }
  };
  
  const handleUpdateSkills = (skills) => {
    let OneToThree1 = [];
    let FourToSix1 = [];
    let SevenToTen1 = [];
    let MoreThanTen1 = [];

    skills.map((item) => {
      if (item.experienceYears === "1~3 years") {
        OneToThree1.push(item.skillName);
      }
      if (item.experienceYears === "4~6 years") {
        FourToSix1.push(item.skillName);
      }
      if (item.experienceYears === "7~10 years") {
        SevenToTen1.push(item.skillName);
      }
      if (item.experienceYears === "More than 10 years") {
        MoreThanTen1.push(item.skillName);
      }
    });

    setOneToThree(OneToThree1);
    setFourToSix(FourToSix1);
    setSevenToTen(SevenToTen1);
    setMoreThanTen(MoreThanTen1);
  };

  const handleValidation = () => {
    let errorMessage = {};
    let formIsValid = true;
    if (!isValidString(projectScope)) {
      formIsValid = false;
      errorMessage["projectScope"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "100",
        behavior: "smooth",
      });
      notifications.showWarning("Business Scope  is Required");
    } else if (selectedSubScopes.length == 0) {
      formIsValid = false;
      errorMessage["selectedSubScopes"] = languageType.REQUIRED_MESSAGE;
      window.scrollTo({
        top: "140",
        behavior: "smooth",
      });
      notifications.showWarning("At least one Business Sub Scope  is Required");
    } else if (
      OneToThree.length == 0 &&
      FourToSix.length == 0 &&
      SevenToTen.length == 0 &&
      SevenToTen.length == 0 &&
      MoreThanTen.length == 0
    ) {
      formIsValid = false;
      errorMessage["skills"] = languageType.REQUIRED_MESSAGE;

      notifications.showWarning(
        "At least one skill  is Required in experience blocks"
      );
    }

    setErrorMessage(errorMessage);
    return formIsValid;
  };
  const handleSubmit = async () => {
    if (handleValidation()) {
      setLoading(true);
      let param = {
        individualFreelancerId: props.userId,
        serviceScopes: [
          {
            serviceScope: projectScope,
            subServiceScope: selectedSubScopes.filter(
              (item) => item != "all" && item != "others"
            ),
          },
        ],
        skills: [
          ...OneToThree.map((skill) => ({
            skillName: skill,
            experienceYears: "1~3 years",
            description: "",
          })),
          ...FourToSix.map((skill) => ({
            skillName: skill,
            experienceYears: "4~6 years",
            description: "",
          })),
          ...SevenToTen.map((skill) => ({
            skillName: skill,
            experienceYears: "7~10 years",
            description: "",
          })),
          ...MoreThanTen.map((skill) => ({
            skillName: skill,
            experienceYears: "More than 10 years",
            description: "",
          })),
        ],
      };
      let result = await request(
        ENDPOINT["UpdateFreelancerServices"],
        postOptions(param)
      );
      if (result.success) {
        notifications.showSuccess(
          "Skills & Business info saved successfully !"
        );
        localStorage.setItem(
          "IndividaulFreelancerRegistrationInfo",
          JSON.stringify({
            step: "Resume",
            userId: result.result.individualFreelancerId,
          })
        );
        props.handleNext("Resume");
        window.scrollTo({
          top: "0",
          behavior: "smooth",
        });
        setLoading(false);
      } else {
        notifications.showError(
          result.message || "Error while update your Business scope, Try again"
        );
      }
    }
  };

  const handleSubScope = (value) => {
    setProjectScope(value);
    setSelectedSubScopes([]);
    setSubScope(selectSubScopes(value, languageReducer.projectScopes));
  };

  const handleAddSubScope = (flag, value) => {
    if (value === "all") {
      if (flag) {
        setSelectedSubScopes(subScope.map((item) => item.value));
      } else {
        setSelectedSubScopes([]);
      }
    } else {
      if (flag) {
        setSelectedSubScopes([...selectedSubScopes, value]);
      } else {
        setSelectedSubScopes(
          selectedSubScopes.filter((item) => item != value && item != "all")
        );
      }
    }
  };
  
  const handleRemoveSkill = (skill) => {
    setSkills(Skills.filter((item) => item != skill));
  };
  const handleDragItem = (e, skill) => {
    e.dataTransfer.setData("skill", skill);
  };
  const handleAllowDrop = (e) => {
    e.preventDefault();
  };
  const handleDrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("skill");
    setSkills(Skills.filter((item) => item != data));
    setOneToThree([...OneToThree, data]);
  };
  const handleDropFourToSix = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("skill");
    setSkills(Skills.filter((item) => item != data));
    setFourToSix([...FourToSix, data]);
  };
  const handleDropSevenToTen = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("skill");
    setSkills(Skills.filter((item) => item != data));
    setSevenToTen([...SevenToTen, data]);
  };
  const handleDropMoreThanTen = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("skill");
    setSkills(Skills.filter((item) => item != data));
    setMoreThanTen([...MoreThanTen, data]);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    let value = document.getElementById("skill-value").value;
    if (value) {
      let find1 = Skills.find((item) => item === value);
      let find2 = OneToThree.find((item) => item === value);
      let find3 = FourToSix.find((item) => item === value);
      let find4 = SevenToTen.find((item) => item === value);
      let find5 = MoreThanTen.find((item) => item === value);
      if (!find1 && !find2 && !find3 && !find4 && !find5) {
        setSkills([...Skills, value]);
        document.getElementById("skill-value").value = "";
      } else {
        notifications.showWarning("This skill is already added");
      }
    }
  };
  return (
    <div class=" freelancer_reg business-and-skills-register-area">
      <Skeleton count={5} isSkeletonLoading={isSkeletonLoading} />

      <div hidden={isSkeletonLoading} class="post_form">
        <div className="form-group row   mb-3">
          <label for="business-category" class="col-sm-3 col-form-label">
            <span className="form-label-icon text-left">
              <img
                width={25}
                src={
                  "https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/briefcase.svg"
                }
              />
            </span>
            {languageType.BUSINESS_SCOPE}
          </label>
          <div class="col-sm-9">
            <div className="row">
              <div className="col-lg-12">
                <DropdownList
                  id={`business-category}`}
                  name={`business-category`}
                  enableAutoComplete
                  enableAutoCompleteSearch
                  placeHolder="Business Category"
                  value={projectScope}
                  selectItem={(value) => {
                    handleSubScope(value);
                  }}
                  items={languageReducer.projectScopes}
                />
                {errorMessage.businessCategory && (
                  <div className="text-danger">
                    {errorMessage.businessCategory}
                  </div>
                )}
                <br />
                <div class="dev_box">
                  <div class="d-flex align-items-center business-scope-area-12">
                    {subScope.length > 0
                      ? subScope.map((item, index) => (
                          <div class="checkbox-for-business-scope">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleAddSubScope(e.target.checked, item.value)
                              }
                              checked={selectedSubScopes.includes(item.value)}
                              className="custom-checkbox-styled"
                              id={`styled-checkbox-business${index}`}
                              required
                            />
                            <label for={`styled-checkbox-business${index}`}>
                              {item.text}
                            </label>
                          </div>
                        ))
                      : "Business subScopes"}
                  </div>
                </div>

                {errorMessage.selectedSubScopes && (
                  <p className="text-danger">
                    {" "}
                    {errorMessage.selectedSubScopes}{" "}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row   mb-3">
          <label for="business-category" class="col-sm-3 col-form-label">
            <span className="form-label-icon text-left">
              <img
                width={25}
                src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/skills.png"}
              />
            </span>
            Services/Skills
          </label>
          <div class="col-sm-9">
            <div className="row">
              <div className="col-lg-12">
                <form onSubmit={(e) => handleAddSkill(e)}>
                  <div class="your_skill">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Write your services or skills and press enter ex) C#"
                        id="skill-value"
                        class="form-control"
                      />
                      <div class="input-group-append">
                        <button type="submit" class="btn btn-dark">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="skill-area">
              <div class="skill_btn  d-flex row">
                {Skills.length > 0 &&
                  Skills.map((skill) => (
                    <a
                      draggable="true"
                      id="skill-block"
                      onDragStart={(e) => handleDragItem(e, skill)}
                      class="d-flex justify-content-between align-items-center"
                    >
                      {skill}{" "}
                      <span onClick={() => handleRemoveSkill(skill)}>x</span>
                    </a>
                  ))}
              </div>
            </div>
            <label>
              <small>Drag your skill the levels below</small>
            </label>
          </div>
        </div>

        <div className="form-group row   mb-3">
          <label for="business-category" class="col-sm-3 col-form-label">
            <span className="form-label-icon text-left">
              <img
                width={25}
                src={"https://jungleworksassetsbucket.s3.ap-northeast-2.amazonaws.com/bearoleImages/icons/experience.png"}
              />
            </span>
            Experience
          </label>
          <div class="col-sm-9">
            <div className="row">
              <div className="col-lg-12">
                <div class="row">
                  <div class="col-md-3">
                    <div class="exp_box">
                      <a href="" class="exp_click">
                        1~3 years
                      </a>
                      <div
                        className="experience-skill-box"
                        id="OneToThree"
                        onDragOver={(e) => handleAllowDrop(e)}
                        onDrop={(e) => handleDrop(e)}
                      >
                        <div class="skill_btn">
                          {OneToThree.length > 0 &&
                            OneToThree.map((skill) => (
                              <a class="d-flex justify-content-between align-items-center">
                                {skill}{" "}
                                <span
                                  onClick={() => {
                                    setOneToThree(
                                      OneToThree.filter((item) => item != skill)
                                    );
                                  }}
                                >
                                  x
                                </span>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="exp_box">
                      <a href="" class="exp_click">
                        4~6 years
                      </a>
                      <div
                        className="experience-skill-box"
                        id="FourToSix"
                        onDragOver={(e) => handleAllowDrop(e)}
                        onDrop={(e) => handleDropFourToSix(e)}
                      >
                        <div class="skill_btn">
                          {FourToSix.length > 0 &&
                            FourToSix.map((skill) => (
                              <a class="d-flex justify-content-between align-items-center">
                                {skill}{" "}
                                <span
                                  onClick={() => {
                                    setFourToSix(
                                      FourToSix.filter((item) => item != skill)
                                    );
                                  }}
                                >
                                  x
                                </span>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="exp_box">
                      <a class="exp_click">7~10 years</a>
                      <div
                        className="experience-skill-box"
                        id="SevenToTen"
                        onDragOver={(e) => handleAllowDrop(e)}
                        onDrop={(e) => handleDropSevenToTen(e)}
                      >
                        <div class="skill_btn">
                          {SevenToTen.length > 0 &&
                            SevenToTen.map((skill) => (
                              <a class="d-flex justify-content-between align-items-center">
                                {skill}{" "}
                                <span
                                  onClick={() => {
                                    setSevenToTen(
                                      SevenToTen.filter((item) => item != skill)
                                    );
                                  }}
                                >
                                  x
                                </span>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="exp_box">
                      <a href="" class="exp_click">
                        More than 10 years
                      </a>
                      <div
                        className="experience-skill-box"
                        id="MoreThanTen"
                        onDragOver={(e) => handleAllowDrop(e)}
                        onDrop={(e) => handleDropMoreThanTen(e)}
                      >
                        <div class="skill_btn">
                          {MoreThanTen.length > 0 &&
                            MoreThanTen.map((skill) => (
                              <a class="d-flex justify-content-between align-items-center">
                                {skill}{" "}
                                <span
                                  onClick={() => {
                                    setMoreThanTen(
                                      MoreThanTen.filter(
                                        (item) => item != skill
                                      )
                                    );
                                  }}
                                >
                                  x
                                </span>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {errorMessage.skills && (
                  <p className="text-danger"> {errorMessage.skills} </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div
          className="create-freelancer-bottom-steps"
          style={{ paddingRight: "0px" }}
        >
          <button
            onClick={() => {
              props.handleBack("userProfile");
            }}
            className="create-freelancer-bottom-steps-back"
          >
            Back
          </button>
          <button
            disabled={loading}
            onClick={() => {
              handleSubmit();
            }}
            className="create-freelancer-bottom-steps-skip"
          >
            Save {loading ? <i className="fa fa-spinner fa-spin"></i> : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
