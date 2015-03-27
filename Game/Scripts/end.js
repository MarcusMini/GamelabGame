#pragma strict

var boolfor1 : boolean = false;
var boolfor2 : boolean = false;
var boolfor3 : boolean = false;
var boolfor4 : boolean = false;
var boolfor5 : boolean = false;
var DIsplayWindow : boolean;
private var moneyValue : int;
var customGuiStyle = new GUIStyle();
var windowStyle = new GUIStyle();
var textStyle = new GUIStyle();
var buttonStyle = new GUIStyle();
var scrollStyle = new GUIStyle();

public var DisplayFormula = new String[5];
var scrollPosition : Vector2 = Vector2.zero;

var i : int;



// value to pos the health element.


function Start () {
	textStyle.font = Resources.Load("small_font") as Font;
	textStyle.normal.textColor = Color.white;
	textStyle.fontSize = 20;
	DisplayFormula = PlayerPrefsX.GetStringArray("UseFormule");
	DIsplayWindow = false;
	PlayerPrefs.SetInt("Score",PlayerPrefs.GetInt("Score")+ 5000);
}

function OnGUI(){
var player2 = GameObject.Find("Player");
	var moneyTexture = Resources.Load("Mmoney") as Texture;
	var relique = Resources.Load("relique") as Texture;
	var x = Screen.width / 2;
	var rightcorner = Screen.width - 20;
	var center = Screen.height / 2;
	var y = Screen.height - 80;
	var gem = PlayerPrefs.GetInt("gem");
if(GUI.Button(Rect(x - 200, 500, 80,80),  Resources.Load("iconeclassement") as Texture2D,customGuiStyle)){
Application.LoadLevel("Classement");
}
if(GUI.Button(Rect(x + 135, 500, 80,80),  Resources.Load("laboratoireicone") as Texture2D,customGuiStyle)){
Application.LoadLevel("laboratoire");
}
GUI.DrawTexture(Rect(20,y+25,28,15), moneyTexture);
	GUI.Label(Rect(50,y+25,160,40), " "+moneyValue+" ", textStyle);
	
	// reliques
	
	GUI.DrawTexture(Rect(rightcorner - 70, y+20,25,25), relique); 
	GUI.Label(Rect(rightcorner - 20,y+25,160,40), ""+gem+"", textStyle);
}

function Update(){
	moneyValue = PlayerPrefs.GetInt("Mercure");
}
