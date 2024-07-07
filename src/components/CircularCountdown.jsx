import React, { useState, useEffect } from "react";

export const CircularCountdown = ({
  questionTime,
  timeLeft,
  canChoose,
  currentQuestion,
}) => {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setIsRunning(true);
  }, []);

  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          key={currentQuestion}
          className={`${
            canChoose ? "text-blue-600" : "text-zinc-900 opacity-20"
          }`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            animation: isRunning
              ? `countdown ${questionTime}s linear forwards`
              : "none",
          }}
        />
      </svg>
      <span
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-zinc-800 ${
          canChoose ? "opacity-100" : "opacity-30"
        }`}
      >
        {timeLeft}s
      </span>
      <style>{`
        @keyframes countdown {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: ${circumference};
          }
        }
      `}</style>
    </div>
  );
};
