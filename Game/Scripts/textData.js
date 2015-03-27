#pragma strict

function init(index : int, skills : String){
	var valeur : String;
	if(skills == "defense"){
		var defense : Defense = new Defense(index);
		valeur = PlayerPrefs.GetString("sendData");
	}
	else if(skills == "force"){
		var force : Force = new Force(index);
		valeur = PlayerPrefs.GetString("sendData");
	}
	else if(skills == "vision"){
		var vision : Vision = new Vision(index);
		valeur = PlayerPrefs.GetString("sendData");
	}
	else{
		var vitesse : Vitesse = new Vitesse(index);
		valeur = PlayerPrefs.GetString("sendData");
	}
	
	return valeur;
}

class Defense{
	var text1 = "Amélioration de niveau 1 : 1 gemme";
	var text2 = "Amélioration de niveau 2 : 2 gemmes";
	var text3 = "Amélioration de niveau 3 : 3 gemmes";
	var text4 = "Amélioration de niveau 4 : 4 gemmes";
	var text5 = "Amélioration de niveau 5 : 5 gemmes";
	var text6 = "Amélioration ultime : 6 gemmes";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	var price = [1,2,3,4,5,6];
	
	function Defense(index : int){
		var callData = "La défense est une notion importante, si tu veux vos protéger face à tes ennemis, tu dois être plus résistant ! Cette amélioration te permets d’augmenter ta vie et ainsi de moins subir les dégâts quand un ennemi t'attaques. \n\n\n"+tabText[index];
		PlayerPrefs.SetString("sendData", callData);
		PlayerPrefs.SetInt("price", price[index]);
	}
}

class Force{
	var text1 = "Amélioration de niveau 1 : 2 gemmes";
	var text2 = "Amélioration de niveau 2 : 4 gemmes";
	var text3 = "Amélioration de niveau 3 : 5 gemmes";
	var text4 = "Amélioration de niveau 4 : 6 gemmes";
	var text5 = "Amélioration de niveau 5 : 7 gemmes";
	var text6 = "Amélioration ultime : 8 gemmes";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	var price = [2,4,5,6,7,8];
	
	function Force(index : int){
		var callData = "Spike devient de plus en plus intelligent ! Il réussit à faire des combinaisons plus dévastatrices ! Améliorer l’intelligence de Spike te permettras de faire des attaques plus puissantes et ainsi de venir plus facilement à bout de tes ennemis. \n\n\n"+tabText[index];
		PlayerPrefs.SetString("sendData", callData);
		PlayerPrefs.SetInt("price", price[index]);
	}
}

class Vision{
	var text1 = "Amélioration de niveau 1 : 1 gemme";
	var text2 = "Amélioration de niveau 2 : 2 gemmes";
	var text3 = "Amélioration de niveau 3 : 4 gemmes";
	var text4 = "Amélioration de niveau 4 : 5 gemmes";
	var text5 = "Amélioration de niveau 5 : 6 gemmes ";
	var text6 = "Amélioration ultime : 7 gemmes";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	var price = [1,2,4,5,6,7];
	
	function Vision(index : int){
		var callData = "La vision est un atout vraiment important ! Surtout lorsqu’il fait nuit, tu risques de te perdre et de ne pas voir arriver les ennemis. Améliores ta vision afin d'augmenter ton champ d'éclairage dans la nuit. \n\n\n" +tabText[index];
		PlayerPrefs.SetString("sendData", callData);
		PlayerPrefs.SetInt("price", price[index]);
	}
}

class Vitesse{
	var text1 = "Amélioration de niveau 1 : 2 gemme";
	var text2 = "Amélioration de niveau 2 : 4 gemmes";
	var text3 = "Amélioration de niveau 3 : 5 gemmes ";
	var text4 = "Amélioration de niveau 4 : 6 gemmes ";
	var text5 = "Amélioration de niveau 5 : 7 gemmes ";
	var text6 = "Amélioration ultime : 8 gemmes ";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	var price = [2,4,5,6,7,8];
	
	function Vitesse(index : int){
		var callData = "L’amélioration de la vitesse te permettras de te déplacer plus rapidement afin d’être plus agile face à tes ravisseurs ! \n\n\n"+tabText[index];
		PlayerPrefs.SetString("sendData", callData);
		PlayerPrefs.SetInt("price", price[index]);
	}
}

