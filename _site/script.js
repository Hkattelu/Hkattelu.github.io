$(document).ready(function() {
	

  $("#description2").hide();
  $("#picture2").hide();

  $("#work").click(function(){
     
     $("#work").addClass('active');
     $('#other').removeClass('active');
     $('#description2').hide();
     $('#description1').show();
     $("#picture2").hide();
     $("#picture1").show();

  });

  $("#other").click(function(){
     
     $("#other").addClass('active');
     $('#work').removeClass('active');
     $('#description1').hide();
     $('#description2').show();
     $("#picture1").hide();
     $("#picture2").show();


  });  

  


});