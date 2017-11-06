var User = function(ip, name){
	this.ip = ip;
	this.name = name;
	this.disc = true;
	this.score = 0;
	this.BAC = 0;

};

User.prototype.getName = function(){
    return this.name; 
};
User.prototype.getIP = function(){
    return this.ip;
};
User.prototype.getScore = function(){
    return this.score;
};
User.prototype.getBAC = function(){
    return this.BAC;
};



var UserArr = {
	users: [],
	exists: function(ip){
      for(var i = 0; i < this.users.length; i++){
      if(this.users[i] != undefined && this.users[i].getIP() === ip){
         return true;
      }
   }
  return false;

},
setDisc: function(ip, truth){
    for(var i = 0; i < this.users.length; i++){
        if(this.users[i].getIP() === ip){
            this.users[i].disc = truth;
            return;
        }
    }
},
getUserByIP: function(ip){
 for(var i = 0; i < this.users.length; i++){
        if(this.users[i].getIP() === ip){
            return this.users[i];
        }
    }
},
removeUser: function(ip){
      for(var i = 0; i < this.users.length; i++){
          if(this.users[i] != undefined && this.users[i].getIP() === ip){
             this.users.splice(i,1);
             return;
          }
       }

},

addUser: function(ip, name){
    var u = new User(ip, name);
    u.disc = false;
    this.users.push(u);
},
notContained: function(ip){
	return !this.exists(ip);
},
getIP: function(){
    var ip = [];
    for(var i = 0; i < this.users.length; i++){
        ip.push(this.users[i].getIP());
    }
   return ip;
},

addScore: function(bp,bac, ip){
    var u = this.getUserByIP(ip);
    u.score += bp;
    u.BAC = bac;
}
};

exports.UserArr = UserArr;
exports.User = User;
