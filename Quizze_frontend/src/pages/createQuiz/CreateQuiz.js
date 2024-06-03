import React, { useState } from "react";
import axios from "axios";
// import { useNavigate, Link} from "react-router-dom";
import "./CreateQuiz.css";
import { v4 as uuidv4 } from "uuid";
import Timer from "../Timer/Timer.js";
import { Link } from "react-router-dom";
// import { string } from "i/lib/util";

export default function Mymodal({ closeModal }) {
  const [corectValue, setCorectValue] = useState(0);
  const [numOfOpotion, setnumOfOpotion] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState(null);
  // const [question, setQuestion] = useState("");
  // const [userEmail, setemail] = useState("");
  const [option, setOption] = useState("");
  const [url, setUrl] = useState("");
  const [both, setBoth] = useState("");
  // const [quizId, setQuizId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["",""]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const [optionType, setOptionType] = useState("text");
  const [numOfQuestion, setnumOfQuestion] = useState(1);

  const [placeholder, setPlaceholder] = useState("Text");

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleOptionTypeChange = (event) => {
    const value = event.target.value;
    console.log("handleOptionTypeChange -> ", value);
    setOption(value);
    setOptionType(value);
    const elements = document.getElementsByClassName("optionradio");
    if (value === "text") {
      console.log("text changed");
      setPlaceholder("Text");
    } else if (value === "url") {
      console.log("url changed");
      setPlaceholder("Image url");
    } else {
      console.log("t u changed");
      setPlaceholder("Text & Image url");
    }
  };

  const handleClick = (quizTypeARG) => {
    setQuizType(quizTypeARG);
    if (quizTypeARG === "poll") {
      setCurrentOptions(["", "", "", ""]);
    }
  };

  const handleQuestionChange = (index, e) => {
    setCurrentQuestion(e);
    const newQuestions = [...questions];
    newQuestions[index] = e;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...currentOptions];
    newOptions[index] = event.target.value;
    setCurrentOptions(newOptions);
  };

  const [isVisible, setIsVisible] = useState(true);
  const handleAddQuestions = () => {
    if (numOfQuestion < 5) {
      setQuestions((prevQuestions) => [...prevQuestions, ""]);
      setnumOfQuestion(numOfQuestion + 1);
      if (numOfQuestion === 4) {
        setIsVisible(!isVisible);
      }
    }
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((question, i) => i !== index));
    setnumOfQuestion(numOfQuestion - 1);
    if (numOfQuestion === 5) {
      setIsVisible(!isVisible);
    }
  };

  const handleAddOption = () => {
    if (currentOptions.length < 4) { // Limit to a total of 4 options
      setCurrentOptions([...currentOptions, '']);
    }
  };

  const handleDeleteOption = (index) => {
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== index);
      setCurrentOptions(newOptions);
      if (index === correctIndex) {
        setCorrectIndex(null); // Reset correctIndex if the correct option is deleted
      } else if (index < correctIndex) {
        setCorrectIndex(correctIndex - 1); // Adjust correctIndex if an option before it is deleted
      }
    }
  };

  const handleSetCorrectOption = (index) => {
    setCorrectIndex(index);
  };  

  const handleContinueClick = () => {
    if (activeStep === 0) {
      console.log("quizType->", quizType);
      setActiveStep((prevStep) => prevStep + 1);
    } else if (activeStep === 1) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { question: currentQuestion, options: currentOptions },
      ]);
      setActiveStep((prevStep) => prevStep + 1);
    }
    if (continueToNextStep) {
      // Continue to the next step
      console.log("Continuing to the next step...");
    }
  };

  const [shareableLink, setShareableLink] = useState("");
  const [continueToNextStep, setContinueToNextStep] = useState(false);

  const handleCreateQuiz = () => {
    const quizId = uuidv4();
    const link = `https://example.com/quiz/${quizId}`;
    setShareableLink(link);
    setContinueToNextStep(true);
  };

  const YourComponent = ({ activeStep, shareableLink }) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareButtonClick = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => setLinkCopied(true))
      .catch((error) => console.error('Failed to copy shareable link: ', error));
  };
}


  async function QnAClick(e) {
    
  
    try {
      const response = await axios.post('http://localhost:4000/createquiz/qna', {
        user_email: "", // Provide the user's email
        quiz_id: "", // Provide the quiz ID if available
        quiz_name: "", // Provide the quiz name
        quiz_type: "", // Provide the quiz type
        questions: [
          {
            question: "", // Provide the question text
  
            options: [
              {
                option: "", // Provide the option text
                iscorrect: true, // Indicate whether the option is correct or not
              },
            ],
          },
        ],
      });
  
      console.log('Response from Express:', response.data);
    } catch (error) {
      console.error('Error sending data to Express:', error);
    }
  }


  return (
    <div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div
            class="quiz-name-type"
            style={
              quizType === "qna" && activeStep === 1
                ? { width: "700px", marginInline: "398px" }
                : null
            }
          >
            {activeStep === 0 && (
              <div class="action-buttons">
                <input
                  class="quiz-name"
                  placeholder="Quiz name"
                  value={quizName}
                  onChange={handleQuizNameChange}
                ></input>
                <div class="display-flex buttons">
                  <p class="quiz-type">Quiz Type</p>
                  <button
                    onClick={() => {
                      handleClick("qna");
                      // QnAClick();
                    }}
                    class="qna-button"
                    style={{
                      backgroundColor: quizType === "qna" ? "#60B84B" : "white",
                      color: quizType === "qna" ? "white" : "#757575",
                    }}
                  >
                    Q & A
                  </button>
                  <button
                    onClick={() => handleClick("poll")}
                    class="poll-type-button"
                    style={{
                      backgroundColor:
                        quizType === "poll" ? "#60B84B" : "white",
                      color: quizType === "poll" ? "white" : "#757575",
                    }}
                  >
                    Poll Type
                  </button>
                </div>
                <Link to="/dashboard">
                  <button class="cancel" onClick={closeModal}>
                    Cancel
                  </button>
                </Link>
                <button
                  class="continue"
                  onClick={() => {
                    handleContinueClick();
                    QnAClick();
                  }}
                  disabled={!quizType}
                >
                  Continue
                </button>
              </div>
            )}
            <div class="box">
              {activeStep === 1 && (
                <div class="action-buttons">
                  <div class="question-options">
                    <div class="box1">
                      <div class="add-button-div">
                        <div class="first-render">
                          <button class="question-number">1</button>
                          <button
                            class="add-button"
                            onClick={handleAddQuestions}
                          >
                            +
                          </button>
                        </div>
                        <div class="render-parent">
                          {questions.map((Question, index) => (
                            <div class="render" key={index}>
                              <p class="inline option"></p>
                              <div>
                                <button
                                  class="question-number"
                                  value={Question}
                                >
                                  {index + 2}
                                </button>
                                <button
                                  class="delete-button"
                                  onClick={() => handleDeleteQuestion(index)}
                                >
                                  x
                                </button>
                                {index === questions.length - 1 &&
                                  isVisible && (
                                    <button
                                      onChange={(e) =>
                                        handleQuestionChange(index, e)
                                      }
                                      class="add-button"
                                      onClick={handleAddQuestions}
                                    >
                                      +
                                    </button>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div class="inline-question ">
                      <input
                        style={
                          quizType === "qna" && activeStep === 1
                            ? {
                                width: "660px",
                              }
                            : null
                        }
                        type="text"
                        onChange={(e) => handleQuestionChange(e)} 
                        placeholder={quizType === "qna" ? "Q & A Question" : "Poll Question"}  
                      ></input>

                      </div>
                      <div class="optionType">
                        <p class="optionfont">Option Type</p>
                        <div>
                          <input
                            type="radio"
                            class="optionradio"
                            name="optionradio"
                            value="text"
                            onChange={handleOptionTypeChange}
                            checked={placeholder === "Text"}
                          ></input>
                          <label>Text</label>
                          <input
                            type="radio"
                            class="optionradio"
                            name="optionradio"
                            value="url"
                            onChange={handleOptionTypeChange}
                          ></input>
                          <label>Image</label>
                          <input
                            type="radio"
                            class="optionradio"
                            name="optionradio"
                            value="both"
                            onChange={handleOptionTypeChange}
                          ></input>
                          <label>Text & Image</label>
                        </div>
                      </div>
                    </div>
                    <div class="options">
                      <div class="qnaOptions">
                      <div>
                      {currentOptions.map((option, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center" }}>
                          <div>
                            <p className="inline option"></p>
                            {quizType === "qna" && (
                              <input
                                type="radio"
                                name="correct"
                                className="radio"
                                checked={index === correctIndex}
                                onChange={() => handleSetCorrectOption(index)}
                              />
                            )}
                          </div>
                          <div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <input
                                style={{
                                  width: "250px",
                                  background: index === correctIndex ? "green" : "",
                                  color: index === correctIndex ? "white" : "",
                                }}
                                type="text"
                                className="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e)}
                                placeholder={
                                  placeholder !== "Text & Image url"
                                    ? placeholder
                                    : "Text"
                                }
                              />
                              {placeholder === "Text & Image url" && (
                                <input
                                  style={{
                                    width: "250px",
                                    background: index === correctIndex ? "green" : "",
                                    color: index === correctIndex ? "white" : "",
                                  }}
                                  type="text"
                                  className="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e)}
                                  placeholder="Image url"
                                />
                              )}
                              {quizType === "qna" && index >= 2 && (
                                <button
                                  className="uil--trash-alt"
                                  onClick={() => handleDeleteOption(index)}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {quizType === "qna" && currentOptions.length < 4 && (
                        <button onClick={handleAddOption}>Add Option</button>
                      )}
                    </div>
                        <div>{quizType === "qna" && <Timer />}</div>
                      </div>
                    </div>
                  </div>
                  <Link to="/dashboard">
                    <button class="cancel" onClick={closeModal}>
                      Cancel
                    </button>
                  </Link>
                  <button
                    style={quizType === "qna" ? { marginLeft: "230px" } : null}
                    class="continue"
                    onClick={() => {
                      handleCreateQuiz();
                      handleContinueClick();
                      QnAClick();
                    }}
                  >
                    Create Quiz
                  </button>
                </div>
              )}
              {activeStep === 2 && (
                <div class="action-buttons">
                  <div class="questions">
                    <p class="published">Congrats your Quiz is Published! </p>
                    <p class="Shareable_link"> {shareableLink}</p>
                  </div>

                  <button class="Share" onClick={() => {}}>
                    Share
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}