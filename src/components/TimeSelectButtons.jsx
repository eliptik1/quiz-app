export const TimeSelectButtons = ({
  selectedButton,
  setSelectedButton,
  setQuestionTime,
  setDisableTimeMax,
  setSelectionDisableTime,
}) => {
  return (
    <>
      <p className="font-medium text-gray-900 mb-2">Question time:</p>
      <div className="flex gap-4 mb-6 w-full">
        <button
          style={selectedButton === 0 ? { outline: "4px solid #9a3412" } : {}}
          onClick={() => {
            setQuestionTime(5);
            setDisableTimeMax(4);
            setSelectionDisableTime(1);
            setSelectedButton(0);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full flex-1"
        >
          5s
        </button>

        <button
          style={selectedButton === 1 ? { outline: "4px solid #9a3412" } : {}}
          onClick={() => {
            setQuestionTime(15);
            setDisableTimeMax(14);
            setSelectionDisableTime(3);
            setSelectedButton(1);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded border-orange-800 w-full flex-1"
        >
          15s
        </button>

        <button
          style={selectedButton === 2 ? { outline: "4px solid #9a3412" } : {}}
          onClick={() => {
            setQuestionTime(30);
            setDisableTimeMax(29);
            setSelectionDisableTime(5);
            setSelectedButton(2);
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full flex-1"
        >
          30s
        </button>
      </div>
    </>
  );
};
