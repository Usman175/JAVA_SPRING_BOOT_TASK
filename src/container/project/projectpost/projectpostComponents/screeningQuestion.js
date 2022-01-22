import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import notifications from "../../../../utils/notifications";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../../components/customLabel/label";

const ScreeningQuestion = (props) => {
  const [id, setId] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  const [flag, setFlag] = useState(true);

  const onAdd = (screeningQuestion) => {
    if (!screeningQuestion.question) {
      notifications.showWarning("Please add question.");
      return;
    }

    setQuestion("");
    setQuestions([...questions, screeningQuestion]);
  };

  const onEditClick = ({ id, question }) => {
    setId(id);
    setQuestion(question);
  };

  const onEditSave = ({ id, question }) => {
    if (!id || !question) {
      notifications.showWarning("Please add question.");
      return;
    }

    let array = questions;
    array.map((element) => {
      if (element.id === id) {
        element.question = question;
      }
    });

    setQuestions(array);
    setId("");
    setQuestion("");
  };

  const onEditCancel = ({ id, question }) => {
    setId(id);
    setQuestion(question);
  };

  const onDelete = ({ id, question }) => {
    setQuestions(questions.filter((n) => n.id !== id));
  };

  useEffect(() => {
    props.onQuestionsChange(questions);
  }, [questions]);

  useEffect(() => {
    setQuestions(props.questions);
  }, []);

  useEffect(() => {
    if (flag && props.questions.length > 0) {
      setQuestions(props.questions);
      setFlag(false);
    }
  });

  return (
    <div className="row align-items-center">
      <div className="col-md-12">
        <div className="form-group">
          <Label title={languageType.SCREENINING_QUESTION}></Label>
          <div className="">
            <div>{languageType.ADD_SCREENING_QUESTION}</div>
            <div className="row pt-2 screeningQuestion_align">
              <div className="col-md-11 col-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder={languageType.PLEASE_ENTER_QUETIONS}
                  name="screeningQuestion"
                  maxLength="100"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="col-md-1 col-2">
                <button
                  type="button"
                  className="btn "
                  hidden={id !== ""}
                  onClick={() => onAdd({ id: v4(), question })}
                >
                  <i className="fa fa-plus" area-hidden="true"></i>
                </button>
                <button
                  type="button"
                  className="btn "
                  hidden={id === ""}
                  onClick={() => onEditSave({ id, question })}
                >
                  <i className="fas fa-pen" area-hidden="true"></i>
                </button>
                &nbsp;&nbsp;&nbsp;
                <button
                  type="button"
                  className="btn "
                  hidden={id === ""}
                  onClick={() => onEditCancel({ id: "", question: "" })}
                >
                  <i className="fa fa-window-close" area-hidden="true"></i>
                </button>
              </div>
            </div>
            <br />
            {questions.length > 0 && (
              <div
                className="form-group"
                style={{
                  border: "0.5px dotted gray",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                <h6>{languageType.YOUR_QUESTIONS}</h6>
                {questions.map((question, index) => (
                  <div key={index} className="col-lg-12 col-md-12">
                    <div className="row align-items-center">
                      <div className="col-md-9">
                        <div className="form-group">
                          <label>{index + 1}.&nbsp;</label>
                          {question.question}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn"
                            onClick={() => onEditClick(question)}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              area-hidden="true"
                            ></i>
                          </button>
                          &nbsp;&nbsp;&nbsp;
                          <button
                            type="button"
                            className="btn"
                            onClick={() => onDelete(question)}
                          >
                            <i className="fa fa-trash" area-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningQuestion;
