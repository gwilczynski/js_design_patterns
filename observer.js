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
    
        unsubscribe: function (token) {
            for (var m in userCollection) {
                if (userCollection[m]) {
                    for (var i = 0, j = userCollection[m].length; i < j; i++) {
                        if (userCollection[m][i].token === token) {
                            userCollection[m].splice(i, 1);
                            return token;
                        }
                    }
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

var oDevRel = new User("Opera Dev Relations", "ODevRel");
var chromiumDev = new User("Chrome Dev Relations", "ChromiumDev");
var ie = new User("Internet Explorer", "IE");

var jank = new User("Jan Kowalski", "jank");
jank.Follow("wilq_");
jank.Follow("ODevRel");

//time line
setTimeout(function(){
    oDevRel.Write('New Opera Next snapshot includes length precision fixes/dpcm,dppx,dpi support...');
}, 5000);

setTimeout(function(){
    chromiumDev.Write('Chrome DevTools has a slew of new ways to navigate your JavaScript...');
}, 10000);


setTimeout(function(){
    ie.Write('Get all of the latest info on #IE10 in the #MSDN');
}, 15000);

setTimeout(function(){
    oDevRel.Write('Opera Mobile 12: WebGL, camera access, #html5 parser+more...');
}, 20000);


setTimeout(function(){
    wilq_.Write('RT@ChromiumDev Chrome DevTools has a slew of new ways to navigate your JavaScript...');
}, 25000);

//setTimeout(function(){
//    Twitter.unsubscribe( testSubscription );
//}, 0);