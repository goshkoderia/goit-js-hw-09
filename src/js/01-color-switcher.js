import '../css/common.css';

const refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'), 
}
let timerId = null;
refs.buttonStop.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

refs.buttonStart.addEventListener('click', ()=>{
     
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
    timerId = setInterval(()=> {   
         refs.body.style.background = getRandomHexColor()
     },
     1000     
     )
     
    });

refs.buttonStop.addEventListener('click', ()=>{
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
    clearInterval(timerId);
})
