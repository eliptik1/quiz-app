export const parseOptions = (title) => {
  const words = title.split(" ");
  return words.length >= 4
    ? words.slice(0, 4)
    : [...words, "lorem", "ipsum", "dolor", "amet"].slice(0, 4);
};

export const fetchQuestions = async (numberOfQuestions) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.slice(0, numberOfQuestions).map((q) => ({
      ...q,
      correctAnswer: parseOptions(q.title)[Math.floor(Math.random() * 4)],
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
