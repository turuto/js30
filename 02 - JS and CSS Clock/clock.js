

function drawTime() {
    const hourHand = document.querySelector('.hour-hand');
    const minHand = document.querySelector('.min-hand');
    const secondHand = document.querySelector('.second-hand');
    const date = new Date();

    // let h = date.getHours();
    let h = 7;
    let m = date.getUTCMinutes();
    let s = date.getSeconds();

    console.log(h, m, s);
    let hAngle = h * 30 - 90;
    let mAngle = m * 6 - 90;
    let sAngle = s * 6 - 90;
    hourHand.style.transform = `rotate(${hAngle}deg)`;
    minHand.style.transform = `rotate(${mAngle}deg)`;
    secondHand.style.transform = `rotate(${sAngle}deg)`;
}

var checkTime = window.setInterval(drawTime, 1000);


