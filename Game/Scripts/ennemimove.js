﻿#pragma strict

 var target : GameObject; //the enemy's target
 var StartPosX : float;
 var StartPosY : float;
 var vec = Vector2(10,10);
  
 function Start()
 {
      target = GameObject.Find("Player");
      StartPosX = this.transform.position.x;
      StartPosY = this.transform.position.y;
 }
  
 function Update () {
 
  if(target){
  
  	var posEnemy = Vector2.Distance(this.transform.position, target.transform.position);
  	var posRound = Mathf.Round(posEnemy * 100) / 100;
  	
  	var haut : Transform = transform.Find("Hautennemi");
	var bas : Transform = transform.Find("Basennemi");
	var droite : Transform = transform.Find("Droiteennemi");
	var gauche : Transform = transform.Find("Gaucheennemi");
  	
  	if(target.transform.position.x > 0.0){
  		if(posRound > 0.7){
		 		// Round the value to remove the shaking effect.. 
				var targetRound = Mathf.Round(target.transform.position.x * 10) / 10;
				var playerRound = Mathf.Round(this.transform.position.x * 10) / 10;
			
			 	// delimitation de la zone de l'ennemie
			    var playerdist = (transform.position.y - Camera.main.transform.position.y); // calcul la position du player par rapport à la caméra
				var leftborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdist)).x; //gauche
				var rightborder = Camera.main.ViewportToWorldPoint(Vector3(1,0,playerdist)).x; //droite
				var topborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdist)).y; //haut
				var bottomborder = Camera.main.ViewportToWorldPoint(Vector3(0,1,playerdist)).y; //bas	
				transform.position.x = Mathf.Clamp(transform.position.x, leftborder, rightborder); //math.clamp permet de delimiter
				transform.position.y = Mathf.Clamp(transform.position.y, topborder, bottomborder); //math.clamp permet de delimiter	
				
				var posX = transform.position.x;
				var posY = transform.position.y;	
				// ia 
				
				//transform.position = Vector3.MoveTowards(this.transform.position, Vector3(target.transform.position.x, target.transform.position.y, 0), 0.5 * Time.deltaTime);
				transform.position = Vector2.MoveTowards(this.transform.position, target.transform.position, 0.5*Time.deltaTime);
				
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
		 	else{
		 		this.transform.Translate(0,0,0);
		 	}	
	}
	else{
		transform.position = Vector2.MoveTowards(this.transform.position, Vector2(StartPosX, StartPosY), 0.5 * Time.deltaTime);
		haut.renderer.enabled = false;
		gauche.renderer.enabled = false;
		droite.renderer.enabled = true;
		bas.renderer.enabled = false;
	}
	
  }

 }