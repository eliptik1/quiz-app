export const RangeSlider = ({
  rangeType,
  totalQuestions,
  setTotalQuestions,
  disableTimeMax,
  selectionDisableTime,
  setSelectionDisableTime,
}) => {
  const handleTotalQuestions = (event) => {
    setTotalQuestions(event.target.value);
  };

  const handleDisableTime = (event) => {
    setSelectionDisableTime(event.target.value);
  };

  return rangeType === "totalQuestions" ? (
    <div className="flex flex-col items-center w-full mb-6">
      <label
        htmlFor="default-range"
        className="block mb-2 font-medium text-gray-900"
      >
        Total questions:
        <span className="text-xl"> {totalQuestions}</span>
      </label>
      <input
        id="default-range"
        type="range"
        min="3"
        max="20"
        value={totalQuestions}
        onChange={handleTotalQuestions}
        className="w-full h-2 bg-white shadow-md rounded-lg appearance-none cursor-pointer"
      />
    </div>
  ) : (
    <div className="flex flex-col items-center w-full mb-6">
      <label
        htmlFor="default-range"
        className="block mb-2 font-medium text-gray-900"
      >
        Selection disable time:
        <span className="text-xl"> {selectionDisableTime}</span>
      </label>
      <input
        id="default-range"
        type="range"
        min="0"
        max={disableTimeMax}
        value={selectionDisableTime}
        onChange={handleDisableTime}
        className="w-full h-2 bg-white shadow-md rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};
