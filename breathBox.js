//Set up basic server
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var bodyParser = require('body-parser');
var port = 8080;
var endMw = require('express-end');
var UserArr = require('./app/users.js').UserArr;
var cuip;

var arduinoSerialPort = '/dev/ttyACM0';
var serialport = require('serialport');
var serialPort = new serialport.SerialPort(arduinoSerialPort,
{//Listening on the serial port for data coming from Arduino over USB
	parser: serialport.parsers.readline('\n')
});


var clients = {};
function broadcast(message){
    for (var client in clients) {
        clients[client].write(JSON.stringify(message));
    }
}



//Layout setup
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(expressLayouts);







var router = require('./app/routes');
app.use('/',router);
console.log(__dirname + '/app/');
app.use('/appScript',express.static(__dirname + '/app/'));

//end middleware
app.use(endMw);



//static file location
app.use(express.static(__dirname + "/public"));

app.use('/favicon.ico', express.static(__dirname + "/public/img/favicon.ico"));
console.log(__dirname + "/public/images/favicon.ico");




//start server
var server = app.listen(port, function(){
  console.log('app started');
});



io = require('socket.io').listen(server);

io.on('connection', (socket) =>{
   console.log("logged user");
   var address = socket.handshake.address;
   var curUser = UserArr.getUserByIP(address);
   socket.on('register', function(){
	io.sockets.emit('refresh');
        if(UserArr.exists(address)){
 	    UserArr.setDisc(address, true);
        }
    });


   socket.on('reup', function(){

	console.log('reup success');
	if(UserArr.exists(address)){
 	    UserArr.setDisc(address, true);
        }

    });

   socket.on('cuip', function(){
       console.log("CUIP: " + socket.handshake.address);
       console.log(socket.id);
       cuip = socket;
});

   socket.on('score', function(bp, bac){
       UserArr.addScore(bp, bac, socket.handshake.address);
       io.sockets.emit('refresh');
});

    socket.on('disconnect', function () {

    
        console.log("disconnect attempt");
        console.log(address);
        console.log(UserArr.getIP());
        if(curUser != undefined){
            console.log(curUser.name);
        }
        if(curUser == undefined || curUser.disc == true){
        console.log("disconnect!");
        UserArr.setDisc(address, false);
        setTimeout(function () {
            if(curUser == undefined){
		console.log("undefined user error catch");
	    }
            else if(!curUser.disc){ 

          var arr = UserArr.getIP();
    		  var payload = {users: arr, ip: curUser.getIP()};
                  io.sockets.emit('refresh', payload);
        io.sockets.emit('refresh'); UserArr.removeUser(address);  console.log("user removed");}
        }, 10000);
	}
    });
});



serialPort.on('data', function (data)
{//When a new line of text is received from Arduino over USB
		var validate = false;

		try{
		var j = JSON.parse(data);
		if(j.VALID == 1){
			console.log("Reading BAC");
                        console.log(j);
			
			cuip.emit("blown", j.BAC);
		}
		}catch(ex){
		    console.log("dead input");
		}
});

serialPort.on('error', function(error){
    console.log("breathbox fail");
    console.log("error");

});

exports.IO = io;

