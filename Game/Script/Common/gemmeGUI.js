#pragma strict

var timer : float;
var count : int;
var customGuiStyle : GUIStyle;

function Start () {
	count = 1;
}
 
function OnGUI(){
	var zoom = PlayerPrefs.GetInt("zoom");
	var height = Screen.height;
	var offsetHeight : int = 25;
	
	var bouton = ["defense", "force", "vision", "vitesse"];
		
	var defense = function(){
		// ouvrir la fenetre de la defense	
	};
	
	var force = function(){
		// ouvrir la fenetre de la force
	};
	
	var vision = function(){
		// ouvrir la fenetre de la force
	};
	
	var vitesse = function(){
		// ouvrir la fenetre de la force
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
	
	if(zoom){
		GUI.BeginGroup(Rect(5,height / 5,147,height));
			for(var i : int = 0; i < bouton.length; i++){
				if(GUI.Button(Rect(5, offsetHeight, 70, 70), Resources.Load(bouton[i]) as Texture2D, customGuiStyle)){
					setID(i);
				}
				count++;
				offsetHeight += 80;
			}
		GUI.EndGroup();
	}
}

// zommer la camera sur spike, desactiver le speed

function Update () {
	var zoom = PlayerPrefs.GetInt("zoom");
	var camera = GameObject.FindWithTag("SecondCamera");
	
	var currentZoom = camera.GetComponent(Camera).orthographicSize;
	
	Debug.Log(zoom);
	
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
		
		if(Input.GetKey(KeyCode.E)){
			PlayerPrefs.SetInt("zoom", 0);
			PlayerPrefs.SetInt("activationSpike", 1);
			PlayerPrefs.SetInt("setPosition", 0);
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
