#pragma strict

var showGui : boolean;
var customGUILabel : GUIStyle;

// event permet de définir le type d'évènement a afficher.
var event : String;
var prefabToInstantiate : Transform;
var collObject : GameObject;
private var LearnText = ["Hey there, today you going to learn how to improve Spike's skills, 1rst click on the strenght property",
				"A panel appear, click on one of the element that you want to upgrade",
				"Below you have the description of the properties that you will upgrade, now click on the upgrade button",
				"Congratulations ! you have upgrade the strenght of Spike press E to quit !"];
				
var StepsButton = ["1","2","3","4"];
private var StepButtonX = [50,Screen.width / 1.4 + 5,Screen.width / 1.51 , Screen.width / 1.42];
private var StepButtonY = [Screen.height / 5 + 120,Screen.height / 5 + 10, Screen.height / 2,Screen.height / 1.17];


function Start (){
	showGui = false;
	PlayerPrefs.DeleteKey("activationSpike");
	
	var tamere = Screen.height / 4 - 15;
	Debug.Log("step" +tamere);
}

function OnCollisionEnter2D(object : Collision2D){
	Debug.Log("pass here");
	if(!GameObject.FindWithTag("Ennemy")){
		
		if(object.gameObject.name == "protection"){
			showGui = true;
			event = "grotte";
			collObject = object.gameObject;
		}
		else if(Application.loadedLevelName == "laboratoire"){
			
			 if(PlayerPrefs.GetInt("zoom")){
			 	showGui = true;
			 	event = "learnGemme";
			 }
		}
	}
}

function OnGUI(){
	
	var messageOverlay = Resources.Load("popupoverlay");
	var x = Screen.width;
	var y = Screen.height / 2;
	
	var learnGemme = function(LearnText : String[], Step : int, StepsButton : String[], StepsButtonX : float[], StepsButtonY : float[]){
//		Debug.Log(StepsButtonX[Step]);
		GUI.Label(Rect(Screen.width / 3, 0, 400,100), LearnText[Step], customGUILabel);
		GUI.depth = 0;
		GUI.DrawTexture(Rect(StepButtonX[Step], StepButtonY[Step], 182,40), Resources.Load(StepsButton[Step]));
	};
	
	if(!GameObject.FindWithTag("Ennemy")){ 
		if(showGui){
			switch (event){
				// affichier des émotions, texte en fonctions des évènements.
				// mettre dans une fonction.. c'est mieux
				case "grotte":
					GUI.Label(Rect(x-200,y,200,200), messageOverlay);
					GUI.Label(Rect(x-175,y+30,200,200),"Press t to take this gem");
					PlayerPrefs.SetInt("activationSpike", 2);
				break;
				case "back":
					GUI.Label(Rect(x-200,y,200,200), messageOverlay);
					GUI.Label(Rect(x-175,y+30,200,200),"Press X");
				break;
				case "learnGemme":
					if(PlayerPrefs.GetInt("steps") < 4){
						learnGemme(LearnText,PlayerPrefs.GetInt("steps"), StepsButton, StepButtonX, StepButtonY);
					}
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
