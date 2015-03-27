#pragma strict

var boss : int;
var prefab : Transform;

function Start () {
	
}

function Update () {
	if(Application.loadedLevelName == "boss"){
		if(!GameObject.Find("Boss")){
			Debug.Log("sa passe");
			if(!GameObject.Find("protection(Clone)")){
				Instantiate(prefab, Vector3(0,0,11.64), Quaternion.identity);
				PlayerPrefs.SetString("event", "grotte");
			}
		}
	}
	else{
		if(!GameObject.Find("Ennemi_Right")){	
			if(Application.loadedLevelName == "level1_d_grotte"){
				if(!GameObject.Find("gradientGG(Clone)")){
					Instantiate(prefab, Vector3(-3.92,-1.36,-2.28), Quaternion.identity);
				}
			}
			else{
				if(!GameObject.Find("echellegrotte(Clone)")){
					Instantiate(prefab, Vector3(-0.96,2.98,-1.71), Quaternion.identity);
				}
			}
		}
	}
}