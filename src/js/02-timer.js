import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
    datetimePicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("[data-start]"),

    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]")
}

let selectedDate = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now();
        selectedDate = selectedDates[0];

        if (currentDate >= selectedDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
            refs.startBtn.setAttribute("disabled", "");
        }

        else {
            Notiflix.Notify.success("The date is correct");
            refs.startBtn.removeAttribute("disabled");
        }
    },
};

flatpickr(refs.datetimePicker, options);

const addLeadingZero = value => {
    return String(value).padStart(2, "0");
}
const convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}


const startTimer = () => {
    timerId = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = selectedDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.minutes.textContent = minutes;
        refs.seconds.textContent = seconds;

        if(days === "00" && hours === "00" && minutes === "00" && seconds === "00") {
            clearInterval(timerId);
        }
    }, 1000);
}

refs.startBtn.addEventListener("click", startTimer);


