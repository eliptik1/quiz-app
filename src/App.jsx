import { useState } from "react";
import { Quiz } from "./components/Quiz";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizKey, setQuizKey] = useState(0);

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const restartQuiz = () => {
    setQuizKey((prevKey) => prevKey + 1);
    setIsQuizStarted(true);
  };

  return (
    <div className="bg-gradient-to-t from-slate-200 to-neutral-300 min-h-screen mx-auto p-4 flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Quiz App</h1>
      {!isQuizStarted ? (
        <button
          onClick={startQuiz}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Quiz
        </button>
      ) : (
        <Quiz key={quizKey} onRestart={restartQuiz} />
      )}
    </div>
  );
}

export default App;
