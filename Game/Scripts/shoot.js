#pragma strict
var firerate : float = 0.5;
var nextFire : float = 1.0;
var fioleSon : AudioClip;

function Start () {
}

function Update () {
		var haut = GameObject.Find("Haut");
		var bas = GameObject.Find("Bas");
		var droite = GameObject.Find("Droite");
		var gauche = GameObject.Find("Gauche");
		var savonBas = GameObject.Find("SavonpersoBas");
		var savonHaut = GameObject.Find("SavonpersoHaut");
		var savonDroite = GameObject.Find("SavonpersoDroite");
		var savonGauche = GameObject.Find("SavonpersoGauche");
	var player = gameObject.Find('Player');
	var position = Vector2(player.transform.position.x + 0.9, player.transform.position.y);
	var position2 = Vector2(player.transform.position.x + 0.5, player.transform.position.y);
	/*var vec = player.transform.position.x + 1.0;
	var vecy = player.transform.position.y + 1.0; */
	
	/*if(Input.GetKey(KeyCode.E)){
	if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("fumée") == 1){
		var newpositionZ = 3.93;
		var newpositionY = player.transform.position.y;
		var newpositionX = player.transform.position.x;
		var newposition = new Vector3(newpositionX, newpositionY, newpositionZ);
		
		nextFire = Time.time / 2 + 1;
		audio.PlayOneShot(fioleSon);
		
		var zone : GameObject = Instantiate(Resources.Load('Fumee') as GameObject, newposition,player.transform.rotation);
		Destroy(zone, 1);
		}
		}
		}
	
	if(Input.GetKey(KeyCode.Z) && Input.GetKey(KeyCode.R)){

		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("gaz") == 1){
		var newpositionZgaz = 3.93;
		var newpositionYgaz = player.transform.position.y;
		var newpositionXgaz = player.transform.position.x;
		var newpositiongaz = new Vector3(newpositionXgaz, newpositionYgaz, newpositionZgaz);
		
		nextFire = Time.time / 2 + 1;
		audio.PlayOneShot(fioleSon);
		
		var zonegaz : GameObject = Instantiate(Resources.Load('Gaz') as GameObject, newpositiongaz,player.transform.rotation);
		Destroy(zonegaz, 1);
		}
		} 
		
	 if(Input.GetKey(KeyCode.F)){
		if(Input.GetKey(KeyCode.H)){
		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("feu") == 1){
		
		nextFire = Time.time / 2 + 1;
		
		var laser : GameObject = Instantiate(Resources.Load('Lazer5') as GameObject, position ,player.transform.rotation);
		Destroy(laser, 1);
		}
		}
	} */
	
}
