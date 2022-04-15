export class Controls {
    constructor(video, videoUI) {
        this.video = video;
        this.videoUI = videoUI;
        this.isScrubbing = false;
        this.init();
    }

    init = function () {
        this.createElements();
        this.createListeners();
    }

    createElements = function () {
        this.progressBarEl = this.videoUI.querySelector('.progress');
        this.playBtnEl = this.videoUI.querySelector('.toggle');
        this.volumeEl = this.videoUI.querySelector('[name="volume"]');
        this.speedEl = this.videoUI.querySelector('[name="playbackRate"]');
        this.skipBackEl = this.videoUI.querySelector('[data-skip="-10"]');
        this.skipFwdEl = this.videoUI.querySelector('[data-skip="25"]');
    }

    createListeners = function () {
        this.playBtnEl.addEventListener('click', this.togglePlay.bind(this));
        this.video.addEventListener('click', this.togglePlay.bind(this));
        this.volumeEl.addEventListener('change', this.setVolume.bind(this));
        this.speedEl.addEventListener('change', this.setSpeed.bind(this));
        this.skipBackEl.addEventListener('click', e => this.handleSskip(e));
        this.skipFwdEl.addEventListener('click', e => this.handleSkip(e));
        this.video.addEventListener('timeupdate', this.handleProgressBar.bind(this));
        this.progressBarEl.addEventListener('mousedown', this.toggleScrubbing.bind(this));
        this.progressBarEl.addEventListener('mouseup', this.toggleScrubbing.bind(this));
        this.progressBarEl.addEventListener('mousemove', e => this.scrub(e));
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

    handleSkip = function (e) {
        const skip = e.target.dataset.skip;
        let desiredTime = this.video.currentTime + parseInt(skip, 10);
        this.updateVideo(desiredTime);
    }

    updateVideo = function (time) {
        if (time < 0) {
            this.video.currentTime = 0;
        } else if (time > this.video.duration) {
            this.video.currentTime = this.video.duration;
        } else {
            this.video.currentTime = time;
        }
    }

    handleProgressBar = function () {
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.updateProgressBar(percent);
    }

    updateProgressBar = function (percent) {
        const barFilledEl = this.progressBarEl.querySelector('.progress__filled');
        barFilledEl.style.setProperty('--progress', `${percent}%`);
    }

    toggleScrubbing = function () {
        this.isScrubbing = !this.isScrubbing;
    }

    scrub = function (e) {
        if (this.isScrubbing) {
            const totalWidth = this.progressBarEl.offsetWidth;
            const percent = (e.offsetX / totalWidth) * 100;
            const time = this.video.duration * percent / 100;
            this.updateProgressBar(percent);
            this.updateVideo(time);
        }
    }

}