const currentQuestion = 0;
const time = problems.length * 5;
var timerId;
const questionsEl = document.getElementById('problems');
const timerEl = document.getElementById('timer');
const answersEl = document.getElementById('answers');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start');

function stopwatch() {
    time--;
    timerEl.textcontent = time;
    if (time <= 0) {
        endQuiz();
    }
}
function startQuiz() {
    const startQuizEl = document.getElementById('start-quiz');
    startQuizEl.setAttribute('class', 'hidden');
    questionsEl.removeAttribute('class');
    timerId = setInterval(stopwatch, 500);
    timerEl.textContent = timer;
    getQuestion();
};
function getQuestion() {
    const chosenQuestion = questionsList[currentQuestion];
    const titleEl = document.getElementById('problems');
    titleEl.textContent = chosenQuestion.title;
    answersEl.innerHTML= '';
    for (var i = 0; i < chosenQuestion.answers.length; i++) {
        const answer = chosenQuestion.choices[i];
        const answerSelect = document.createElement('button');
        answerSelect.setAttribute('class', 'answers');
        answerSelect.setAttribute('value', answers);
        answerSelect.textContent = i + 1 + '' + answers;
        answersEl.appendChild(answerSelect);
    }
}
function select(event) {
    const buttonEl = event.target;
    if (!buttonEl.matches('answers')){
        return;
    }
    if (buttonEl.value !== questions[currentQuestion].answer) {
        timer -= 5;
        if (timer < 0 ) {
            timer = 0;
        }
        timerEl.textContent = timer;
        currentQuestion++;
        if (timer <=0 || currentQuestion === questions.length) {
            endQuiz();
        } else {
            getQuestion();
        }
    }
}
function endQuiz() {
    clearInterval(timerId);
    const resultsEl = document.getElementById('results');
    resultsEl.removeAttribute('class');
    const totlaEl = document.getElementById('total'); 
    totlaEl.textContent= time;
    questionsEl.setAttribute('class', 'hidden');

}
function saveScores() {
    const initials = initialsEl.value.trim();
    const scores = JSON.parse(window.localStorage.getItem('scores')) || [];
    const highscore = {
        score: time,
        initials: initials,
    };
    scores.push(highscore);
    window.localStorage.setItem('scores', JSON.stringify(scores));
    winsow.location.href = "leaderboard.html";
}
startBtn.onclick = startQuiz;
answersEl.onclick = select;
