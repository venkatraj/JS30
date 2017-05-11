function play(e) {
  const key = document.querySelector(`li[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if(!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function stopTransition(e) {
    if(e.propertyName !== 'transform') return;
    e.srcElement.classList.remove('playing');
}

window.addEventListener('keydown',play);
const keys = document.querySelectorAll('li[data-key]');
keys.forEach(key => key.addEventListener('transitionend',stopTransition));
