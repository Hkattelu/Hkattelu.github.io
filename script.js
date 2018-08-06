var sections = ["home", "skills", "projects"];
var active = sections[0];
var card = document.getElementsByClassName("card")[0];

function hideCardFront() {
	document.getElementById(active).style.visibility = "hidden";
}

function showCardSection(section) {
	document.getElementById(section).style.visibility = "visible";
}

function hideAllSections() {
	sections.forEach(function(element) {
		$("#" + element).hide();		
	});
}

function initialSpin() {
	hideCardFront
	setTimeout(function(){
		card.style.transition = "all 1s ease";
		card.style.transform = "rotateX(0deg)";
		setTimeout(function(){ 
			card.style.transition = "all 0.6s ease";
			showCardSection(active);
	    $("#" + active).show();
		}, 900);
	}, 100);
} 

function setButtonHandler(section) {
	$('#button-'+section).click(function(){
		setTimeout(function(){
			card.style.transform="rotateX(180deg)";
			hideCardFront()
			setTimeout(function(){
				card.style.transform="rotateX(0deg)";
				setTimeout(function(){
					hideAllSections()
					showCardSection(section)
					active = section;
					$("#" + section).show();
				},400);
			},600);
		},100);
	})
}

function onload() {
	hideAllSections();
	showCardSection(active);
	initialSpin();
	sections.forEach(function(element) {
		setButtonHandler(element);
	});
}
