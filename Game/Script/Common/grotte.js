#pragma strict

var acces_grotte : Transform;
var passage : boolean = true;
var bourasque : int;
var randomValueX : float;
var randomValueY : float;
var timerShake : float;


function Start () {
	/* Only use for debugging the scene Level1_d */
		PlayerPrefs.DeleteKey("bourasqueval");
	
	bourasque = PlayerPrefs.GetInt("bourasqueval");
	Debug.Log(bourasque);
}

function level1D(){
	var monstre = GameObject.FindWithTag("Ennemy");
	
	if(!monstre){
		if(!bourasque){
			if(timerShake < 10){
				shake();
				PlayerPrefs.SetInt("activationSpike", 2);			
				timerShake += Time.deltaTime;
			}
			else{
				PlayerPrefs.SetInt("activationSpike", 1);
			}
		}
		var statut = GameObject.FindWithTag("Statut");
		Destroy(statut);

		if(!GameObject.Find("acces_grotte(Clone)")){
			Instantiate(acces_grotte, Vector3(3.853, -2.205, 7.5), Quaternion.identity);
		}
		
		PlayerPrefs.SetInt("bourasqueval", 1);
	}
	else if(bourasque == 1){
		Destroy(monstre);
	}
}

function levelGrotte(){
	
}

function Update () {
	if(Application.loadedLevelName == "Level1_d"){
		level1D();
	}
	else if(Application.loadedLevelName == "level1_d_grotte"){
		levelGrotte();
	}
}

function shake(){
	var player = GameObject.FindWithTag("Player");
	
	randomValueX = Random.Range(-0.01, 0.01);
	randomValueY = Random.Range(-0.01, 0.01);
	var camera = GameObject.FindWithTag("SecondCamera");
	var position = Vector2(player.transform.position.x + randomValueX, player.transform.position.y + randomValueY);
	camera.transform.position = position;
}
