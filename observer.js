var Twitter = (function(){

    var userCollection = {};
    
    return {
        
        publish: function (author, tweet) {
    
            if (!userCollection[author]) {
                return false;
            }
    
            var followers = userCollection[author];
            var len = followers ? followers.length : 0;

            for(var i = 0; i < len; i++){
                followers[i].Read(author, tweet);
            }
    
            return true;
        },
    
        subscribe: function (user, whoToFollow) {
    
            if (!userCollection[whoToFollow]) {
                userCollection[whoToFollow] = [];
            }
            
            userCollection[whoToFollow].push(user);
            
            return true;
        },
    
        unsubscribe: function (user, whoToUnFollow) {
            var followers = userCollection[whoToUnFollow];
            var len = followers ? followers.length : 0;
                
            for(var i = 0; i < len; i++){
                if(followers[i] === user){
                    followers.splice(i, 1);
                }
            }
            
            return false;
        }
    };
})(); 

var User = function(name, nick){
    this.name = name;
    this.nick = nick;
};

//User definition
User.prototype.Follow = function(whoToFollow){
    Twitter.subscribe(this, whoToFollow);
};

User.prototype.UnFollow = function(whoToUnFollow){
	Twitter.unsubscribe(this, whoToUnFollow);
};

User.prototype.Read = function(author, tweet){
    console.log(this.name + " (" + this.nick + ") just readed tweet from: " + author + " : " + tweet); 
};

User.prototype.Write = function(tweet){
    console.log(this.name + " (" + this.nick + ") just wrote: " + tweet);
    Twitter.publish(this.nick, tweet );
};

//ralations
var wilq_ = new User("Grzegorz Wilczynski", "wilq_");
wilq_.Follow("ODevRel");
wilq_.Follow("ChromiumDev");
wilq_.Follow("jank");

var oDevRel = new User("Opera", "ODevRel");
var chromiumDev = new User("Chrome", "ChromiumDev");
var ie = new User("InternetExplorer", "IE");

var jank = new User("Jan Kowalski", "jank");
jank.Follow("wilq_");
jank.Follow("ODevRel");

//time line
setTimeout(function(){
    oDevRel.Write('New Opera Next snapshot includes...');
}, 5000);

setTimeout(function(){
    chromiumDev.Write('Chrome DevTools has a slew of...');
}, 15000);


setTimeout(function(){
    ie.Write('Get all of the latest info on #IE10 in the #MSDN');
}, 25000);

setTimeout(function(){
    oDevRel.Write('Opera Mobile 12: WebGL, camera access...');
}, 35000);


setTimeout(function(){
    jank.Write('bla bla bla');
}, 45000);

setTimeout(function(){
    wilq_.UnFollow('jank');
}, 55000);

setTimeout(function(){
    jank.Write('meet.js - Wrocław!');
}, 65000);