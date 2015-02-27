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
	var text1 = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz 1G";
	var text2 = "cccccccccccccccccccccccccccccc 1G";
	var text3 = "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm 1G";
	var text4 = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeee 1G";
	var text5 = "iiiiiiiiiiiiiiiiiiiiiiiiiiiiii 1G";
	var text6 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 1G";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	
	function Defense(index : int){
		var callData = tabText[index];
		PlayerPrefs.SetString("sendData", callData);
	}
}

class Force{
	var text1 = "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu 1G";
	var text2 = "lolololololollolololololololol 1G";
	var text3 = "chachahcahchahachachahcahahaha 1G";
	var text4 = "tetettetettttttetetttetetttttt 1G";
	var text5 = "pipipipipipipipiipipipipipippp 1G";
	var text6 = "vnvnvnvnvnvnvnvnvnvnvvnnvnvnvv 1G";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	
	function Force(index : int){
		var callData = tabText[index];
		PlayerPrefs.SetString("sendData", callData);
	}
}

class Vision{
	var text1 = "xoxoxoxoxoxoxoxoxoxoxoxoxoxoxo 1G";
	var text2 = "mamamamamamamamamamamamamamama 1G";
	var text3 = "tetetetetetetetetetetetetetete 1G";
	var text4 = "xixixixixixixixixixixixixixixi 1G";
	var text5 = "asasasasasasasasasasasasasasas 1G";
	var text6 = "teurteurteurteurteurteurteurte 1G";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	
	function Vision(index : int){
		var callData = tabText[index];
		PlayerPrefs.SetString("sendData", callData);
	}
}

class Vitesse{
	var text1 = "charlottecharlottecharlotteMMM 1G";
	var text2 = "holyholyoholyholyholyholyholye 1G";
	var text3 = "poupopoupopoupopoupopoupopoupo 1G";
	var text4 = "thiagothiagothiagothiagothiago 1G";
	var text5 = "silvasilvasilvasilvasilvasilva 1G";
	var text6 = "marcmarcmarcmarcmarcmarcmarcma 1G";
	
	var tabText : String[] = [text1,text2,text3,text4,text5,text6];
	
	function Vitesse(index : int){
		var callData = tabText[index];
		PlayerPrefs.SetString("sendData", callData);
	}
}

