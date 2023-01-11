function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const body = document.body;
let intervalId = 0;

btnStartEl.addEventListener('click', () => {
 intervalId = setInterval(() => {
body.style.backgroundColor = getRandomHexColor();
btnStartEl.disabled = true;
}, 1000)});

btnStopEl.addEventListener('click', () => {
  clearInterval(intervalId);
  btnStartEl.disabled = false;
});

