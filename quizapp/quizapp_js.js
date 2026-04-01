// MASTER QUESTION POOL (many questions)
const allQuestions = [
  { question: "Capital of France?", options: ["London","Paris","Rome","Berlin"], answer: "Paris" },
  { question: "2 + 2?", options: ["3","4","5","6"], answer: "4" },
  { question: "JS runs in?", options: ["Browser","Server","Both","None"], answer: "Browser" },
  { question: "Red planet?", options: ["Earth","Mars","Venus","Jupiter"], answer: "Mars" },
  { question: "Water boils at?", options: ["90","100","80","120"], answer: "100" },
  { question: "Sun rises from?", options: ["West","East","North","South"], answer: "East" },
  { question: "5 x 5?", options: ["10","20","25","30"], answer: "25" },
  { question: "HTML stands for?", options: ["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks Text","None"], answer: "Hyper Text Markup Language" },
  { question: "CSS is used for?", options: ["Styling","Logic","Database","Security"], answer: "Styling" },
  { question: "Which is a programming language?", options: ["HTML","CSS","JavaScript","HTTP"], answer: "JavaScript" }
];

// Quotes
const perfectQuotes = [
  "🔥 Perfect Score! You're unstoppable!",
  "🎯 Brilliant! You nailed every question!",
  "🌟 Outstanding performance!"
];

const lowQuotes = [
  "💪 Keep going, you're improving!",
  "📈 Practice makes perfect!",
  "🚀 Don't give up, try again!"
];

let quizData = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const reviewSection = document.getElementById("review-section");
const answerReviewEl = document.getElementById("answer-review");
const nextQuizBtn = document.getElementById("next-quiz-btn");
const quoteEl = document.getElementById("quote");
const progressEl = document.getElementById("progress");

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Generate NEW quiz (5 random questions EVERY TIME)
function generateQuiz() {
  quizData = shuffle([...allQuestions]).slice(0, 5);
}

// Load question
function loadQuestion() {
  optionsEl.innerHTML = "";
  quoteEl.textContent = "";

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.textContent = opt;

    li.onclick = () => {
      document.querySelectorAll("li").forEach(li => li.classList.remove("selected"));
      li.classList.add("selected");
    };

    optionsEl.appendChild(li);
  });
}

// Next question
function nextQuestion() {
  const selected = document.querySelector(".selected");
  if (!selected) return alert("Select an answer!");

  const answer = selected.textContent;
  const correct = quizData[currentQuestion].answer;

  userAnswers.push({ question: questionEl.textContent, answer, correct });

  if (answer === correct) score++;

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}

// Finish quiz
function finishQuiz() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  scoreEl.textContent = `Score: ${score}/${quizData.length}`;

  // Quote logic
  if (score === quizData.length) {
    quoteEl.textContent = perfectQuotes[Math.floor(Math.random() * perfectQuotes.length)];
    confetti(); // 🎉 ONLY PERFECT SCORE
  } else {
    quoteEl.textContent = lowQuotes[Math.floor(Math.random() * lowQuotes.length)];
  }

  // Review
  reviewSection.classList.remove("hidden");
  answerReviewEl.innerHTML = "";

  userAnswers.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.question} → ${item.answer} (Correct: ${item.correct})`;
    li.style.color = item.answer === item.correct ? "green" : "red";
    answerReviewEl.appendChild(li);
  });
}

// Next quiz (ALWAYS NEW QUESTIONS)
nextQuizBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  generateQuiz(); // 🔥 NEW QUESTIONS EVERY TIME

  reviewSection.classList.add("hidden");
  nextBtn.style.display = "block";
  scoreEl.textContent = "";

  loadQuestion();
};

// Events
nextBtn.onclick = nextQuestion;
document.addEventListener("keydown", e => {
  if (e.key === "Enter") nextQuestion();
});

// Init
generateQuiz();
loadQuestion();

/* 🎉 CONFETTI (perfect score only) */
function confetti() {
  for (let i = 0; i < 150; i++) {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.width = "8px";
    div.style.height = "8px";
    div.style.background = `hsl(${Math.random()*360},100%,50%)`;
    div.style.top = "0";
    div.style.left = Math.random() * window.innerWidth + "px";
    div.style.opacity = 1;
    div.style.zIndex = 9999;

    document.body.appendChild(div);

    let fall = setInterval(() => {
      let top = parseFloat(div.style.top);
      div.style.top = top + 5 + "px";
      div.style.opacity -= 0.02;

      if (top > window.innerHeight || div.style.opacity <= 0) {
        clearInterval(fall);
        div.remove();
      }
    }, 20);
  }
}