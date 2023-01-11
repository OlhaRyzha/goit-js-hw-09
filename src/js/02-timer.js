// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-3.2.6.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStartEl = document.querySelector('button[data-start]');
const spanDaysEl = document.querySelector('span[data-days]');
const spanHoursEl = document.querySelector('span[data-hours]');
const spanMinutesEl = document.querySelector('span[data-minutes]');
const spanSecondsEl = document.querySelector('span[data-seconds]');

btnStartEl.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
  onClose(selectedDates) {
    const diff = selectedDates[0] - options.defaultDate;
    if((diff <= 0)){
      Notify.failure("Please choose a date in the future")
      return
    }
      btnStartEl.disabled = false;
      btnStartEl.addEventListener('click', () =>{
   const intervalId = setInterval(() => {
        const diff = selectedDates[0] - new Date();
        if((diff <= 0)){
         clearInterval(intervalId)
          return
        }
    const {days, hours, minutes, seconds} = convertMs(diff);

console.log(days, hours, minutes, seconds)
     spanDaysEl.textContent = options.addLeadingZero(days);
     spanHoursEl.textContent = options.addLeadingZero(hours);
     spanMinutesEl.textContent = options.addLeadingZero(minutes);
     spanSecondsEl.textContent = options.addLeadingZero(seconds);
      }, 1000);  
})
    

  },
};

const inputTextEl = document.querySelector('#datetime-picker');

 flatpickr(inputTextEl, options);

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