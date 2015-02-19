#pragma strict

public var health : float; 
public var money : int;
public var fadeInactivate : boolean;
public var position;
var vector;
var downstair : float;

function Start(){
	
	//PlayerPrefs.DeleteAll();
	var lastsceneload = PlayerPrefs.GetString("loadLevel");
//	Debug.Log(lastsceneload);
	health = 5.0;
	money = 0;
	fadeInactivate = false;
		
	switch (lastsceneload){
		case "laboratoire" :
			transform.position = Vector3(-4.46, 5.66, 2.45);
		break;
		case "level1":
			if(Application.loadedLevelName == "Level1_c"){
				transform.position = Vector3(0.035, 1.732, 2.45);
			}
			else{
				transform.position = Vector3(-2.43, -0.57, 0);
			}
		break;
		case "level1_c":
			if(Application.loadedLevelName == "level1_d"){
				transform.position = Vector3(-3.68, -2.32, 2.45);
			}
			else if(Application.loadedLevelName == "level1"){
				transform.position = Vector3(1.686393, -0.674112, 2.45);
			}
			else if(Application.loadedLevelName == "level1 gauche"){
				transform.position = Vector3(2.05, -1.39, -1.57);
			} 
		break;
		case "level1_d" :
			if(Application.loadedLevelName == "level1_d_grotte"){
				transform.position = Vector3(-2.561137, -1.164694, 0);
			}
			transform.position = Vector3(1.83, 0.12, 2.45);
		break;
		case "level1_d_grotte":
//			Debug.Log("pass here");
			transform.position = Vector3(2.358721, -2.379415, 0);
		break;
		case "level1 gauche":
			if(Application.loadedLevelName == "level1_gauche_grotte"){
				transform.position = Vector3(-0.925, 1.783, 2.45);
			}
			else{
				transform.position = Vector3(-1.89, 0.12, 2.45);
			}
		break;
		case "level1_gauche_grote":
			transform.position = Vector3(-12.74, 2.59,-1.57);
		break;
	}
	
	Tracer(false);
}

function OnCollisionEnter2D(col : Collision2D){
	var player = GameObject.Find("Player");

	if(col.gameObject.name == 'Ennemi_Left' || col.gameObject.name == 'Ennemi_Right'){
		health--;
		player.GetComponent(move).blink();
	}
	else if(col.gameObject.name == "cuve"){
		PlayerPrefs.SetInt("active", 1);
		var anim = GameObject.Find("cuve");
		anim.GetComponent(Animator).enabled = true;
		anim.GetComponent(Animator).speed =1 ;
	}
	else if(col.gameObject.name == "echellegrotte"){
		setTransition("level1_gauche_grote","level1 gauche");
		PlayerPrefs.SetInt("Barriere", 0);
		
		if(GameObject.FindWithTag("EmptyGem")){
			PlayerPrefs.SetInt("afterGrotte", 1);
		}
	}
	else if(col.gameObject.name == "gemSphere"){
		PlayerPrefs.SetInt("zoom", 1);
	}
}

function OnTriggerEnter2D(coll : Collider2D){
	var player = GameObject.Find("Player");
	position = player.GetComponent(move).pos;

	downstair += Time.deltaTime * 0.1;
	
	if(coll.gameObject.name != "Chemin" && coll.gameObject.name && "Coeur plein(Clone)" && coll.gameObject.name != "Pièce Mercure(Clone)" && coll.gameObject
	.name != "teleporteur_level"){
//		 Debug.Log("ha");
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
		
		case "ChauveSouris":
			health -= 1;
		break;
		case "Coeur plein(Clone)" :
			health += 0.5;
			Destroy(coll.gameObject);
		break;
		case "Pièce Mercure(Clone)" :
			money += 10;
			Destroy(coll.gameObject);
		break;
		case "teleporteur_lab" :
			setTransition("level1", "laboratoire");
		break;
		case "gradientTop":
			setTransition("level1_c", "Level1");
		break;
		case "teleporteur_level":
			setTransition("laboratoire", "Level1");
		break;
		case "gradient" :
			setTransition("level1", "Level1_c");
		break;
		case "gradientD":
			setTransition("level1_d", "Level1_c");
		break;
		case "gradientLeft":
			setTransition("level1_c", "level1 gauche");
		break;
		case "gradientRight":
			setTransition("level1_c", "Level1_d");
		break;
		case "gradientGR(Clone)":
			setTransition("level1_d", "Level1_d_grotte");
		break;
		case "gradientGG":
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
		/*case "testRemplissage":
			Tracer(true);
		break;*/
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

function OnTriggerStay2D(object : Collider2D){
	if(object.gameObject.name == "testRemplissage"){
		Tracer(true);
	}
}

// collision de spike avec l'echelle

function setTransition(oldScene : String, NewSceneLoad : String){
	Debug.Log(oldScene);
	//Debug.Log(NewSceneLoad);
	fadeInactivate = true;
	yield WaitForSeconds(2);
	PlayerPrefs.SetString("loadLevel", oldScene);
	Application.LoadLevel(NewSceneLoad);
}

function Tracer(activation : boolean){
	var tracer = GameObject.Find("trail");
	var place = GameObject.Find("testRemplissage");
	
	var show = place.GetComponent(SpriteRenderer).enabled;
	
	Debug.Log("la place eau est " +show);
	
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

function Update(){
	if(health < 0){
		Destroy(this.gameObject);
	}
	
	
}

