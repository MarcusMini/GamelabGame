var stringToEdit : String = "Pseudo";
var Write : int = 0;


	function Update(){
	//PlayerPrefs.DeleteKey("Destroygui");
	if (PlayerPrefs.GetInt("Destroygui") == 1){
	Write = 1;
	}
	if (Write == 1){
	textfield = GameObject.Find("textfield");
		textfield.renderer.enabled = false;
		}
	}
	
	function Start(){
	}
	
	function OnGUI () {
		var x = Screen.width /2;
		var h = Screen.height;
	GUI.backgroundColor = Color.clear;
	var retry = Resources.Load("retry") as Texture2D;
	var back = Resources.Load("back") as Texture2D;
	var charger = Resources.Load("charger") as Texture2D;
		var canLoad = GameObject.Find("Text").GetComponent(HSController);
		 // Make a text field that modifies stringToEdit.
		if(Write != 1){
		stringToEdit = GUI.TextField (Rect (x - 45, h - 350, 200, 1500), stringToEdit, 6);
		GUI.skin.textField.fontSize = 20;
		if(GUI.Button(Rect(x - 125, 10, 246, 45), charger)){
		canLoad.time = PlayerPrefs.GetFloat("Score");
		canLoad.canLoad = true;
		PlayerPrefs.SetString("Pseudo", stringToEdit);
		canLoad.Pseudo = stringToEdit;
		Write = 1;
		}
		}
		else {
	if(GUI.Button(Rect(x - 125, 10, 246,45), charger)){
	canLoad.time = PlayerPrefs.GetFloat("Score");
	canLoad.canLoad = true;	
	canLoad.Pseudo = PlayerPrefs.GetString("Pseudo");
	}
	}
		if(GUI.Button(Rect(x - 300, h - 80, 246, 45),retry)){
		Write = 1;
		canLoad.canLoad = false;
		Application.LoadLevel("Classement");
		}
		if(GUI.Button(Rect(x + 50, h - 80, 246, 45),back)){
		Application.LoadLevel("laboratoire");
		}
	}
