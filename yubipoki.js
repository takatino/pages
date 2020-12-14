const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const timer = ms => new Promise(res => setTimeout(res, ms));

///loads images
const palm = new Image();
palm.src = "./images/yubigacha/palm.png";

const thumb_up = new Image();
thumb_up.src = "./images/yubigacha/thumb_up.png";
const pointer_up = new Image();
pointer_up.src = "./images/yubigacha/pointer_up.png";
const middle_up = new Image();
middle_up.src = "./images/yubigacha/middle_up.png";
const ring_up = new Image();
ring_up.src = "./images/yubigacha/ring_up.png";
const pinky_up = new Image();
pinky_up.src = "./images/yubigacha/pinky_up.png";

const thumb_down = new Image();
thumb_down.src = "./images/yubigacha/thumb_down.png";
const pointer_down = new Image();
pointer_down.src = "./images/yubigacha/pointer_down.png";
const middle_down = new Image();
middle_down.src = "./images/yubigacha/middle_down.png";
const ring_down = new Image();
ring_down.src = "./images/yubigacha/ring_down.png";
const pinky_down = new Image();
pinky_down.src = "./images/yubigacha/pinky_down.png";


///loads audio
const audio_voiceS = new Audio("./audio/yubigacha/voiceS.mp3");
const audio_voiceA = new Audio("./audio/yubigacha/voiceA.mp3");
const audio_voiceB = new Audio("./audio/yubigacha/voiceB.mp3");
const audio_voiceC = new Audio("./audio/yubigacha/voiceC.mp3");
const audio_voiceGacha = new Audio("./audio/yubigacha/voiceGacha.mp3");

let eventLock = 0;

canvas.addEventListener("mouseup", function(event) {
    if (eventLock) {
        return;
    }
    else {
        eventLock = 1;
        gacha_animation();
    }
});

canvas.addEventListener("touchend", function(event) {
    if (eventLock) {
        return;
    }
    else {
        eventLock = 1;
        gacha_animation();
    }
});


let hand = [1, 1, 1, 1, 1]; ///from left to right: pinky ring middle pointer thumb
let pity = 0;
let rank = "C";

const S_hands = [[0, 1, 1, 0, 1], [1, 0, 1, 0, 0], [0, 1, 1, 1, 1]]
const A_hands = [[0, 1, 0, 0, 0], [0, 1, 0, 0, 1], [0, 1, 1, 0, 0], [0, 1, 0, 1, 0], [1, 1, 0, 1, 1]]
const B_hands = [[0, 0, 0, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 1, 1], [1, 0, 0, 1, 1], [1, 1, 0, 0, 1], 
                 [1, 1, 1, 0, 1], [1, 1, 0, 1, 0], [0, 1, 0, 1, 1], [1, 0, 1, 0, 1]]
const C_hands = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 1], [0, 0, 1, 1, 0],
                 [0, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 1], [1, 0, 0, 1, 0], [1, 0, 1, 1, 0], 
                 [1, 0, 1, 1, 1], [1, 1, 0, 0, 0], [1, 1, 1, 0, 0], [1, 1, 1, 1, 0], [1, 1, 1, 1, 1]]


function gacha(){
    let roll = Math.floor(Math.random() * 100 + pity) + 1; //randint 1-100
    console.log(roll);

    if (roll > 99) {
        rank = "S";
        hand = S_hands[Math.floor(Math.random() * S_hands.length)];
        pity = 0;
        return;
    }
    else if (roll > 94) {
        rank = "A";
        hand = A_hands[Math.floor(Math.random() * A_hands.length)];
        pity += 0.01;
        return; 
    }
    else if (roll > 79) {
        rank = "B";
        hand = B_hands[Math.floor(Math.random() * B_hands.length)];
        pity += 0.02;
        return;
    }
    else {
        rank = "C";
        hand = C_hands[Math.floor(Math.random() * C_hands.length)];
        pity += 0.05;
        return;
    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

async function gacha_animation(){
    audio_voiceGacha.play();
    for (let i = 0 ; i < 60; i++) {
        gacha();
        draw();
        if (i == 98) {console.log("don!");}
        await timer((i+25)*2);
    }
    await timer(200);
    if (rank == "S") {audio_voiceS.play();}
    else if (rank == "A") {audio_voiceA.play();}
    else if (rank == "B") {audio_voiceB.play();}
    else if (rank == "C") {audio_voiceC.play();}
    eventLock = 0;
}




function draw(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("指ぽきぽきゲーム", canvas.width/2 - 85, 80);

    if (eventLock == 0) {
        ctx.font = "86px Monospace";
        if (rank == "S") {ctx.fillStyle = "#d4af37";}
        else if (rank == "A") {ctx.fillStyle = "#b300b3";}
        else if (rank == "B") {ctx.fillStyle = "#76ee00";}
        else if (rank == "C") {ctx.fillStyle =  "white";}
        ctx.fillText(rank, 260, 460);
    }

    ctx.drawImage(palm, 30, 120);

    if (hand[0]) {ctx.drawImage(pinky_up, -13+wiggleX[0], 88+wiggleY[0]);} else {ctx.drawImage(pinky_down, -13+wiggleX[0], 120+wiggleY[0]);}
    if (hand[1]) {ctx.drawImage(ring_up, 10+wiggleX[1], 65+wiggleY[1]);} else {ctx.drawImage(ring_down, 13+wiggleX[1], 113+wiggleY[1]);}
    if (hand[2]) {ctx.drawImage(middle_up, 32+wiggleX[2], 52+wiggleY[2]);} else {ctx.drawImage(middle_down, 37+wiggleX[2], 110+wiggleY[2]);}
    if (hand[3]) {ctx.drawImage(pointer_up, 70+wiggleX[3], 68+wiggleY[3]);} else {ctx.drawImage(pointer_down, 65+wiggleX[3], 110+wiggleY[3]);}
    if (hand[4]) {ctx.drawImage(thumb_up, 102+wiggleX[4], 148+wiggleY[4]);} else {ctx.drawImage(thumb_down, 73+wiggleX[4], 152+wiggleY[4]);}
}

let wigglecount = 0;
let wiggleX = [0, 0, 0, 0, 0];
let wiggleY = [0, 0, 0, 0, 0];

function wiggle() {
    wigglecount += 0.03;
    if (wigglecount > 1000) {wigglecount = 0;}

    wiggleX = [Math.sin(wigglecount), Math.sin(wigglecount + 12), -Math.sin(wigglecount + 3), -Math.sin(wigglecount + 32), Math.sin(wigglecount + 8)];
    wiggleY = [-Math.sin(wigglecount + 164), Math.sin(wigglecount + 112), Math.sin(wigglecount + 43), -Math.sin(wigglecount + 127), -Math.sin(wigglecount + 7)];
}

function main() {
    draw();
    wiggle();

    requestAnimationFrame(main);
}

main();