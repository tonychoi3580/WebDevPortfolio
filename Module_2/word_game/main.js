
let time = 0;
let score = 0;
let playing = false;
let scoreHistory = [];
let difficulty = 1;
let wordArray = setWordArray();



const time_given = document.querySelector('#time_given');
const currentWord = document.getElementById('currentWord');
const word_input = document.querySelector('#word_input');
const time_left = document.querySelector('#time_left');
const highscore = document.querySelector('#highscore');
const gameover = document.querySelector('#gameover');
const current_score = document.querySelector('#current_score');

//sets level of difficulty
function setLevel(x){
    if (x === 1){
        time = 5;
    }
    if (x=== 2){
        time = 3;
    }
    if (x=== 3){
        time = 1;
    }
    difficulty = x;
    time_given.innerHTML = time;
    time_left.innerHTML = time;
    return time;
}

//set up game on load
function setupGame() {
    randomWord(wordArray);
    word_input.addEventListener('input', gameStarter);
    setInterval(timeTracker, 1000);
    setInterval(gameOver, 50);
    
}

//main game function
function gameStarter(){
    if (checkforMatch()){
        playing = true;
        time = setLevel(difficulty);
        randomWord(wordArray);
        word_input.value = "";
        score = score + 10;
        current_score.innerHTML = score;

    }
   
}

function checkforMatch(){
    if (word_input.value === currentWord.innerHTML){
        gameover.innerHTML = 'YESSS';
        return true;
    }
    else{
        gameover.innerHTML = 'no...';
        return false;
    }
}

//generates the shown word randomly
function randomWord(wordArray){
    const indexRandom = Math.floor(Math.random()*wordArray.length);
    currentWord.innerHTML = wordArray[indexRandom];
}

//keeps track of time
function timeTracker() {
    if (time>0){
        time = time - 1;
    }
    else if (time === 0){
        playing = false;
    }
    time_left.innerHTML = time;
}

//sets the array of 5-letter words the game pulls randomly from
function setWordArray(){
    return words.split("\n");
}

function getHighScore(){
    return Math.max(...scoreHistory)
}

function gameOver(){
    if (!playing && time === 0){
        scoreHistory.push(score);
        highscore.innerHTML = getHighScore();
        gameover.innerHTML = "Good Try";
        score = 0;
        current_score.innerHTML = 0;
    }
}