import { useState } from "react";
import { Quiz } from "./components/Quiz";
import { RangeSlider } from "./components/RangeSlider";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [questionTime, setQuestionTime] = useState(30); //seconds

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const exitQuiz = () => {
    setIsQuizStarted(false);
  };

  const restartQuiz = () => {
    setQuizKey((prevKey) => prevKey + 1);
    setIsQuizStarted(true);
  };

  return (
    <div className="bg-gradient-to-t from-slate-200 to-neutral-300 min-h-screen mx-auto p-4 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
      {!isQuizStarted ? (
        <div className="flex flex-col items-center">
          <p>Question time:</p>
          <div className="flex gap-4">
            <button
              onClick={() => setQuestionTime(5)}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              5s
            </button>

            <button
              onClick={() => setQuestionTime(15)}
              className="bg-amber-500 p-3 border-4 border-orange-800 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              15s
            </button>

            <button
              onClick={() => setQuestionTime(30)}
              className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
            >
              30s
            </button>
          </div>

          <RangeSlider />
          <RangeSlider rangeType={"totalQuestions"} />

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
        />
      )}
    </div>
  );
}

export default App;
