#pragma strict

var customGuiStyle : GUIStyle;
var timer :float = 0.0;
var fadeValue : int = 0;
private var activateGUI : boolean;
var window : boolean = true;
var x = Screen.width / 2;
var h2 = Screen.height / 2;
var customGuiStyle2 : GUIStyle;
var custom3 : GUIStyle;
	
function Start(){
	activateGUI = false;
}

function OnGUI(){
	// get background element.
var confirm = Resources.Load("guiAlambic") as Texture2D;
	var x = Screen.width / 2;
		var x2 = Screen.width / 2;
		var h2 = Screen.height / 2;
	var y = Screen.height / 3;
	
	// texture
	var buttonPlay  = Resources.Load('buttonPlay 2') as Texture2D;
	var buttonNew  = Resources.Load('buttonNew') as Texture2D;
	var buttonBoutique  = Resources.Load('buttonStore') as Texture2D;
	var buttonSettings  = Resources.Load('buttonSettings') as Texture2D;
	var leftarrow  = Resources.Load('left') as Texture2D;
	var rightarrow  = Resources.Load('right') as Texture2D;
	
	if(activateGUI){
	
		GUI.DrawTexture(Rect(x - 100, y + 200, 38,30), leftarrow);
    	GUI.DrawTexture(Rect(x + 75, y + 200, 40,30), rightarrow);
    	
    	
	    if(GUI.Button(Rect(x - 70 ,y + 100 ,150,150), buttonPlay, customGuiStyle2)){
			fadeValue = 1;
			launchScene(0);
	    }
	    
		if(PlayerPrefs.GetInt("mustPass")){
			GUI.DrawTexture(Rect(x - 99, y + 70, 55,55), rightarrow);
		    if(GUI.Button(Rect(x - 200 ,y - 40 ,125,125), buttonNew, customGuiStyle)){
				window = false;
		    }
		}
		    

	    
	    if(window==false){
			GUI.DrawTexture(Rect(x2 * 0.6, h2*0.3, x2, h2), confirm);
			GUI.Label(Rect(x * 0.65,h2*0.6,x*0.9, h2*0.5), "Es-tu sûr de vouloir créer une nouvelle partie? Attention, toute ta progression sera supprimée.", customGuiStyle);
			if(GUI.Button(Rect(x * 0.7,h2*1.1,50,200), "Oui", custom3)){
				timerDelete();
				PlayerPrefs.DeleteAll();
				fadeValue = 1;
				launchScene(0);
			}
			if(GUI.Button(Rect(x * 1.5,h2*1.1,50,200), "Non", custom3)){
				window = true;
			}
		}
	    
	    
	    if(GUI.Button(Rect(x - 150,y + 225, 70, 70), buttonBoutique, customGuiStyle)){
	    	fadeValue = 1;
	    	launchScene(1);
	    }
	    
	    if(GUI.Button(Rect(x + 100, y + 225, 70,70), buttonSettings, customGuiStyle)){
	    	fadeValue = 1;
	    	launchScene(2);
	    }
	 }
}

function timerDelete(){
	PlayerPrefs.DeleteAll();
	yield WaitForSeconds(5);
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