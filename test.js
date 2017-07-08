function Vehicle(make, year) {
  Object.defineProperty(this, 'make', {
    get: function() { return make; }
  });

  Object.defineProperty(this, 'year', {
    get: function() { return year; }
  });
}

Vehicle.prototype.toString = function() {
  return this.make + ' ' + this.year;
}

function Motorcycle(make, year) {
  Vehicle.apply(this, [make, year]);
}

Motorcycle.prototype = Object.create(Vehicle.prototype, {
  toString: function() {
    return 'Motorcycle ' + this.make + ' ' + this.year;
  }
});

Motorcycle.prototype.constructor = Motorcycle;
