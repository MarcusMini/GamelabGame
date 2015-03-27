#pragma strict

function Start () {

}

function Update () {
	//var soundObj = gameObject.Find("Developers");
	
	var isactivate = PlayerPrefs.GetInt("Togglesound");
	
	if(isactivate == 1){
		audio.mute = false;
		PlayerPrefs.SetInt("Gactivateingui", 1);
	}
	else{
		audio.mute = true;
		PlayerPrefs.SetInt("Gactivateingui", 0);
	}
}