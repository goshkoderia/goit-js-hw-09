import '../css/common.css';
import Notiflix from 'notiflix';

const refs = {
  inputDelay:document.querySelector('input[name="delay"]'),
  inputStep:document.querySelector('input[name="step"]'),
  inputAmount:document.querySelector('input[name="amount"]'),
  btnSubmit:document.querySelector('button[type="submit"]'),
}

console.log(refs.inputAmount);

refs.btnSubmit.addEventListener('click',result);

function createPromise(position, delay) 
{
  return new Promise((resolve,reject)=>
  {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>
    {
      if(shouldResolve){
        resolve({position,delay})
      }else{
        reject({position,delay})
      }
    },delay);
  });
}

function result(event){
  event.preventDefault();
  let delay = Number(refs.inputDelay.value);
  const stepDalay = Number(refs.inputStep.value);
  const amountDelay = Number(refs.inputAmount.value);
  
  for(let position = 1; position <= amountDelay; position+=1){
    createPromise(position,delay)
    .then(({position,delay})=>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({position,delay})=>{
      Notiflix.Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    delay = delay + stepDalay;
  }
}
