#pragma strict

 var target : GameObject; //the enemy's target
 var porteur : Transform; //the enemy's target
 var StartPosX : float;
 var StartPosY : float;
 var startpos : Vector2;
 var taillebox : int;
 var hp : float;
 var canMove : boolean = true;
 private var loop : int;
var randomNumber : float;
var isEnemy : boolean = true;
var stringprefab : String;
  
 function Start()
 {
      target = GameObject.Find("Player");
      taillebox = 2;
      hp = 0.1;
      loop = 0;
  }
 
 function retour() {
     var StartPosX = porteur.transform.position.x + 0.1;
     var StartPosY = porteur.transform.position.y + 0.1;
     var startpos = Vector2(StartPosX, StartPosY);
	transform.position = Vector2.MoveTowards(this.transform.position, startpos, 0.4 * Time.deltaTime);
}
    
 function Update () {
 this.transform.rotation = Quaternion.identity;
  if(target){
     var StartPosX2 = porteur.transform.position.x + 0.1;
     var StartPosY2 = porteur.transform.position.y + 0.1;
     var startpos2 = Vector2(StartPosX, StartPosY);
  	var posEnemy = Vector2.Distance(startpos2, target.transform.position);
  	var posRound = Mathf.Round(posEnemy * 100) / 100;
	 var FinalPosX = target.transform.position.x;
     var FinalPosY = target.transform.position.y + 0.2;
     var FinalPosZ = target.transform.position.z -1;
     var FinalPos = Vector3(FinalPosX, FinalPosY, FinalPosZ);
  
  	if(target.transform.position.x - this.transform.position.x < taillebox && target.transform.position.x - this.transform.position.x > -taillebox && target.transform.position.y - this.transform.position.y < taillebox && target.transform.position.y - this.transform.position.y > -taillebox){
  		if(canMove == true){
  		if(posRound > 0.1){
		 		// Round the value to remove the shaking effect.. 
				var targetRound = Mathf.Round(target.transform.position.x * 10) / 10;
				var playerRound = Mathf.Round(this.transform.position.x * 10) / 10;
			
			 	// delimitation de la zone de l'ennemie
			    var playerdisty = (transform.position.y - Camera.main.transform.position.y); // calcul la position du player par rapport à la caméra

				var leftborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdisty)).x; //gauche
				var rightborder = Camera.main.ViewportToWorldPoint(Vector3(1,0,playerdisty)).x; //droite
				var topborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdisty)).y; //haut
				var bottomborder = Camera.main.ViewportToWorldPoint(Vector3(0,1,playerdisty)).y; //bas	
				transform.position.x = Mathf.Clamp(transform.position.x, leftborder, rightborder); //math.clamp permet de delimiter
				transform.position.y = Mathf.Clamp(transform.position.y, topborder, bottomborder); //math.clamp permet de delimiter		
				// ia 
				
				//transform.position = Vector3.MoveTowards(this.transform.position, Vector3(target.transform.position.x, target.transform.position.y, 0), 0.5 * Time.deltaTime);
				transform.position = Vector2.MoveTowards(this.transform.position, FinalPos, 0.3 *Time.deltaTime);
				// Artificial intelligence code with love by Marc & Eric 
		 	}
	}
	}
	else {
	retour();
	}
  }
 }
 
 function OnTriggerEnter2D(coll : Collider2D){
	var coeur = new Vector2(this.transform.position.x + 0.1, this.transform.position.y);
	var mercure = new Vector2(this.transform.position.x - 0.1, this.transform.position.y);
	Debug.Log(coll.gameObject.name);
		var shot = coll.gameObject.GetComponent(Spikeattack);
			if (shot != null){
			Damage(shot.damage);
			Destroy(shot.gameObject);
			}
		if (coll != null){
			if (coll.gameObject.name == "Fumee(Clone)"){
			Damage(2);
		}
		if (coll.gameObject.name == "Gaz(Clone)"){
			Damage(3);
		}
		if (coll.gameObject.name == "FeuHaut(Clone)" || coll.gameObject.name == "FeuGauche(Clone)" || coll.gameObject.name == "FeuDroite(Clone)" || coll.gameObject.name == "FeuBas(Clone)"){
			yield WaitForSeconds(0.5);
			Damage(4);
		}
		if (coll.gameObject.name == "mousseHorizontal(Clone)" || coll.gameObject.name == "mousseVertical(Clone)"){
yield WaitForSeconds(0.2);
canMove = false;
yield WaitForSeconds(3);
canMove = true;
}
}


}	

function Damage(DamageCount : float){
	
	hp -= DamageCount;
	Debug.Log(hp);
}