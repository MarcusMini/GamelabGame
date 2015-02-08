#pragma strict

var showGui : boolean;

// event permet de définir le type d'évènement a afficher.
var event : String;
var prefabToInstantiate : Transform;
var collObject : GameObject;

function Start (){
	showGui = false;
	PlayerPrefs.DeleteKey("activationSpike");
}

function OnCollisionEnter2D(object : Collision2D){
	if(!GameObject.FindWithTag("Ennemy")){
		if(object.gameObject.name == "protection"){
			showGui = true;
			event = "grotte";
			collObject = object.gameObject;
		}
	}
}

function OnGUI(){

	// texture 
	
	var messageOverlay = Resources.Load("popupoverlay");
	var x = Screen.width;
	var y = Screen.height / 2;
	
	if(!GameObject.FindWithTag("Ennemy")){
		if(showGui){
			switch (event){
				// affichier des émotions, texte en fonctions des évènements.
				case "grotte":
					GUI.Label(Rect(x-200,y,200,200), messageOverlay);
					GUI.Label(Rect(x-175,y+30,200,200),"Press t to take this gem");
					PlayerPrefs.SetInt("activationSpike", 2);
				break;
				case "back":
					GUI.Label(Rect(x-200,y,200,200), messageOverlay);
					GUI.Label(Rect(x-175,y+30,200,200),"Press X");
				break;
			}
		}
	}
	
	if(event == "sortir"){
		GUI.Label(Rect(x-200,y,200,200), messageOverlay);
		GUI.Label(Rect(x-175,y+30,200,200),"Get out of here !");
	}	
}

function pickObject(){
	if(GameObject.Find("protection")){
		Instantiate(prefabToInstantiate, collObject.transform.position, Quaternion.identity);
		Destroy(collObject);
	}
}

function Update () {

	if(showGui){
		if(Input.GetKey(KeyCode.T)){
			Debug.Log("t was pressed");
			pickObject();
			event = "back";
			var particleObj = GameObject.FindWithTag("Particle");
			particleObj.GetComponent(ParticleSystem).enableEmission = true;
		}
		else if(Input.GetKey(KeyCode.X)){
			Debug.Log(" Quit ");
			PlayerPrefs.SetInt("activationSpike", 1);
			showGui = false;
			event = "sortir";
		}
	}	
}
