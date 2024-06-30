interface QuizQuestion {
    question: string;
    answers: string[];
    correctAnswer: string;
  }
  
  let quizData: QuizQuestion[] = [ {
    question: "Which design pattern interprets a given context?",
    answers: ["Interpreter", "Visitor", "State", "Strategy"],
    correctAnswer: "Interpreter"
  }]; // Initialize as an empty array
  
  export { quizData }; // Export the quizData array
  