const currentQuestion = 0;
const timer = questions.length * 5;
var timerId;
const questionsEl = document.getElementById('questions');
const timerEl = document.getElementById('time');
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
    const beginQuiz = document.getElementById('start-quiz');
    beginQuiz.setAttribute('class', 'hidden');
    questionList.removeAttribute('class');
    timerId = setInterval(stopwatch, 500);
    timerEl.textContent = time;
    getQuestion();
};
function getQuestion() {
    const chosenQuestion = questions[currentQuestion];
    const titleEl = document.getElementById('question-title');
    titleEl.textContent = chosenQuestion.title;
    choicesEl.innerHTML= '';
    for (const i = 0; i < chosenQuestion.choices.length; i++) {
        const choice = chosenQuestion.choices[i];
        const choiceSelect = document.createElement('button');
        choiceSelect.setAttribute('class', 'choice');
        choiceSelect,setAttribute('value', choice);
        choiceSelect.textContent = i + 1 + '' + choice;
        choicesEl.appendChild(choiceSelect);
    }
}
function select(event) {
    const buttonEl = event.target;
    if (!buttonEl.matches('choice')){
        return;
    }
    if (buttonEl.value !== questions[currentQuestion].answer) {
        time -= 5;
        if (time < 0 ) {
            time = 0;
        }
        timerEl.textContent = time;
        currentQuestion++;
        if (time <=0 || currentQuestion === questions.length) {
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
choiceSelect.onclick = select;
