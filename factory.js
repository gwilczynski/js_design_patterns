var Car = (function() {
  var Sedan = function(model){
    this.model = model;
  };
  var Van = function(model){
    this.model = model;
  };
  return function (model, type){
    if(type === 'sedan'){
      return new Sedan(model);
    } else if (type === 'van') {
      return new Van(model);
    }
  };
})();
var civic = Car('Honda Civic', 'sedan');
var cmax = Car('Fodrd C-max', 'van');

console.log(civic);
console.log(cmax);