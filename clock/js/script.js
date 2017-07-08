window.onload = function() {
  Clock.init();
};

var Clock = {
  secondsHand: null,
  minutesHand: null,
  hoursHand: null,

  init() {
    this.secondsHand = document.querySelector('.second-hand');
    this.minutesHand = document.querySelector('.minute-hand');
    this.hoursHand = document.querySelector('.hour-hand');
    setInterval(this.setTime.bind(this), 1000);
  },

  setTime() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsPosition = this.getPosition(seconds);
    if(seconds === 0) {
      this.secondsHand.style.transition = 'none';
    }
    console.log(seconds);
    const minutes = now.getMinutes();
    const minutesPosition = this.getPosition(minutes);
    const hours = now.getHours();
    const hoursPosition = this.getPosition(hours, 12);
    this.secondsHand.style.transform = `rotate(${secondsPosition}deg)`;
    this.minutesHand.style.transform = `rotate(${minutesPosition}deg)`;
    this.hoursHand.style.transform = `rotate(${hoursPosition}deg)`;
  },

  getPosition(value, divider = 60) {
    return ((value / divider) * 360) + 90;
  }
};
