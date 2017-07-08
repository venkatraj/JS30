const inputs = document.querySelectorAll('#form input');
inputs.forEach(input => input.addEventListener('change',handle));
inputs.forEach(input => input.addEventListener('mousemove',handle));
function handle(e) {
  console.log(this.dataset)
  const suffix = this.dataset.sizing || '';
  //console.log(document.documentElement.style);
  //console.log(document.documentElement);
  document.documentElement.style.setProperty(
    //`--${this.name}`, `${this.value}px)`
    `--${this.name}`, `${this.value}${suffix}`
  );

}
