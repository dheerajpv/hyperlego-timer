const timer = document.querySelector("#timer");
const start = document.querySelector("#timer-start");
const pause = document.querySelector("#timer-pause");
const resume = document.querySelector("#timer-resume");
const reset = document.querySelector("#timer-reset");

// disable controls until all audio loads
start.enabled = false;
reset.enabled = false;

const startAudio = new Audio("./assets/audio/CHARGE.wav");
const warnAudio = new Audio("./assets/audio/TimeToRun.wav");
const endAudio = new Audio("./assets/audio/BUZZER.wav");
const errorAudio = new Audio("./assets/audio/FOGHORN.wav");

await Promise.all(
    [startAudio, warnAudio, endAudio, errorAudio].map(
        (a) =>
            new Promise((resolve) =>
                a.addEventListener("canplaythrough", resolve)
            )
    )
);

start.enabled = true;
reset.enabled = true;

const timerLength = 150;

let remaining = timerLength;

let timerInterval = null;
let playedWarn = false;

function interval() {
    remaining -= 1;
    if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    update();
}

function update() {
    const min = Math.floor(remaining / 60);
    const sec = `${remaining % 60}`.padStart(2, "0");
    timer.textContent = `${min}:${sec}`;

    timer.className = "";
    if (remaining > 30 && timerInterval !== null) timer.classList.add("good");
    else if (remaining > 0 && timerInterval !== null) {
        timer.classList.add("warn");
        if (!playedWarn) {
            warnAudio.play();
            playedWarn = true;
        }
    } else {
        timer.classList.add("stop");
        endAudio.play();
    }
}

start.addEventListener("click", () => {
    startAudio.play();
    timerInterval = setInterval(interval, 1000);
    pause.disabled = false;
    start.disabled = true;
    playedWarn = false;
});

pause.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    errorAudio.play();
    timer.classList = "";
    timer.classList.add("stop");
    pause.disabled = true;
    resume.disabled = false;
});

resume.addEventListener("click", () => {
    startAudio.play();
    timerInterval = setInterval(interval, 1000);
    update();
    pause.disabled = false;
});

reset.addEventListener("click", () => {
    if (timerInterval !== null) errorAudio.play();
    remaining = timerLength;
    clearInterval(timerInterval);
    timerInterval = null;
    timer.classList = "";
    timer.classList.add("stop");
    start.disabled = false;
    pause.disabled = true;
    resume.disabled = true;
    update();
});
