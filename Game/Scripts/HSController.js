private var secretKey="mySecretKey"; // Edit this value and make sure it's the same as the one stored on the server
var addScoreUrl="http://spikesadventure.fr/addtime.php?"; //be sure to add a ? to your url
var highscoreUrl="http://spikesadventure.fr/display.php?";    
var Pseudo : String;
var time : int;
var canLoad : boolean;
var envoi : int = 0;
var posclassement : GameObject;
var top11 : GameObject;
 
function Start() {
//PlayerPrefs.DeleteAll();
if (PlayerPrefs.GetInt("Destroygui") == 1){
var myTextInit= GetComponent(UI.Text);
    myTextInit.text = "<color=white>Chargez pour mettre les scores à jour!</color>";
    Debug.Log(time);
    }
}
 
function postScore(Pseudo, Temps, envoi) {
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.
    var hash=md5functions.Md5Sum(Pseudo + Temps + secretKey); 
 
    var highscore_url = addScoreUrl + "Pseudo=" + WWW.EscapeURL(Pseudo) + "&Temps=" + Temps + "&envoi=" + envoi + "&hash=" + hash;
 Debug.Log(highscore_url);

 yield WaitForSeconds(0.5);
    // Post the URL to the site and create a download object to get the result.
    hs_post = WWW(highscore_url);
    if(hs_post.error) {
        print("There was an error posting the high score: " + hs_post.error);
    }
    yield hs_post; // Wait until the download is done
     
    if(hs_post){
    var myTextPost= GetComponent(UI.Text);
    if (hs_post.text == "existe" &&  PlayerPrefs.GetInt("Destroygui") != 1){
    myTextPost.text = "<color=white>Désolé, ce chimiste existe déjà!</color>";
    }
    else{
    getScores(Pseudo);
    print("Score Posted!");
    PlayerPrefs.SetInt("Destroygui",1);
    }
}
}

// Get the scores from the MySQL DB to display in a GUIText.
function getScores(Pseudo) {
Debug.Log(Pseudo);
Debug.Log("try3");
Debug.Log(envoi);
var myText= GetComponent(UI.Text);
myText.text = "<color=black>Chargement des scores...</color>";
var highscorePseudo = highscoreUrl + "?Pseudo=" + WWW.EscapeURL(Pseudo);
Debug.Log(highscorePseudo);
    hs_get = WWW(highscorePseudo);
    yield hs_get;
    if(hs_get.error) {
    	print("There was an error getting the high score: " + hs_get.error);
    } else {
        myText.text = hs_get.text; // this is a GUIText that will display the scores in game.
        	posclassement = GameObject.Find("posclassement");
		posclassement.renderer.enabled = true;
		top11 = GameObject.Find("top11");
		top11.renderer.enabled = true;
    }
}

function Update(){
	if(canLoad == true){
    time = PlayerPrefs.GetInt("Score");
	if (PlayerPrefs.GetInt("Destroygui") == 1 && envoi == 0){
	Debug.Log("try");
    envoi = 1;
    updateScore(Pseudo, time, 1);
    getScores(Pseudo);
    print("Score Posted!");
    PlayerPrefs.SetInt("Destroygui",1);
    canLoad = false;
    }
    else{
   	postScore(Pseudo, time, 0);
   	canLoad = false;
	}
}
}

function updateScore(Pseudo, time, envoi) {
	Debug.Log("try2");
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.
    var hash=md5functions.Md5Sum(Pseudo + time + secretKey); 
 
    var highscore_url = addScoreUrl + "Pseudo=" + WWW.EscapeURL(Pseudo) + "&Temps=" + time + "&envoi=1&hash=" + hash;
 
    // Post the URL to the site and create a download object to get the result.
    hs_post = WWW(highscore_url);
    yield hs_post; // Wait until the download is done
    if(hs_post.error) {
        print("There was an error posting the high score: " + hs_post.error);
    }
}

// UPDATE LE SCORE QUAND ON VEUT