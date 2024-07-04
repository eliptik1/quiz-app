import { useState, useEffect } from "react";

const parseOptions = (title) => {
  const words = title.split(" ");
  return words.length >= 4
    ? words.slice(0, 4)
    : [...words, "lorem", "ipsum", "dolor", "amet"].slice(0, 4);
};

export const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
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
        setQuestions(data.slice(0, 3)); // number of questions
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
              },
            ]);
            setCurrentQuestion((prev) => prev + 1);
            setTimeLeft(5); // question's total time
            return 5;
          }
        });
      }, 1000);

      setTimeout(() => {
        setCanChoose(true);
      }, 3000); // disable buttons in the first 3 seconds

      return () => clearInterval(timer);
    }
  }, [currentQuestion, questions.length]);

  const handleOptionClick = (option) => {
    if (canChoose) {
      setResponses((prev) => [
        ...prev,
        {
          questionNo: currentQuestion + 1,
          question: questions[currentQuestion].title,
          answer: option,
        },
      ]);
      setCanChoose(false);
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(5);
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
      <div>
        <h2>Quiz Over</h2>
        {filteredResponses.map((response, index) => (
          <div key={index}>
            <div>Question No: {response.questionNo}</div>
            <div>Your Answer: {response.answer}</div>
          </div>
        ))}
      </div>
    );
  }

  const question = questions[currentQuestion];
  const options = parseOptions(question.title);

  return (
    <div>
      <div>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
      <div>
        <h3>Question-{currentQuestion + 1}:</h3>
        <p>{question.title}</p>
      </div>

      <div className="flex gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="flex-1 border-2 border-black"
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
