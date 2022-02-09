import '../css/common.css';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    buttonStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
let selectedDate = 0;
let timerId = null;
refs.buttonStart.disabled = true;

function pad(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (ms <= 0){
      clearInterval(timerId);
      ms = 0;  
    }
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] - options.defaultDate > 0){
          selectedDate = selectedDates[0].getTime();
          refs.buttonStart.disabled = false;
      }else{
          window.alert("Please choose a date in the future");
          refs.buttonStart.disabled = true;
      }
    },
  };
  const dateInput = flatpickr('#datetime-picker',options);
  refs.buttonStart.addEventListener('click',startTimer);

  function startTimer(){
      timerId = setInterval(()=>{
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;
      const time = convertMs(deltaTime);
      updateclockFace(time);
      },1000);
  }

  function updateclockFace({days,hours,minutes,seconds}){
      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;
  }