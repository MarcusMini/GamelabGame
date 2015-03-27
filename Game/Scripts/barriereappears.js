#pragma strict
var howmanymonsters : int;

function Update() {
var canAppears = PlayerPrefs.GetInt("Barriere");
if (canAppears >= howmanymonsters) {
	PlayerPrefs.SetString("event", "barriere");
 	Destroy(this.gameObject); 	
 	Debug.Log("evenement "+PlayerPrefs.GetString("event"));
}
}

