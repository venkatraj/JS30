window.onload = function() {
  DrumKit.init();
}

var DrumKit = {
  init() {
    window.addEventListener('keydown',this.play);
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => key.addEventListener('transitionend', this.stopTransition));
  },

  play(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`li.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  },

  stopTransition(e) {
    if(e.propertyName !== 'transform') return;
    e.srcElement.classList.remove('playing');
  }
}
