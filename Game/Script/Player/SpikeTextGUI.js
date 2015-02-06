#pragma strict

var showGui : boolean;

// event permet de définir le type d'évènement a afficher.
var event : String;

function Start () {
	showGui = false;
}

function OnCollisionEnter2D(object : Collision2D){
	if(object.gameObject.name == "Protection"){
		showGui = true;
		event = "grotte";
	}
}

function OnGUI(){
	var x = Screen.width / 2;
	var y = Screen.height / 2;
	
	if(showGui){
		switch (event){
			// affichier des émotions, texte en fonctions des évènements.
			case "grotte":
				GUI.Label(Rect(x,y,200,200), "Press G to get the object");
			break;
		}
	}
}

function Update () {

}
