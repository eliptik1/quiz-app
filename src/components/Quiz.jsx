import { useState, useEffect } from "react";
import { QuestionScreen } from "./QuestionScreen";
import { QuizResults } from "./QuizResults";
import { parseOptions, fetchQuestions } from "../utils/quizUtils";

const QUESTION_TIME = 30; // seconds
const ALLOW_OPTIONS_TIME = 10; // seconds
const NUMBER_OF_QUESTIONS = 10;

export const Quiz = ({ onRestart }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [canChoose, setCanChoose] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await fetchQuestions(NUMBER_OF_QUESTIONS);
      setQuestions(loadedQuestions);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestion < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            setCanChoose(false);
            addResponse("empty");
            nextQuestion();
            return QUESTION_TIME;
          }
        });
      }, 1000);

      const optionTimeout = setTimeout(() => {
        setCanChoose(true);
      }, ALLOW_OPTIONS_TIME * 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(optionTimeout);
      };
    }
  }, [currentQuestion, questions]);

  const addResponse = (answer) => {
    console.log("addResponse");
    setResponses((prev) => [
      ...prev,
      {
        questionNo: currentQuestion + 1,
        question: questions[currentQuestion]?.title || "Not available",
        answer,
        correctAnswer: questions[currentQuestion]?.correctAnswer,
      },
    ]);
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setTimeLeft(QUESTION_TIME);
  };

  const handleOptionClick = (option) => {
    if (canChoose) {
      addResponse(option);
      setCanChoose(false);
      nextQuestion();
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (currentQuestion >= questions.length) {
    const filteredResponses = Object.values(
      responses.reduce((acc, response) => {
        acc[response.questionNo] = response;
        return acc;
      }, {})
    );
    return <QuizResults responses={filteredResponses} onRestart={onRestart} />;
  }

  const question = questions[currentQuestion];
  const options = parseOptions(question.title);

  return (
    <QuestionScreen
      question={question}
      options={options}
      timeLeft={timeLeft}
      currentQuestion={currentQuestion}
      canChoose={canChoose}
      handleOptionClick={handleOptionClick}
    />
  );
};
