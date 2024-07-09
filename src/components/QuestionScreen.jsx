import { CircularCountdown } from "./CircularCountdown";
export const QuestionScreen = ({
  question,
  options,
  questionTime,
  timeLeft,
  currentQuestion,
  totalQuestions,
  canChoose,
  handleOptionClick,
  onExit,
}) => {
  return (
    <div className="flex flex-col items-center w-[700px] shadow-lg bg-white p-8 rounded-2xl">
      <div className="w-full">
        <button
          onClick={onExit}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Exit
        </button>
      </div>
      <CircularCountdown
        questionTime={questionTime}
        timeLeft={timeLeft}
        canChoose={canChoose}
        currentQuestion={currentQuestion}
      />
      <div className="flex gap-2 self-start justify-center mt-8 text-xl">
        <h3 className="text-nowrap text-zinc-800">
          Question {currentQuestion + 1}/{totalQuestions}:
        </h3>
        <p>{question.title}</p>
      </div>

      <div className="flex gap-3 w-full mt-32">
        {options.map((option, index) => (
          <button
            key={index}
            className="flex-1 px-4 py-2 border-2 border-gray-400 rounded-md bg-slate-200 shadow-md hover:bg-slate-300 disabled:hover:bg-slate-200 disabled:opacity-35"
            onClick={() => handleOptionClick(option)}
            disabled={!canChoose}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
