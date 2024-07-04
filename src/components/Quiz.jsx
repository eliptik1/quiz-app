import { useState, useEffect } from "react";

export const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(6);
  const [canChoose, setCanChoose] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data.slice(0, 3));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setCanChoose(false);
          setCurrentQuestion((prev) => prev + 1);
          setTimeLeft(10); //question's total time
          return 10;
        }
      });
    }, 1000);

    setTimeout(() => {
      setCanChoose(true);
    }, 3000); //disable buttons in the first 3 seconds

    return () => clearInterval(timer);
  }, [currentQuestion]);
  if (loading) {
    return <div>Loading...</div>;
  }

  const question = questions[currentQuestion];

  if (!question) {
    return <div>Quiz Over</div>;
  }

  return (
    <div>
      <div>
        <h3>{question.title}</h3>
        <p>{question.body}</p>
      </div>
      <div>
        <p>Time Left: {timeLeft} seconds</p>
      </div>
      <div className="flex gap-3">
        <button disabled={!canChoose}>A</button>
        <button disabled={!canChoose}>B</button>
        <button disabled={!canChoose}>C</button>
        <button disabled={!canChoose}>D</button>
      </div>
    </div>
  );
};
