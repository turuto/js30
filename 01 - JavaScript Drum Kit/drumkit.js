document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    const inputCode = e.key.toUpperCase().charCodeAt(0);
    //BUSCAR EL .KEY CON ESE data-key
    const elements = document.querySelectorAll(`[data-key="${inputCode}"]`);
    playSound(elements);
};

function playSound([div, sound]) {
    sound.currentTime = 0;
    div.classList.add('playing');
    setTimeout(function () {
        div.classList.remove('playing');
    }, 200);
    sound.play();
    sound.onended = function () {
        console.log(div, 'ended');
        div.classList.remove('playing');
    }
}