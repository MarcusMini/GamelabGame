#pragma strict
var health : float = 5;

function Update() {
}

function Start(){
		// only use for debugging the game.
		var player2 = GameObject.Find("Player");
		var col = player2.GetComponent(playercol);
		PlayerPrefs.SetFloat("Health", PlayerPrefs.GetFloat("healthRestart"));
		PlayerPrefs.SetInt("Barriere", 0);
		PlayerPrefs.SetInt("DeadHaut", 0);
		PlayerPrefs.SetInt("DeadGauche", 0);
		PlayerPrefs.SetInt("DeadDroite", 0);
		PlayerPrefs.SetInt("afterGrotte", 0);
		PlayerPrefs.SetInt("FinalStep", 0);
		PlayerPrefs.SetInt("bourasqueval", 0);
		PlayerPrefs.SetInt("setAnimation", 0);
		PlayerPrefs.SetInt("FinalStep", 0);
		PlayerPrefs.SetString("event", "");
}
