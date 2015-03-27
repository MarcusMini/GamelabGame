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
var soundtexture : String;
var spikeDeath : AudioClip;
var soundbool : boolean;


var i : int;
var etat : boolean;
var heightW : int;
var panelName : String;

// value to pos the health element.

function Start () {
	textStyle.font = Resources.Load("small_font") as Font;
	textStyle.normal.textColor = Color.white;
	textStyle.fontSize = 20;
	DisplayFormula = PlayerPrefsX.GetStringArray("UseFormule");
	DIsplayWindow = false;
	etat = true;
	heightW = 800;
	panelName = "Sorts possibles";
	soundbool = true;
	if(!PlayerPrefs.GetInt("Togglesound")){
		soundtexture = "nosound";
	}
	else{
		soundtexture = "sound";
	}
	
	// display the guide of how to use the different button
	
}

function OnGUI(){
	var x = Screen.width / 2;
	var rightcorner = Screen.width - 20;
	var center = Screen.height / 2;
	var y = Screen.height - 80;
	
	//set the texture in a variable
	var formule1 = Resources.Load("Acide") as Texture;
	var formule1Press = Resources.Load("chemical_two_yellow_press") as Texture;
	
	var formule2 = Resources.Load("Eau-oxygénée") as Texture;
	var formule2Press = Resources.Load("chemical_four_blue_press") as Texture;
	
	var formule3 = Resources.Load("bicarbonate") as Texture;
	var formule3Press = Resources.Load("chemical_two_yellow_press") as Texture;
	
	var formule4 = Resources.Load("Glycérol") as Texture;
	var formule4Press = Resources.Load("chemical_three_red_press") as Texture;
	
	var formule5 = Resources.Load("Soude") as Texture;
	var formule5Press = Resources.Load("chemical_three_red_press") as Texture;
	
	var formule6 = Resources.Load("Liquide-vaisselle") as Texture;
	var formule6Press = Resources.Load("chemical_four_blue_press") as Texture;
	
	var formule7 = Resources.Load("Permanganate") as Texture;
	var formule7Press = Resources.Load("chemical_three_red_press") as Texture;
	
	var formule8 = Resources.Load("Huile") as Texture;
	var formule8Press = Resources.Load("chemical_three_red_press") as Texture;
	
	var background = Resources.Load("background 1") as Texture;
	var heart = Resources.Load("heart") as Texture;
	var life = Resources.Load("life") as Texture;
	var polymere = Resources.Load("polymere") as Texture;
	
	var moneyTexture = Resources.Load("Mmoney") as Texture;
	var relique = Resources.Load("relique") as Texture;
	
	var reload = Resources.Load("buttonreload") as Texture;
	
	// triggering buttons.
	if(Input.GetKey(KeyCode.A)){
		GUI.Button(Rect(x - 120,y - 59,40,50), formule4Press, customGuiStyle);
	}
	if(Input.GetKey(KeyCode.Z)){
		GUI.Button(Rect(x - 60,y -59,42,50), formule1Press, customGuiStyle);
	}
	if(Input.GetKey(KeyCode.E)){
		GUI.Button(Rect(x,y -60,45,50), formule2Press, customGuiStyle);
	}
	if(Input.GetKey(KeyCode.R)){
		GUI.Button(Rect(x + 60,y -59,42,50), formule1Press, customGuiStyle);
	}
	if (Input.GetKey(KeyCode.Q)){
		GUI.Button(Rect(x -90,y+1,42,50), formule5Press, customGuiStyle);
	}	
	if (Input.GetKey(KeyCode.S)){
		GUI.Button(Rect(x - 30,y+2,41,50), formule6Press, customGuiStyle);
	}	
	if(Input.GetKey(KeyCode.D)){
		GUI.Button(Rect(x + 30,y+2,40,50), formule4Press, customGuiStyle);
	}
	if (Input.GetKey(KeyCode.F)){
		GUI.Button(Rect(x + 90,y+1,42,50), formule5Press, customGuiStyle);
	}
	if (Input.GetKey(KeyCode.Question)){
		
	}

	else{
		// button
		
		GUI.Button(Rect(x + 60,y -60,45,50), formule1, customGuiStyle);
		GUI.Button(Rect(x,y -60,45,50), formule2, customGuiStyle);
		GUI.Button(Rect(x - 60 ,y -60,45,50), formule3, customGuiStyle);
		GUI.Button(Rect(x - 120 ,y - 60,45,50), formule4, customGuiStyle);
		GUI.Button(Rect(x - 90,y,45,50), formule5, customGuiStyle);
		GUI.Button(Rect(x - 30,y,45,50), formule6, customGuiStyle);
		GUI.Button(Rect(x + 30,y,45,50), formule7, customGuiStyle);
		GUI.Button(Rect(x + 90,y,45,50), formule8, customGuiStyle);
		
		//label
		
		GUI.Label(Rect(x-107,y-5,10,10), "a", textStyle);
		GUI.Label(Rect(x-43,y-5,10,10), "z", textStyle);
		GUI.Label(Rect(x+17,y-5, 10,10), "e", textStyle);
		GUI.Label(Rect(x+77,y -5, 10,10), "r", textStyle);
		GUI.Label(Rect(x-77,y+55,10,10), "q", textStyle);
		GUI.Label(Rect(x-17,y+55,10,10), "s", textStyle);
		GUI.Label(Rect(x+43,y+55,10,10), "d", textStyle);
		GUI.Label(Rect(x+107,y+55,10,10), "f", textStyle);
	}
					
	// life of the player
	// basic of the life UI.
	
	GUI.DrawTexture(Rect(x - 160,0,355,56), background );
	GUI.DrawTexture(Rect(x - 105, 15, 28,24), heart);
	
	if(GameObject.Find("Player")){
		var playerLife = GameObject.Find('Player');
		var otherscript = playerLife.GetComponent(playercol);
	}

		
	if(playerLife){
		
		// assigning the new variable to a new health variable.
		var healthp = otherscript.health;
		moneyValue = otherscript.money;
		
		if(healthp > 0){
			if(healthp > 0){
				GUI.DrawTexture(Rect(x-63,20,10,10), life);
			}
			if(healthp > 1){
				GUI.DrawTexture(Rect(x-20,20,10,10), life);
				GUI.DrawTexture(Rect(x-50,25,27,1), polymere); 
			}
			if(healthp > 2){
				GUI.DrawTexture(Rect(x + 23,20,10,10), life);
				GUI.DrawTexture(Rect(x-7,25,27,1), polymere); 
			}
			if(healthp > 3){
				GUI.DrawTexture(Rect(x + 65,20,10,10), life);
				GUI.DrawTexture(Rect(x+35,25,27,1), polymere);
			}
			if(healthp > 4){
				GUI.DrawTexture(Rect(x+78,25,27,1), polymere);
				GUI.DrawTexture(Rect(x + 108,20,10,10), life);
			}
		}
	}
	else{ 
		if(soundbool){
	    	audio.PlayOneShot(spikeDeath);
	    	var soundObj = GameObject.Find("music in game");
			soundObj.audio.enabled = false;
	    	soundbool = false;
	    }
	    
	    var transitionValue = GameObject.Find("Quad").GetComponent(transition).spikePass;
	    
	    if(!transitionValue){
	    	GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), Resources.Load("laboratoire_alambic_fond") as Texture2D);
	    }
	  
		GUI.Label(Rect(x-60,center - 100,300,300), "Tu as perdu !", textStyle);
		
		
		if(GUI.Button(Rect(x-30,center, 100,100), reload, customGuiStyle)){
			if(GameObject.Find("Boss")){
				var boss = GameObject.Find("Boss").GetComponent(Boss);
				if(boss.isboss){
					PlayerPrefs.SetString("event", "");
					PlayerPrefs.DeleteKey("loadLevel");
					// life of player return to max value
					PlayerPrefs.SetFloat("Health", PlayerPrefs.GetFloat("healthRestart"));
					Application.LoadLevel("Level1_c");
				}
			}
			else{
				PlayerPrefs.DeleteKey("loadLevel");
				Application.LoadLevel("laboratoire");
			}	
		}
	}
	
	// money
	
	
	GUI.DrawTexture(Rect(20,y+25,28,15), moneyTexture);
	GUI.Label(Rect(50,y+25,160,40), " "+moneyValue+" ", textStyle);
	
	// reliques
	
	GUI.DrawTexture(Rect(rightcorner - 70, y+20,25,25), relique); 
	GUI.Label(Rect(rightcorner - 20,y+25,160,40), ""+PlayerPrefs.GetInt("gem"), textStyle);
	
	// display formula name in the player GUI.
	var display = function(){
		var xOffset = 0;
		
		for(var c in DisplayFormula){
			GUI.Label(Rect(274+ xOffset, y+15, 200,150), c);
			xOffset+= 50;
		}
	
	};
	
	display();
	
	// button which when trigger will show a window displaying every formula currently available in the game.
	
	if(GUI.Button(Rect(5,5,40,40), Resources.Load("information") as Texture2D, buttonStyle)){
		DIsplayWindow = true;
	}
		
	if(GUI.Button(Rect(80,5,40,40), Resources.Load("home") as Texture2D, buttonStyle)){
		if(GameObject.Find("Player")){
			// use beautiful tranition settings.
			otherscript.setTransition("level1", "laboratoire");
		}
		else{
			// load the level without any transition.
			PlayerPrefs.DeleteKey("loadLevel"); 
			Application.LoadLevel("interface");
		}
	}
	
	if(GUI.Button(Rect(Screen.width - 70, 5, 50,50), Resources.Load("hamburger"), buttonStyle)){
		PlayerPrefs.DeleteKey("loadLevel"); 
		otherscript.setTransition("", "interface");
	}			
	
	// set texture of the button
	
	if(GUI.Button(Rect(150,5,40,40), Resources.Load(soundtexture) as Texture2D, buttonStyle)){
		if(soundtexture == "sound"){
			soundtexture = "nosound";
			PlayerPrefs.SetInt("Togglesound", 0);
		}
		else{
			soundtexture = "sound";
			PlayerPrefs.SetInt("Togglesound", 1);
		}
	}

	// setting the properties of the windows

	var size : Rect = Rect(0,0,400,500);

	if(DIsplayWindow){
		// add the windowsStyle after putting the content. 
		size = GUI.Window(0,size, windowContent, panelName, windowStyle);
	}
	
	
	// display life of the boss.
	

}

function windowContent(){
	
	if(GUI.Button(Rect(170,450,30,30), Resources.Load("Close") as Texture2D, buttonStyle)){
		DIsplayWindow = false;
	}
	else if(etat){
		if(GUI.Button(Rect(330,450,30,30), Resources.Load("backbutton") as Texture2D, buttonStyle)){
			etat = false;
			panelName = "Propriétées chimiques";
			heightW = 1200;
		}
	}
	else if(!etat){
		Debug.Log("ici");
		if(GUI.Button(Rect(330,450,30,30), Resources.Load("next") as Texture2D, buttonStyle)){
			etat = true;
			heightW = 800;
			panelName = "Sorts possibles";
		}
	}
	
	var offsetHeight : int = 0;

	var text = ["Gaz \nCette attaque vous infligera quelques dégâts mais ses dommages sont importants sur les ennemis ! \nCombinaison Z et R",
	"Feu \nCette attaque inflige des dégâts très importants!\nCombinaison A et D" ,
	"Fumée \nCette attaque inflige des dégâts de zone.\nCombinaison E et D", 
	"Savon \nCette formule vous permettra de glisser dessus et d'accroître temporairement votre vitesse pour se déplacer plus rapidement !\nCombinaison Q et F",
	"Fiole \nA court d'expériences chimiques et d'imagination? Foncez et lancez vos fioles avec C! Les dégâts sont minimes, attention..."];
	
	var formula = ["fiolegaz","fiolefeu","fiolefume","fiolesavon","fioleC"];
	
	var textMolecule = ["L’acide est un composé chimique qui est connu pour sa capacité à créer des réactions lorsqu’il est mélangé avec un autre composé.",
	"Le bicarbonate est une espèce amphotère, c’est-à-dire qu’il est à la fois basique et acide",
	"L’eau oxygénée est un liquide clair, légèrement plus visqueux que l’eau.",
	"Le glycérol est un liquide incolore et visqueux utilisé dans de nombreuses compositions pharmaceutiques.",
	"L’huile est un produit très souvent utilisé sous forme liquide et qui est reconnue pour ses capacités d’hydrophobe (qui ne se mélange pas à l’eau)",
	"Le liquide vaisselle est un produit qui possède des tensioactifs avec des propriétés notamment moussantes",
	"La soude est un composé chimique blanchâtre qui peut se trouver sous forme solide ou liquide.",
	"Le permanganate de potassium est un sel inorganique qui peut avoir des réactions violentes lorsqu’il est mélangé au glycérol."];
	
	var elementImg = ["fiole-acide","fiole-bicarbonate", "Fiole-eau-oxygenee", "Fiole-glycerol", "Fiole-huile", "Fiole-liquide-vaisselle", "Fiole-soude", "Fiole-permanganate"];

	var generateInfo = function(){
		for(i = 0; i < text.length; i++){
			GUI.DrawTexture(Rect(0,offsetHeight,40,40), Resources.Load(formula[i]) as Texture2D);
			GUI.Label(Rect(100,offsetHeight, 220, 100), text[i], customGuiStyle);
			offsetHeight += 150;
		}
	};
	
	var generateMoleculeInfo = function(){
		Debug.Log(textMolecule.Length);
		for(i = 0; i < textMolecule.length; i++){
			
			GUI.DrawTexture(Rect(0,offsetHeight,40,40), Resources.Load(elementImg[i]) as Texture2D);
			GUI.Label(Rect(100,offsetHeight, 220, 100), textMolecule[i], customGuiStyle);
			offsetHeight += 150;
			Debug.Log(textMolecule[i]);
		}
	};

	scrollPosition = GUI.BeginScrollView (Rect (0,50,390,370),scrollPosition, Rect (0, 0, 300, heightW));
		GUI.BeginGroup(Rect(5,5,325,1200));
			if(etat){
				generateInfo();
			}
			else{
				generateMoleculeInfo();
			}
		GUI.EndGroup();
	GUI.EndScrollView();
}

function Update(){
	if(!PlayerPrefs.GetInt("molGuide")){
		Debug.Log("here");
		PlayerPrefs.SetString("event", "molGuide");	
	}
	

}

