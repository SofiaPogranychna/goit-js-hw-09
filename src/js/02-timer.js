import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysValue = document.querySelector("[data-days]");
const hoursValue = document.querySelector("[data-hours]");
const minutesValue = document.querySelector("[data-minutes]");
const secondsValue = document.querySelector("[data-seconds]");
const currentDate = new Date();

function isFutureDate(chosenDate) { 
  return chosenDate > currentDate;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (!isFutureDate(selectedDate)) {
      alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener("click", () => {
  const selectedDate = new Date(dateTimePicker.value).getTime();

  countdownInterval = setInterval(() => {
    updateTimer(selectedDate);
  }, 1000);

});

function updateTimer(selectedDate) {
  const  timeDifference = selectedDate - new Date();


  const timeComponents = convertMs(timeDifference);
  
  daysValue.textContent = addLeadingZero(timeComponents.days);
  hoursValue.textContent = addLeadingZero(timeComponents.hours);
  minutesValue.textContent = addLeadingZero(timeComponents.minutes);
  secondsValue.textContent = addLeadingZero(timeComponents.seconds);
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}