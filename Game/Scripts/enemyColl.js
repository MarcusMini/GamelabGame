#pragma strict

private var loop : int;
var randomNumber : float;
var hp : int = 1;
var isEnemy : boolean = true;
var fioleSon : AudioClip;

function start(){
	loop = 0;
}

function OnTriggerEnter2D(coll : Collider2D){
	var coeur = new Vector2(this.transform.position.x + 0.1, this.transform.position.y);
	var mercure = new Vector2(this.transform.position.x - 0.1, this.transform.position.y);
	Debug.Log(coll.gameObject.name);
		var shot = coll.gameObject.GetComponent(Spikeattack);
			audio.PlayOneShot(fioleSon);
			Damage(shot.damage);
			Destroy(shot.gameObject);
	if(hp <= 0){

		randomNumber = Random.Range(0.0,4.0);
		randomNumber = Mathf.Round(randomNumber * 1) / 1;
		
		// instancier que une fois
		if(loop == 0){
			if(randomNumber == 2.0){
				Instantiate(Resources.Load('Coeur plein'), coeur ,Quaternion.identity);
			}
			else if(randomNumber == 1.0){
				Instantiate(Resources.Load('Pièce Mercure'), mercure, Quaternion.identity);
			}
		}
	}


}	

function Update() {
	this.transform.rotation = Quaternion.identity;
}

function Damage(DamageCount : int){
	hp -= DamageCount;
	if (hp <= 0){
		var statue = GameObject.Find("Player").GetComponent(barrierelauncher);
		print (statue);
		if (statue != null && statue.barrieredone >= 0){
			statue.barrieredone -= 1;
			Debug.Log(statue.barrieredone);
		}
		Destroy(gameObject);
	}
}