#pragma strict

var showGui : boolean;
var customGUILabel : GUIStyle;
var alertWindow : GUIStyle;
var otherGUI : GUIStyle;

var widthd : float = Screen.width / 2;
var heightd : float = Screen.height / 2;
var customButton : GUIStyle;
var guideStyle : GUIStyle;
var toset;


// event permet de définir le type d'évènement a afficher.
var event : String;
var prefabToInstantiate : Transform;
var collObject : GameObject;
var guidebutton : boolean;

var pass : boolean;
var passing : boolean;
var grotteDanger : AudioClip;
var playSound : boolean;

// machine à gemme
private var LearnText = ["Bonjour ! Aujourd'hui tu vas apprendre à améliorer les compétences de Spike ! \nPremièrement, cliques sur le bouton indiqué par le repère numéro 1",
				"Un panneau apparaît! Choisis la première compétence à améliorer",
				"En dessous, il y a une description de l’amélioration. Cliques sur le bouton 'Upgrade' quand tu as fais ton choix. ",
				"Félicitations ! Tu as amélioré les compétences de Spike ! \n\nAppuies sur la touche E pour quitter !"];
				
var StepsButton = ["1","2","3","4"];
private var StepButtonX = [50,Screen.width / 1.5 - 10,Screen.width / 1.51 , Screen.width / 1.42];
private var StepButtonY = [Screen.height / 5 + 120,Screen.height / 5 + 2, Screen.height / 2,Screen.height / 1.17];

// alambic...

private var learnAlambic = ["Salut ! Aujourd'hui tu vas apprendre a creer de nouvelles formules. Un element a été deja selectionne, c'est l'eau oxygenee, Appuies sur le bouton 1 pour continuer.",
							"Magnifique, voici le tableau d'information, ils te permet d'avoir toutes les informations en rapport avec l'element choisi. Appuies sur le bouton 2.",
							"En cliquant sur l'un des éléments à droite tu vas pouvoir ajouter un element chimique à ton experience. Appuies sur le bouton 3.",
							"Bravo ! Tu as réussi a creer une nouvelle attaque! Appuies sur E pour quitter l'alambic"];
							
private var StepsButtonA = ["1a","2a","3a",""];
private var StepButtonX2 : float[] = [widthd-125, 10, widthd + 215,0];
private var StepButtonY2 : float[] = [heightd-100 ,218, heightd-60,0];

private var start = ["1v","2v"];
private var bouton = ["1b", "2b"];


var intro : boolean;


function Start (){
	playSound = true;
	showGui = false;
	intro = false;
	guidebutton = false;
	pass = true;	
	
	if(Application.loadedLevelName == "laboratoire"){
		if(!PlayerPrefs.GetInt("set")){
			showGui = true;
			event = "start";
		}
	}
	passing = false;
}

function OnCollisionEnter2D(object : Collision2D){
	if(!GameObject.Find("Ennemi_Right") && Application.loadedLevelName != "laboratoire"){
		if(object.gameObject.name == "protection"){
			if(Application.loadedLevelName == "boss"){
				if(!GameObject.Find("Boss")){
					showGui = true;
					event = "grotte";
					collObject = object.gameObject;
					pass = false;		
				}
			}
			else{
				showGui = true;
				event = "grotte";
				collObject = object.gameObject;
				pass = false;
			}
			
		}
	}
	else if(Application.loadedLevelName == "laboratoire"){
			Debug.Log("here");
			 if(PlayerPrefs.GetInt("zoom")){
			 	Debug.Log("la");
			 	setAction(true, "learnGemme");
			 }
			 else if(object.gameObject.name == "cuve"){
			 	if(PlayerPrefs.GetInt("stepsA") < 4){
			 		setAction(true, "learnAlambic");
			 	}
			 else{
			 		guidebutton = false;
			 		setAction(true, "learnAlambic");
			 }
		 }
	}
}

function setAction(showActive : boolean, evennement : String){
	event = evennement;
	showGui = showActive;
}

function OnGUI(){
	var x = Screen.width;
	var y = Screen.height / 2;
	
	var popup = function(wX : float, wY : float, width : int, height : int, background : String, text : String, wX2 : float, wY2 : float){
		GUI.Label(Rect(wX,wY,width,height), Resources.Load(background) as Texture2D);
		GUI.Label(Rect(wX,wY,width-50,height), text, customGUILabel);
	};
	
	
	if(intro){
		popup(x-200,y,300,300,"popupoverlay","Prends la gemme !", x-175, y+30);
	}
	
	var learnGemme = function(LearnText : String[], Step : int, StepsButton : String[], StepsButtonX : float[], StepsButtonY : float[]){
		if(event == "learnGemme"){
			if(Step < 4){
				GUI.Label(Rect(Screen.width / 3, 0, 400,100), LearnText[Step], otherGUI);
				GUI.depth = 0;
				GUI.DrawTexture(Rect(StepsButtonX[Step], StepsButtonY[Step], 182,40), Resources.Load(StepsButton[Step]) as Texture2D);
			}
			else{
				popup(x/2 - 160,-5,330,300,"popupoverlay","Bienvenue dans la machine à gemmes ! \n\nAppuies sur E pour quitter.", x-175, y+30);
			}
		}
		else{
			if(Step < 4){
				GUI.Label(Rect(Screen.width / 3, 0, 400,100), LearnText[Step], otherGUI);
				GUI.depth = 0;
				
				if(GUI.Button(Rect(StepsButtonX[Step], StepsButtonY[Step], 378,140), Resources.Load(StepsButton[Step]) as Texture2D, guideStyle)){
					Step = Step + 1;
					PlayerPrefs.SetInt("stepsA", Step);	
					Debug.Log(Step);
					if(Step == 3){
						if(PlayerPrefs.GetInt("mustPass") == 1){
							PlayerPrefs.SetInt("mustPass", 2);
						}   
						guidebutton = true;
						PlayerPrefs.SetInt("guida",1);
					}
					else{
						guidebutton = false;
					}
				}
			}
			else{
				popup(x/2 - 100,-5,300,300,"popupoverlay","Bienvenue dans l'alambic. Appuies sur E pour quitter.", x-175, y+30);
				GUI.depth = -1;
				guidebutton = false;
			}
		}
	};

	var startGUI = function(text : String, texture : String, id: int, posX : int, posY : int, width : int, height : int){
		var ok = 1;
		if(ok){
			GUI.DrawTexture(Rect(360,150,600,300), Resources.Load("popupoverlay") as Texture2D);
			GUI.Label(Rect(370,170,580,250), text, alertWindow);
			GUI.DrawTexture(Rect(posX,posY,width,height), Resources.Load(texture));
			
			if(GUI.Button(Rect(640,400,30,30), Resources.Load("CloseB") as Texture2D, alertWindow) || Input.GetKey(KeyCode.X)){
				ok = 0;
				PlayerPrefs.SetInt("set", id);
				if(id == 5){
					passing = true;
				}
				if(Application.loadedLevelName == "level1"){	
					PlayerPrefs.SetInt("molGuide", 1);
				}
			}
		}		
	};

	var launchPad = function(){
			var player3 = GameObject.Find("Player");
			var move2 = player3.GetComponent(move);
			
			move2.speed = Vector2(0,0);
		var seted = PlayerPrefs.GetInt("set");
		if(!seted){
			//popup(x/3,-5,500,200,"popupoverlay","", x-175, y+30);
			startGUI("Bienvenue, nouveau chimiste! Ton frère est en danger. Tu vas devoir déjouer les pièges dressés par les ennemis pour arriver à le sauver! \nRécolte les gemmes et le mercure pour t'améliorer, mais attention aux invocateurs et aux guerriers qui t'empêcheront de progresser...", "spikemal", 1, 625,280,50,93);
		}
		else if(seted == 1){
			popup(x-300,y,300,300,"popupoverlay","Bienvenue dans le laboratoire, cliquez sur les boutons rouges pour découvrir ces machines!", x-175, y+30);
		}
		
		else if(seted == 2){
			popup(x-300,y,300,300,"popupoverlay","Ceci est la machine à gemmes. Elle permet d'améliorer tes compétences.", x-175, y+30);
		}
		else if(seted == 3){
			popup(x-300,y,300,300,"popupoverlay","Voici l'alambic, il permet de créer de nouvelles formules !\n\nAppuie sur E pour fermer", x-175, y+30);	
		}
		else if(seted == 4){
			startGUI("Tu peux te défendre en appuyant sur C, c'est ta première attaque! Pour le reste, fais preuve de persévérance et créé de nouvelles attaques... Lance les en combinant les éléments avec contours de même couleurs!", "c_barre", 5, 625,280,50,93);
		}
		else if(seted == 5){
			popup(x/2.5,-5,300,300,"popupoverlay","Bienvenue dans le laboratoire Mr Spike. \n\nAppuie sur E pour fermer ", x-175, y+30);
		}
		
		if(seted && seted < 4){
			if(GUI.Button(Rect(x/2.6,125,40,40), Resources.Load("checkS") as Texture2D, customButton )){
				PlayerPrefs.SetInt("set", 2);		
			}
			else if(GUI.Button(Rect(x/1.725,125,40,40), Resources.Load("checkS") as Texture2D, customButton)){
				PlayerPrefs.SetInt("set", 3);				
			}
		}
	
		
	};
	
	
	if(!GameObject.Find("Ennemi_Right")){ 
		if(showGui){
			Debug.Log("evennement gui"+event);
			switch (event){
				case "grotte":
					intro = false;
					popup(x-300,y,300,300,"popupoverlay","Appuies sur la touche T du clavier pour prendre la gemme", x-175, y+30);
					PlayerPrefs.SetInt("activationSpike", 2);
				break;
				case "back":
					popup(x-300,y,300,300,"popupoverlay","Appuie sur X pour fermer", x-175, y+30);
				break;
				case "learnGemme":
					learnGemme(LearnText,PlayerPrefs.GetInt("steps"), StepsButton, StepButtonX, StepButtonY);
				break;
				case "learnAlambic":
					learnGemme(learnAlambic,PlayerPrefs.GetInt("stepsA"), StepsButtonA, StepButtonX2, StepButtonY2);
				break;
				case "earthquake":
					popup(x-300,y,300,300,"popupoverlay","Attention, c'est un tremblement de terre !!", x-175, y+30);
				break;
				case "geyser":
					popup(x-300,y,300,300,"popupoverlay","Un geyser !! \n\nAppuies sur E pour fermer la fenêtre", x-175, y+30);
				break;
				case "sortir":
					popup(x-300,y,300,300,"popupoverlay","Sors d'ici !! Vite, c'est dangereux!!", x-175, y+30);
				break;
				case "gem":
					popup(x-300,y,300,300,"popupoverlay","Prends la gemme!", x-175, y+30);
				break;
				case "start":
					launchPad();
				break;
				case "mercure":
					popup(x-300,y,300,300,"popupoverlay","Voici un échantillon de Mercure, une monnaie à utiliser dans l'alambic. Appuies sur E pour fermer cette fenêtre.", x-175, y+30);
				break;
				case "barriere":
					popup(x-300,y,300,300,"popupoverlay","La barrière a disparue, vous pouvez passer! \n\nAppuies sur E pour fermer.", x-175, y+30);
				break;
				case "end":
					popup(x-300,y,300,300,"popupoverlay","Une aura magique envahit Spike... Il se sent plus rapide ! \n\nAppuies sur E pour fermer.", x-175, y+30);
				break;
				case "error":
					startGUI("C'est trop dangereux ! tu dois d'abord te rendre dans la machine à gemmes et dans l'alambic. !", "warning", 5, 625,280,50,93);
				break;
			}
			
		}
	}
	else if(event == "mercure"){
		popup(x-300,y,300,300,"popupoverlay","Voici un échantillon de Mercure, une monnaie à utiliser dans l'alambic. Appuies sur E pour fermer cette fenêtre.", x-175, y+30);
	}
	else if(event == "barriere"){
		popup(x-300,y,300,300,"popupoverlay","La barrière a disparue, vous pouvez passer! \n\n Appuies sur E pour fermer.", x-175, y+30);
	}
	else if(event == "molGuide"){
		startGUI("Ca y est, ton aventure commence vraiment! Tu vas bientôt rencontrer un ennemi! Utilise la fumée pour le vaincre! Appuies sur E et D en même temps !", "learnMom", 5, 525,230,260,160);
	}
}

function pickObject(){
	
	if(GameObject.Find("protection")){
		Instantiate(prefabToInstantiate, collObject.transform.position, Quaternion.identity);
		Destroy(collObject);
	
		if(Application.loadedLevelName == "boss"){
			yield WaitForSeconds(2);
			PlayerPrefs.SetString("event", "");
			var player = GameObject.Find("Player").GetComponent(playercol);
			player.setTransition("boss", "ending");
			toset = PlayerPrefs.GetInt("gem") + 6;
			PlayerPrefs.SetInt("gem", toset);
		}
		else{
			toset = PlayerPrefs.GetInt("gem") + 3;
			PlayerPrefs.SetInt("gem", toset);
		}
	}
}

function control(){
			var player4 = GameObject.Find("Player");
			var move3 = player4.GetComponent(move);
	if(showGui){
		if(Input.GetKey(KeyCode.T)){
			if(Application.loadedLevelName == "level1_d_grotte" || Application.loadedLevelName == "level1_gauche_grotte"){
				pickObject();
				if(playSound){
					audio.PlayOneShot(grotteDanger);
					playSound = false;
				}
				event = "back";
				var particleObj = GameObject.FindWithTag("Particle");
				particleObj.GetComponent(ParticleSystem).enableEmission = true;
				
				
				if(Application.loadedLevelName == "level1_d_grotte"){
					PlayerPrefs.SetInt("setAnimation", 1);
				}
				else if(Application.loadedLevelName == "level1_gauche_grotte"){
					PlayerPrefs.SetInt("afterGrotte", 1);
				}
			}
			else if(Application.loadedLevelName == "boss"){
				pickObject();
			}
		}
		else if(Input.GetKey(KeyCode.X)){
			if(Application.loadedLevelName != "laboratoire" ){
				event = "sortir";
			}	
		}
		else if(Input.GetKey(KeyCode.E) || passing){
			if(event != "learnAlambic"){
				Debug.Log("set "+PlayerPrefs.GetInt("set"));
				if(PlayerPrefs.GetInt("set") < 4){
						PlayerPrefs.SetInt("set", 4);
				}
				else if(PlayerPrefs.GetInt("set") == 5){
					Debug.Log("here");
					PlayerPrefs.SetString("event", "");
					setAction(false, "");
					passing = false;
					if(Application.loadedLevelName != "boss"){
						move3.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
					}
				}
			}
			else if(event == "learnAlambic"){
				setAction(false, "");
			}
		}
		else if(!PlayerPrefs.GetString("event") && Application.loadedLevelName == "level1_d" ){
			event = "";
		}	
	}
	else{
		if(PlayerPrefs.GetString("event")){
			setAction(true,PlayerPrefs.GetString("event"));
		}
	}
}

function Update () {
	control();
	if(!GameObject.Find("Ennemi_Right") && !event){
		if(Application.loadedLevelName == "level1_d_grotte" || Application.loadedLevelName == "level1_gauche_grotte"){
			intro = true;
		}
	}	

}

