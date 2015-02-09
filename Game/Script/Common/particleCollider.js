#pragma strict

function Start () {

}

function OnParticleCollision(particle : GameObject){
	var player = GameObject.FindWithTag("Player");
	var healthComponent = player.GetComponent(playercol);
	healthComponent.health -= 0.5;
}

function Update () {

}
