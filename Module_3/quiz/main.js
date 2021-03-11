/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* author: Tony Choi */
const app = new Vue({
    el: '#app',
    // tried to keep data minimal. holds quiz values, messages, style, and currentQuiz
    data() {
        return {
            currentQuiz: null,
            quiz: [],
            style: {
                color: 'black',
            },
            messages: ['You Somehow Got Below an F...', 'You Got An F', 'You Got A D', 'You Got A C', 'You Got A B', 'You Got An A!!'],
            quizzes: ['capitals', 'duke', 'math', 'me'],
        };
    },

    methods: {
        // goes back an index for quiz
        backToQuiz() {
            this.currentQuiz = null;
            this.quiz = [];
            this.reset();
        },
        // async function loads quiz when currentQuiz is selected
        async loadQuiz() {
            if (this.currentQuiz === 'duke') {
                this.style.color = 'blue';
            }
            this.getQuiz(this.currentQuiz);
        },
        // fetches jsondata for specific quiz
        async getQuiz(linkName) {
            const response = await fetch(`data/${linkName}.json`);
            const jsonData = await response.json();
            for (const key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    this.quiz.push(jsonData[key]);
                }
            }
        },
        // resets the submission for the quiz, clears previous answers
        reset() {
            document.getElementById('explanation').innerHTML = '';
            document.getElementById('result').innerHTML = '';
            document.getElementById('messages').innerHTML = '';
            this.style.color = black;
            const inputs = document.querySelectorAll('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
                inputs[i].disabled = false;
            }

            const lis = document.querySelectorAll('li');
            for (let i = 0; i < lis.length; i++) {
                const li = lis[i];
                li.classList.remove('correct', 'incorrect');
            }
        },
        // selects the chosen response and disables further input
        chosenResponse(parent, choice, correctAnswer) {
            const items = document.getElementById(parent).querySelectorAll('li');
            items.forEach((li) => {
                const input = li.querySelector('input');
                if (input.value === choice) {
                    // eslint-disable-next-line no-param-reassign
                    li.className = (choice === correctAnswer ? 'correct' : 'incorrect');
                }
                input.disabled = true;
            });
        },
        // returns what the choice
        getChoice(name) {
            const element = document.querySelector(`input[name="${name}"]:checked`);
            if (element === null) {
                return 0;
            }
            return element;
        },
        // counts number of correct answers
        correctAnswers() {
            let correctOnes = 0;
            for (let i = 0; i < this.quiz.length; i++) {
                const quest = this.quiz[i].question;
                const choice = this.getChoice(quest).value;
                const correctAnswer = this.quiz[i].answer;
                this.chosenResponse(quest, choice, correctAnswer);
                if (correctAnswer === choice) {
                    correctOnes += 1;
                }
            }
            return correctOnes;
        },
        // returns results to user
        getResults(rightAnswers, total) {
            const grade = (rightAnswers / total);
            document.getElementById('result').innerHTML = `Your grade is: ${Math.round(grade * 100)}%`;
            if (grade < 0.50) {
                document.getElementById('messages').innerHTML = this.messages[0];
            } if (grade >= 0.50) {
                document.getElementById('messages').innerHTML = this.messages[1];
            } if (grade >= 0.60) {
                document.getElementById('messages').innerHTML = this.messages[2];
            } if (grade >= 0.70) {
                document.getElementById('messages').innerHTML = this.messages[3];
            } if (grade >= 0.80) {
                document.getElementById('messages').innerHTML = this.messages[4];
            } if (grade >= 0.90) {
                document.getElementById('messages').innerHTML = this.messages[5];
            }
        },
    },
    // watch for changes to currentQuiz data and loadQuiz when it is changed
    watch: {
        currentQuiz() {
            this.loadQuiz();
        },
    },
    mounted() {
        this.loadQuiz();
    },
});

app.$mount('#app');
