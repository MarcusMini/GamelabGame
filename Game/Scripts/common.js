#pragma strict

function Start () {

}

function Update () {

	// Eric, tu dois update ce fichier lorsque tu auras finis de faire le système d'attaque.
	// le but de ce script est de détruire l'objet buisson_pont lorsque tous les ennemies ont été détruit.	
	var obj = GameObject.Find("buisson_pont");
	var ennemy = GameObject.Find("Ennemy");
	
	if(!ennemy){
		Destroy(obj);
	}
}