let start = document.getElementById("start-btn");
let startscreen = document.getElementById("start-screen");
let quizscreen = document.getElementById("quiz-screen");
let answercontainer = document.getElementById("answers-container");
let finalScore = document.getElementById("final-score");
let questionText = document.getElementById("question-text");
let progressBar = document.getElementById("progress");
let resultScreen = document.getElementById("result-screen");
let restartBtn = document.getElementById("restart-btn");
let scorep = document.getElementById("score");
let currentQuestionel = document.getElementById("current-question");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDiabled = false;

start.addEventListener("click", () => {
  quizscreen.style.display = "block";
  startscreen.style.display = "none";
  // questionText.textContent = 'wdaf';
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}




function showQuestion() {
  answerDiabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "px";
  answercontainer.innerHTML = "";
  currentQuestionel.textContent = currentQuestionIndex+1

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.addEventListener("click", () => {
      selectAnswer(answer, button);
    });
    answercontainer.appendChild(button);
  });
}

function selectAnswer(answer, button) {
  if (answerDiabled) return;

  if (answer.correct) {
    score++;
    scorep.textContent = score
    finalScore.textContent = score;
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
  }
  answerDiabled = true;
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizscreen.style.display = "none";
  resultScreen.style.display = "block";
  restartBtn.addEventListener("click", () => {
    resultScreen.style.display = "none";
    quizscreen.style.display = "block";
    startscreen.style.display = "none";
    startQuiz();
  });
}
