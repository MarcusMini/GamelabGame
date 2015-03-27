#pragma strict
print(PlayerPrefs.GetInt("Statue1"));
var boxcollidersize = new Vector2(0.4, 0.5);

function Update() {
var box = gameObject.GetComponent(BoxCollider2D);
var canAppears = PlayerPrefs.GetInt("Statue1");
if (canAppears == 1) {
	Debug.Log("I'M COMING YEAH");
	PlayerPrefs.DeleteKey("Statue1");
	box.size = boxcollidersize;
	transform.position.z = 0;
}
}

