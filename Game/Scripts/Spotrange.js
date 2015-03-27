#pragma strict

var range : int;

function Start () {
	range = PlayerPrefs.GetInt("range");
}

function Update () {
	if(!range || range < 0){
		range = 1;
	}
	else if(range && range > 1){
		range = PlayerPrefs.GetInt("range") - 1;
	}
	
	this.GetComponent(Light).range = range;
	
}