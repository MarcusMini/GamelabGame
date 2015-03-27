#pragma strict

private var loop : int;
var randomNumber : float;
var hp : float = 6;
var isEnemy : boolean = true;
var canMove : boolean = true;
var fioleSon : AudioClip;

function start(){
	loop = 0;
}

function OnTriggerEnter2D(coll : Collider2D){
var player = GameObject.Find("Player");
var playercol = player.GetComponent(playercol);
	var coeur = new Vector2(this.transform.position.x + 0.1, this.transform.position.y);
	var mercure = new Vector2(this.transform.position.x - 0.1, this.transform.position.y);
	Debug.Log(coll.gameObject.name);
		var shot = coll.gameObject.GetComponent(Spikeattack);
		if (shot != null){
			audio.PlayOneShot(fioleSon);
			Damage(shot.damage);
			Destroy(shot.gameObject);
			if (hp > 0){
			Blink();
			}
		}
		if (coll != null){
		if (coll.gameObject.name == "Fumee(Clone)"){
			Damage(2 + PlayerPrefs.GetFloat("boostdegats"));
			if (hp > 0){
			Blink();
			}
		}
		if (coll.gameObject.name == "Gaz(Clone)"){
			Damage(3 + PlayerPrefs.GetFloat("boostdegats"));
			if (hp > 0){
			Blink();
			}
		}
		if (coll.gameObject.name == "FeuHaut(Clone)" || coll.gameObject.name == "FeuGauche(Clone)" || coll.gameObject.name == "FeuDroite(Clone)" || coll.gameObject.name == "FeuBas(Clone)"){
			yield WaitForSeconds(0.5);
			Damage(4 + PlayerPrefs.GetFloat("boostdegats"));
			if (hp > 0){
			Blink();
			}
		}
		}
	if(hp <= 0){
		
		// instancier que une fois
		if(loop == 0){
		randomNumber = Random.Range(0.0,4.0);
		randomNumber = Mathf.Round(randomNumber * 1) / 1;
		playercol.score = playercol.score + 100;
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
if (PlayerPrefs.GetInt("DeadGauche") == 1){
	Destroy(this.gameObject);
	}
}

function Damage(DamageCount : float){
	hp -= DamageCount;
	if (hp <= 0){
		var statue = GameObject.Find("Player").GetComponent(barrierelauncher);
		canMove = false;
		var scriptmove = gameObject.GetComponent(enemyproche);
		scriptmove.canMove = false;
		print (statue);
		if (statue != null){
			statue.barrieredone += 1;
			Debug.Log(statue.barrieredone);
		}
		var haut : Transform = transform.Find("Hautennemi");
	var bas : Transform = transform.Find("Basennemi");
	var droite : Transform = transform.Find("Droiteennemi");
	var gauche : Transform = transform.Find("Gaucheennemi");
		if (haut.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var morthaut : GameObject = Instantiate(Resources.Load('Mortennemihaut_grotte') as GameObject, transform.position , transform.rotation);
				Destroy(morthaut, 1);
		Destroy(gameObject);					
		}
		if (droite.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var mortdroite : GameObject = Instantiate(Resources.Load('Mortennemidroite_grotte') as GameObject, transform.position , transform.rotation);
				Destroy(mortdroite, 1);
		Destroy(gameObject);
		}
		if (gauche.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var mortgauche : GameObject = Instantiate(Resources.Load('Mortennemigauche_grotte') as GameObject, transform.position , transform.rotation);
				Destroy(mortgauche, 1);
		Destroy(gameObject);
		}
		if (bas.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var mortbas : GameObject = Instantiate(Resources.Load('Mortennemibas_grotte') as GameObject, transform.position , transform.rotation);
				Destroy(mortbas, 1);
		Destroy(gameObject);
		}
	}
}


function Blink(){
	var haut = gameObject.GetComponent(enemyproche).rougehaut;
		var bas =  gameObject.GetComponent(enemyproche).rougebas;
		var droite =  gameObject.GetComponent(enemyproche).rougedroite;
		var gauche = gameObject.GetComponent(enemyproche).rougegauche;
var scriptMove = gameObject.GetComponent(enemyproche);
if (haut != null && bas != null && gauche != null && droite != null && hp != 0){
if (haut == true){
scriptMove.haut.renderer.enabled = false;		
scriptMove.canMove = false;
var hautrouge : GameObject = Instantiate(Resources.Load('Ennemihautrouge_grotte') as GameObject, this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	Destroy(hautrouge);
scriptMove.bas.renderer.enabled = true;
	scriptMove.canMove = true;
}
if (gauche == true){
scriptMove.gauche.renderer.enabled = false;
scriptMove.canMove = false;
var gaucherouge : GameObject = Instantiate(Resources.Load('Ennemigaucherouge_grotte') as GameObject, this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	Destroy(gaucherouge);
scriptMove.gauche.renderer.enabled = true;
scriptMove.canMove = true;
}
if (droite  == true){
		scriptMove.canMove = false;
		var droiterouge : GameObject = Instantiate(Resources.Load('Ennemidroiterouge_grotte') as GameObject, this.transform.position ,this.transform.rotation);
	scriptMove.droite.renderer.enabled = false;
	yield WaitForSeconds(0.2);
Destroy(droiterouge);
scriptMove.droite.renderer.enabled = true;
	scriptMove.canMove = true;
}
if (bas == true){
			scriptMove.canMove = false;
			scriptMove.bas.renderer.enabled = false;
var basrouge : GameObject = Instantiate(Resources.Load('Ennemibasrouge_grotte') as GameObject, this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	scriptMove.bas.renderer.enabled = true;
Destroy(basrouge);
scriptMove.canMove = true;
}
}
}


