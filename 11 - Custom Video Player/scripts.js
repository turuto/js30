import { Controls } from './controls.js';

const video = document.querySelector('.player__video');
const videoUI = document.querySelector('.player__controls');

const controls = new Controls(video, videoUI);

