import "notiflix/dist/notiflix-3.2.6.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(ev) {
  ev.preventDefault();

  const { delay, step, amount } = ev.currentTarget.elements;


  for (let i = 0; i <= amount.value; i += 1) {
    createPromise(i + 1, Number(delay.value) + Number(step.value) * i)
      .then(({ position, delay }) => {
       Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objOfPromises = {
    position,
    delay,
  };
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objOfPromises);
    } else {
      reject(objOfPromises);
    }
  });
}
