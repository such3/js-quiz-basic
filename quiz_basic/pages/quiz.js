let currentQuestionIndex = 0;
let answers = [];
let userAnswer = [];

const radios = document.querySelectorAll('input[name="flexRadio"]');
const clearButton = document.querySelector('.btn-clear');
const nextButton = document.querySelector('.btn-next');
const backButton = document.querySelector('.btn-back');
const questionCont = document.querySelector('.question-box');
const slNo = document.querySelector('.sl-no');


const questions = {
    "response_code": 0,
    "results": [
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Video Games",
            "question": "Which company did Bethesda purchase the Fallout Series from?",
            "correct_answer": "Interplay Entertainment ",
            "incorrect_answers": [
                "Capcom",
                "Blizzard Entertainment",
                "Nintendo"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Books",
            "question": "What&#039;s the second book in George R. R. Martin&#039;s &#039;A Song of Ice and Fire&#039; series?",
            "correct_answer": "A Clash of Kings",
            "incorrect_answers": [
                "A Dance with Dragons",
                "A Storm of Swords",
                "A Feast for Crows"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Science: Mathematics",
            "question": "To the nearest whole number, how many radians are in a whole circle?",
            "correct_answer": "6",
            "incorrect_answers": [
                "3",
                "4",
                "5"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Science &amp; Nature",
            "question": "What is the unit of electrical resistance?",
            "correct_answer": "Ohm",
            "incorrect_answers": [
                "Mho",
                "Tesla",
                "Joule"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "General Knowledge",
            "question": "Area 51 is located in which US state?",
            "correct_answer": "Nevada",
            "incorrect_answers": [
                "Arizona",
                "New Mexico",
                "Utah"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "medium",
            "category": "Entertainment: Video Games",
            "question": "Which of these is NOT a name of a city in the main island of PLAYERUNKNOWN&#039;S BATTLEGROUNDS?",
            "correct_answer": "Belushya Guba",
            "incorrect_answers": [
                "Yasnaya Polyana",
                "Pochinki",
                "Georgopol"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Video Games",
            "question": "How many differently shaped Tetris pieces are there?",
            "correct_answer": "7",
            "incorrect_answers": [
                "5",
                "6",
                "8"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Video Games",
            "question": "Which company did Gabe Newell work at before founding Valve Corporation?",
            "correct_answer": "Microsoft",
            "incorrect_answers": [
                "Apple",
                "Google",
                "Yahoo"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Video Games",
            "question": "Which of these is NOT a playable character in &quot;Left 4 Dead&quot;?",
            "correct_answer": "Nick",
            "incorrect_answers": [
                "Louis",
                "Zoey",
                "Bill"
            ]
        },
        {
            "type": "multiple",
            "difficulty": "easy",
            "category": "Entertainment: Television",
            "question": "In the Star Trek universe, what color is Vulcan blood?",
            "correct_answer": "Green",
            "incorrect_answers": [
                "Blue",
                "Red",
                "Purple"
            ]
        }
    ]
}


const showQuestion = () => {
    if (currentQuestionIndex < questions.results.length) {
        const currentQ = questions.results[currentQuestionIndex];

        // Display question number and question text
        slNo.innerHTML = `${currentQuestionIndex + 1} ) `;
        questionCont.innerHTML = currentQ.question;

        // Gather options, including the correct answer
        let options = [...currentQ.incorrect_answers];
        options.push(currentQ.correct_answer);

        // Shuffle options to randomize their order
        options.sort(() => Math.random() - 0.5);

        // Display each option and set placeholders
        options.forEach((option, index) => {
            const optionLabel = document.getElementById(`flexInputLabel${index + 1}`);
            optionLabel.textContent = `${index + 1}) ${option}`;

            const radio = document.getElementById(`flexRadioDefault${index + 1}`);
            radio.placeholder = option;
        });

        // Store correct answer
        answers[currentQuestionIndex] = currentQ.correct_answer;
        if(currentQuestionIndex === 10) calculateScore();
    }
};
const clearSelectedRadio = () => {
    radios.forEach(radio => {
        radio.checked = false;
    });
};


const storeUserAnswer = () => {
    radios.forEach(radio => {
        if (radio.checked && radio.id !== 'hidden-option') {
            userAnswer[currentQuestionIndex] = radio.placeholder;
        }
    });
};

const clearSelection = () => {
    radios.forEach(radio => {
        radio.checked = false;
    });
    userAnswer[currentQuestionIndex] = null;
};

// Event listener for the "Next" button
nextButton.addEventListener('click', () => {
    storeUserAnswer();
    if (currentQuestionIndex < questions.results.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        // Handle end of quiz
        calculateScore(); // Calculate and log the score at the end of the quiz
        alert("Quiz Completed! Check the console for your score.");
    }
    clearSelectedRadio(); // Clear the selected radio button
});
// Event listener for the "Back" button
backButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        storeUserAnswer();
        currentQuestionIndex--;
        showQuestion();
    }
    clearSelectedRadio(); // Clear the selected radio button
});

let score = 0;
const calculateScore = () => {

    answers.forEach((correctAnswer, index) => {
        if (userAnswer[index] === correctAnswer) {
            score++;
        }
    });
    console.log(`Your score is ${score} out of ${answers.length}`);
};

// Example usage: Call this function at the end of the quiz



// Event listener for the "Clear Selection" button
clearButton.addEventListener('click', clearSelection);

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', () => {
    showQuestion();
});

// Prevent F5, Ctrl+R, context menu, and navigation/reload
window.addEventListener('keydown', (event) => {
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
        event.preventDefault();
    }
});
window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = ''; // Required for Chrome
});

// generate questions


// const fetchQuestions = fetch("https://opentdb.com/api.php?amount=10&type=multiple");
// fetchQuestions.then(response => {
//     return response.json();
// }).then(data => {
//
// }).catch(error => {
//     console.error("There was a problem with the fetch operation ",error);
// })


