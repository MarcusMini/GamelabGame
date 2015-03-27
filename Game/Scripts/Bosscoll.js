#pragma strict

private var loop : int;
var randomNumber : float;
var hp : float = 150;
var maxhp : float = 150;
var isEnemy : boolean = true;

function start(){
	loop = 0;
}

function OnTriggerEnter2D(coll : Collider2D){
	var coeur = new Vector2(this.transform.position.x + 0.1, this.transform.position.y);
	var mercure = new Vector2(this.transform.position.x - 0.1, this.transform.position.y);
//	Debug.Log(coll.gameObject.name);
		var shot = coll.gameObject.GetComponent(Spikeattack);
		if (shot != null){
			Damage(shot.damage);
			Destroy(shot.gameObject);
			if (hp > 0){
			Blink();
			}
		}
	if (coll != null){
		if (coll.gameObject.name == "Fumee(Clone)"){ // Si l'ennemi touche la fumée du joueur
			Damage(2 + PlayerPrefs.GetFloat("boostdegats")); // boostdegats récupère le niveau de force dans la machine à gemmes et augmente les dégats infligés.
			if (hp > 0){
			Blink();
			}
		}
		if (coll.gameObject.name == "Gaz(Clone)"){
			Damage(3  + PlayerPrefs.GetFloat("boostdegats"));
			if (hp > 0){
			Blink();
			}
		}
		if (coll.gameObject.name == "FeuHaut(Clone)" || coll.gameObject.name == "FeuGauche(Clone)" || coll.gameObject.name == "FeuDroite(Clone)" || coll.gameObject.name == "FeuBas(Clone)"){
			yield WaitForSeconds(0.5);
			Damage(4  + PlayerPrefs.GetFloat("boostdegats"));
			if (hp > 0){
			Blink();
			}
		}
	}
}	

function Update() {
	Debug.Log("vie" +hp);
	this.transform.rotation = Quaternion.identity;
}

function Damage(DamageCount : int){
	hp -= DamageCount;
	var Life = GameObject.Find("Mask");
	Life.transform.localScale.x = Life.transform.localScale.x - DamageCount / maxhp;
if (Life.transform.localScale.x <= 0){
	Life.transform.localScale.x = 0;
}
	if (hp <= 0){
		var statue = GameObject.Find("Player").GetComponent(barrierelauncher);
		print (statue);
		if (statue != null && statue.barrieredone >= 0){
			statue.barrieredone -= 1;
			Debug.Log(statue.barrieredone);
		}
		PlayerPrefs.SetString("event", "gem");
		Destroy(gameObject);
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
var hautrouge : GameObject = Instantiate(Resources.Load('Ennemihautrouge_boss') as GameObject, this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	Destroy(hautrouge);
scriptMove.bas.renderer.enabled = true;
	scriptMove.canMove = true;
}
if (gauche == true){
scriptMove.gauche.renderer.enabled = false;
scriptMove.canMove = false;
var gaucherouge : GameObject = Instantiate(Resources.Load('Ennemigaucherouge_boss') as GameObject, this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	Destroy(gaucherouge);
scriptMove.gauche.renderer.enabled = true;
scriptMove.canMove = true;
}
if (droite  == true){
		scriptMove.canMove = false;
		var droiterouge : GameObject = Instantiate(Resources.Load('Ennemidroiterouge_boss') as GameObject, this.transform.position ,this.transform.rotation);
	scriptMove.droite.renderer.enabled = false;
	yield WaitForSeconds(0.2);
Destroy(droiterouge);
scriptMove.droite.renderer.enabled = true;
	scriptMove.canMove = true;
}
if (bas == true){
			scriptMove.canMove = false;
			scriptMove.bas.renderer.enabled = false;
var basrouge : GameObject = Instantiate(Resources.Load('Ennemibasrouge_boss') as GameObject, this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	scriptMove.bas.renderer.enabled = true;
Destroy(basrouge);
scriptMove.canMove = true;
}
}
}