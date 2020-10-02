// --------------------------------------------------------------------------------------
const ctx = new AudioContext();
let currIcon;
let background;
let main;
let playSound1;
let playSound2;
let mainIndex;
let backIndex;
let ans = false;
let isanimal = false;
let flag = false;
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
// ---------------------------------autoplaying audio----------------------------------------
window.onload = function() {
    document.getElementById("instruction").play();
}
// --------------------------------------------------------------------------------------


const changeIcon = () => {
    
    currIcon = document.getElementById("volume").getAttribute("class");
    // if (currIcon === "fas fa-volume-up") {
    //     stopSound();
    //     document.getElementById("volume").setAttribute("class", "fas fa-volume-mute");
    // } else if(currIcon === "fas fa-volume-mute") {
    if (currIcon === "fas fa-volume-mute" && !flag) {
        document.getElementById("instruction").pause();
        playSound1 = ctx.createBufferSource();
        playSound2 = ctx.createBufferSource();
        playback();
        document.getElementById("volume").setAttribute("class", "fas fa-volume-up");
        flag = true;
    }
}

// ---------------------------------Verify-HUMAN----------------------------------------

const leftSwipe = () => {
    console.log(currIcon);
    console.log("hello from :" + isanimal);
    // WORKING INVERSELY
    if (currIcon === "fas fa-volume-mute") {

        if (!isanimal) {
            console.log("in here");
            ans = true;
            document.getElementById("successBox").style.display = "flex";
            document.getElementById("failureBox").style.display = "none";
        } else {
            ans = false;
            document.getElementById("failureBox").style.display = "flex";
            document.getElementById("successBox").style.display = "none";
        }
    } else {
        // TEST PURPOSES
        document.getElementById("failureBox").style.display = "flex";
        document.getElementById("successBox").style.display = "none";
    }
    console.log("left");
    sendData();
}
const rightSwipe = () => {
    console.log(currIcon);
    // WORKING INVERSELY
    if (currIcon === "fas fa-volume-mute") {
        if (isanimal) {
            ans = true;
            document.getElementById("successBox").style.display = "flex";
            document.getElementById("failureBox").style.display = "none";
        } else {
            ans = false;
            document.getElementById("failureBox").style.display = "flex";
            document.getElementById("successBox").style.display = "none";
        }
    } else {
        // TEST PURPOSES
        document.getElementById("failureBox").style.display = "flex";
        document.getElementById("successBox").style.display = "none";
    }
    console.log("right");
    sendData();
}

const keyCheck = (event) => {
    let key = event.which || event.keyCode;
    console.log(key);
    currIcon = document.getElementById("volume").getAttribute("class");
    if (currIcon === "fas fa-volume-up") {
        if (key === 32 && isanimal === true) {
            ans = true;
            document.getElementById("successBox").style.display = "flex";
            document.getElementById("failureBox").style.display = "none";
        } else if (key !== 32 && !isanimal) {
            ans = true;
            document.getElementById("failureBox").style.display = "none";
            document.getElementById("successBox").style.display = "flex";
        } else {
            ans = false;
            document.getElementById("failureBox").style.display = "flex";
            document.getElementById("successBox").style.display = "none";
        }
    } else {
        document.getElementById("failureBox").style.display = "flex";
        document.getElementById("successBox").style.display = "none";
    }
    sendData();
}

document.getElementById('test').addEventListener('swiped-left', leftSwipe);

document.getElementById('test').addEventListener('swiped-right', rightSwipe);

document.getElementById('test').addEventListener('keypress', keyCheck);

// ---------------------------------Sending POST req----------------------------------------

// let myWindow = window.open("/", "_self");

const timeout = (time, promise) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // alert("Done!")
            console.log("timeout!")
                // myWindow.close()
        }, time)
        promise.then(resolve, reject)
    });
};


const sendData = () => {
    console.log("HELOOOOOOOOO");
    timeout(1000, fetch("/", {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `result=${ans}`
    }).then(res => {
        console.log("Request complete! response:", res);
    }))
}