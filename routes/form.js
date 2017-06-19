var express = require('express');
var router = express.Router();
var profiles = require('../app.js');
//var app =require('../app.js');
var profiles = profiles.profiles;


/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('form');
  //console.log('test');
  //console.log(express);
});

// the form gets posted to path /formHandle 
// from here we will add to profiles object. 
router.post('/formHandle',function(req,res){
  console.log(req.body);
  console.log(profiles);
});

// listen to path that the form.hbs posts to 
// the post happens in custom.js when the form submit click 
// handle is triggered


module.exports = router;