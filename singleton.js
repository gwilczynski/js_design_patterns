var Singleton = (function(){
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

Singleton.Instatance.publicMethod();