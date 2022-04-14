//ELEMENTS
const player = document.querySelector('.player');
const movie = document.querySelector('video');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const buttonPlay = document.querySelector('.toggle');
const rangeVol = document.querySelector('input[name="volume"]');
const rangeSpeed = document.querySelector('input[name="playbackRate"]');
const buttonSkipBack = document.querySelector('[data-skip="-10"]');
const buttonSkipFwd = document.querySelector('[data-skip="25"]');
let updateInterval;

// INNER
let video = {
    isPlaying: false
}
//FEATURES
// play/pause
function togglePlay() {
    let btn = this;
    video.isPlaying = !video.isPlaying
    if (video.isPlaying) {
        btn.textContent = '❚ ❚';
        movie.play();
        updateInterval = window.setInterval(updateProgress, 500);

    } else {
        btn.textContent = '►';
        movie.pause();
        clearInterval(updateInterval);
    }
}
// SKIP & REWIND
function skip() {
    let goToTime = movie.currentTime + parseInt(this.dataset.skip);
    if (goToTime < 0) { goToTime = 0 };
    if (goToTime > movie.duration) { goToTime = movie.duration };
    movie.currentTime = goToTime;
}
// VOLUME
function changeVolume() {
    movie.volume = this.value;
}
// SPEED
function changeSpeed() {
    movie.playbackRate = this.value;
}
//PROGRESS BAR
function updateProgress() {
    let percentagePlayed = ((movie.currentTime / movie.duration) * 100).toFixed(3);
    progressFilled.style.flexBasis = percentagePlayed + '%';
}

function updateMoveTime(e) {
    let perc = e.offsetX / this.clientWidth;
    movie.currentTime = movie.duration * perc;
    updateProgress();
}

// EVENTS
buttonPlay.addEventListener('click', togglePlay);
buttonSkipBack.addEventListener('click', skip);
buttonSkipFwd.addEventListener('click', skip);
rangeVol.addEventListener('mousemove', changeVolume);
rangeSpeed.addEventListener('mousemove', changeSpeed);
progressBar.addEventListener('click', updateMoveTime);


