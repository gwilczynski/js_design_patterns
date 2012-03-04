/*
Observer Pattern Implementation
http://twitter.com/wilq_
Licensed under the GPL
*/

var Twitter = (function(){

    var userCollection = {};
    var subscribersId = -1;
    
    return {
        
        publish: function (author, tweet) {
    
            if (!userCollection[author]) {
                return false;
            }
    
            var subscribers = userCollection[author];
            var len = subscribers ? subscribers.length : 0;
    
            while (len--) {
                subscribers[len].user.Read(author, tweet);
            }
    
            return true;
    
        },
    
        subscribe: function (user, author) {
    
            if (!userCollection[author]) {
                userCollection[author] = [];
            }
    
            var token = (++subscribersId).toString();
            userCollection[author].push({
                token: token,
                user: user
            });
            return token;
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

User.prototype.Follow = function(follow){
    Twitter.subscribe(this, follow);
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