//ELEMENTS
const player = document.querySelector('.player');
const movie = document.querySelector('video');
const progress = document.querySelector('.progress');
const progress_filled = document.querySelector('.progress__filled');
const buttonPlay = document.querySelector('.toggle');
const rangeVol = document.querySelector('input[name="volume"]');
const rangeSpeed = document.querySelector('input[name="playbackRate"]');
const buttonSkipBack = document.querySelector('[data-skip="-10"]');
const buttonSkipFwd = document.querySelector('[data-skip="25"]');
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
    } else {
        btn.textContent = '►';
        movie.pause();
    }
}
// SKIP & REWIND
function skip() {
    let goTo = movie.currentTime + parseInt(this.dataset.skip);
    if (goTo < 0) { goTo = 0 };
    if (goTo > movie.duration) { goTo = movie.duration };
    movie.currentTime = goTo;
}
// VOLUME
// SPEED
//PROGRESS BAR

// EVENTS
buttonPlay.addEventListener('click', togglePlay);
buttonSkipBack.addEventListener('click', skip);
buttonSkipFwd.addEventListener('click', skip);

