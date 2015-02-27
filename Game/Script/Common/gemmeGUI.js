#pragma strict

var timer : float;
var animationFrame : int;
var count : int;
var customGuiStyle : GUIStyle;
var i : int;

var texture : Texture2D;

// let's make a try... 
// change the next time use Playerprefs or something else Charlotte oh yeah, keep going lalalalallalalalala, listening to music.
var forcePos : int = 5;
var vitessePos : int = 2;
var visionPos : int = 4;
var defensePos : int = 3;

function Start () {
	count = 1;
}
 
function OnGUI(){
	var EachFrame = PlayerPrefs.GetInt("EachFrame");
	var zoom = PlayerPrefs.GetInt("zoom");
	var height = Screen.height;
	var offsetHeight : int = 25;
	
	var bouton = ["defense", "force", "vision", "vitesse"];
	var background = ["defenseBcg", "forceBcg", "visionBcg", "vitesseBcg"];
	var molecule = ["forceMolecule", "visionMolecule", "vitesseMolecule", "defenseMolecule"];
	//var texte = ["Chacha", "Chachou", "Chama", "Chasi", "Charlotte", "Chakra", "Maya", "Gros bebe doudouce", "sss"];
	var checkID = ["checkBleu", "check", "checkVert", "checkJaune"];
	
	// function which display the current element.
	// put an id..
	var DisplayText = function(c : int, ameliorationID : String, ptyState : int){
			var valueLabel = getLabelData(c, ameliorationID);
			GUI.Label(Rect(Screen.width - 250,300,200,200), valueLabel);
			if(ptyState <= c){
				if(GUI.Button(Rect(Screen.width - 200, 500, 120,70), Resources.Load("bouton") as Texture2D, customGuiStyle)){
					step(3);
					triggerAnim();
				}
			}
	};
	
	
	var createElement = function(loopX : int[], loopY : int[], level : int, idColor : int, ptyName : String){
		PlayerPrefs.SetString("ptyName", ptyName);
		for(var i : int = 0; i < loopX.length; i++){
				if(i < level){
					texture = Resources.Load(checkID[idColor]) as Texture2D;
				}
				else{
					texture = Resources.Load("checkBlanc") as Texture2D;
				}
			
			if(GUI.Button(Rect(loopX[i], loopY[i], 17,17), texture, customGuiStyle)){
				PlayerPrefs.SetInt("texteValue", i);
				PlayerPrefs.SetInt("ptyState", level);
				//GUI.Label(Rect(Screen.width - 250,300,200,200), texte[i]);
				step(2);
			}
		}
		
		// test
		
	};
	
	var defense = function(){
		var positionDefenseX = [45,95,125,155,180,255];
		var positionDefenseY = [130,130,105,160,133,133];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[0]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[3]) as Texture2D);
			createElement(positionDefenseX, positionDefenseY, defensePos, 0, "defense");
		GUI.EndGroup();
	};
	
	var force = function(){
		var positionForceX = [45,95,145,195,225,255];
		var positionForceY = [133,133,133,133,105,133];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[1]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[0]) as Texture2D);
			createElement(positionForceX, positionForceY, forcePos, 1, "force");
		GUI.EndGroup();
	};
	
	var vision = function(){
		var positionVisionX = [45,92,157,195,225,255];
		var positionVisionY = [137,165,107,133,133,107];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[2]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[1]) as Texture2D);
			createElement(positionVisionX, positionVisionY, visionPos, 2, "vision");
		GUI.EndGroup();
	};
	
	var vitesse = function(){
		var positionVitesseX = [45,92,170,210,252,210];
		var positionVitesseY = [130,130,130,105,133,155];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[3]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[2]) as Texture2D);
			createElement(positionVitesseX, positionVitesseY, vitessePos, 3, "vitesse");
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
//		Debug.Log(i);
		GUI.BeginGroup(Rect(5,height / 5,147,height));
			for(i = 0; i < bouton.length; i++){
				if(GUI.Button(Rect(5, offsetHeight, 70, 70), Resources.Load(bouton[i]) as Texture2D, customGuiStyle)){
					setID(i);
					PlayerPrefs.SetInt("tabvalue", i);
					PlayerPrefs.SetInt("EachFrame", 1);
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
		DisplayText( PlayerPrefs.GetInt("texteValue"), PlayerPrefs.GetString("ptyName"), PlayerPrefs.GetInt("ptyState"));
	}
}

function step(step : int){
	if(PlayerPrefs.GetInt("steps") < 4){
		PlayerPrefs.SetInt("steps", step);
	}
}

function triggerAnim(){
	var BasSprite = GameObject.Find("Bas");
	var BasSpriteComponent = BasSprite.GetComponent(Animator);

		BasSpriteComponent.enabled = true;
		BasSpriteComponent.runtimeAnimatorController = Resources.Load("foo") as RuntimeAnimatorController;

		yield WaitForSeconds(5);
		
		BasSpriteComponent.runtimeAnimatorController = Resources.Load("Bas 2") as RuntimeAnimatorController;
		yield WaitForSeconds(0.1);
		BasSpriteComponent.enabled = false;
}

function getLabelData(index : int, skills : String){
	var valeur = this.gameObject.GetComponent(textData).init(index, skills);
	
	return valeur;
}

function sendData(ameliorationID : int, niveau : int){
	if(ameliorationID == 1){
		// defense
	}
	else if(ameliorationID == 2){
		// force
	}
	else if(ameliorationID == 3){
		// vision
	}
	else{
		// vitesse
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
			
			if(PlayerPrefs.GetInt("steps") >= 3){
				PlayerPrefs.SetInt("steps", 4);
			}
			else{
				//Debug.Log("passe ici");
				PlayerPrefs.SetInt("steps", 0);
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

