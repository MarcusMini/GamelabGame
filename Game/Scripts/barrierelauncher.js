#pragma strict
var barrieredone : int;
var health : float;

function Start () {
if (PlayerPrefs.GetInt("Barriere") == 0){
	PlayerPrefs.SetInt("DeadGauche", 0);
	PlayerPrefs.SetInt("DeadHaut", 0);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
health = PlayerPrefs.GetFloat("Health"); 
if (PlayerPrefs.GetInt("Barriere") >= 1 && PlayerPrefs.GetInt("Barriere") < 8){
	PlayerPrefs.SetInt("DeadHaut", 1);
	PlayerPrefs.SetInt("Barriere", 1);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
if (PlayerPrefs.GetInt("Barriere") >= 8 && PlayerPrefs.GetInt("Barriere") < 12){
	PlayerPrefs.SetInt("DeadHaut", 1);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
if (PlayerPrefs.GetInt("Barriere") ==  13){
	PlayerPrefs.SetInt("DeadGauche", 1);
	PlayerPrefs.SetInt("DeadHaut", 1);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
if (PlayerPrefs.GetInt("Barriere") >= 12 && PlayerPrefs.GetInt("Barriere") < 18){
	PlayerPrefs.SetInt("DeadGauche", 1);
	PlayerPrefs.SetInt("DeadHaut", 1);
	PlayerPrefs.SetInt("Barriere", 12);
barrieredone = PlayerPrefs.GetInt("Barriere");
}

// rempalcer par 18 a la fin
if (PlayerPrefs.GetInt("Barriere") >= 18 && PlayerPrefs.GetInt("Barriere") < 21){
	PlayerPrefs.SetInt("DeadGauche", 1);
	PlayerPrefs.SetInt("DeadHaut", 1);
	PlayerPrefs.SetInt("Barriere", 18);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
if (PlayerPrefs.GetInt("Barriere") == 21){
	PlayerPrefs.SetInt("DeadGauche", 1);
	PlayerPrefs.SetInt("DeadHaut", 1);
	PlayerPrefs.SetInt("DeadDroite", 1);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
if (PlayerPrefs.GetInt("Barriere") >= 21){
	PlayerPrefs.SetInt("DeadGauche", 1);
	PlayerPrefs.SetInt("DeadHaut", 1);
	PlayerPrefs.SetInt("DeadDroite", 1);
	PlayerPrefs.SetInt("Barriere", 21);
barrieredone = PlayerPrefs.GetInt("Barriere");
}
}

function Update () {
Debug.Log(PlayerPrefs.GetInt("Barriere"));
PlayerPrefs.SetInt("Barriere", barrieredone);
}
