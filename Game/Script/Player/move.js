#pragma strict
public var pos : int;

private var move_or_not : boolean = true;

function move(){
	
	var inputx = Mathf.Clamp(Input.GetAxis("Horizontal"), -0.001, 0.001);
	var inputy = Mathf.Clamp(Input.GetAxis("Vertical"), -0.001, 0.001);

    if(move_or_not){
    		
			var playerdist = (this.transform.position.y - Camera.main.transform.position.y); // calcul la position du player par rapport à la caméra
			
			// limitation de la cam p le player
			var leftborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdist)).x; //gauche
			var rightborder = Camera.main.ViewportToWorldPoint(Vector3(1,0,playerdist)).x; //droite
			
			var topborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdist)).y; //haut
			var bottomborder = Camera.main.ViewportToWorldPoint(Vector3(0,1,playerdist)).y; //bas
				
			transform.position.x = Mathf.Clamp(transform.position.x, leftborder, rightborder); //math.clamp permet de delimiter
			transform.position.y = Mathf.Clamp(transform.position.y, topborder, bottomborder); //math.clamp permet de delimiter
			
			//transform.Translate(inputx / 40, inputy / 40, 0);	
			
			if(inputx != 0 || inputy != 0){
				this.gameObject.rigidbody2D.AddForce(Vector2(inputx, inputy));
			}
			else{
				this.gameObject.rigidbody2D.velocity = Vector2.zero;
			}
			
    }
}

function player(){

	// a optimiser a la fin.. use tag instead of find. 

	if(move_or_not){
		var haut = GameObject.Find("Haut");
		var bas = GameObject.Find("Bas");
		var droite = GameObject.Find("Droite");
		var gauche = GameObject.Find("Gauche");

		
		if(Input.GetKey(KeyCode.DownArrow)){
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = true;
			bas.GetComponent(Animator).enabled = true;
			pos = 0;
		}
		else if(Input.GetKey(KeyCode.LeftArrow)){
			haut.renderer.enabled = false;
			gauche.renderer.enabled = true;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gauche.GetComponent(Animator).enabled = true;
			pos = 1;
		}
		else if(Input.GetKey(KeyCode.RightArrow)){
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = true;
			bas.renderer.enabled = false;
			droite.GetComponent(Animator).enabled = true;
			pos = 2;
		}
		else if(Input.GetKey(KeyCode.UpArrow)){
			haut.renderer.enabled = true;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			haut.GetComponent(Animator).enabled = true;
			
			pos = 3;
		}
		else{
			haut.GetComponent(Animator).enabled = false;
			gauche.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = false;
			bas.GetComponent(Animator).enabled = false;
		}
	}
	
	
	
}

function blink(){
	// disable moving
	move_or_not = false;
	
	var haut = GameObject.Find("Haut");
	var bas = GameObject.Find("Bas");
	var droite = GameObject.Find("Droite");
	var gauche = GameObject.Find("Gauche");
	
	var tab = [bas, gauche, droite, haut];
	
	tab[pos].renderer.enabled = false;
	yield WaitForSeconds(0.25);
	tab[pos].renderer.enabled = true;
	yield WaitForSeconds(0.25);
	tab[pos].renderer.enabled = false;
	yield WaitForSeconds(0.25);
	tab[pos].renderer.enabled = true;
	yield WaitForSeconds(0.25);
	tab[pos].renderer.enabled = false;
	yield WaitForSeconds(0.25);
	tab[pos].renderer.enabled = true;

	// enable moving
	move_or_not = true;
}

function Update () {
	move();
	player();

}

function FixedUpdate()
   {
         if(rigidbody2D.velocity.magnitude > 1)
         {	
         		rigidbody2D.velocity = rigidbody2D.velocity.normalized * 1;   
         }
   }
