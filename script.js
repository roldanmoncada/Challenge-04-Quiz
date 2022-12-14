// creating questions first.  //

let quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question: "What JavaScript method allows you to join two or more arrays?",
    choices: ["join()", "concat()", "joinArray()", "combine()"],
    answer: "concat()",
  },
  {
    question: "How do you retrieve an item from local storage?",
    choices: [
      "localStorage.get",
      "localStorage.getItem('')",
      "localstorage.getitem('')",
      "local.storage.get.item ('')",
    ],
    answer: "localStorage.getItem('')",
  },
];

//Now the functionality:

//Starting the timer (at 60) and updating the timer. Going to use a string template literal to make updating the HTML elements' text easier. Doing this HW after Byron spooked us recently with saying that we should only be using const or let so I am doing just that to be safe.

// Constants that impact Header elements
const timeRemEl = document.querySelector("#time-remaining");

// Constants for elements that fall outside of the other specified sections
const primaryTextEl = document.querySelector("#primary-text");

// Constants that impact the Score Page's elements
const userScoreEl = document.querySelector("#user-score");
const inputScoreEl = document.querySelector("#score-input-name");
const submitNameBtnEl = document.querySelector("#submit-user-name");
const nameEl = document.querySelector("#user-name-input");
const returnBtnEl = document.querySelector("#return");

// Constants that impact the Quiz Page's elements
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question-prompt");
const answersEl = document.querySelector("#solution-options");
const scoresEl = document.querySelector("#scores");
const scoresListEl = document.querySelector("#scores-list");
const clearScoresBtnEl = document.querySelector("#clear");
const viewScoreListBtnEl = document.querySelector("#view-scores");
const startQuizBtnEl = document.querySelector("#start-quiz");

// Defining global scope lets that I use within code blocks for the quiz's functions
let startingTime = 60;
let timePassed = 0;
let currentQ = 0;
let score = 0;
let highScores = [];

const startTimer = () => {
  timeRemEl.textContent = `Time Remaining: ${startingTime}`;
  timeInterval = setInterval(function () {
    timePassed++;
    timeRemEl.textContent = `Time Remaining: ${startingTime - timePassed}`;
    if (timePassed >= startingTime) {
      currentQ = quizQuestions.length;
      nextQuestion();
    }
  }, 1000);
};

//Stopping the timer
const stopTimer = () => {
  clearInterval(timeInterval);
};

// Adding the nextQuestion functionality to have the quiz be able to "go to the next page" after a question is answered. Going to have to add if else loops for the

const nextQuestion = () => {
  currentQ++; // This adds 1 to the question count every time this function runs
  if (currentQ < quizQuestions.length) {
    // This ensures the current question is less than the total length of questions available and if that condition is true, returns the callback function of renderQuestion() to go to the next question.
    renderQuestion();
  } else {
    stopTimer();
    if (startingTime - timePassed > 0) {
      score += startingTime - timePassed;
    }
    userScoreEl.textContent = score;
    hideEl(quizEl);
    displayEl(inputScoreEl);
    timeRemEl.textContent = `Time Remaining: ${startingTime}`; // This provides the remaining time.
  }
};

// Checks the user's answer based on the current question and updates the user score.
const checkAnswer = (answer) => {
  if (quizQuestions[currentQ].answer == quizQuestions[currentQ].choices[answer.id]) {
    score += 50;
    displayMessage("Correct!"); // Informs user they selected the correct answer
  } else {
    timePassed += 9;
    displayMessage("Incorrect!"); // Informs user they selected the incorrect answer
  }
};

const displayMessage = (foo) => {
  // Variables that create a linebreak and new div so we can have a little popup that displays the messages we created in lines 128 and 131!
  let messageHr = document.createElement("hr");
  let messageEl = document.createElement("div");

  messageEl.textContent = foo;

  // This allows the above variables to be implemented into our nedex.html
  document.querySelector(".primary-box").appendChild(messageHr);
  document.querySelector(".primary-box").appendChild(messageEl);

  // This is a timeout that limits the two variables' appearance to about 1/3 of a second.
  setTimeout(() => {
    messageEl.remove();
    messageHr.remove();
  }, 330);
};

// These two constants show and hide the element by placing it within a function t
const hideEl = (element) => {
  element.style.display = "none";
};

const displayEl = (element) => {
  element.style.display = "block";
};

// This allows the quiz to be reset and specifies to which metrics it will be reset to.
const reset = () => {
  score = 0;
  currentQ = 0;
  timePassed = 0;
  timeRemEl.textContent = `Time Remaining: ${startingTime}`;
};

// This function renders the current question by getting the textContent from the HTML element and setting it as equivalent to our array of questions. The for loop goes through the answers and then sets up the button functionality when the question is displayed.
const renderQuestion = () => {
  questionEl.textContent = quizQuestions[currentQ].question;

  for (let i = 0; i < answersEl.children.length; i++) {
    answersEl.children[i].children[0].textContent = `${i + 1}: ${
      quizQuestions[currentQ].choices[i]
    }`;
  }
};

const renderScores = () => {
  scoresEl.innerHTML = "";
  displayEl(scoresListEl);
  highScores = JSON.parse(localStorage.getItem("scores"));

  for (let i = 0; i < highScores.length; i++) {
    let scoreStorage = document.createElement("div");

    scoreStorage.textContent = `${i + 1}. ${highScores[i].username} - ${
      scoresListEl[i].userScore
    }`;
    scoresEl.appendChild(scoreStorage);
  }
};

viewScoreListBtnEl.addEventListener("click", () => {
  hideEl(quizEl);
  hideEl(primaryTextEl);
  renderScores();
  hideEl(userScoreEl);
  stopTimer();
  reset();
});

startQuizBtnEl.addEventListener("click", () => {
  hideEl(primaryTextEl);
  startTimer();
  renderQuestion();
  displayEl(quizEl);
});

answersEl.addEventListener("click", (foo) => {
  if (foo.target.matches("button")) {
    checkAnswer(foo.target);
    nextQuestion();
  }
});

submitNameBtnEl.addEventListener("click", () => {
  let startingVal = nameEl.value.trim();
  if (startingVal) {
    let userScore = { username: startingVal, userScore: score };
    nameEl.value = "";
    highScores = JSON.parse(localStorage.getItem("scores")) || [];
    highScores.push(userScore);
    localStorage.getItem("scores", JSON.stringify(highScores));
    hideEl(inputScoreEl);
    renderScores();
    reset();
  }
});

returnBtnEl.addEventListener("click", () => {
  hideEl(scoresListEl);
  displayEl(primaryTextEl);
});

clearScoresBtnEl.addEventListener("click", () => {
  highScores = [];
  localStorage.setItem("scores", JSON.stringify(highScores));
  renderScores();
});
