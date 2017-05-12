let hoursHandle = document.querySelector('.hand-hours');
let minutesHandle = document.querySelector('.hand-minutes');
let secondsHandle = document.querySelector('.hand-seconds');

function setTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();
  secondsHandle.style.transform = `rotate(${seconds*6 + 90}deg)`;
  minutesHandle.style.transform = `rotate(${minutes*6 + 90}deg)`;
  hoursHandle.style.transform = `rotate(${hours*30 + 90}deg)`;
}

setInterval(setTime, 1000);
