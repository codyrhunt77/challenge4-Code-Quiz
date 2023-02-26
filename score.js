function scores() {
    const scores = JSON.parse(window.localStorage.getItem('scores')) || [];
    scores.sort(function (a,b) {
        return b.score - a.score;
    });
    for ( const i = 0; i < scores.length; i += 1) {
        const create = document.createElement('li');
        create.textContent = scores[i] + '-' + scores[i].score;
        const show = document.getElementById('scores');
        show.appendChild(create);
    }
}
function clearLeaderboard() {
    window.localStorage.removeItem('scores');
    windoiw.location.reload();
};
document.getElementById('clear').onclick = clearLeaderboard;
scores();