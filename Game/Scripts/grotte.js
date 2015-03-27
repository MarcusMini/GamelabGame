#pragma strict

// A factoriser si le temp

var acces_grotte : Transform;
var passage : boolean = true;
var bourasque : int;
var randomValueX : float;
var randomValueY : float;
var timerShake : float;

var randommin : float;
var randomMax : float;
var cascadeToInstantiate : Transform;
var destroyMountainCountdown : float;
var timer : float;
var afterGrotte;
var terre10Son : AudioClip;
var terre20Son : AudioClip;
var level : String;
var playSound : boolean;
var playSound2 : boolean;
var playSound3 : boolean;





function Start () {
	afterGrotte  = PlayerPrefs.GetInt("afterGrotte");
	var finalS = PlayerPrefs.GetInt("FinalStep");
	bourasque = PlayerPrefs.GetInt("bourasqueval");
	level = Application.loadedLevelName;
	playSound = true;
	playSound2 = true;
	playSound3 = true;

	if(bourasque == 1 && finalS != 2 && level == "level1_d"){
		midState();
	}
	else if(finalS == 2 && level == "level_1d"){
		finalState();
	}

	if(afterGrotte == 2 && level == "level1 gauche"){
		finalGauche();
	} 
}

function level1D(){

	var player = GameObject.FindWithTag("Player");
	
	var launchAnimation = PlayerPrefs.GetInt("setAnimation");
	var monstre = GameObject.FindWithTag("Ennemy");

	// barriere = 18
	Debug.Log(PlayerPrefs.GetInt("Barriere"));
	if(PlayerPrefs.GetInt("Barriere") == 18 || PlayerPrefs.GetInt("Barriere") == 21){
		if(!bourasque){
			if(timerShake < 10){
				shake();			
				timerShake += Time.deltaTime;
				midState();
				PlayerPrefs.SetString("event", "earthquake");
				player.GetComponent(move).speed = Vector2(0,0);
				
				if(playSound){
					audio.PlayOneShot(terre10Son);
					playSound = false;
				}
			}
			else{
				PlayerPrefs.SetString("event", "");
				player.GetComponent(move).speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
				PlayerPrefs.SetInt("bourasqueval", 1);
			}
		}
		if(launchAnimation){	
			if(!GameObject.Find("Cascade(Clone)")){
				Debug.Log("here");
				PlayerPrefs.SetString("event", "earthquake");
				shake();
				player.GetComponent(move).speed = Vector2(0,0);
			}
			if(playSound2){
					audio.PlayOneShot(terre20Son);
					playSound2 = false;
			}
			var smoke = GameObject.Find("Smoke");
			smoke.GetComponent(ParticleSystem).enableEmission = true;
			Destroy(GameObject.Find("gradientGR(Clone)"));
						
			if(destroyMountainCountdown < 20){
				destroyMountainCountdown += Time.deltaTime;
			}
			else{
				player.GetComponent(move).speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
				PlayerPrefs.SetString("event", "");
				var mountain = GameObject.Find("pierreBig");
				
				timer += Time.deltaTime;
				mountain.transform.position.z = Mathf.Lerp(2.52, 5.58, timer);
//				Debug.Log(Mathf.Lerp(2.52, 5.58, timer));
				
				yield WaitForSeconds(2);
				Destroy(GameObject.FindWithTag("AfterCave"));
				Destroy(GameObject.FindWithTag("arbreDestroy"));
				Destroy(GameObject.FindWithTag("Statut"));
				Destroy(GameObject.Find("acces_grotte(Clone)"));
				
				if(!GameObject.Find("Cascade(Clone)")){
					Instantiate(cascadeToInstantiate,Vector3(4.716, -1.507, 2.28), Quaternion.identity);
				}
				smoke.GetComponent(ParticleSystem).enableEmission = false;
				PlayerPrefs.SetInt("activationSpike", 1);
				PlayerPrefs.SetInt("setAnimation", 0);
				PlayerPrefs.SetInt("FinalStep", 2); 
			}
		}
	}
	
	Debug.Log("anim "+launchAnimation);

}

function midState(){
	Debug.Log("la");
	Destroy(GameObject.FindWithTag("Statut"));
	Destroy(GameObject.Find("pierre")); 
	Destroy(GameObject.Find("buisson conteneur"));
	
	if(!GameObject.Find("gradientGR(Clone)")){
		Instantiate(acces_grotte, Vector3(4.23, -2.41, 3.18), Quaternion(0.0,0.0,45.0,45.0));
	}
}

function finalState(){

	Debug.Log("ici too");
			
	if(!GameObject.Find("Cascade(Clone)")){
		
		Instantiate(cascadeToInstantiate,Vector3(4.716, -1.507, 2.28), Quaternion.identity);
	}
	
	Destroy(GameObject.FindWithTag("AfterCave"));
	Destroy(GameObject.FindWithTag("after"));
	Destroy(GameObject.FindWithTag("Statut"));
	Destroy(GameObject.Find("acces_grotte(Clone)"));
	Destroy(GameObject.Find("buisson conteneur"));
	Destroy(GameObject.Find("pierre")); 
}

function finalGauche(){
	Debug.Log("otherer");
	var obj : GameObject = GameObject.Find("testRemplissage");
	if(obj){
		obj.renderer.enabled = true;
	}
	Destroy(GameObject.Find("trou"));
	Instantiate(cascadeToInstantiate, Vector3(-12.72, 3.66, 3.897), Quaternion.identity);
}

function levelGauche(){
    var player = GameObject.FindWithTag("Player");
	var particleObj = GameObject.FindWithTag("Particle");
	

	// get a value to pass here...
	if(afterGrotte == 1){
		if(timer < 20){
	
		    //PlayerPrefs.SetInt("playgeyser",1);
			player.GetComponent(move).speed = Vector2(0,0);
			Destroy(GameObject.Find("trou"));
			particleObj.GetComponent(ParticleSystem).enableEmission = true;
			PlayerPrefs.SetString("event", "geyser");
			
			if(timer > 10){
				var obj = GameObject.Find("testRemplissage");
				obj.renderer.enabled = true;
				obj.GetComponent(Animator).enabled = true;
			} 
			timer += Time.deltaTime;
		}
		else{
			player.GetComponent(move).speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			// then after Instantitate a new water and don't forget to destroy the old one and it should be ok niggas.
			if(!GameObject.Find("water(Clone)")){
				Instantiate(cascadeToInstantiate, Vector3(-12.72, 3.66, 3.897), Quaternion.identity);
				particleObj.GetComponent(ParticleSystem).enableEmission = false;
			}
			// passer a un état fixe
			PlayerPrefs.SetInt("afterGrotte", 2);
			PlayerPrefs.SetString("event", "");
		}

	}
}



function Update () {
	Debug.Log(PlayerPrefs.GetInt("FinalStep"));
	
	Debug.Log(afterGrotte);
	if(Application.loadedLevelName == "level1_d"){
		level1D();
	}
	else if(Application.loadedLevelName == "level1 gauche"){
		levelGauche();	
	}
}

function shake(){
	var player = GameObject.FindWithTag("Player");
	randomValueX = Random.Range(randommin, randomMax);
	randomValueY = Random.Range(randommin, randomMax);
	var camera = GameObject.FindWithTag("SecondCamera");
	var position = Vector2(player.transform.position.x + randomValueX, player.transform.position.y + randomValueY);
	camera.transform.position = position;
}