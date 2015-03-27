#pragma strict

// Cherry pick from Eric's shoot.js code.

private var firerate : float = 0.5;
private var nextFire : float = 1.0;

function Start () {

}

function Update () {
	if(Time.time / 2 > nextFire){
		nextFire = Time.time / 2 + 0.5 * firerate;
	}
}