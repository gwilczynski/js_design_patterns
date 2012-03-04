var Singleton1 = {
  firstAttribute: true,
  secondAttribute: 10,

  firstMethod: function(){
    return this.secondAttribute;
  },

  secondMethod: function(value){
    return value;
  }
};

Singleton1.firstAttribure = false;
var total = Singleton1.secondAttribute + 5;
var result = Singleton1.firstMethod();

console.log(total);
console.log(result);

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

var Singleton2 = function(){
  var privateValue = 42;
  function privateMethod(){
    //do something
  }
  return {
    PublicAttribute: 0,
    
    FirstMethod: function(){
      return privateValue;
    },

    SecondMethod: function(){
      return this.PublicAttribute + privateValue;
    }
  };
};

var s  = new Singleton2();
console.log(s.FirstMethod());
s.PublicAttribute = 12;
console.log(s.SecondMethod());

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

var Singleton3 = (function(){
  var privateValue = 42;
  function privateMethod(){
    //do something
  }
  return {
    PublicAttribute: 0,
    
    FirstMethod: function(){
      return privateValue;
    },

    SecondMethod: function(){
      return this.PublicAttribute + privateValue;
    }
  };
})();

//var s  = new Singleton();
console.log(Singleton3.FirstMethod());
Singleton3.PublicAttribute = 12;
console.log(Singleton3.SecondMethod());

//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

var Singleton4 = (function(){
    var instatiated;
	function init(){
		return {
			publicProperty: 'test',
			publicMethod: function(){
				console.log('hello world');
			}
		};
	}
	return {
		Instatance: function(){
			if(!instatiated){
				instatiated = init();
			}
			return instatiated;
		}
	};
})();

Singleton4.Instatance.publicMethod();