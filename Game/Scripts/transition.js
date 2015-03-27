#pragma strict

var timer2 : float = 0.0;
var fade : float = 1.0;
var startPosition : Vector3;
var bossPass : boolean;
var deathBoss : AudioClip;
var soundPass : boolean;
var spikePass : boolean;


function Start () {
	 startPosition = transform.position;
	 bossPass = true;
	 soundPass = true;
	 spikePass = true;
}

function fadeOut(red: int, green : int , blue : int){
	if(fade > 0.0){
		renderer.material.color = Color(red,green,blue,fade);
		fade = fade - 0.01;
		yield WaitForSeconds(1);
	}
	else if(fade < 0.0){
		renderer.material.color = Color(red,green,blue,0);
		PlayerPrefs.SetInt("fading", 0);
	}
	
	// remede a la position du quad... degeu mais bon pas le temp.
	
	
}

function fadeIn(red: int, green : int , blue : int){
	Debug.Log("other here");
	if(fade < 1.0){
		renderer.material.color = Color(red,green,blue,fade);
		fade = fade + 0.01;
		yield WaitForSeconds(1);
	}
	else if(fade > 1.0){
		renderer.material.color = Color(red,green,blue,1);
	}
}

function backPos(){
	yield WaitForSeconds(2);
	transform.position = startPosition;
}

function bossDeath(){
	if(bossPass){
		if(soundPass){
			audio.PlayOneShot(deathBoss);
			var soundObj = GameObject.Find("Boss_sound");
			soundObj.audio.enabled = false;
			soundPass = false;
		}
		fadeIn(255,255,255);
		yield WaitForSeconds(2);
		fadeOut(255,255,255);
		yield WaitForSeconds(1);
		bossPass = false;
	}
}

function SpikeDeath(){
	if(spikePass){
		var camera = GameObject.Find("Camera_two").camera;
		camera.cullingMask = 1;
		fadeIn(255,255,255);
		yield WaitForSeconds(2);
		fadeOut(255,255,255);
		yield WaitForSeconds(1);
		spikePass = false;
	}
}

function Update () {
	var collision = GameObject.Find("Player");
	
	if(collision){
		var valeur = collision.GetComponent(playercol);
		var fadeInActivate = valeur.fadeInactivate;
		
		/* test , passer des multiples valeurs dans les fonctions fadeIn et fadeOut , et 
		un if sur une propriété .. playerprefs again ? */
		if(!GameObject.Find("Boss") && Application.loadedLevelName == "boss"){
				Debug.Log("vfdvdfvv");
				//transform.position.z = -1.22;
				bossDeath();
		}
		else if(fadeInActivate){
			if(PlayerPrefs.GetInt("zoom")){
				if(Application.loadedLevelName == "laboratoire"){
					fadeIn(255,255,255);
				}
				this.gameObject.transform.position = Vector3(collision.transform.position.x, collision.transform.position.y, collision.transform.position.z + 2);
			}
			else{
				fadeIn(0,0,0);	
			}
		}
		else{
			if(PlayerPrefs.GetInt("fading")){
//				Debug.Log("here");
				if(Application.loadedLevelName == "laboratoire"){
					fadeOut(255,255,255);
				}
				else{
					fadeOut(0,0,0);
				}
				backPos();
			}
			else{
				fadeOut(0,0,0);
			}
			
		}
	}
	else{
		SpikeDeath();
	}
		

}