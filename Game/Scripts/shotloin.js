#pragma strict
var isEnemyShot : boolean = false;
var damage : float = 0.34;

function Start () {
damage = 0.34 + PlayerPrefs.GetFloat("boostdegats") - 0.5;
if (isEnemyShot == true){
	Destroy(gameObject, 4);
}
}

function Update () {
}
