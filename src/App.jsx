import { useState } from "react";
import { Quiz } from "./components/Quiz";
import { RangeSlider } from "./components/RangeSlider";
import { TimeSelectButtons } from "./components/TimeSelectButtons";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [selectedButton, setSelectedButton] = useState(2);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [questionTime, setQuestionTime] = useState(30); //seconds
  const [disableTimeMax, setDisableTimeMax] = useState(29); //seconds
  const [selectionDisableTime, setSelectionDisableTime] = useState(5);

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const exitQuiz = () => {
    setIsQuizStarted(false);
    setTotalQuestions(10);
    setQuestionTime(30);
    setDisableTimeMax(29);
    setSelectionDisableTime(5);
    setSelectedButton(2);
  };

  const restartQuiz = () => {
    setQuizKey((prevKey) => prevKey + 1);
    setIsQuizStarted(true);
  };

  return (
    <div className="bg-gradient-to-t from-slate-200 to-neutral-300 min-h-screen mx-auto p-4 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
      {!isQuizStarted ? (
        <div className="flex flex-col items-center w-[250px]">
          <TimeSelectButtons
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            setQuestionTime={setQuestionTime}
            setDisableTimeMax={setDisableTimeMax}
            setSelectionDisableTime={setSelectionDisableTime}
          />
          <RangeSlider
            disableTimeMax={disableTimeMax}
            selectionDisableTime={selectionDisableTime}
            setSelectionDisableTime={setSelectionDisableTime}
          />
          <RangeSlider
            rangeType={"totalQuestions"}
            totalQuestions={totalQuestions}
            setTotalQuestions={setTotalQuestions}
          />

          <button
            onClick={startQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 w-fit rounded"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz
          key={quizKey}
          onRestart={restartQuiz}
          onExit={exitQuiz}
          questionTime={questionTime}
          selectionDisableTime={selectionDisableTime}
          totalQuestions={totalQuestions}
        />
      )}
    </div>
  );
}

export default App;
