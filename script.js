$(document).ready(function() {
	

  $("#class").click(function(){

     $('#description').empty();
     $('#description').html("I am a hardworking student");
     $('#picture').empty();
     $('#picture').append("<img src='img/m1.PNG' class='img-rounded' />");

  });

  $("#work").click(function(){

     $('#description').empty();
     $('#description').html("I am a hard worker");
     $('#picture').empty();
     $('#picture').append("<img src='img/m2.JPG' class='img-rounded' />");

  });

  $("#other").click(function(){

     $('#description').empty();
     $('#description').html("I work hard play hard");
     $('#picture').empty();
     $('#picture').append("<img src='img/m3.JPG' class='img-rounded' />");


  });  





});