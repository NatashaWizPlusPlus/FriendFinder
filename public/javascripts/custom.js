// when user hit the root path ('/')
// they will be promted to hit a button
// on click the button will route to fill
// out a form.
$('#fillSurveyButton').on('click',function(){
    event.preventDefault();
    console.log('clicked');
    window.location.href = 'http://localhost:3000/form';
});




// when the form submit is clicked we will
// prevent the default event and then post the
// data using the jquery post to a route called
// handleFriendForm

$('#formSubmitButton').on('click',function(){
    //event.preventDefault();
    // if the nameQuestion and the photoQuestion
    // are empty then alert the user to enter those fields
    if($('#nameQuestionSelect').val()==""&&$('#photoQuestionSelect').val()==""){
        window.alert('Please fill form completely');
    }else{
        //console.log($('#nameQuestionSelect'));
        console.log($('#nameQuestionSelect').val());
        var formData = {
            nameQuestion : $('#nameQuestionSelect').val(),
            photoQuestion : $('#photoQuestionSelect').val(),
            questionZero : $('#zeroQuestionSelect').val(),
            questionOne : $('#firstQuestionSelect').val(),
            questionTwo : $('#secondQuestionSelect').val(),
            questionThree : $('#thirdQuestionSelect').val(),
            questionFour : $('#fourthQuestionSelect').val(),
            questionFive : $('#fifthQuestionSelect').val(),
        };
        console.log('form data created');
        $.post('/form/formHandle',formData,function(){
            console.log('success');
        },'json');

            // run findFriend();
            
    }
});
