#pragma strict

var timer2 : float = 0.0;
var fade : float;

function Start () {
	//renderer.material.color = Color(0,0,0,0);
	fade = 1.0;
}

function fadeOut(){
	if(fade > 0.0){
		renderer.material.color = Color(0,0,0,fade);
		fade = fade - 0.05;
	}
	else if(fade < 0.0){
		renderer.material.color = Color(0,0,0,0);
	}
}

function fadeIn(){

	if(fade < 1.0){
		renderer.material.color = Color(0,0,0,fade);
		fade = fade + 0.05;
	}
	else if(fade > 1.0){
		renderer.material.color = Color(0,0,0,1);
	}
}

