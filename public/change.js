// --------------------------------------------------------------------------------------
const ctx = new AudioContext();
let currIcon;
let background;
let main;
let playSound1;
let playSound2;
let mainIndex;
let backIndex;
let isanimal = false;
let animals = new Set(["birds", "senpai", "samriddhi"]);
let mainSounds = ["birds", "brook"];
let backgroundSounds = ["pedestrian", "rain"];

function setSoundBuffer() {
    mainIndex = Math.floor((Math.random() * mainSounds.length) + 0);
    backIndex = Math.floor((Math.random() * backgroundSounds.length) + 0);
    console.log(mainIndex + " " + backIndex);

    fetch("/sounds/main/" + mainSounds[mainIndex] + ".mp3")
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodeAudioData => {
            main = decodeAudioData;
        });

    fetch("/sounds/background/" + backgroundSounds[backIndex] + ".mp3")
        .then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodeAudioData => {
            background = decodeAudioData;
        });


    isanimal = animals.has(mainSounds[mainIndex]);
    console.log(isanimal);
    console.log(animals.has(mainSounds[mainIndex]));

}

function playback() {
    // background sound

    playSound1.buffer = background;
    playSound1.connect(ctx.destination);
    playSound1.start(ctx.currentTime);
    // main sound

    playSound2.buffer = main;
    playSound2.connect(ctx.destination);
    playSound2.start(ctx.currentTime);
}

function stopSound() {
    playSound1.stop();
    playSound2.stop();
}


// --------------------------------------------------------------------------------------

const changeIcon = () => {

    currIcon = document.getElementById("volume").getAttribute("class");
    if (currIcon === "fas fa-volume-up") {
        stopSound();
        document.getElementById("volume").setAttribute("class", "fas fa-volume-mute");
    } else {
        playSound1 = ctx.createBufferSource();
        playSound2 = ctx.createBufferSource();
        playback();
        document.getElementById("volume").setAttribute("class", "fas fa-volume-up");
    }
}

// ---------------------------------Verify-HUMAN----------------------------------------

const click = () => {
    if (currIcon === "fas fa-volume-up") {
        if (!isanimal) {
            document.getElementById("successBox").style.display = "flex";
        }
    } else {
        document.getElementById("failureBox").style.display = "flex";
    }
    console.log("left");
}
const verifyHuman = () => {
    if (currIcon === "fas fa-volume-up") {
        if (isanimal) {
            document.getElementById("successBox").style.display = "flex";
        }
    } else {
        document.getElementById("failureBox").style.display = "flex";
    }
    console.log("right");
}

const keyCheck = (event) => {
    let key = event.which || event.keyCode;
    console.log(key);
    currIcon = document.getElementById("volume").getAttribute("class");
    if (currIcon === "fas fa-volume-up") {
        if (key === 32 && isanimal === true) {
            document.getElementById("successBox").style.display = "flex";
        } else {
            document.getElementById("failureBox").style.display = "flex";
        }
    } else {
        document.getElementById("failureBox").style.display = "flex";
    }

}

document.getElementById('test').addEventListener('swiped-left', click);

document.getElementById('test').addEventListener('swiped-right', verifyHuman);

document.getElementById('test').addEventListener('keypress', keyCheck);