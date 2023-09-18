const refs = {
    body: document.body,
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]")
}

let timerId = null;

refs.stopBtn.setAttribute("disabled", "");

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const changeBodyColor = () => {
    refs.body.style.backgroundColor = getRandomHexColor();
}

const startChangeBodyColor = () => {
    const INTERVAL = 1000;
    changeBodyColor();
    timerId = setInterval(() => {
        changeBodyColor();
    }, INTERVAL);

    refs.startBtn.setAttribute("disabled", "");
    refs.stopBtn.removeAttribute("disabled");
}

const stopChangeBodyColor = () => {
    clearInterval(timerId);
    refs.body.removeAttribute("style");
    refs.startBtn.removeAttribute("disabled");
    refs.stopBtn.setAttribute("disabled", "");
}

refs.startBtn.addEventListener("click", startChangeBodyColor);
refs.stopBtn.addEventListener("click", stopChangeBodyColor);