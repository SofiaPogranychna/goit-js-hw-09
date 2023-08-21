 import Notiflix from "notiflix";  

const formEl = document.querySelector('.form');

    formEl.addEventListener('submit', onSubmit);

    function onSubmit(e) {
      e.preventDefault();
  const delayInput = parseInt(formEl.elements['delay'].value);
  const stepInput = parseInt(formEl.elements['step'].value);
  const amountInput = parseInt(formEl.elements['amount'].value);

  let delay = delayInput;

      for (let i = 1; i <= amountInput; i++) {
        position = i;
        
createPromise(position, delay)
        .then(({position, delay}) => {
          Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay}) => {
          Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });

        delay += stepInput;
      }

      formEl.reset();
    }

    function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }
