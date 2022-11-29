// creating questions first.  //

let quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: [
            "strings",
            "booleans",
            "alerts",
            "numbers"
        ],
        answer: "alerts"

    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choices: [
            "quotes",
            "curly brackets",
            "parentheses",
            "square brackets"
        ],
        answer: "parentheses"

    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        choices: [
            "commas",
            "curly brackets",
            "quotes",
            "parentheses"
        ],
        answer: "quotes" 
    },
    {
        question: "What JavaScript method allows you to join two or more arrays?",
        choices: [
            "join()",
            "concat()",
            "joinArray()",
            "combine()"
        ],
        answer: "concat()"
    },
    {
        question: "How do you retrieve an item from local storage?",
        choices: [
            "localStorage.get",
            "localStorage.getItem('')",
            "localstorage.getitem('')",
            "local.storage.get.item ('')"
        ],
        answer: "localStorage.getItem('')"
    }
];

//Now the functionality:

//Starting the timer (at 60) and updating the timer. Going to use a string template literal to make updating the HTML elements' text easier. Doing this HW after Byron spooked us recently with saying that we should only be using const or let so I am doing just that to be safe.


// Constants that impact Header elements
const timeRemEl = document.querySelector('#time-remaining');

// Constants that impact the Score Page's elements
const userScoreEl = document.querySelector('#user-score');
const inputScoreEl = document.querySelector('#score-input-name')

// Constants that impact the Quiz Page's elements
const quizEl = document.querySelector('#quiz')

// Defining global scope lets that I use within code blocks for the quiz's functions
let startingTime = 60;
let timePassed = 0;
let currentQ = 0;
let score = 0;

const startTimer = () => {
    timeRemEl.textContent = `Time Remaining: ${startingTime}`;
    timeInterval = setInterval(function() {
        timePassed++;
        timeRemEl.textContent = `Time Remaining: ${startingTime - timePassed}`;
        if (timePassed >= startingTime) {
            currentQ = questions.length();
            nextQuestion();
        }
    }, 1000);
}

//Stopping the timer
const stopTimer = () => {
    clearInterval(timeInterval)
};

// Adding the nextQuestion functionality to have the quiz be able to "go to the next page" after a question is answered. Going to have to add if else loops for the 

const nextQuestion = () => {
    currentQ++; // This adds 1 to the question count every time this function runs
    if (currentQ < questions.length) { // This ensures the current question is less than the total length of questions available and if that condition is true, returns the callback function of renderQuestion() to go to the next question.
        renderQuestion();
    } else {
        stopTimer();
        if ((startingTime - timePassed) > 0) {
            score += (startingTime - timePassed);
        }
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timeRemEl.textContent = `Time Remaining: ${startingTime}`;
    }
}

