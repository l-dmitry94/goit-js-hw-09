import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const startBtn = document.querySelector("[data-start]");
const datetimePicker = document.querySelector("#datetime-picker");
const daysItem = document.querySelector("[data-days]");
const hoursItem = document.querySelector("[data-hours]");
const minutesItem = document.querySelector("[data-minutes]");
const secondsItem = document.querySelector("[data-seconds]");
let countdownInterval = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
            startBtn.setAttribute("disabled", "");
        }

        else {
            Notiflix.Notify.success("The date is correct")
            startBtn.removeAttribute("disabled");
        }

    },
};

startBtn.setAttribute("disabled", "");
flatpickr(datetimePicker, options);

const convertMs = ms => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
    return value < 10 ? `0${value}` : value;
}

const timerFields = {
    days: daysItem,
    hours: hoursItem,
    minutes: minutesItem,
    seconds: secondsItem
}

const startTimer = () => {
    const selectedDate = new Date(datetimePicker.value).getTime();
    const currentDate = new Date().getTime();
    let timeRemaining = selectedDate - currentDate;

    countdownInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            timerFields.days.textContent = "00";
            timerFields.hours.textContent = "00";
            timerFields.minutes.textContent = "00";
            timerFields.seconds.textContent = "00";
            return;
        }

        const time = convertMs(timeRemaining);
        timerFields.days.textContent = addLeadingZero(time.days);
        timerFields.hours.textContent = addLeadingZero(time.hours);
        timerFields.minutes.textContent = addLeadingZero(time.minutes);
        timerFields.seconds.textContent = addLeadingZero(time.seconds);

        timeRemaining -= 1000;
    }, 1000);
}

startBtn.addEventListener("click", startTimer);
