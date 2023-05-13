const timer = document.querySelector("#timer");
const start = document.querySelector("#timer-start");
const pause = document.querySelector("#timer-pause");
const resume = document.querySelector("#timer-resume");
const reset = document.querySelector("#timer-reset");

const timerLength = 150;

let remaining = timerLength;

let timerInterval;

function interval() {
    remaining -= 1;
    if (remaining < 0) clearInterval(interval);
    update();
}

function update() {
    const min = Math.floor(remaining / 60);
    const sec = `${remaining % 60}`.padStart(2, "0");
    timer.textContent = `${min}:${sec}`;
    timer.className = "";
    if (remaining > 30) timer.classList.add("good");
    else if (remaining > 0) timer.classList.add("warn");
    else timer.classList.add("stop");
}

start.addEventListener("click", () => {
    timerInterval = setInterval(interval, 1000);
    pause.disabled = false;
    start.disabled = true;
});

pause.addEventListener("click", () => {
    clearInterval(timerInterval);
    timer.classList = "";
    timer.classList.add("stop");
    pause.disabled = true;
    resume.disabled = false;
});

resume.addEventListener("click", () => {
    timerInterval = setInterval(interval, 1000);
    update();
    pause.disabled = false;
});

reset.addEventListener("click", () => {
    remaining = timerLength;
    clearInterval(timerInterval);
    timer.classList = "";
    timer.classList.add("stop");
    start.disabled = false;
    pause.disabled = true;
    resume.disabled = true;
    update();
});
