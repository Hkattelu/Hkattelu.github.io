var sections = ["home","skills","projects"];
var active = sections[0];

function onload(){

	$("#" + sections[1]).hide();
	$("#" + sections[2]).hide();

	setTimeout(function(){

			document.getElementById(active).style.visibility="hidden";
			document.getElementsByClassName("card")[0].style.transition="all 1s ease";
			document.getElementsByClassName("card")[0].style.transform="rotateX(0deg)";
			setTimeout(function(){
					document.getElementById("home").style.visibility="visible";

			},900);
	},100);

}

$(document).ready(function() {

	$("#buttonHome").click(function(){
		setTimeout(function(){
			document.getElementsByClassName("card")[0].style.transition="all 0.6s ease";
			document.getElementsByClassName("card")[0].style.transform="rotateX(180deg)";
				document.getElementById(active).style.visibility="hidden";
			setTimeout(function(){
				document.getElementsByClassName("card")[0].style.transition="all 0.6s ease";
				document.getElementsByClassName("card")[0].style.transform="rotateX(0deg)";
				setTimeout(function(){
					$("#" + sections[1]).hide();
					$("#" + sections[2]).hide();
					document.getElementById("home").style.visibility="visible";
					active = sections[0];
					$("#" + sections[0]).show();
				},400);
			},600);
		},100);
	});
	$("#buttonSkills").click(function(){
		setTimeout(function(){
			document.getElementsByClassName("card")[0].style.transition="all 0.6s ease";
			document.getElementsByClassName("card")[0].style.transform="rotateX(180deg)";
				document.getElementById(active).style.visibility="hidden";
			setTimeout(function(){
				document.getElementsByClassName("card")[0].style.transition="all 0.6s ease";
				document.getElementsByClassName("card")[0].style.transform="rotateX(0deg)";
				setTimeout(function(){
					$("#" + sections[0]).hide();
					$("#" + sections[2]).hide();
					document.getElementById("skills").style.visibility="visible";
					active = sections[1];
					$("#" + sections[1]).show();
				},400);
			},600);
		},100);
	});
	$("#buttonProjects").click(function(){
		setTimeout(function(){
			document.getElementsByClassName("card")[0].style.transition="all 0.6s ease";
			document.getElementsByClassName("card")[0].style.transform="rotateX(180deg)";
				document.getElementById(active).style.visibility="hidden";
			setTimeout(function(){
				document.getElementsByClassName("card")[0].style.transition="all 0.6s ease";
				document.getElementsByClassName("card")[0].style.transform="rotateX(0deg)";
				setTimeout(function(){
					$("#" + sections[0]).hide();
					$("#" + sections[1]).hide();
					document.getElementById("projects").style.visibility="visible";
					active = sections[2];
					$("#" + sections[2]).show();
				},400);
			},600);
		},100);
	});

});

