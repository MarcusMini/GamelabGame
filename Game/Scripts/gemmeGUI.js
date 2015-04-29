#pragma strict

// base par marc.

var timer : float;
var animationFrame : int;
var count : int;
var customGuiStyle : GUIStyle;
var buttonStyle : GUIStyle;
var gemmeStyle : GUIStyle;
var alertWindow : GUIStyle;
var i : int;
var texture : Texture2D;

var forcePos : int;
var vitessePos : int;
var visionPos : int;
var defensePos : int;

var x : float;
var y : float;
var texteAlert : String;
var levelUpSon : AudioClip;
var score : int;


function Start () {
	count = 1;
	x = Screen.width / 2;
	y = Screen.height / 2;
	//PlayerPrefs.DeleteAll();
	
	// mettre 15 lors de la publication du jeu
	if(!PlayerPrefs.GetInt("gem") && !PlayerPrefs.GetInt("buyGem")){
		PlayerPrefs.SetInt("gem",10);
		PlayerPrefs.SetInt("buyGem", 1);
	}
		
	texteAlert = "";
}
 
function OnGUI(){

	
	forcePos = PlayerPrefs.GetInt("force");
	vitessePos = PlayerPrefs.GetInt("vitesse");
	visionPos = PlayerPrefs.GetInt("vision");
	defensePos = PlayerPrefs.GetInt("defense");
	
	var EachFrame = PlayerPrefs.GetInt("EachFrame");
	var zoom = PlayerPrefs.GetInt("zoom");
	var height = Screen.height;
	var offsetHeight : int = 25;
	
	var bouton = ["defense", "force", "vision", "vitesse"];
	var background = ["defenseBcg", "forceBcg", "visionBcg", "vitesseBcg"];
	var molecule = ["forceMolecule", "visionMolecule", "vitesseMolecule", "defenseMolecule"];
	var bouton_hover = ["defense_hover", "force_hover", "vision_hover", "vitesse_hover"];
	var checkID = ["checkBleu", "check", "checkVert", "checkJaune"];
	
	// On appelle cette fonction quand on detecte une exception des evenements.
	
	var errorGUI = function(text : String){
		// si var ok = true on affiche la fenetre avec le texte qui est contenue dans la variable text
		var ok = PlayerPrefs.GetInt("ok");
		if(ok){
			GUI.DrawTexture(Rect(320,200,500,189), Resources.Load("guiAlambic") as Texture2D);
			GUI.Label(Rect(350,250,400,250), text, alertWindow);
			
			// si on appuie sur le bouton on ferme la fenetre
			if(GUI.Button(Rect(560,340,30,30), Resources.Load("CloseB") as Texture2D, customGuiStyle)){
				PlayerPrefs.SetInt("ok", 0);
			}
		}		
	};
	
	// chargement de la texture du bouton upgrade
	var boutonupgrade = Resources.Load("bouton") as Texture2D;
	
	// fonction qui est appeler à chaque frame, elle affiche la description de chaque caractéristiques, le prix et gère le bouton upgrade
	/*
		elle prend en entré une variable de type int ,c, qui correspond à l'index du bouton selectionner
		elle prend une variable de type string, ameliorationID, qui correspond à l'id de l'amélioration (vision, vitesse..)
		elle prend en entrée une variable ptyState, qui correspond à l'index des niveaux de compétence déja sélectionnées.
	*/
	var DisplayText = function(c : int, ameliorationID : String, ptyState : int){
	
			
			// On recupère le texte dans une variable valueLabel puis on affiche le texte avec GUI.Label
			var valueLabel = getLabelData(c, ameliorationID);
			GUI.Label(Rect(Screen.width - 250,220,230,200), valueLabel, customGuiStyle);
				
			// Si l index de l amelioration (bouton) est supérieur ou égale au nombre de upgrade déja réalise on affiche le bouton upgrade
			if(PlayerPrefs.GetInt(ameliorationID) <= c){
				// si on appuie sur le bouton upgrade
				if(GUI.Button(Rect(Screen.width - 200, 500, 120,70), boutonupgrade, customGuiStyle)){
					
					// Gère l'exception du "saute etape"
					if(c > ptyState++){
						PlayerPrefs.SetInt("ok", 1);
						texteAlert = "Vous devez améliorer les niveaux précédents avant de débloquer celui ci ";
					}
					
					/* Sinon, si on a assez d'argent on augmente l'index, passe la var step à 3 pour faire avancer le guide utilisateur
					   On lance l'animation de la mise a niveau et on set le nombre de gem, gem = nb de gem - prix	
					*/
					else if(PlayerPrefs.GetInt("gem") >= PlayerPrefs.GetInt("price")){
						var position : int = ptyState++;
						PlayerPrefs.SetInt("ptyState", position);
						PlayerPrefs.SetInt("setPosition", 1);
						PlayerPrefs.SetInt(ameliorationID, position);
						PlayerPrefs.SetInt("texteValue", PlayerPrefs.GetInt("texteValue") + 1);
						step(3);
						triggerAnim();
						GetComponent.<AudioSource>().PlayOneShot(levelUpSon);
						sendData(ameliorationID, ptyState);
						var money = PlayerPrefs.GetInt("gem") - PlayerPrefs.GetInt("price");
						PlayerPrefs.SetInt("gem", money);
					}
					// gère l'exception de ne pas avoir assez d'argent
					else{
						PlayerPrefs.SetInt("ok", 1);
						texteAlert = "Vous n'avez pas assez d'argent !";
					}	
				}
			}
	};
	
	// Cette fonction est appelé quand on a choisi une caractéristique à améliorer (vision), elle affiche un panneau et affiche les éléments à upgrade ou déja upgrade
	var createElement = function(loopX : int[], loopY : int[], level : int, idColor : int, ptyName : String){
		PlayerPrefs.SetString("ptyName", ptyName);
		for(var i : int = 0; i < loopX.length; i++){
				if(i < level){
					texture = Resources.Load(checkID[idColor]) as Texture2D;
				}
				else{
					texture = Resources.Load("checkBlanc") as Texture2D;
				}
			
			if(GUI.Button(Rect(loopX[i], loopY[i], 17,17), texture, buttonStyle)){
				PlayerPrefs.SetInt("texteValue", i);
				PlayerPrefs.SetInt("ptyState", level);
				step(2);
			}
		}
	};
	
	// fonction appelé quand on appuie sur le bouton défense
	var defense = function(){
		var positionDefenseX = [45,95,125,155,180,255];
		var positionDefenseY = [130,130,105,160,133,133];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[0]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[3]) as Texture2D);
			createElement(positionDefenseX, positionDefenseY, defensePos, 0, "defense");
		GUI.EndGroup();
	};
	
	// fonction appelé quand on appuie sur le bouton force
	var force = function(){
		var positionForceX = [45,95,145,195,225,255];
		var positionForceY = [133,133,133,133,105,133];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[1]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[0]) as Texture2D);
			createElement(positionForceX, positionForceY, forcePos, 1, "force");
		GUI.EndGroup();
	};
	
	// fonction appelé quand on appuie sur le bouton vision
	var vision = function(){
		var positionVisionX = [45,92,157,195,225,255];
		var positionVisionY = [137,165,107,133,133,107];
		
		// only use once
		PlayerPrefs.SetInt("texteValue", PlayerPrefs.GetInt("ameliorationID"));
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[2]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[1]) as Texture2D);
			createElement(positionVisionX, positionVisionY, visionPos, 2, "vision");
		GUI.EndGroup();
	};
	
	// fonction appelé quand on appuie sur le bouton vitesse
	var vitesse = function(){
		var positionVitesseX = [45,92,170,210,252,210];
		var positionVitesseY = [130,130,130,105,133,155];
		
		GUI.BeginGroup(Rect(Screen.width - 300,0,700,Screen.height), Resources.Load(background[3]) as Texture2D);
			GUI.DrawTexture(Rect(45,50,220,180), Resources.Load(molecule[2]) as Texture2D);
			createElement(positionVitesseX, positionVitesseY, vitessePos, 3, "vitesse");
		GUI.EndGroup();
	};
	
	// fonction appelé pour lancé les fonction d'amélioration (affiché l amelioration)
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
	
	
	// quand le zoom a été effectué
	if(zoom){
		GUI.DrawTexture(Rect(10,10,25,25), Resources.Load("reliqueBlack") as Texture2D); 
		GUI.Label(Rect(50,15,160,40), ""+PlayerPrefs.GetInt("gem"), gemmeStyle);
		
		// Creation d'un groupe
		GUI.BeginGroup(Rect(5,height / 5,147,height));
		
			// boucle qui créer des éléments dynamiquement.
			for(i = 0; i < bouton.length; i++){
				if(GUI.Button(Rect(5, offsetHeight, 70, 70), Resources.Load(bouton[i]) as Texture2D, customGuiStyle)){
					setID(i);
					PlayerPrefs.SetInt("tabvalue", i);
					PlayerPrefs.SetInt("EachFrame", 1);
					PlayerPrefs.SetInt("ptyState", 0);
					step(1);
				}
				// Gère les effets hover sur les boutons créer
				else if(Rect(5, -offsetHeight + 425, 70,70).Contains(Input.mousePosition)){
					GUI.Button(Rect(5,offsetHeight ,70,70), Resources.Load(bouton_hover[i]) as Texture2D, customGuiStyle);
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
		errorGUI(texteAlert);
		
	}
}

// set la var pour chaque etape du guide
function step(step : int){
	if(PlayerPrefs.GetInt("steps") < 4){
		PlayerPrefs.SetInt("steps", step);
	}
}

// fonction qui gère l'animation de l'upgrade
function triggerAnim(){
	var BasSprite = GameObject.Find("Bas");
	PlayerPrefs.SetInt("setPosition", 1);
	PlayerPrefs.SetInt("launchAnim", 1);
	var BasSpriteComponent = BasSprite.GetComponent(Animator);

		BasSpriteComponent.enabled = true;
		BasSpriteComponent.runtimeAnimatorController = Resources.Load("foo") as RuntimeAnimatorController;

		yield WaitForSeconds(5);
		
		BasSpriteComponent.runtimeAnimatorController = Resources.Load("Bas 2") as RuntimeAnimatorController;
		yield WaitForSeconds(0.1);
		BasSpriteComponent.enabled = false;
	PlayerPrefs.SetInt("setPosition", 0);
}

// fonction qui appelle la fonction inity du script textdata, elle renvoie un string. 
function getLabelData(index : int, skills : String){
	var valeur = this.gameObject.GetComponent(textData).init(index, skills);
	
	return valeur;
}

// fonction qui gère l'amélioration, à refaire si on aurait plus de temp.
function sendData(ameliorationID : String, niveau : int){
		var player2 = GameObject.Find("Player");
		var move = player2.GetComponent(move);
		var col = player2.GetComponent(playercol);
		var tel = GameObject.Find("teleporteur_level");
		var health = tel.GetComponent(DeleteKey);
	// améliorer ce code de maxime quand j'ai le temp....
	if(ameliorationID == "defense"){
	if(niveau == 0){
			health.health = 5.00;
			PlayerPrefs.SetFloat("Health", 5.00);
			PlayerPrefs.SetFloat("healthRestart", 5.00);
		}
	if(niveau == 1){
			PlayerPrefs.SetFloat("Health", 6.00);
			PlayerPrefs.SetFloat("healthRestart", 6.00);
			col.score = col.score + 1000;
		}
	if(niveau == 2){
			PlayerPrefs.SetFloat("Health", 7.00);
			PlayerPrefs.SetFloat("healthRestart", 7.00);
			col.score = col.score + 2000;
		}
	if(niveau == 3){
			PlayerPrefs.SetFloat("Health", 8.00);
			PlayerPrefs.SetFloat("healthRestart", 8.00);
			col.score = col.score + 2000;
		}
	if(niveau == 4){
			PlayerPrefs.SetFloat("Health", 9.00);
			PlayerPrefs.SetFloat("healthRestart", 9.00);
			col.score = col.score + 2000;
		}
	if(niveau == 5){
			PlayerPrefs.SetFloat("Health", 10.00);
			PlayerPrefs.SetFloat("healthRestart", 10.00);
			col.score = col.score + 2000;
		}
	if(niveau == 6){
			PlayerPrefs.SetFloat("Health", 15.00);
			PlayerPrefs.SetFloat("healthRestart", 15.00);
			col.score = col.score + 10000;
		}
		// defense
	}
	else if(ameliorationID == "force"){
	if(niveau == 0){
			PlayerPrefs.SetFloat("boostdegats",0);
		}
	if(niveau == 1){
			PlayerPrefs.SetFloat("boostdegats",0.5);
			col.score = col.score + 1000;
		}
	if(niveau == 2){
			PlayerPrefs.SetFloat("boostdegats",1.5);
			col.score = col.score + 2000;
		}
	if(niveau == 3){
			PlayerPrefs.SetFloat("boostdegats",2);
			col.score = col.score + 3000;
		}
	if(niveau == 4){
			PlayerPrefs.SetFloat("boostdegats",2.5);
			col.score = col.score + 4000;
		}
	if(niveau == 5){
			PlayerPrefs.SetFloat("boostdegats",3);
			col.score = col.score + 5000;
		}
	if(niveau == 6){
			PlayerPrefs.SetFloat("boostdegats",5);
			col.score = col.score + 10000;
		}
		// force
	}
	else if(ameliorationID == "vision"){
		if(niveau == 0){
			niveau = 0.5;
		}
			if(niveau == 1){
			col.score = col.score + 1000;
		}
	if(niveau == 2){
			col.score = col.score + 2000;
		}
	if(niveau == 3){
			col.score = col.score + 2000;
		}
	if(niveau == 4){
			col.score = col.score + 2000;
		}
	if(niveau == 5){
			col.score = col.score + 5000;
		}
	if(niveau == 6){
			col.score = col.score + 10000;
		}
		PlayerPrefs.SetInt("range", niveau*1.5);
		Debug.Log("niveau lumiere "+niveau*1.5);
		// vision
	}
	else{
	if(niveau == 0){
	PlayerPrefs.SetFloat("speedx",1);
	PlayerPrefs.SetFloat("speedy",1);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
		}
	if(niveau == 1){
	PlayerPrefs.SetFloat("speedx",1.2);
	PlayerPrefs.SetFloat("speedy",1.2);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			col.score = col.score + 1000;
		}
	if(niveau == 2){
	PlayerPrefs.SetFloat("speedx",1.4);
	PlayerPrefs.SetFloat("speedy",1.4);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			col.score = col.score + 2000;
		}
	if(niveau == 3){
	PlayerPrefs.SetFloat("speedx",1.6);
	PlayerPrefs.SetFloat("speedy",1.6);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			col.score = col.score + 2000;
		}
	if(niveau == 4){
	PlayerPrefs.SetFloat("speedx",1.8);
	PlayerPrefs.SetFloat("speedy",1.8);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			col.score = col.score + 2000;
		}
	if(niveau == 5){
	PlayerPrefs.SetFloat("speedx",2);
	PlayerPrefs.SetFloat("speedy",2);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			col.score = col.score + 5000;
		}
	if(niveau == 6){
	PlayerPrefs.SetFloat("speedx",2.5);
	PlayerPrefs.SetFloat("speedy",2.5);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			col.score = col.score + 10000;
		}
	}	
}

// fonction appeler chaque frame
function Update () {
	Debug.Log(PlayerPrefs.GetInt("steps"));
	Debug.Log("health "+PlayerPrefs.GetFloat("Health"));
	// elle controle le zoom de la camera
	
	
	var player4 = GameObject.Find("Player");
	var move2 = player4.GetComponent(move);
	var zoom = PlayerPrefs.GetInt("zoom");
	var camera = GameObject.FindWithTag("SecondCamera");
	
	// get le composant camera pour le modifier
	var currentZoom = camera.GetComponent(Camera).orthographicSize;
	
	// si le zoom a deja ete effectuer
	if(zoom){
		if(currentZoom > 0.67){
			timer += Time.deltaTime;
			camera.GetComponent(Camera).orthographicSize = Mathf.Lerp(1.9, 0.67, timer * 0.8);
			PlayerPrefs.SetInt("setPosition", 1);
			PlayerPrefs.SetInt("launchAnim", 0);
			move2.speed = Vector2(0,0);
		}
		else{
			timer = 0;
		}
		
		// remettre la camera a la place normale. Créer des effets étrange bug mineurs
		if(Input.GetKey(KeyCode.E)){
			PlayerPrefs.SetInt("launchAnim", 1);
			PlayerPrefs.SetInt("zoom", 0);
			PlayerPrefs.SetInt("activationSpike", 1);
			PlayerPrefs.SetInt("setPosition", 0);
			PlayerPrefs.SetInt("EachFrame", 0);
			move2.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			
			if(PlayerPrefs.GetInt("steps") >= 3){
				PlayerPrefs.SetInt("steps", 4);
			}
			else{
				PlayerPrefs.SetInt("steps", 0);
			}
		}
	}
	else{
		// retourner a la position de début.
		if(currentZoom < 1.9){
			timer += Time.deltaTime;
			camera.GetComponent(Camera).orthographicSize = Mathf.Lerp(0.67, 1.9, timer * 0.8);
		}
		else{
			timer = 0;
		}
	}
	
	
	Debug.Log(PlayerPrefs.GetInt("ameliorationID"));
	
}

