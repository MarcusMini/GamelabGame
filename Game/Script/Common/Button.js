#pragma strict

var customGuiStyle : GUIStyle;
var timer :float = 0.0;
var fadeValue : int = 0;
private var activateGUI : boolean;

function Start(){
	activateGUI = false;
}

function OnGUI(){

	// get background element.

	var x = Screen.width / 2;
	var y = Screen.height / 3;

	
	// texture
	var buttonPlay  = Resources.Load('buttonPlay') as Texture2D;
	var buttonBoutique  = Resources.Load('buttonStore') as Texture2D;
	var buttonSettings  = Resources.Load('buttonSettings') as Texture2D;
	var leftarrow  = Resources.Load('left') as Texture2D;
	var rightarrow  = Resources.Load('right') as Texture2D;
	
	if(activateGUI){
	
		GUI.DrawTexture(Rect(x - 120, y + 150, 100,100), leftarrow);
    	GUI.DrawTexture(Rect(x + 40, y + 160, 100,100), rightarrow);
    	
	    if(GUI.Button(Rect(x - 50 ,y + 100 ,100,100), buttonPlay, customGuiStyle)){
			fadeValue = 1;
			launchScene(0);
	    }
	    
	    if(GUI.Button(Rect(x - 150,y + 225, 50, 50), buttonBoutique, customGuiStyle)){
	    	fadeValue = 1;
	    	launchScene(1);
	    }
	    
	    if(GUI.Button(Rect(x + 100, y + 225, 50,50), buttonSettings, customGuiStyle)){
	    	fadeValue = 1;
	    	launchScene(2);
	    }
	 }
}

function getIsound(){
	var soundObj = gameObject.Find("Developers");
	
	var isactivate = PlayerPrefs.GetInt("Activate");
	
	if(isactivate == 1){
		soundObj.audio.mute = false;
		PlayerPrefs.SetInt("activateingui", 1);
	}
	else{
		soundObj.audio.mute = true;
		PlayerPrefs.SetInt("activateingui", 0);
	}
}

function callfade(number){
	
	var quad = GameObject.Find("Quad");
	var fadeValue = quad.GetComponent(interface_transition).fade;
	
	if(number == 1){
		quad.GetComponent(interface_transition).fadeIn();
	}
	else{
		quad.GetComponent(interface_transition).fadeOut();
	}
	
	// test fade value
	
	if(fadeValue < 0.2){
		activateGUI = true;
	}
	else{
		activateGUI = false;
	}
	
}

function launchScene(valeur){
	
	if(valeur == 0){
		yield WaitForSeconds(2);
		PlayerPrefs.DeleteKey("event");
		PlayerPrefs.DeleteKey("loadLevel");
		Application.LoadLevel('laboratoire');    	
	}
	else if(valeur == 1){
		yield WaitForSeconds(2);
		Application.LoadLevel('Store');    	
	}
	else{
		yield WaitForSeconds(2);
		Application.LoadLevel("Parametre");
	}
	
}
	
function Update () {
	getIsound();
	callfade(fadeValue);
}