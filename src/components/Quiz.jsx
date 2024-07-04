import { useState, useEffect } from "react";

const parseOptions = (title) => {
  const words = title.split(" ");
  return words.length >= 4
    ? words.slice(0, 4)
    : [...words, "lorem", "ipsum", "dolor", "amet"].slice(0, 4);
};

export const Quiz = ({ onRestart }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canChoose, setCanChoose] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    console.log(responses);
  }, [responses]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const questionsWithAnswers = data.slice(0, 10).map((q) => ({
          ...q,
          correctAnswer: parseOptions(q.title)[Math.floor(Math.random() * 4)],
        }));
        setQuestions(questionsWithAnswers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentQuestion < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            setCanChoose(false);
            setResponses((prev) => [
              ...prev,
              {
                questionNo: currentQuestion + 1,
                question: questions[currentQuestion]?.title || "Not available",
                answer: "empty",
                correctAnswer: questions[currentQuestion]?.correctAnswer,
              },
            ]);
            setCurrentQuestion((prev) => prev + 1);
            setTimeLeft(30);
            return 30;
          }
        });
      }, 1000);

      setTimeout(() => {
        setCanChoose(true);
      }, 10000);

      return () => clearInterval(timer);
    }
  }, [currentQuestion, questions]);

  const handleOptionClick = (option) => {
    if (canChoose) {
      setResponses((prev) => [
        ...prev,
        {
          questionNo: currentQuestion + 1,
          question: questions[currentQuestion].title,
          answer: option,
          correctAnswer: questions[currentQuestion].correctAnswer,
        },
      ]);
      setCanChoose(false);
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(30);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (currentQuestion >= questions.length) {
    const filteredResponses = Object.values(
      responses.reduce((acc, response) => {
        acc[response.questionNo] = response;
        return acc;
      }, {})
    );
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
            {filteredResponses.map((response, index) => {
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
  }

  const question = questions[currentQuestion];
  const options = parseOptions(question.title);

  return (
    <div>
      <div className="flex justify-center w-full">
        <p>
          <span className="text-zinc-800">Time Left:</span>{" "}
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
