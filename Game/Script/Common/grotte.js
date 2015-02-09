#pragma strict

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


function Start () {
	
	
	//PlayerPrefs.DeleteAll();
	
	
	var finalS = PlayerPrefs.GetInt("FinalStep");
	
	bourasque = PlayerPrefs.GetInt("bourasqueval");
	Debug.Log("bourasque "+bourasque);
	
	if(bourasque == 1){
		Destroy(GameObject.Find("ennemy container"));
	}
	
	if(bourasque == 1 && finalS != 2){
		midState();
	}
	else if(finalS == 2){
		finalState();
	}
}

function level1D(){
	var launchAnimation = PlayerPrefs.GetInt("setAnimation");
	var monstre = GameObject.FindWithTag("Ennemy");
	
	if(!monstre){
		if(!bourasque){
			if(timerShake < 10){
				shake();
				PlayerPrefs.SetInt("activationSpike", 2);			
				timerShake += Time.deltaTime;
				midState();
			}
			else{
				PlayerPrefs.SetInt("activationSpike", 1);
			}
		}
		
		if(launchAnimation){
		
			if(!GameObject.Find("Cascade(Clone)")){
				shake();
			}
			
			var smoke = GameObject.Find("Smoke");
			smoke.GetComponent(ParticleSystem).enableEmission = true;
			PlayerPrefs.SetInt("activationSpike", 2);
						
			if(destroyMountainCountdown < 50){
				destroyMountainCountdown += Time.deltaTime;
			}
			else{
				var mountain = GameObject.Find("pierreBig");
				
				timer += Time.deltaTime;
				mountain.transform.position.z = Mathf.Lerp(2.52, 5.58, timer);
				Debug.Log(Mathf.Lerp(2.52, 5.58, timer));
				
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
				PlayerPrefs.SetInt("FinalStep", 2);
				PlayerPrefs.SetInt("setAnimation", 0);
			}
		}
		else{
			PlayerPrefs.SetInt("bourasqueval", 1);
		}
	}
}

function midState(){
	var monstre = GameObject.FindWithTag("Ennemy");
	Destroy(monstre);
	var statut = GameObject.FindWithTag("Statut");
	Destroy(statut);
	Destroy(GameObject.Find("buisson conteneur"));
	if(!GameObject.Find("acces_grotte(Clone)")){
			Instantiate(acces_grotte, Vector3(3.853, -2.205, 7.5), Quaternion.identity);
	}
}

function finalState(){
			
	if(!GameObject.Find("Cascade(Clone)")){
		
		Instantiate(cascadeToInstantiate,Vector3(4.716, -1.507, 2.28), Quaternion.identity);
	}
	
	Destroy(GameObject.FindWithTag("AfterCave"));
	Destroy(GameObject.FindWithTag("after"));
	Destroy(GameObject.FindWithTag("Statut"));
	Destroy(GameObject.Find("acces_grotte(Clone)"));
	Destroy(GameObject.Find("buisson conteneur"));
	Destroy(GameObject.FindWithTag("Ennemy"));
}


function levelGrotte(){
	if(GameObject.FindWithTag("EmptyGem")){
		shake();
	}
}

function Update () {
	
	if(Application.loadedLevelName == "level1_d"){
			level1D();
			
	}
	else if(Application.loadedLevelName == "level1_d_grotte"){
			levelGrotte();
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
