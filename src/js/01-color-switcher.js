const body = document.body;
const startBtn = body.querySelector("button[data-start]");
const stopBtn = body.querySelector("button[data-stop]");
let timer = null;
stopBtn.setAttribute("disabled", "");

const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const getBodyColor = () => body.style.backgroundColor = getRandomHexColor();


const changeColor = () => {
    try {
        getBodyColor();
        timer = setInterval(() => {
            getBodyColor();
        }, 1000);
        if (timer !== null) {
            startBtn.setAttribute("disabled", "");
            stopBtn.removeAttribute("disabled");
        }
    }

    catch (error) {
        console.log(error.message);
    }

}

const stopChangeColor = () => {
    try {
        clearInterval(timer);
        timer = null;
        body.removeAttribute("style");
        startBtn.removeAttribute("disabled");
        stopBtn.setAttribute("disabled", "");
    }

    catch (error) {
        console.log(error.message);
    }

}

startBtn.addEventListener("click", changeColor);
stopBtn.addEventListener("click", stopChangeColor);