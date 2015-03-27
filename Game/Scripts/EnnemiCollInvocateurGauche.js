#pragma strict

private var loop : int;
var randomNumber : float;
var hp : float = 3;
var isEnemy : boolean = true;
var taillex : float;
var tailley : float;
var taillez : float;
var child : Transform;
var invocateur : Transform;
var fioleSon : AudioClip;

function start(){
	loop = 0;
	taillex = 1.9;
	tailley = 1.9;
	taillez = 1.9;
}

function OnTriggerEnter2D(coll : Collider2D){ // Quand on entre en collision avec un projectile (élément contre lequel on ne se heurte pas)
var player = GameObject.Find("Player");
var playercol = player.GetComponent(playercol);
	var coeur = new Vector2(this.transform.position.x + 0.1, this.transform.position.y);
	var mercure = new Vector2(this.transform.position.x - 0.1, this.transform.position.y);
	// On récupère le script playercol du joueur et on initialise la position du coeur et du mercure quand ils apparaissent.
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
	if(hp <= 0){
		
		// instancier que une fois
		if(loop == 0){
		playercol.score = playercol.score + 100;
		randomNumber = Random.Range(0.0,4.0);
		randomNumber = Mathf.Round(randomNumber * 1) / 1;
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
	if (child != null) {
	var chauve = child.GetComponent(weaponenemygauche);
	if (chauve.hp <= 0 && chauve != null){
	taillex += 0.03;
	tailley += 0.03;
	taillez += 0.03;
	Invocation();
	}
	}
	if (PlayerPrefs.GetInt("DeadGauche") == 1){
	Destroy(this.gameObject);
	}
	
	Debug.Log(child.gameObject.name);
	Debug.Log("chauve" +chauve.hp);
}

function Damage(DamageCount : float){
	var haut = transform.Find("Hautennemi");
	 var bas  = transform.Find("Basennemi");
	var droite  = transform.Find("Droiteennemi");
	 var gauche = transform.Find("Gaucheennemi");
	hp -= DamageCount;
	if (child != null) {
	var chauve2 = child.GetComponent(weaponenemygauche);
	chauve2.hp -= DamageCount;
	}

	if (hp <= 0){
		var statue = GameObject.Find("Player").GetComponent(barrierelauncher);
		print (statue);
	if (statue != null && statue.barrieredone >= 0){
			statue.barrieredone += 1;
			Debug.Log(statue.barrieredone);
			if (haut.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var morthaut : GameObject = Instantiate(Resources.Load('Mortennemiinvocateurhaut'), transform.position , transform.rotation);
				Destroy(morthaut, 1);
		Destroy(gameObject);					
		}
		if (droite.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var mortdroite : GameObject = Instantiate(Resources.Load('Mortennemiinvocateurdroite'), transform.position , transform.rotation);
				Destroy(mortdroite, 1);
		Destroy(gameObject);
		}
		if (gauche.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var mortgauche : GameObject = Instantiate(Resources.Load('Mortennemiinvocateurgauche'), transform.position , transform.rotation);
				Destroy(mortgauche, 1);
		Destroy(gameObject);
		}
		if (bas.renderer.enabled == true){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
		var mortbas : GameObject = Instantiate(Resources.Load('Mortennemiinvocateurbas'), transform.position , transform.rotation);
				Destroy(mortbas, 1);
		Destroy(gameObject);
		}
		}
	}
}

function Invocation(){
	var chauve3 = child.GetComponent(weaponenemygauche);
	child.renderer.enabled = false;
	child.transform.position = invocateur.transform.position;
	child.transform.localScale = Vector3(taillex,tailley,taillez);
	yield WaitForSeconds(1);
	if (child != null){
	child.renderer.enabled = true;
	chauve3.hp = 1;
	}

}

function Blink(){
	var haut = gameObject.GetComponent(EnnemiInvocateur).rougehaut;
		var bas =  gameObject.GetComponent(EnnemiInvocateur).rougebas;
		var droite =  gameObject.GetComponent(EnnemiInvocateur).rougedroite;
		var gauche = gameObject.GetComponent(EnnemiInvocateur).rougegauche;
var scriptMove = gameObject.GetComponent(EnnemiInvocateur);
if (haut != null && bas != null && gauche != null && droite != null && hp > 0){
if (haut == true){
scriptMove.haut.renderer.enabled = false;
scriptMove.canMove = false;
var hautrouge = Instantiate(Resources.Load('invocateurhautrouge'), this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
	Destroy(hautrouge);
scriptMove.haut.renderer.enabled = true;
	scriptMove.canMove = true;
}
if (gauche == true){
Debug.Log("GAUCHEROUUUGE");
scriptMove.gauche.renderer.enabled = false;
scriptMove.canMove = false;
var gaucherouge = Instantiate(Resources.Load('invocateurdroiterougete'), this.transform.position , Quaternion.Euler(0, 180, 0));
	yield WaitForSeconds(0.2);
	Destroy(gaucherouge);
scriptMove.gauche.renderer.enabled = true;
scriptMove.canMove = true;
}
if (droite  == true){
scriptMove.droite.renderer.enabled = false;
		scriptMove.canMove = false;
		var droiterouge = Instantiate(Resources.Load('invocateurdroiterouge'), this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
Destroy(droiterouge);
scriptMove.droite.renderer.enabled = true;
	scriptMove.canMove = true;
}
if (bas == true){
scriptMove.bas.renderer.enabled = false;
			scriptMove.canMove = false;
var basrouge = Instantiate(Resources.Load('invocateurbasrouge'), this.transform.position ,this.transform.rotation);
	yield WaitForSeconds(0.2);
Destroy(basrouge);
scriptMove.bas.renderer.enabled = true;
scriptMove.canMove = true;
}
}
}