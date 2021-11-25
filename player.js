var bars = [];
// getting audio details
var song = document.getElementById('song');
var duration = null;
song.ondurationchange = (e) => {
    duration = Math.floor(song.duration);
};
// canvas
var c = document.getElementById("myCanvas");
var chart = c.getContext("2d");
let screenlength = c.offsetWidth;
c.setAttribute('width', screenlength);
// c.style.width = screenlength;

var loc = 1;
// initial layout
function layout() {
    for (let i = 0; i <= screenlength; i += 10) {
        let ran = Math.random() * 80;
        let ran1 = Math.random() * 20;
        chart.fillStyle = "#afafaf";
        if (ran > 40) {
            chart.fillRect(i, ran1+10+120, 8, ran);
            bars.push([i, ran1+10+120, 8, ran]);
        }
        else if(ran<20) {
            chart.fillRect(i, ran+10+120, 8, ran+70);
            bars.push([i, ran+10+120, 8, ran+70]);
        } else {
            chart.fillRect(i , 30+120, 8, ran);
            bars.push([i , 30+120, 8, ran]);
        }
        
    } 
}
layout();

// adding event to canvas
c.addEventListener('click', musicflux);

function musicflux(e,s) {
    if (s) {
        var x = s;
    } else {
        x = e.offsetX;
        song.currentTime = x * (duration / screenlength);
        loc = x;
    }
    let j = 0;
    for (let i = 0; i < screenlength; i += 10) {
        if (i < x) {
            chart.fillStyle = "#ff2a58";
            chart.fillRect(bars[j][0], bars[j][1], bars[j][2], bars[j][3]);
        }
        else {
            chart.fillStyle = "#afafaf";
            chart.fillRect(bars[j][0], bars[j][1], bars[j][2], bars[j][3]); 
        }
        j++;
    }
    alltags();
}

// play functions
// play and pause
function playp() {
    const b = document.getElementById('pp');
    if (b.value == "0") {
        b.value = "1";
        song.play();
        b.innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        b.value = "0";
        song.pause();
        b.innerHTML = `<i class="fas fa-play"></i>`;
    }
}

song.onplay = function () {
    start();
}
// music start show
var time;
function start() {
    time = setInterval(() => {
        musicflux("e", loc);
        loc += Math.floor(screenlength / duration);
        if (song.currentTime == duration) {
            let b = document.getElementById('pp');
            b.innerHTML = `<i class="fas fa-play"></i>`;
            clearInterval(time);
            song.pause();
        }
    }, 1000);
}
song.onpause = function () {
    clearInterval(time);
    loc = Math.floor(song.currentTime) * (screenlength / duration);
}
// mute functionality
function muted() {
    const b = document.getElementById('mute');
    console.log(b.muted);
    if (b.value == "0") {
        b.value = "1";
        song.muted = true;
        b.innerHTML = `<i class="fas fa-volume-mute"></i>`;
    } else {
        b.value = "0";
        song.muted = false;
        b.innerHTML = `<i class="fas fa-volume-up"></i>`;
    }
}

// static tags with canvas
function tags(arcx,color,linex,liney,liney1,rectx,recty,rectw,txt,txdx,txdy) {
// chart.beginPath();
chart.arc(arcx, 165, 6, 0, 2 * Math.PI);
chart.fillStyle = color;
chart.fill();
chart.moveTo(linex,liney1);
chart.lineTo(linex, liney);
chart.lineWidth = 4;
chart.strokeStyle = color;
chart.stroke();
chart.beginPath();
chart.fillRect(rectx, recty, rectw, 25);
chart.fillStyle = "white";
chart.font = "bold 15px Arial";
chart.fillText(txt, txdx, txdy);
}
function alltags() {
// arcx, color, linex,liney,liney1,rectx,recty,rectw,  txt, txdx,txdy
tags(200, "#00cc00", 200, 170   ,60,   130,40,140,"Introduction", 150,57);
// 
tags(500, "#00afaf", 500, 170   ,60,   450, 40, 100, "one_six", 470, 57);
// 
tags(1230, "#06c298", 1230, 170  ,10,  0, 0, 0, "", 0,0);
// 
tags(1350, "navy", 1350, 170  ,80,  1315, 80, 70, "polite", 1330, 98);
// 
tags(1400, "#ac8d00", 1400, 170   ,60,  1150, 40, 260, "Rapport Building - Empathy", 1170, 58);
// 
tags(1450, "#449700", 1450, 170   ,10,  1200, 5, 260, "Rapport Building - Empathy", 1220, 23);
}


alltags();