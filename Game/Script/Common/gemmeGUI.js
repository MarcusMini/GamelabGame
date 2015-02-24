#pragma strict

var timer : float;
var count : int;
var customGuiStyle : GUIStyle;
var i : int;

function Start () {
	count = 1;
	PlayerPrefs.DeleteAll();
}
 
function OnGUI(){
	var EachFrame = PlayerPrefs.GetInt("EachFrame");
	var zoom = PlayerPrefs.GetInt("zoom");
	var height = Screen.height;
	var offsetHeight : int = 25;
	
	var bouton = ["defense", "force", "vision", "vitesse"];
	var background = ["defenseBcg", "forceBcg", "visionBcg", "vitesseBcg"];
	var molecule = ["forceMolecule", "", "", "", ""];
	// texte 8
	var texte = ["Chacha", "Chachou", "Chama", "Chasi", "Charlotte", "Chakra", "Maya", "Gros bebe doudouce", "sss"];
	
	// function which display the current element.
	var DisplayText = function(tab : String[], c : int){
			GUI.Label(Rect(Screen.width - 250,300,200,200), tab[c]);
			if(GUI.Button(Rect(Screen.width - 200, 500, 120,70), Resources.Load("bouton") as Texture2D, customGuiStyle)){
				Debug.Log("press "+c);
				//PlayerPrefs.SetInt("steps", 3);
				step(3);
			}
	};
	
	// loop function which will create the button it take 2 parameters the loop X and the loop Y. 
	var createElement = function(loopX : int[], loopY : int[]){
		for(var i : int = 0; i < loopX.length; i++){
			if(GUI.Button(Rect(loopX[i], loopY[i], 25,25), Resources.Load("check") as Texture2D, customGuiStyle)){
				Debug.Log("Je suis le numero" +i);
				PlayerPrefs.SetInt("texteValue", i);
				//PlayerPrefs.SetInt("steps", 2);
				step(2);
			}
		}
	};
	
	var defense = function(){
		// ouvrir la fenetre de la defense	
		GUI.BeginGroup(Rect(Screen.width - 300,height / 8,400,450), Resources.Load(background[0]) as Texture2D);
		GUI.EndGroup();
	};
	
	var force = function(){
		var positionForceX = [120,166,166,240,240,240,166,75,120]; 
		var positionForceY = [115,95,29,70,70,190,230,200,140];
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[1]) as Texture2D);
			GUI.DrawTexture(Rect(90,50,150,172), Resources.Load(molecule[0]) as Texture2D);
			// call the createElement method
			createElement(positionForceX, positionForceY);
		GUI.EndGroup();
	};
	
	var vision = function(){
		GUI.BeginGroup(Rect(Screen.width - 300,height / 8,400,450), Resources.Load(background[2]) as Texture2D);
		GUI.EndGroup();
	};
	
	var vitesse = function(){
		GUI.BeginGroup(Rect(Screen.width - 300,height / 8,400,450), Resources.Load(background[3]) as Texture2D);
		GUI.EndGroup();
	};
	
	var setID = function(i){
			switch (i){
				case 0:
					defense();
				break;
				case 1:
					force();
				break;
				case 2:
					vision();
				break;
				case 3:
					vitesse();
				break;
			}
	};
	
	
	// this method create the left side button.
	if(zoom){
		Debug.Log(i);
		GUI.BeginGroup(Rect(5,height / 5,147,height));
			for(i = 0; i < bouton.length; i++){
				if(GUI.Button(Rect(5, offsetHeight, 70, 70), Resources.Load(bouton[i]) as Texture2D, customGuiStyle)){
					setID(i);
					PlayerPrefs.SetInt("tabvalue", i);
					PlayerPrefs.SetInt("EachFrame", 1);
					/*if(PlayerPrefs.GetInt("steps") < 4){
						PlayerPrefs.SetInt("steps", 1);
					}*/
					
					step(1);
				}
				count++;
				offsetHeight += 80;
			}
		GUI.EndGroup();
	}
	
	
	// activate the gui element each frame.
	if(EachFrame){
		setID(PlayerPrefs.GetInt("tabvalue"));
		DisplayText(texte, PlayerPrefs.GetInt("texteValue"));
	}
	
}

function step(step : int){
	if(PlayerPrefs.GetInt("steps") < 4){
		PlayerPrefs.SetInt("steps", step);
	}
}


// zommer la camera sur spike, desactiver le speed

function Update () {
	// this method control the camera's zoom
	var zoom = PlayerPrefs.GetInt("zoom");
	var camera = GameObject.FindWithTag("SecondCamera");
	
	var currentZoom = camera.GetComponent(Camera).orthographicSize;
	
	if(zoom){
		if(currentZoom > 0.67){
			timer += Time.deltaTime;
			camera.GetComponent(Camera).orthographicSize = Mathf.Lerp(1.9, 0.67, timer * 0.8);
			PlayerPrefs.SetInt("activationSpike", 2);
			
			// provisoire
			
			PlayerPrefs.SetInt("setPosition", 1);
		}
		else{
			timer = 0;
		}
		
		// Reset the value, desactivate the camera and the gemme's machine
		if(Input.GetKey(KeyCode.E)){
			PlayerPrefs.SetInt("zoom", 0);
			PlayerPrefs.SetInt("activationSpike", 1);
			PlayerPrefs.SetInt("setPosition", 0);
			PlayerPrefs.SetInt("EachFrame", 0);
			
			if(PlayerPrefs.GetInt("steps") == 3){
				PlayerPrefs.SetInt("steps", 4);
			}
		}
	}
	else{
		if(currentZoom < 1.9){
			timer += Time.deltaTime;
			camera.GetComponent(Camera).orthographicSize = Mathf.Lerp(0.67, 1.9, timer * 0.8);
		}
		else{
			timer = 0;
		}
	}
	
}
