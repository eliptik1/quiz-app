export const QuizResults = ({ responses, onRestart, onExit }) => {
  return (
    <div className="mx-auto p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Quiz Over</h2>
      <div className="max-h-[500px] max-md:max-w-[90dvw] overflow-y-auto border-collapse border border-gray-300 mb-4 shadow-xl">
        <table className="max-md:text-sm">
          <thead className="sticky top-[-1px]">
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Question</th>
              <th className="border border-gray-300 p-2">Your Answer</th>
              <th className="border border-gray-300 p-2">Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => {
              let rowClass;
              if (response.answer === "empty") {
                rowClass = "bg-gray-200";
              } else if (response.answer === response.correctAnswer) {
                rowClass = "bg-green-200";
              } else {
                rowClass = "bg-red-200";
              }
              return (
                <tr key={index} className={rowClass}>
                  <td className="border border-gray-300 p-2">
                    {response.questionNo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {response.question}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {response.answer}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {response.correctAnswer}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onExit}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Exit
        </button>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
          Retry Quiz
        </button>
      </div>
    </div>
  );
};
