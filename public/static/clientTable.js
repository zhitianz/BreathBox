var chosenTrivia;
var bac;

var socket = io();


bootstrap_alert = function(message){
    console.log("Alert!");
    document.getElementById('alert_placeholder').innerHTML = '<div class="alert"><a class="close" data-dimiss="alert">x</a><span class="refreshAlert">'+message+'</span></div>';
};

contained = function(users, ip){
      for(var i = 0; i < users.length; i++){
      console.log("Compare " + ip + " to " + users[i]);
      if(users[i] != undefined && users[i] != ip){
         return true;
      }
   }
  return false;

};

requestTrivia = function(){
  
    document.getElementById('trivia_position').style.display = "block";
    document.getElementById('rtb').style.display = "none";
    chosenTrivia = getRandomTriv();
    console.log(chosenTrivia);
    document.getElementById('questLabel').innerHTML = chosenTrivia.question;
    document.getElementById('ansA').innerHTML = chosenTrivia.ansA;
    document.getElementById('ansB').innerHTML = chosenTrivia.ansB;
    document.getElementById('ansC').innerHTML = chosenTrivia.ansC;
    document.getElementById('ansD').innerHTML = chosenTrivia.ansD;

    socket.emit('cuip');
    
};

socket.on('blown', function(BAC){
    console.log("BAC received");
    document.getElementById('blownLabel').style.display = "none";
    document.getElementById('trivsub').style.display = "block";
    bac = BAC;

});

scalePoints = function(bp){
    if(bac <= 0.020){
      return bp;
    }
    else if(bac > 0.020 && bac <= 0.060){
        return 2*bp;
    }
    else if(bac >0.060 && bac <= 0.121){
        return 3*bp;
    }
    else{
       return 4*bp;
    }

};

submitTrivia = function(){
    console.log("submitting");
    var selected;
    var selSpan;
    //Selection pick
    if(document.getElementById('A').checked){
        selected = document.getElementById('A');
        selSpan = document.getElementById('ansA');
    } else if(document.getElementById('B').checked){
	selected = document.getElementById('B');
	selSpan = document.getElementById('ansB');
    }else if(document.getElementById('C').checked){
	selected = document.getElementById('C');
	selSpan = document.getElementById('ansC');
    }else if(document.getElementById('D').checked){
	selected = document.getElementById('D');
	selSpan = document.getElementById('ansD');
    }

    //if match
    if(selected.id == chosenTrivia.correct){
        selSpan.style.backgroundColor = "#43cd80";
        //determine points
        var points = scalePoints(chosenTrivia.bp);
        socket.emit('score', points, bac);
    }
    else{
	selSpan.style.backgroundColor = "#ff4040";
        document.getElementById("ans"+chosenTrivia.correct).style.backgroundColor = "#bbffff";
        socket.emit('score', 0, bac);
    }


};


socket.emit('reup');

console.log("Client Table Exists");
socket.on('refresh', function(payload){
    console.log("refreshing");
    if(payload!= undefined){
    var users = payload.users;
    var ip = payload.ip;
    
   if(contained(users, ip)){
     bootstrap_alert("Please refresh your screen - new info is available.");
  }
}
});

socket.on('refresh', function(){
     console.log("mandat refreshing");
     bootstrap_alert("Please refresh your screen - new info is available.");
});


