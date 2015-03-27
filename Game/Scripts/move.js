#pragma strict
public var pos : int;
var speed = new Vector2(1.00, 1.00);
var force : int = 1;
var move_or_not : boolean = true;
var direction : GameObject;
var firerate : float = 0.5;
var nextFire : float = 1.0;
var canAnim : boolean = true;
var DisPressed : boolean = false;
var EisPressed : boolean = false;
var etape : int = 0;
var savon : boolean = false;
var fumee : boolean = true;
var hautrouge = GameObject;
var basrouge = GameObject;
var droiterouge = GameObject;
var gaucherouge = GameObject;

// son
var fioleSon : AudioClip;
var savonSon : AudioClip;
var smokeSon : AudioClip;
var gazSon : AudioClip;
var mousseSon : AudioClip;
var fireSon : AudioClip;
	


function Start(){
if (PlayerPrefs.GetFloat("speedx")){
speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy")); // Récupération du niveau du vitesse du joueur si il a déjà joué au jeu.
}
else{ // S'il n'a pas encore joué, on set la vitesse à 1.
PlayerPrefs.SetFloat("speedx",1);
PlayerPrefs.SetFloat("speedy",1);
speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
}
PlayerPrefs.SetInt("launchAnim", 1);




}

function move(){



var playerdist = (this.transform.position.y - Camera.main.transform.position.y); // calcul la position du player par rapport à la caméra
			// limitation de la cam p le player
			var leftborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdist)).x; //gauche
			var rightborder = Camera.main.ViewportToWorldPoint(Vector3(1,0,playerdist)).x; //droite
			var topborder = Camera.main.ViewportToWorldPoint(Vector3(0,0,playerdist)).y; //haut
			var bottomborder = Camera.main.ViewportToWorldPoint(Vector3(0,1,playerdist)).y; //bas
			transform.position.x = Mathf.Clamp(transform.position.x, leftborder, rightborder); //math.clamp permet de delimiter
			transform.position.y = Mathf.Clamp(transform.position.y, topborder, bottomborder); 
      var move = new Vector2();

		// Récupération des touches haut et bas
		// Si on appuie sur Haut + Gauche ou Droite, la vitesse était doublée le speed/200 permet de revenir à la normal quand on va en diagonale.
		if(Input.GetKey(KeyCode.UpArrow) && Input.GetKey(KeyCode.LeftArrow)){
		// On se déplace sur l'axe Y plus ou moins vite en fonction du speed, récupéré de la machine à Gemmes. (Plus le niveau est élevé, plus le speed augmente).
			move.y += speed.y/200;
		}
		else if(Input.GetKey(KeyCode.UpArrow) && Input.GetKey(KeyCode.RightArrow)){
			move.y += speed.y/200;
		}
			else if(Input.GetKey(KeyCode.UpArrow)){
			move.y += speed.y/100;
		}
		
		
		if(Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.LeftArrow)){
			move.y -= speed.y/200;
		}
		else if(Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.RightArrow)){
			move.y -= speed.y/200;
		}
			else if(Input.GetKey(KeyCode.DownArrow)){
			move.y -= speed.y/100;
		}
		
		// Récupération des touches gauche et droite
		if(Input.GetKey(KeyCode.LeftArrow)){
		// On se déplace sur l'axe Y plus ou moins vite en fonction du speed, récupéré de la machine à Gemmes. (Plus le niveau est élevé, plus le speed augmente).

			move.x -= speed.x/100;
			}
		if(Input.GetKey(KeyCode.RightArrow)){
			move.x += speed.x/100;
			}

		// On applique le mouvement à l'objet
		transform.position += move;
}
    
function player(){
var player = GameObject.Find("Player"); // Trouver le player dans la scène
var shot = player.GetComponent(shoot); // Se "connecter" à son script shoot.js qui lui est attaché
var playercol = player.GetComponent(playercol); // Se "connecter" à son script playercol.js qui lui est attaché
		// Toutes les positions suivantes (savon et feu) permettent d'instancier les attaques aux bons endroits par rapport à Spike. Devant derrière etc.
		var newpositionZsavonHaut = 3.85;
		var newpositionYsavonHaut = player.transform.position.y + 0.25;
		var newpositionXsavonHaut = player.transform.position.x;
		var newpositionsavonHaut = new Vector3(newpositionXsavonHaut, newpositionYsavonHaut, newpositionZsavonHaut);
		var newpositionZsavonDroite = 3.85;
		var newpositionYsavonDroite = player.transform.position.y - 0.1;
		var newpositionXsavonDroite = player.transform.position.x + 0.25;
		var newpositionsavonDroite = new Vector3(newpositionXsavonDroite, newpositionYsavonDroite, newpositionZsavonHaut);
		var newpositionZsavonGauche = 3.85;
		var newpositionYsavonGauche = player.transform.position.y - 0.1;
		var newpositionXsavonGauche = player.transform.position.x - 0.25;
		var newpositionsavonGauche = new Vector3(newpositionXsavonGauche, newpositionYsavonGauche, newpositionZsavonGauche);
		var newpositionZsavonBas = 3.85;
		var newpositionYsavonBas = player.transform.position.y - 0.25;
		var newpositionXsavonBas = player.transform.position.x;
		var newpositionsavonBas = new Vector3(newpositionXsavonBas, newpositionYsavonBas, newpositionZsavonBas);
		
		var post = pos; // post correspond au sens dans lequel on se trouve.
		
		var positionfeuhautZ = 3.85;
		var positionfeuhautY = player.transform.position.y + 0.5;
		var positionfeuhautX = player.transform.position.x;
		var positionfeuhaut = new Vector3(positionfeuhautX, positionfeuhautY, positionfeuhautZ);
		var positionfeudroiteZ = 3.85;
		var positionfeudroitY = player.transform.position.y;
		var positionfeudroiteX = player.transform.position.x + 0.5;
		var positionfeudroite = new Vector3(positionfeudroiteX, positionfeudroitY, positionfeudroiteZ);
		var positionfeugaucheZ = 3.85;
		var positionfeugaucheY = player.transform.position.y;
		var positionfeugaucheX = player.transform.position.x - 0.5;
		var positionfeugauche = new Vector3(positionfeugaucheX, positionfeugaucheY, positionfeugaucheZ);
		var positionfeubasZ = -2.56;
		var positionfeubasY = player.transform.position.y - 0.5;
		var positionfeubasX = player.transform.position.x;
		var positionfeubas = new Vector3(positionfeubasX, positionfeubasY, positionfeubasZ);
		
	if(move_or_not){ // Si on n'a pas bloqué le mouvement, on récupère tous les sprites de Spike dans des variables
		var haut = GameObject.Find("Haut");
		var bas = GameObject.Find("Bas");
		var droite = GameObject.Find("Droite");
		var gauche = GameObject.Find("Gauche");
		var fumee = GameObject.Find("Fumee");
		var gaz = GameObject.Find("Gaz");
		var savonBas = GameObject.Find("SavonpersoBas");
		var savonHaut = GameObject.Find("SavonpersoHaut");
		var savonDroite = GameObject.Find("SavonpersoDroite");
		var savonGauche = GameObject.Find("SavonpersoGauche");
		var mousseGauche = GameObject.Find("mousseGauche");
		var mousseDroite = GameObject.Find("mousseDroite");
		var mousseDos = GameObject.Find("mousseDos");
		var mousseFace = GameObject.Find("mousseFace");
		var FeupersoHaut = GameObject.Find("FeupersoHaut");
		var FeupersoGauche = GameObject.Find("FeupersoGauche");
		var FeupersoDroite = GameObject.Find("FeupersoDroite");
		var FeupersoBas = GameObject.Find("FeupersoBas");
		
		if(PlayerPrefs.GetInt("setPosition") == 1 || Input.GetKey(KeyCode.DownArrow) && Input.GetKey(KeyCode.V) == false && Input.GetKey(KeyCode.B) == false){
		// Si on appuie sur la flèche du bas, on désactive tous les sprites sauf celui du bas.
		
		if (canAnim == true){
			/*if(PlayerPrefs.GetInt("marche")){
				PlayerPrefs.SetInt("setPosition", 0);
			}*/
			FeupersoBas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = true;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			if(PlayerPrefs.GetInt("launchAnim")){
				bas.GetComponent(Animator).enabled = true;
			}
			else{
				bas.GetComponent(Animator).enabled = false;
			}
			
				//PlayerPrefs.SetInt("setPosition", 0);
				savonHaut.renderer.enabled = false;
				savonBas.renderer.enabled = false;
				savonGauche.renderer.enabled = false;
				savonDroite.renderer.enabled = false;
				pos = 0;
			
		}
		if(savon == true){ // Si on peut lancer de la mousse, on attend le cooldown et on lance l'attaque
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(mousseSon);
 		canAnim = false;
		nextFire = Time.time / 2 + 1;
	var moussebasmove : GameObject = Instantiate(Resources.Load('mousseVertical') as GameObject, newpositionsavonBas ,player.transform.rotation);
				Destroy(moussebasmove, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseFace.renderer.enabled = true;
			mousseFace.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1); // Le temps de l'animation
			playercol.score = playercol.score + 2;
			bas.GetComponent(Animator).enabled = true;
		canAnim = true;
		savon = false;
		}
		}
		if(Input.GetKey(KeyCode.A) && PlayerPrefs.GetInt("feu") == 1){ // Si on a débloqué le feu
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		audio.PlayOneShot(fireSon);
		speed = Vector2(0,0);
		nextFire = Time.time / 2 + 1;
		 		canAnim = false;
		var feubasmove : GameObject = Instantiate(Resources.Load('FeuBas') as GameObject, positionfeubas ,player.transform.rotation);
				Destroy(feubasmove, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoBas.renderer.enabled = true;
			FeupersoBas.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			bas.GetComponent(Animator).enabled = true;
			canAnim = true;
		}
		}
		}
		if(Input.GetKey(KeyCode.C)){ // Attaque de base
				if(Time.time / 2 > nextFire){
		
		nextFire = Time.time / 2 + 0.5 * firerate;
		
		var bullet : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
				if(post == 0){
			bullet.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bullet.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bullet.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bullet.rigidbody2D.AddForce(Vector3.up * 100);
		} 		
				 		canAnim = false; // Permet de bloquer les autres sprites.
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseFace.renderer.enabled = true;
			mousseFace.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			bas.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
		}
		if(Input.GetKey(KeyCode.Z) && PlayerPrefs.GetInt("gaz") == 1){ // Si on a débloqué le Gaz dans l'alambic
 		if(Input.GetKey(KeyCode.R)){
 		if(Time.time / 2 > nextFire){
 			audio.PlayOneShot(gazSon);
		nextFire = Time.time / 2 + 1;
 		canAnim = false;
 			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = true;
			gaz.GetComponent(Animator).enabled = true;
				Instantiate(Resources.Load("Gaz"), Vector3(transform.position.x, transform.position.y, transform.position.z + .1), Quaternion.identity);
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			gaz.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
 		}
 		}
 		
		if(Input.GetKey(KeyCode.E) && PlayerPrefs.GetInt("fumee") == 1 && fumee == true){ // Si on a débloqué la fumée
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){;
		audio.PlayOneShot(smokeSon);
		nextFire = Time.time / 2 + 1;
		canAnim = false;
		mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			fumee.renderer.enabled = true;
			fumee.GetComponent(Animator).enabled = true;
			Instantiate(Resources.Load("Fumee"),Vector3(transform.position.x, transform.position.y, transform.position.z + 0.1), Quaternion.identity);
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			fumee.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
 		}
 		}
 		}	
					if(Input.GetKey(KeyCode.Q) && PlayerPrefs.GetInt("savon") == 1){ // Si on a le savon
 		if (Input.GetKey(KeyCode.F)){
 		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("savon") == 1){
 		audio.PlayOneShot(fioleSon);
 		audio.PlayOneShot(savonSon);
 		canAnim = false;
		nextFire = Time.time / 2 + 1;
			var savonbas : GameObject = Instantiate(Resources.Load('SavonBas') as GameObject, newpositionsavonBas ,player.transform.rotation);
							haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonBas.renderer.enabled = true;
			savonBas.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			bas.GetComponent(Animator).enabled = true;
				Destroy(savonbas, 1);
				canAnim = true;
		}
		}
		}
		}
		
		
		// Le code ci-dessus pemet de lancer les attaques en se déplaçant vers le bas. Le code qui suit est le même mais dans 
		// les autres directions. En fonction de la direction, on n'instancie pas les éléments aux mêmes endroits et on ne lance
		// pas les mêmes animations.
		
		
		else if(Input.GetKey(KeyCode.LeftArrow) && Input.GetKey(KeyCode.V) == false && Input.GetKey(KeyCode.B) == false){
		if (canAnim == true){
		FeupersoBas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
		mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = true;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			gauche.GetComponent(Animator).enabled = true;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			pos = 1;
		}
		if(Input.GetKey(KeyCode.C)){
				if(Time.time / 2 > nextFire){
		
		nextFire = Time.time / 2 + 0.5 * firerate;
		
		var bullet2 : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
			if(post == 0){
			bullet2.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bullet2.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bullet2.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bullet2.rigidbody2D.AddForce(Vector3.up * 100);
		}	 		
				 		canAnim = false;
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseGauche.renderer.enabled = true;
			mousseGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			gauche.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
		}
		if(savon == true){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(mousseSon);
 		canAnim = false;
		nextFire = Time.time / 2 + 1;
	var moussegauchemove : GameObject = Instantiate(Resources.Load('mousseHorizontal') as GameObject, newpositionsavonGauche ,player.transform.rotation);
				Destroy(moussegauchemove, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseGauche.renderer.enabled = true;
			mousseGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			gauche.GetComponent(Animator).enabled = true;
		canAnim = true;
		savon = false;
		}
		}
		if(Input.GetKey(KeyCode.A) && PlayerPrefs.GetInt("feu") == 1){
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		audio.PlayOneShot(fireSon);
		nextFire = Time.time / 2 + 1;
				speed = Vector2(0,0);
		 		canAnim = false;
		var feugauchemove : GameObject = Instantiate(Resources.Load('FeuGauche') as GameObject, positionfeugauche ,player.transform.rotation);
				Destroy(feugauchemove, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoBas.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = true;
			FeupersoGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			gauche.GetComponent(Animator).enabled = true;
				canAnim = true;
				speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
		}
		}
		}
		if(Input.GetKey(KeyCode.Z) && PlayerPrefs.GetInt("gaz") == 1){
 		if(Input.GetKey(KeyCode.R)){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(gazSon);
		nextFire = Time.time / 2 + 1;
 		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = true;
			gaz.GetComponent(Animator).enabled = true;
			Instantiate(Resources.Load("Gaz"), Vector3(transform.position.x, transform.position.y, transform.position.z + .1), Quaternion.identity);
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			gaz.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
 		}
 		}
 		
				if(Input.GetKey(KeyCode.E) && PlayerPrefs.GetInt("fumee") == 1){
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		audio.PlayOneShot(smokeSon);
		audio.PlayOneShot(smokeSon);
		nextFire = Time.time / 2 + 1;
		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			fumee.renderer.enabled = true;
			fumee.GetComponent(Animator).enabled = true;
			Instantiate(Resources.Load("Fumee"), Vector3(transform.position.x, transform.position.y, transform.position.z + 0.1), Quaternion.identity);
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			fumee.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
			
		canAnim = true;
		}
		}
		}
			 	 	if(Input.GetKey(KeyCode.Q) && PlayerPrefs.GetInt("savon") == 1){
 		if (Input.GetKey(KeyCode.F)){
 		 		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("savon") == 1){
 		 		audio.PlayOneShot(fioleSon);
 		 		audio.PlayOneShot(savonSon);
 		 		canAnim = false;
		nextFire = Time.time / 2 + 1;
			var savongauche : GameObject = Instantiate(Resources.Load('SavonGauche') as GameObject, newpositionsavonGauche ,player.transform.rotation);
				Destroy(savongauche, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = true;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = false;
			savonGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			gauche.GetComponent(Animator).enabled = true;
			canAnim = true;
		}
		}
		}
		}
		
		
		
		else if(Input.GetKey(KeyCode.RightArrow) && Input.GetKey(KeyCode.V) == false && Input.GetKey(KeyCode.B) == false){
		if (canAnim == true){
		FeupersoBas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
		mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = true;
			bas.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			droite.GetComponent(Animator).enabled = true;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			pos = 2;
		}
		if(Input.GetKey(KeyCode.C)){
				if(Time.time / 2 > nextFire){
		
		nextFire = Time.time / 2 + 0.5 * firerate;
		
		var bullet3 : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
					if(post == 0){
			bullet3.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bullet3.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bullet3.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bullet3.rigidbody2D.AddForce(Vector3.up * 100);
		}	 		
				 		canAnim = false;
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDroite.renderer.enabled = true;
			mousseDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
		}
		if(savon == true){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(mousseSon);
 		canAnim = false;
		nextFire = Time.time / 2 + 1;
	var moussedroitemove : GameObject = Instantiate(Resources.Load('mousseHorizontal') as GameObject, newpositionsavonDroite ,player.transform.rotation);
				Destroy(moussedroitemove, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDroite.renderer.enabled = true;
			mousseDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
		savon = false;
		}
		}
		 if(Input.GetKey(KeyCode.A) && PlayerPrefs.GetInt("feu") == 1){
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		audio.PlayOneShot(fireSon);
		speed = Vector2(0,0);
		nextFire = Time.time / 2 + 1;
		 		canAnim = false;
			var feudroitemove : GameObject = Instantiate(Resources.Load('FeuDroite') as GameObject, positionfeudroite ,player.transform.rotation);
				Destroy(feudroitemove, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoBas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = true;
			FeupersoDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			droite.GetComponent(Animator).enabled = true;
				canAnim = true;
				speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
			playercol.score = playercol.score + 2;
		}
		}
		}
		if(Input.GetKey(KeyCode.Z) && PlayerPrefs.GetInt("gaz") == 1){
 		if(Input.GetKey(KeyCode.R)){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(gazSon);
		nextFire = Time.time / 2 + 1;
 		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = true;
			gaz.GetComponent(Animator).enabled = true;
				Instantiate(Resources.Load("Gaz"), Vector3(transform.position.x, transform.position.y, transform.position.z + .1), Quaternion.identity);
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			gaz.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
 		}
 		}
 		}
 		
				if(Input.GetKey(KeyCode.E) && PlayerPrefs.GetInt("fumee") == 1){
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		
		audio.PlayOneShot(smokeSon);
		nextFire = Time.time / 2 + 1;
		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			fumee.renderer.enabled = true;
			fumee.GetComponent(Animator).enabled = true;
			Instantiate(Resources.Load("Fumee"), Vector3(transform.position.x, transform.position.y, transform.position.z + 0.1), Quaternion.identity);
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			fumee.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
		}
		}
		if(Input.GetKey(KeyCode.Q)){
		if (Input.GetKey(KeyCode.F)){
 		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("savon") == 1){
 		audio.PlayOneShot(fioleSon);
 		audio.PlayOneShot(savonSon);
 		canAnim = false;
		nextFire = Time.time / 2 + 1;
			var savondroite : GameObject = Instantiate(Resources.Load('SavonDroite') as GameObject, newpositionsavonDroite ,player.transform.rotation);
				Destroy(savondroite, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = true;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = false;
			savonDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			droite.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
		}
		}
		}
		
	
		
		else if(Input.GetKey(KeyCode.UpArrow) && Input.GetKey(KeyCode.V) == false && Input.GetKey(KeyCode.B) == false){
		if (canAnim == true){
		FeupersoBas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			haut.renderer.enabled = true;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			haut.GetComponent(Animator).enabled = true;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			pos = 3;
		}
		if(Input.GetKey(KeyCode.C)){
				if(Time.time / 2 > nextFire){
		
		nextFire = Time.time / 2 + 0.5 * firerate;
		
		var bullet4 : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
					if(post == 0){
			bullet4.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bullet4.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bullet4.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bullet4.rigidbody2D.AddForce(Vector3.up * 100);
		}	 		
				 		canAnim = false;
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDos.renderer.enabled = true;
			mousseDos.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			haut.GetComponent(Animator).enabled = true;
		canAnim = true;
		}
		}
		if(savon == true){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(mousseSon);
 		canAnim = false;
		nextFire = Time.time / 2 + 1;
	var moussehautmove : GameObject = Instantiate(Resources.Load('mousseVertical') as GameObject, newpositionsavonHaut ,player.transform.rotation);
				Destroy(moussehautmove, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDos.renderer.enabled = true;
			mousseDos.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			haut.GetComponent(Animator).enabled = true;
		canAnim = true;
		savon = false;
		}
		}
		 if(Input.GetKey(KeyCode.A) && PlayerPrefs.GetInt("feu") == 1){
	if(Input.GetKey(KeyCode.D)){
	if(Time.time / 2 > nextFire){
		audio.PlayOneShot(fireSon);
	speed = Vector2(0,0);
	 		canAnim = false;
		nextFire = Time.time / 2 + 1;
		var feuhautmove : GameObject = Instantiate(Resources.Load('FeuHaut') as GameObject, positionfeuhaut ,player.transform.rotation);
				Destroy(feuhautmove, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoBas.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = true;
			FeupersoHaut.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			haut.GetComponent(Animator).enabled = true;
			canAnim = true;
			speed = Vector2(PlayerPrefs.GetFloat("speedx"),PlayerPrefs.GetFloat("speedy"));
		}
		}
		}
		if(Input.GetKey(KeyCode.Z) && PlayerPrefs.GetInt("gaz") == 1){
 		if(Input.GetKey(KeyCode.R)){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(gazSon);
		nextFire = Time.time / 2 + 1;
 		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = true;
			gaz.GetComponent(Animator).enabled = true;
				Instantiate(Resources.Load("Gaz"), Vector3(transform.position.x, transform.position.y, transform.position.z + .1), Quaternion.identity);
			yield WaitForSeconds(1);
			gaz.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
			playercol.score = playercol.score + 2;
		canAnim = true;
		}
 		}
 		}
 		if(Input.GetKey(KeyCode.E) && PlayerPrefs.GetInt("fumee") == 1){
 		
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		
		audio.PlayOneShot(smokeSon);
		nextFire = Time.time / 2 + 1;
		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			fumee.renderer.enabled = true;
			fumee.GetComponent(Animator).enabled = true;
			Instantiate(Resources.Load("Fumee"),Vector3(transform.position.x, transform.position.y, transform.position.z + 0.1), Quaternion.identity);
			yield WaitForSeconds(1);
			fumee.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
			playercol.score = playercol.score + 2;
		canAnim = true;
		}
		}
		}
		if(Input.GetKey(KeyCode.Q) && PlayerPrefs.GetInt("savon") == 1){
 		if (Input.GetKey(KeyCode.F)){
 		canAnim = false;
 		Debug.Log("jdkjsbkjbvkjdfhgbnnb");
 		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("savon") == 1){
 		audio.PlayOneShot(fioleSon);
 		audio.PlayOneShot(savonSon);
		nextFire = Time.time / 2 + 1;
	var savonhaut : GameObject = Instantiate(Resources.Load('SavonHaut') as GameObject, newpositionsavonHaut ,player.transform.rotation);
				Destroy(savonhaut, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = true;
			savonHaut.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			haut.GetComponent(Animator).enabled = true;
			canAnim = true;
		}
		}
		}
		}
		
		
		else if(Input.GetKey(KeyCode.E) && PlayerPrefs.GetInt("fumee") == 1){
		if(Input.GetKey(KeyCode.D)){
		if(Time.time / 2 > nextFire){
		audio.PlayOneShot(smokeSon);
		nextFire = Time.time / 2 + 1;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			fumee.renderer.enabled = true;
			fumee.GetComponent(Animator).enabled = true;
			Instantiate(Resources.Load("Fumee"),Vector3(transform.position.x, transform.position.y, transform.position.z + 0.1), Quaternion.identity);
			yield WaitForSeconds(1);
			fumee.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
			playercol.score = playercol.score + 2;
 		}
 		}
 		}
 		else if(Input.GetKey(KeyCode.Z) && PlayerPrefs.GetInt("gaz") == 1){
 		if(Input.GetKey(KeyCode.R)){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(gazSon);
		nextFire = Time.time / 2 + 1;
 		canAnim = false;
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			gaz.renderer.enabled = true;
			gaz.GetComponent(Animator).enabled = true;
				Instantiate(Resources.Load("Gaz"), Vector3(transform.position.x, transform.position.y, transform.position.z + .1), Quaternion.identity);
			yield WaitForSeconds(1);
			gaz.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = true;
			playercol.score = playercol.score + 2;
		canAnim = true;
		}
 		}
 		}

		else if(savon == true){
 		if(Time.time / 2 > nextFire){
 		audio.PlayOneShot(mousseSon);
		nextFire = Time.time / 2 + 1;
		if (haut.renderer.enabled == true){
	var moussehaut : GameObject = Instantiate(Resources.Load('mousseVertical') as GameObject, newpositionsavonHaut ,player.transform.rotation);
				Destroy(moussehaut, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDos.renderer.enabled = true;
			mousseDos.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			haut.GetComponent(Animator).enabled = true;
			savon = false;
		}
		else if (bas.renderer.enabled == true){
			audio.PlayOneShot(mousseSon);
	var moussebas : GameObject = Instantiate(Resources.Load('mousseVertical') as GameObject, newpositionsavonBas ,player.transform.rotation);
				Destroy(moussebas, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseFace.renderer.enabled = true;
			mousseFace.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			bas.GetComponent(Animator).enabled = true;
			savon = false;
		}
		else if (gauche.renderer.enabled == true){
			audio.PlayOneShot(mousseSon);
	var moussegauche : GameObject = Instantiate(Resources.Load('mousseHorizontal') as GameObject, newpositionsavonGauche ,player.transform.rotation);
				Destroy(moussegauche, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseGauche.renderer.enabled = true;
			mousseGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			gauche.GetComponent(Animator).enabled = true;
			savon = false;
		}
		else if (droite.renderer.enabled == true){
			audio.PlayOneShot(mousseSon);
	var moussedroite : GameObject = Instantiate(Resources.Load('mousseHorizontal') as GameObject, newpositionsavonDroite ,player.transform.rotation);
			Destroy(moussedroite, 3);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDroite.renderer.enabled = true;
			mousseDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			droite.GetComponent(Animator).enabled = true;
			savon = false;
		}
		}
		}
	else if(Input.GetKey(KeyCode.C)){
				if(Time.time / 2 > nextFire){
		nextFire = Time.time / 2 + 0.5 * firerate;
		if (bas.renderer.enabled == true){
		var bulletstop : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
				if(post == 0){
			bulletstop.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bulletstop.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bulletstop.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bulletstop.rigidbody2D.AddForce(Vector3.up * 100);
		} 		
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseFace.renderer.enabled = true;
			mousseFace.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			bas.GetComponent(Animator).enabled = true;
		}
		else if (gauche.renderer.enabled == true){
		var bulletstop2 : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
				if(post == 0){
			bulletstop2.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bulletstop2.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bulletstop2.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bulletstop2.rigidbody2D.AddForce(Vector3.up * 100);
		} 		
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseGauche.renderer.enabled = true;
			mousseGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			gauche.GetComponent(Animator).enabled = true;
		}
		else if (haut.renderer.enabled == true){
		var bulletstop3 : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
				if(post == 0){
			bulletstop3.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bulletstop3.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bulletstop3.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bulletstop3.rigidbody2D.AddForce(Vector3.up * 100);
		} 		
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseDroite.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDos.renderer.enabled = true;
			mousseDos.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			haut.GetComponent(Animator).enabled = true;
		}
		else if (droite.renderer.enabled == true){
		var bulletstop4 : GameObject = Instantiate(Resources.Load('shoot_player') as GameObject, player.transform.position ,player.transform.rotation);
				if(post == 0){
			bulletstop4.rigidbody2D.AddForce(Vector3.down * 100);
		}
		else if(post == 1){
			bulletstop4.rigidbody2D.AddForce(Vector3.left * 100);
		}
		else if(post == 2){
			bulletstop4.rigidbody2D.AddForce(Vector3.right * 100);
		}
		else if(post == 3){
			bulletstop4.rigidbody2D.AddForce(Vector3.up * 100);
		} 		
				haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			mousseDos.renderer.enabled = false;
			mousseFace.renderer.enabled = false;
			mousseGauche.renderer.enabled = false;
			fumee.renderer.enabled = false;
			gaz.renderer.enabled = false;
			bas.renderer.enabled = false;
			mousseDroite.renderer.enabled = true;
			mousseDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(0.5);
			droite.GetComponent(Animator).enabled = true;
		}
		}
		}
	else if(Input.GetKey(KeyCode.A) && PlayerPrefs.GetInt("feu") == 1){
	if(Input.GetKey(KeyCode.D)){
 		if(Time.time / 2 > nextFire){
 			audio.PlayOneShot(fireSon);
		nextFire = Time.time / 2 + 1;
		if (haut.renderer.enabled == true){
	var feuhaut : GameObject = Instantiate(Resources.Load('FeuHaut') as GameObject, positionfeuhaut ,player.transform.rotation);
				Destroy(feuhaut, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoBas.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = true;
			FeupersoHaut.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			playercol.score = playercol.score + 2;
			haut.GetComponent(Animator).enabled = true;
		}
		else if (bas.renderer.enabled == true){
	var feubas : GameObject = Instantiate(Resources.Load('FeuBas') as GameObject, positionfeubas ,player.transform.rotation);
				Destroy(feubas, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoBas.renderer.enabled = true;
			FeupersoBas.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			gauche.GetComponent(Animator).enabled = true;
		}
		else if (gauche.renderer.enabled == true){
	var feugauche : GameObject = Instantiate(Resources.Load('FeuGauche') as GameObject, positionfeugauche ,player.transform.rotation);
				Destroy(feugauche, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoBas.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = true;
			FeupersoGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			gauche.GetComponent(Animator).enabled = true;
		}
		else if (droite.renderer.enabled == true){
	var feudroite : GameObject = Instantiate(Resources.Load('FeuDroite') as GameObject, positionfeudroite ,player.transform.rotation);
				Destroy(feudroite, 1);
			haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			FeupersoBas.renderer.enabled = false;
			FeupersoHaut.renderer.enabled = false;
			FeupersoGauche.renderer.enabled = false;
			bas.renderer.enabled = false;
			FeupersoDroite.renderer.enabled = true;
			FeupersoDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			droite.GetComponent(Animator).enabled = true;
		}
		}
		}
		}
	else if(Input.GetKey(KeyCode.Q) && PlayerPrefs.GetInt("savon") == 1){
 		if (Input.GetKey(KeyCode.F)){
 		if(Time.time / 2 > nextFire && PlayerPrefs.GetInt("savon") == 1){
		nextFire = Time.time / 2 + 1;
		if (bas.renderer.enabled == true){
			var savonbasnomove : GameObject = Instantiate(Resources.Load('SavonBas') as GameObject, newpositionsavonBas ,player.transform.rotation);
							haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonHaut.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonBas.renderer.enabled = true;
			savonBas.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			bas.GetComponent(Animator).enabled = true;
				Destroy(savonbasnomove, 1);
			}
		if (haut.renderer.enabled == true){
			var savonhautnomove : GameObject = Instantiate(Resources.Load('SavonHaut') as GameObject, newpositionsavonHaut ,player.transform.rotation);
							haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonHaut.renderer.enabled = true;
			savonHaut.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			haut.GetComponent(Animator).enabled = true;
				Destroy(savonhautnomove, 1);
			}
		if (gauche.renderer.enabled == true){
			var savongauchenomove : GameObject = Instantiate(Resources.Load('SavonGauche') as GameObject, newpositionsavonGauche ,player.transform.rotation);
							haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonGauche.renderer.enabled = true;
			savonGauche.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			gauche.GetComponent(Animator).enabled = true;
				Destroy(savongauchenomove, 1);
			}
		if (droite.renderer.enabled == true){
			var savondroitenomove : GameObject = Instantiate(Resources.Load('SavonDroite') as GameObject, newpositionsavonDroite ,player.transform.rotation);
							haut.renderer.enabled = false;
			gauche.renderer.enabled = false;
			droite.renderer.enabled = false;
			savonBas.renderer.enabled = false;
			savonGauche.renderer.enabled = false;
			savonDroite.renderer.enabled = false;
			bas.renderer.enabled = false;
			savonDroite.renderer.enabled = true;
			savonDroite.GetComponent(Animator).enabled = true;
			yield WaitForSeconds(1);
			droite.GetComponent(Animator).enabled = true;
				Destroy(savondroitenomove, 1);
			}
		}
		}
		}

		else{
			FeupersoBas.GetComponent(Animator).enabled = false;
			FeupersoHaut.GetComponent(Animator).enabled = false;
			FeupersoGauche.GetComponent(Animator).enabled = false;
			FeupersoDroite.GetComponent(Animator).enabled = false;
			mousseFace.GetComponent(Animator).enabled = false;
			mousseGauche.GetComponent(Animator).enabled = false;
			mousseDroite.GetComponent(Animator).enabled = false;
			mousseDos.GetComponent(Animator).enabled = false;
			haut.GetComponent(Animator).enabled = false;
			gauche.GetComponent(Animator).enabled = false;
			droite.GetComponent(Animator).enabled = false;
			bas.GetComponent(Animator).enabled = false;
			fumee.GetComponent(Animator).enabled = false;
			gaz.GetComponent(Animator).enabled = false;
			savonHaut.GetComponent(Animator).enabled = false;
			savonBas.GetComponent(Animator).enabled = false;
			savonGauche.GetComponent(Animator).enabled = false;
			savonDroite.GetComponent(Animator).enabled = false;
		}
		
}
}

function Update () {

var player2 = GameObject.Find("Player");
var shot2 = player2.GetComponent(shoot);
var playercol2 = player2.GetComponent(playercol);
	move();
	player();
		// Problème avec Unity quand on lance trois Input.GetKey en même temps, les fonctions
		// IsDPressed et IsEPressed permettent d'activer pendant un certain temps la touche D 
		// et on peut donc lancer la mousse en appuyant sur 3 touches en même temps. Pareil pour touche().
	IsDPressed();
	IsEPressed();
	touche();
}


function IsDPressed(){
if (Input.GetKeyDown(KeyCode.D)){
		DisPressed = true;
		Debug.Log("D");
		yield WaitForSeconds(2);
		DisPressed = false;
}
}

function IsEPressed(){
if (Input.GetKeyDown(KeyCode.E)){
		EisPressed = true;
		Debug.Log("E");
		yield WaitForSeconds(2);
		EisPressed = false;
}
}

function touche(){
if(Input.GetKeyDown (KeyCode.S) && etape==0)
{
fumee = false;
print("Haut 1");
etape++;
yield WaitForSeconds(2);
etape = 0;
}
else if(Input.GetKeyDown (KeyCode.D) && etape==1)
{
fumee = false;
print("Haut 2");
etape++;
yield WaitForSeconds(2);
etape = 0;
}
else if(Input.GetKeyDown (KeyCode.E) && etape >= 2)
{
fumee = false;
savon = true;
etape = 0;
print("Reset");
}
}

function FixedUpdate()
   {
   }