import Notiflix from "notiflix";

const refs = {
  form: document.querySelector(".form"),
  firstDelay: Number(document.querySelector("[name='delay']")).value,
  delayStep: Number(document.querySelector("[name='step']")).value,
  amount: Number(document.querySelector("[name='amount']")).value
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener("submit", event => {
  event.preventDefault();

  for (let i = 1; i <= refs.amount; i += 1) {
    setTimeout(() => {
      createPromise(i, firstDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, i * delayStep);
  }
})
