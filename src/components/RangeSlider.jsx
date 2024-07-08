import React, { useState } from "react";

export const RangeSlider = ({ rangeType }) => {
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [selectionDisableTime, setSelectionDisableTime] = useState(5);

  const handleTotalQuestions = (event) => {
    setTotalQuestions(event.target.value);
  };

  const handleDisableTime = (event) => {
    setSelectionDisableTime(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <label
        htmlFor="default-range"
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        {rangeType === "totalQuestions"
          ? "Total questions:"
          : "Selection disable time:"}
        <span className="text-xl">
          {rangeType === "totalQuestions"
            ? totalQuestions
            : selectionDisableTime}
        </span>
      </label>
      <input
        id="default-range"
        type="range"
        min="3"
        max="20"
        value={
          rangeType === "totalQuestions" ? totalQuestions : selectionDisableTime
        }
        onChange={
          rangeType === "totalQuestions"
            ? handleTotalQuestions
            : handleDisableTime
        }
        className="w-full h-2 bg-white shadow-md rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
