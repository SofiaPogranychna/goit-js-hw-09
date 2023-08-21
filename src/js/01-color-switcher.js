const start  = document.querySelector("[data-start]")
const stop  = document.querySelector("[data-stop]")
const body  = document.querySelector('body');
let timerId = null;



start.addEventListener('click', onStartBtnClick); 
stop.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    start.disabled = true;
    stop.disabled = false;
    

timerId = setInterval(() => {
document.body.style.backgroundColor = getRandomHexColor();
}, 1000);

}

function onStopBtnClick() { 
    clearInterval(timerId);
    start.disabled = false;
    stop.disabled = true;

}
function getRandomHexColor(){
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
