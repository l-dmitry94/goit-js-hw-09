import Notiflix from "notiflix";

const refs = {
  form: document.querySelector(".form"),
  delayInput: document.querySelector("[name='delay']"),
  stepInput: document.querySelector("[name='step']"),
  amountInput: document.querySelector("[name='amount']")
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });

    }, delay);
  })
}

refs.form.addEventListener("submit", event => {
  event.preventDefault();

  const delayValue = Number(refs.delayInput.value);
  const stepValue = Number(refs.stepInput.value);
  const amountValue = Number(refs.amountInput.value);

  let counter = 0;
  let position = 1;
  let delay = delayValue;

  let timerId = setInterval(() => {
    if(counter === amountValue) {
      clearInterval(timerId);
      return;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    counter += 1;
    position += 1;
    delay += stepValue;
  }, stepValue);
})