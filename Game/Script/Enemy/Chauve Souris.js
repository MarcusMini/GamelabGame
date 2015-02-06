#pragma strict

 var target : GameObject; //the enemy's target
 var porteur : GameObject; //the enemy's target
 var StartPosX : float;
 var StartPosY : float;
 var startpos : Vector2;
 var taillebox : int;

  
 function Start()
 {
	  porteur = GameObject.Find("Ennemi_Left");
      target = GameObject.Find("Player");
      taillebox = 2;
  }
 
 function retour() {
     var StartPosX = porteur.transform.position.x + 0.1;
     var StartPosY = porteur.transform.position.y + 0.1;
     var startpos = Vector2(StartPosX, StartPosY);
    var haut2 : Transform = transform.Find("Hautennemi");
	var bas2 : Transform = transform.Find("Basennemi");
	var droite2 : Transform = transform.Find("Droiteennemi");
	var gauche2 : Transform = transform.Find("Gaucheennemi");
	transform.position = Vector2.MoveTowards(this.transform.position, startpos, 0.4 * Time.deltaTime);
		if (transform.position.x > startpos.x){
		haut2.renderer.enabled = false;
		gauche2.renderer.enabled = true;
		droite2.renderer.enabled = false;
		bas2.renderer.enabled = false;
		}
		else if (transform.position.x < startpos.x){
		haut2.renderer.enabled = false;
		gauche2.renderer.enabled = false;
		droite2.renderer.enabled = true;
		bas2.renderer.enabled = false;	
		}
				else if (transform.position.y < startpos.y){
		haut2.renderer.enabled = true;
		gauche2.renderer.enabled = false;
		droite2.renderer.enabled = false;
		bas2.renderer.enabled = false;	
		}
				else if (transform.position.y < startpos.y){
		haut2.renderer.enabled = false;
		gauche2.renderer.enabled = false;
		droite2.renderer.enabled = false;
		bas2.renderer.enabled = true;	
		}
}
    
 function Update () {
  if(target){
     var StartPosX2 = porteur.transform.position.x + 0.1;
     var StartPosY2 = porteur.transform.position.y + 0.1;
     var startpos2 = Vector2(StartPosX, StartPosY);
  	var posEnemy = Vector2.Distance(startpos2, target.transform.position);
  	var posRound = Mathf.Round(posEnemy * 100) / 100;
  	var haut : Transform = transform.Find("Hautennemi");
	var bas : Transform = transform.Find("Basennemi");
	var droite : Transform = transform.Find("Droiteennemi");
	var gauche : Transform = transform.Find("Gaucheennemi");
  	
  	if(target.transform.position.x - this.transform.position.x < taillebox && target.transform.position.x - this.transform.position.x > -taillebox && target.transform.position.y - this.transform.position.y < taillebox && target.transform.position.y - this.transform.position.y > -taillebox){
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
				transform.position = Vector2.MoveTowards(this.transform.position, target.transform.position, 0.3 *Time.deltaTime);
				// Artificial intelligence code with love by Marc & Eric 
				if(targetRound < playerRound){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = true;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
				}
				else if(targetRound > playerRound){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = true;
					bas.renderer.enabled = false;
				}
				else if(target.transform.position.y < this.transform.position.y && targetRound == playerRound){
					haut.renderer.enabled = false;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = true;
				}
				else if(target.transform.position.y > this.transform.position.y && targetRound == playerRound){
					haut.renderer.enabled = true;
					gauche.renderer.enabled = false;
					droite.renderer.enabled = false;
					bas.renderer.enabled = false;
				}
		 	}
	}
	else {
	retour();
	}
  }
 }

