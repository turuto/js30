export class Controls {
    constructor(video, videoUI) {
        this.video = video;
        this.videoUI = videoUI;
        this.init();
    }

    init = function () {
        this.createElements();
        this.createListeners();
    }

    createElements = function () {
        this.progressBarEl = this.videoUI.querySelector('.progress__filled');
        this.playBtnEl = this.videoUI.querySelector('.toggle');
        this.volumeEl = this.videoUI.querySelector('[name="volume"]');
        this.speedEl = this.videoUI.querySelector('[name="playbackRate"]');
        this.skipBackEl = this.videoUI.querySelector('[data-skip="-10"]');
        this.skipFwdEl = this.videoUI.querySelector('[data-skip="25"]');
    }

    createListeners = function () {
        this.playBtnEl.addEventListener('click', this.togglePlay.bind(this));
        this.volumeEl.addEventListener('change', this.setVolume.bind(this));
        this.speedEl.addEventListener('change', this.setSpeed.bind(this));
        this.skipBackEl.addEventListener('click', e => this.skip(e));
        this.skipFwdEl.addEventListener('click', e => this.skip(e));
        this.video.addEventListener('timeupdate', this.updateProgressBar.bind(this));
    }

    togglePlay = function () {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    setVolume = function () {
        this.video.volume = this.volumeEl.value;
    }

    setSpeed = function () {
        this.video.playbackRate = this.speedEl.value;
    }

    skip = function (e) {
        const skip = e.target.dataset.skip;
        let desiredTime = this.video.currentTime + parseInt(skip, 10);

        if (desiredTime < 0) {
            this.video.currentTime = 0;
        } else if (desiredTime > this.video.duration) {
            this.video.currentTime = this.video.duration;
        } else {
            this.video.currentTime = desiredTime;
        }
    }

    updateProgressBar = function () {
        const percentage = (this.video.currentTime / this.video.duration) * 100;
        this.progressBarEl.style.setProperty('--progress', `${percentage}%`);
    }
}