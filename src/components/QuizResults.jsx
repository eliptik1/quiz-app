export const QuizResults = ({ responses, onRestart }) => {
  return (
    <div className="mx-auto p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Quiz Over</h2>
      <table className="w-full border-collapse border border-gray-300 mb-4 shadow-xl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Question No</th>
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
      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
        Retry Quiz
      </button>
    </div>
  );
};