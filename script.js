$(document).ready(function() {
	

  $("#class").click(function(){

     $('#description').empty();
     $('#description').html("I am a hardworking student");
     $('#picture').empty();
     $('#picture').append("<img src='m1.png' class='img-rounded' />");

  });

  $("#work").click(function(){

     $('#description').empty();
     $('#description').html("I am a hard worker");
     $('#picture').empty();
     $('#picture').append("<img src='m2.jpg' class='img-rounded' />");

  });

  $("#other").click(function(){

     $('#description').empty();
     $('#description').html("I work hard play hard");
     $('#picture').empty();
     $('#picture').append("<img src='m3.jpg' class='img-rounded' />");


  });  





});