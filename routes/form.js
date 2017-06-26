var express = require('express');
var router = express.Router();
//var profiles = require('../app.js');
//var app =require('../app.js');
var profiles = [];
var match = undefined;


/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('form');
  //console.log('test');
  //console.log(express);
});

// the form gets posted to path /formHandle 
// from here we will add to profiles object. 
router.post('/formHandle',function(req,res){
  // req.body is and object with the data corresponding
  // to form data entered by the user, need to extract 
  // the score from the object 
  var userFormData = getUserFormData(req.body);
  // console.log("This is the user data "+userFormData);
  profiles.push(userFormData);
  // console.log("This is the array of profiles "+profiles);
  // run profile comparison here 
  match = findAMatch(userFormData,profiles);
  console.log(match);
    // if there is a match res.render('profileModal');
    if(match !== undefined){
      // render modal.hbs
      res.render('modal',{matchName:match.name,imageLink:match.profilePhoto});
    }
      // if no match res.send('No matches yet -_-'' ));
      else{
      res.send('No matches yet');
      }
});



function getUserFormData(dataObj){
  var userFormData = {};
  userFormData.profileDataArray = [];
  userFormData.score = 0;
  for(key in dataObj){
   userFormData.profileDataArray.push(dataObj[key]);
  }
  //calculate the userFormData.score 
  for(i=2;i<userFormData.profileDataArray.length;i++){
    // console.log(typeof parseInt(userFormData.profileDataArray[i]));
    // console.log(userFormData.profileDataArray[i]);
    userFormData.profileDataArray[i] = parseInt(userFormData.profileDataArray[i]);
    userFormData.score += userFormData.profileDataArray[i];
    userFormData.name = userFormData.profileDataArray[0];
    userFormData.profilePhoto = userFormData.profileDataArray[1];
  }

  // console.log(userFormData.score);
  return userFormData;
}

function findAMatch(userFormData,arrayOfProfiles){
  var userScore = userFormData.score;
  var userName = userFormData.name;
  var suggestedMatch = undefined;
  // loop through array of profiles and find a match 
  // with a variance of 3 points plus or minus 
  // and assign the whole object to a variable for 
  // potentialMatch
  for(i=0;i<arrayOfProfiles.length;i++){
    // make sure the current profile object that is looped
    // is not the same profile as the users
    if(userName !== arrayOfProfiles[i].name){
     // console.log("This is the user name "+userName);
     // console.log("This is the current object itterated name "+arrayOfProfiles[i].name);
     // console.log(arrayOfProfiles[i]);
      var difference = Math.abs(userScore-arrayOfProfiles[i].score);
      if(difference<3){
         suggestedMatch = arrayOfProfiles[i];
        // console.log(suggestedMatch[i]);
      }
    }

    //potentialMatch.push(arrayOfProfiles[i].name);
  }
  //console.log(suggestedMatch);
  if(suggestedMatch == undefined){
    console.log("not enough users");
  }
  return suggestedMatch;
}

module.exports = router;
