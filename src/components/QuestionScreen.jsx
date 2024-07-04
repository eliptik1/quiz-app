import React from "react";

export const QuestionScreen = ({
  question,
  options,
  timeLeft,
  currentQuestion,
  canChoose,
  handleOptionClick,
}) => {
  return (
    <div>
      <div className="flex justify-center w-full">
        <p>
          <span className="text-zinc-800">Time Left:</span>
          <span className="font-semibold text-2xl">{timeLeft}</span> seconds
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <h3 className="text-nowrap text-zinc-800">
          Question {currentQuestion + 1}:
        </h3>
        <p>{question.title}</p>
      </div>
      <div className="flex gap-3 w-full mt-32">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full flex-1 px-4 py-2 border-2 border-gray-400 rounded-md bg-slate-200 shadow-md hover:bg-slate-300 disabled:hover:bg-slate-200 disabled:opacity-35"
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
