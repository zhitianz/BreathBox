var express = require('express');
var path = require('path');
var user = require('./users.js');






//make router
var router = express.Router();

//export router
module.exports = router;

//route our app

router.get('/login', function(req,res){
	res.render('pages/login');

});

router.post('/login',function(req,res){
    
    console.log(user.UserArr.getIP());
    var arr = user.UserArr.getIP();
    var payload = {users: arr, ip: req.ip};
    io.sockets.emit('refresh', payload);
    user.UserArr.addUser(req.ip, req.body.name);
    res.redirect('/');
});

//route for home
router.get('/', function(req,res){
  if(user.UserArr.exists(req.ip)){

    res.render('pages/index');
  }
  else{
    res.redirect('/login');
  }
});

//route for manual
router.get('/about', function(req,res){
  if(user.UserArr.exists(req.ip)){
    res.render('pages/about');
  }
  else{
     res.redirect('/login');
  }
});


//route for user list
router.get('/contact', function(req,res){
if(user.UserArr.exists(req.ip)){
     res.render('pages/contact',{users:user.UserArr.users});
  }
  else{
    res.redirect('login');
  }

});
