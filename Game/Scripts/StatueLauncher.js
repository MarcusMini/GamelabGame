#pragma strict

var isStatueDone : int;
function Start () {
isStatueDone = 1;
PlayerPrefs.DeleteKey("Statue1");
}

function Update () {
print(PlayerPrefs.GetInt("Statue1"));
print(isStatueDone);
if (isStatueDone == 0 ){
    PlayerPrefs.SetInt("Statue1", 1);
	isStatueDone -= 1;
}
}
