#pragma strict


public var health : float;
public var score : int;
public var money : int;
public var fadeInactivate : boolean;
public var position;
var randomNumber : int;
var downstair : float;
var healthSon : AudioClip;
var moneySon : AudioClip;
var hurtSon : AudioClip;
var mortSound : AudioClip;


function Start(){
	if(PlayerPrefs.GetInt("stepsA") < 4){
		PlayerPrefs.SetInt("Mercure", 100);
		money = 100;
	}
	else{
		money = PlayerPrefs.GetInt("Mercure");
	}
	fadeInactivate = false;
	
	if (PlayerPrefs.GetFloat("Health")){
		health = PlayerPrefs.GetFloat("Health");
	}
	else{
		PlayerPrefs.SetFloat("Health",5);
		health = 5;
	}
	if(PlayerPrefs.GetInt("Score")){
		score = PlayerPrefs.GetInt("Score");
	}
		
	var lastsceneload = PlayerPrefs.GetString("loadLevel");
	fadeInactivate = false;
		
	switch (lastsceneload){
		case "laboratoire" :
			transform.position = Vector3(-5.682, 5.506, 4.463);
		break;
		case "level1":
			if(Application.loadedLevelName == "Level1_c"){
				transform.position = Vector3(0.035, 1.732, 2.45);
			}
			else{
				if(PlayerPrefs.GetInt("set") == 4){
					transform.position = Vector3(-4.6, -0.1, 4);
				}
				else{
					transform.position = Vector3(-4.4, 0, 4);
				}
			}
		break;
		case "level1_c":
			if(Application.loadedLevelName == "level1_d"){
				transform.position = Vector3(-4.893, -2.32, 2.57);
			}
			else if(Application.loadedLevelName == "level1"){
				transform.position = Vector3(1.686393, -0.674112, 4.463);
			}
			else if(Application.loadedLevelName == "level1 gauche"){
				transform.position = Vector3(2.05, -1.39, 3.78);
			} 
		break;
		case "level1_d" :
			if(Application.loadedLevelName == "level1_d_grotte"){
				transform.position = Vector3(-2.49, -1.69, 0);
			}
			else{
				transform.position = Vector3(1.83, 0.12, 2.45);
			}
			
		break;
		case "level1_d_grotte":
			transform.position = Vector3(2.358721, -2.379415, 2.57);
		break;
		case "level1 gauche":
			if(Application.loadedLevelName == "level1_gauche_grotte"){
				transform.position = Vector3(-0.96, 1.49, -9);
			}
			else{
				transform.position = Vector3(-1.89, 0.12, 2.45);
			}
		break;
		case "level1_gauche_grote":
			transform.position = Vector3(-12.74, 2.59,3.78);
		break;
	}
	
	Tracer(false);
	
}

function OnCollisionEnter2D(col : Collision2D){
	// ajouter les autres monstres...
	if(col.gameObject.name == 'Ennemi_Left' || col.gameObject.name == 'Ennemi_Right'){
		health--;
		audio.PlayOneShot(hurtSon);
		Blink();
	}
	else if(col.gameObject.name == "cuve"){
		PlayerPrefs.SetInt("active", 1);
		var anim = GameObject.Find("cuve");
		anim.GetComponent(Animator).enabled = true;
		anim.GetComponent(Animator).speed =1;
	}
	else if(col.gameObject.name == "gemSphere"){
		PlayerPrefs.SetInt("zoom", 1);
		fadeInactivate = true;
		if(!PlayerPrefs.GetInt("mustPass")){
			PlayerPrefs.SetInt("mustPass", 1);
		}
	}
	else if(col.gameObject.name == 'Boss'){
		health = health - 0.1;
		audio.PlayOneShot(hurtSon);
	}

	else if(col.gameObject.name == "echellegrotte(Clone)"){
		setTransition("level1_gauche_grote","level1 gauche");
		if(GameObject.FindWithTag("EmptyGem")){
			PlayerPrefs.SetInt("afterGrotte", 1);
		}
	}
}


function OnTriggerStay2D(coll : Collider2D){
var player3 = GameObject.Find("Player");
var move2 = player3.GetComponent(move);
	switch (coll.gameObject.name){
		case "ChauveSouris" :
		case "feu_0": 
			health -= 0.01;
		break;
}

	if(coll.gameObject.name == "testRemplissage"){
		Tracer(true);
	}
}

function OnTriggerEnter2D(coll : Collider2D){
var player2 = GameObject.Find("Player");
var move = player2.GetComponent(move);

	position = move.pos;

	downstair += Time.deltaTime * 0.1;
	
	if(coll.gameObject.name != "Chemin" && coll.gameObject.name && "Coeur plein(Clone)" && coll.gameObject.name != "Pièce Mercure(Clone)" && coll.gameObject
	.name != "teleporteur_level"){

		 var lightscript = GameObject.Find("Directional light");
		 // get the value
		 var timer = lightscript.GetComponent(lightScript).timer2;
		 var x = lightscript.GetComponent(lightScript).x;
		 var intensity = lightscript.GetComponent(lightScript).intensity;
				 
		 PlayerPrefs.SetInt("timer", timer);
		 PlayerPrefs.SetInt("intensité", intensity);
		 PlayerPrefsX.SetBool("xvalue", x);
	}
	switch (coll.gameObject.name){
		case "Gaz(Clone)" :
			health = health -1;
		break;
		case "Coeur plein(Clone)" :
			health = health + 0.5;
			Destroy(coll.gameObject);
			audio.PlayOneShot(healthSon);
		break;
		case "Pièce Mercure(Clone)" :
		randomNumber = Random.Range(10,25);
			money = money + randomNumber;
			score = score + randomNumber;
			Destroy(coll.gameObject);
			audio.PlayOneShot(moneySon);
			
			if(!PlayerPrefs.GetInt("pass")){
				PlayerPrefs.SetString("event", "mercure");
				Debug.Log(PlayerPrefs.GetString("event"));
				PlayerPrefs.SetInt("pass", 1);
			}
		break;
		case "teleporteur_lab" :
			move.speed = Vector2(0, 0);
			fadeInactivate = true;
			yield WaitForSeconds(2);
			setTransition("level1", "laboratoire");
		break;
		case "teleporteur_level":
			if(PlayerPrefs.GetInt("mustPass") == 2){
				move.speed = Vector2(0, 0);
				fadeInactivate = true;
				yield WaitForSeconds(2);
				setTransition("laboratoire", "Level1");
				move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			}
			else{
				PlayerPrefs.SetString("event", "error");
			}
		break;
		case "SavonHaut(Clone)" :
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx")*3,PlayerPrefs.GetFloat("speedy")*3);
			move.force = 0;
			yield WaitForSeconds(0.3);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			move.force = 1;
			score = score + 5;
		break;
		case "SavonDroite(Clone)" :
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx")*3,PlayerPrefs.GetFloat("speedy")*3);
			move.force = 0;
			yield WaitForSeconds(0.3);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			move.force = 1;
			score = score + 5;
		break;
		case "SavonGauche(Clone)" :
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx")*3,PlayerPrefs.GetFloat("speedy")*3);
			move.force = 0;
			yield WaitForSeconds(0.3);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			move.force = 1;
			score = score + 5;
		break;
		case "SavonBas(Clone)" :
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx")*3,PlayerPrefs.GetFloat("speedy")*3);
			move.force = 0;
			yield WaitForSeconds(0.3);
			move.speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			move.force = 1;
			score = score + 5;
		break;
		case "ChauveSouris" : 
			Blink();
		break;
		case "gradientTop":
			setTransition("level1_c", "Level1");
		break;
		case "gradient" :
			setTransition("level1", "Level1_c");
		break;
		case "gradientD":
			setTransition("level1_d", "Level1_c");
		break;
		case "gradientLeft":
			setTransition("level1_c", "level1 gauche");
			
			// don't display the barriere disapear when we enter to this scene
			PlayerPrefs.SetString("event", "");
		break;
		case "gradientRight":
			setTransition("level1_c", "Level1_d");
		break;
		case "gradientBas":
			setTransition("level1_c", "boss");
		break;
		case "gradientGR(Clone)":
			setTransition("level1_d", "Level1_d_grotte");
		break;
		case "gradientGG(Clone)":
			setTransition("level1_d_grotte", "level1_d");
			if(GameObject.FindWithTag("EmptyGem")){
				PlayerPrefs.SetInt("setAnimation", 1);
				PlayerPrefs.SetInt("finalS", 1);
			}
		break;
		case "gradientLG":
			setTransition("level1 gauche", "Level1_c");
		break;
		case "trou_gauche":
			setTransition("level1 gauche", "level1_gauche_grotte");
			PlayerPrefs.SetString("event", "");
			
		break;
		case "Chemin" :
			if(position == 0 || position == 3){
				transform.position.x += 0.02;
			}	
			else{
				transform.position.y += 0.02;
			}
		break;
		case "red_layer":
			if(position == 1){
				transform.position.y += 0.02;
			}
			else if(position == 2){
				transform.position.y -= 0.02;
			}
		break;

	}

  }


function OnTriggerExit2D(objet : Collider2D){

	var player = GameObject.Find("Player");
	position = player.GetComponent(move).pos;

	if(objet.gameObject.name == "Chemin"){
		if(position == 0 || position == 3){
			transform.position.x -= 0.02;
		}
		else{
			transform.position.y -= 0.02;	
		}
	}
	else if(objet.gameObject.name == "testRemplissage"){
		Tracer(false);
	}
}

function setTransition(oldScene : String, NewSceneLoad : String){
	fadeInactivate = true;
	yield WaitForSeconds(2);
	PlayerPrefs.SetString("loadLevel", oldScene);
	Application.LoadLevel(NewSceneLoad);
}

function Tracer(activation : boolean){
	var tracer = GameObject.Find("trail");
	var place = GameObject.Find("testRemplissage");
	
	if(tracer){
		var show : boolean = place.GetComponent(SpriteRenderer).enabled;	
		if(activation){
			if(show){
				tracer.GetComponent(TrailRenderer).enabled = true;
			}
			else{ 
				tracer.GetComponent(TrailRenderer).enabled = false;
			}
		}
		else{
			tracer.GetComponent(TrailRenderer).enabled = false;
		}
	}
	
}


function Blink(){

	 var hautrouge = GameObject.Find("hautrouge");
	var basrouge = GameObject.Find("basrouge");
	 var droiterouge = GameObject.Find("droiterouge");
	var gaucherouge = GameObject.Find("gaucherouge");
	var haut = GameObject.Find("Haut");
		var bas = GameObject.Find("Bas");
		var droite = GameObject.Find("Droite");
		var gauche = GameObject.Find("Gauche");
var scriptMove = gameObject.GetComponent(move);
if (haut.renderer.enabled == true){
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
		scriptMove.canAnim = false;
	
	hautrouge.renderer.enabled = true;
	yield WaitForSeconds(0.2);
	haut.renderer.enabled = true;
	hautrouge.renderer.enabled = false;
	scriptMove.canAnim = true;
	}
if (gauche.renderer.enabled == true){
scriptMove.canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
	
	gaucherouge.renderer.enabled = true;
	yield WaitForSeconds(0.2);
	gauche.renderer.enabled = true;
	gaucherouge.renderer.enabled = false;
scriptMove.canAnim = true;
	}	
if (droite.renderer.enabled == true){
scriptMove.canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
	
	droiterouge.renderer.enabled = true;
	yield WaitForSeconds(0.2);
	droiterouge.renderer.enabled = false;
	droite.renderer.enabled = true;
	scriptMove.canAnim = true;
	}
if (bas.renderer.enabled == true){
scriptMove.canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
	
	basrouge.renderer.enabled = true;
	yield WaitForSeconds(0.2);
	basrouge.renderer.enabled = false;
	bas.renderer.enabled = true;
scriptMove.canAnim = true;
	}
}


function Update(){
	if(health > PlayerPrefs.GetFloat("HealthRestart")){
		PlayerPrefs.SetFloat("Health", PlayerPrefs.GetFloat("HealthRestart"));
	}
	if(health <= 0){
		audio.PlayOneShot(mortSound);
		Destroy(this.gameObject);
	}
		    
		    PlayerPrefs.SetInt("Mercure",money);
			EnemyDead();
	if(Input.GetKey(KeyCode.E)){
		fadeInactivate = false;
		PlayerPrefs.SetInt("fading", 1);
	}
	
	Debug.Log("score "+score);
	Debug.Log("health de playerprefs "+PlayerPrefs.GetFloat("Health"));
	PlayerPrefs.SetFloat("Health", health);
	PlayerPrefs.SetInt("Score", score);
	
	Debug.Log("must "+PlayerPrefs.GetInt("mustPass"));
}

function EnemyDead(){
var AmeEnemiHaut = gameObject.Find("Ennemihautrouge(Clone)");
var AmeEnemiDroite = gameObject.Find("Ennemidroiterouge(Clone)");
var AmeEnemiBas = gameObject.Find("Ennemibasrouge(Clone)");
var AmeEnemiGauche = gameObject.Find("Ennemigaucherouge(Clone)");
if (AmeEnemiHaut != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiHaut);
}
if (AmeEnemiGauche != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiGauche);
}
if (AmeEnemiDroite != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiDroite);
}
if (AmeEnemiBas != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiBas);
}
var AmeEnemiHautInvoc = gameObject.Find("invocateurhautrouge(Clone)");
var AmeEnemiDroiteInvoc = gameObject.Find("invocateurdroiterouge(Clone)");
var AmeEnemiBasInvoc = gameObject.Find("invocateurbasrouge(Clone)");
var AmeEnemiGaucheInvoc = gameObject.Find("invocateurdroiterougete(Clone)");
if (AmeEnemiHautInvoc != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiHautInvoc);
}

if (AmeEnemiGaucheInvoc != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiGaucheInvoc);
}
if (AmeEnemiDroiteInvoc != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiDroiteInvoc);
}
if (AmeEnemiBasInvoc != null){
yield WaitForSeconds(0.2);
Destroy(AmeEnemiBasInvoc);
}
}