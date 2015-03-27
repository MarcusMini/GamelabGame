var customGuiStyle : GUIStyle;
var customGuiStyle2 : GUIStyle;
var sideText : GUIStyle;
var autorisation : boolean;
var id : int;
var idDis : int;
var ischecked : int = 0;
var second : String = "acide";
var first : String;
var toload : String = "question";
var toload2 : String = "question";
var confirmed : boolean;
var canbutton : boolean = true;
var canDraw : boolean = false;
var create : boolean = true;
public  var moleculeFormula;



private var formule = ['CN', 'H2N', 'O2'];
private var formule2 = ['H', 'C', '03-'];
private var formule3 = ['H2','O','2'];
private var formule4 = ['C3', 'H8', 'O3'];
private var formule5 = ['R-', 'CO', 'Na+'];
private var formule6 = ['C18', 'H34', 'O2'];
private var formule7 = ['Na', 'O', 'H'];
private var formule8 = ['K', 'MN', 'O4'];
private var formule9 = ['xxx', 'LU', 'MU'];
// regroupement de variable de molecule
public var recapFormule = [formule, formule2, formule3, formule4, formule6, formule5, formule8, formule7, formule9, formule, formule, formule2, formule3, formule4, formule6, formule5, formule8, formule7, formule7];

// variable texte
private var formuleTexte = ['L’acide est un composé chimique qui est connu pour sa capacité à créer des réactions lorsqu’il est mélangé avec un autre composé. ', 'Se combine avec: \n - Bicarbonate', 'Intervient dans la combinaison suivante: \n - Gaz'];
private var formuleTexte2 = ['Le bicarbonate est une espèce amphotère, c’est-à-dire qu’il est à la fois basique et acide.', 'Se combine avec: \n - Acide', 'Intervient dans la combinaison suivante: \n - Gaz'];
private var formuleTexte3 = ['L’eau oxygénée est un liquide clair, légèrement plus visqueux que l’eau. C’est un agent de blanchiment efficace, il est capable de libérer du dioxygène.', 'Se combine avec: \n - Permanganate de Potassium \n - Liquide vaisselle', 'Intervient dans les combinaisons suivantes: \n - Fumée \n - Mousse'];
private var formuleTexte4 = ['Le glycérol est un liquide incolore et visqueux utilisé dans de nombreuses compositions pharmaceutiques. C’est un alcool présent dans l’organisme.', 'Se combine avec: \n - Permanganate de Potassium', 'Intervient dans les combinaisons suivantes: \n - Feu'];
private var formuleTexte6 = ['L’huile est un produit très souvent utilisé sous forme liquide et qui est reconnue pour ses capacités d’hydrophobe (qui ne se mélange pas à l’eau)','Se combine avec: \n - Soude', 'Intervient dans la combinaison suivante: \n - Savon'];
private var formuleTexte5 = ['Le liquide vaisselle est un produit qui possède des tensioactifs avec des propriétés notamment moussantes.', 'Se combine avec: \n - Eau oxygénée \n - Permanganate de Potassium', 'Intervient dans la combinaison suivante: \n - Mousse'];
private var formuleTexte7 = ['La soude est un composé chimique blanchâtre qui peut se trouver sous forme solide ou liquide. ', 'Se combine avec: \n - Huile', 'Intervient dans la combinaison suivante: \n - Savon'];
private var formuleTexte8 = ['Le permanganate de potassium est un sel inorganique qui peut avoir des réactions violentes lorsqu’il est mélangé au glycérol.', 'Se combine avec: \n - Glycérol \n - Eau Oxygénée \n - Liquide Vaisselle', 'Intervient dans les combinaisons suivantes: \n - Feu \n - Fumée \n - Mousse'];
private var formuleTexte9 = ['ccc', 'you', 'eat'];

private var form1 = ["Fiole-acide","fiole-bicarbonate","fiolegazB"];
private var form2 = ["fiole-bicarbonate", "Fiole-acide", "fiolegazB"];
private var form3 = ["Fiole-eau-oxygenee", "permen-vaiss", "fum-mou" ];
private var form4 = ["Fiole-glycerol", "Fiole-permanganate", "fiolefeuB" ];
private var form5 = ["Fiole-liquide-vaisselle", "permen-eau", "fiolemousseB" ];
private var form6 = ["Fiole-huile", "Fiole-soude", "fiolesavonB" ];
private var form7 = ["Fiole-soude", "Fiole-huile", "fiolesavonB" ];
private var form8 = ["Fiole-permanganate", "glyc-eau-vais", "fiolefeufummous"];

var dis = [form1,form2,form3,form4,form5,form6,form7,form8];

// regroupement des images
private var formImg = [];
var levelUpSon : AudioClip;


// enregistrer les différentes valeurs des molecules.
// creation d'un tableau de sauvegarde de molecule

public var tabchoixFormule : String[] = new String[18];
public var recapTexte = [formuleTexte, formuleTexte2, formuleTexte3, formuleTexte4, formuleTexte6, formuleTexte5, formuleTexte8, formuleTexte7, formuleTexte9, formuleTexte2, formuleTexte, formuleTexte2, formuleTexte3, formuleTexte4, formuleTexte6, formuleTexte5, formuleTexte8, formuleTexte7];



function Start () {
    customGuiStyle.fontSize = 25;
    customGuiStyle2.fontSize = 18;
    customGuiStyle2.wordWrap = true;
    customGuiStyle.normal.textColor = Color.black;
    customGuiStyle.font = Resources.Load("Geometria-Light") as Font;
    customGuiStyle.wordWrap = true;
    autorisation = false;
    first = "question";
    second = "question";
    toload = "question";
    toload2 = "question";
    id = 2;
    idDis= 2;
}

function OnGUI(){
    var isactivate = PlayerPrefs.GetInt("active");
    
    
    // background texture
    var background = Resources.Load("laboratoire_alambic_fond") as Texture2D;
    var confirm = Resources.Load("guiAlambic") as Texture2D;
    var chemicalB = ["question", "Fiole-acide", "fiole-bicarbonate", "Fiole-eau-oxygenee", "Fiole-glycerol", "Fiole-huile","Fiole-liquide-vaisselle","Fiole-permanganate","Fiole-soude"];
    var bar = Resources.Load("Vbar") as Texture2D;
    // var bouton
    var bouton = Resources.Load("laboratoire_alambic_bouton") as Texture2D;
    // chemical texture
    var chemical = ["question", "Fiole-acide", "fiole-bicarbonate", "Fiole-eau-oxygenee", "Fiole-glycerol", "Fiole-huile","Fiole-liquide-vaisselle","Fiole-permanganate","Fiole-soude"];
    var backArray = ["affichage_bleu", "affichage_blanc", "affichage_red", "affichage_yellow", "affichage_orange"];
        
    if(isactivate){
        var x2 = Screen.width / 2;
        var h = Screen.height / 2;
    
        GUI.BeginGroup(Rect(0,0,x2*2,h*2));
        
            GUI.DrawTexture(Rect(0,0,x2*2,h*2), background);
            if (canbutton == true){
            if(GUI.Button(Rect(x2 * 0.8, h - 120, 54,62), Resources.Load(chemical[1]) as Texture2D,  customGuiStyle)){
                id = 0;
                idDis = 0;
            }
            else if(GUI.Button(Rect(x2, h - 120, 54,62), Resources.Load(chemical[2]) as Texture2D,  customGuiStyle)){
                id = 1;
                idDis = 1;
            }
            else if(GUI.Button(Rect(x2 * 0.8, h - 60, 54,62), Resources.Load(chemical[3]) as Texture2D,  customGuiStyle)){
                id = 2;
                idDis = 2;
            }
            else if(GUI.Button(Rect(x2, h - 60, 54,62), Resources.Load(chemical[4]) as Texture2D,  customGuiStyle)){
                id = 3;
                idDis = 3;
            }
            else if(GUI.Button(Rect(x2, h, 54,62), Resources.Load(chemical[5]) as Texture2D,  customGuiStyle)){
                id = 4;
                idDis = 5;
            }
            else if(GUI.Button(Rect(x2 * 0.8, h, 54,62), Resources.Load(chemical[6]) as Texture2D,  customGuiStyle)){
                id = 5;
                idDis = 4;
            }
            else if(GUI.Button(Rect(x2, h + 60, 54,62), Resources.Load(chemical[7]) as Texture2D,  customGuiStyle)){
                id = 6;
                idDis = 7;
            }
            else if(GUI.Button(Rect(x2 * 0.8, h + 60, 54,62), Resources.Load(chemical[8]) as Texture2D,  customGuiStyle)){
                id = 7;
                idDis = 6;
            }
            if(GUI.Button(Rect(x2 *1.8, h - 120, 54,62), Resources.Load(chemical[1]) as Texture2D,  customGuiStyle)){
             id = 10;
             idDis = 0;
            }
            else if(GUI.Button(Rect(x2 * 1.6, h - 120, 54,62), Resources.Load(chemical[2]) as Texture2D,  customGuiStyle)){
                id = 11;
                idDis = 1;
            }
            else if(GUI.Button(Rect(x2 * 1.8, h -60, 54,62), Resources.Load(chemical[3]) as Texture2D,  customGuiStyle)){
                id = 12;
                idDis = 2;
            }
            else if(GUI.Button(Rect(x2 *1.6, h -60, 54,62), Resources.Load(chemical[4]) as Texture2D,  customGuiStyle)){
                id = 13;
                idDis = 3;
            }
            else if(GUI.Button(Rect(x2 * 1.6, h, 54,62), Resources.Load(chemical[5]) as Texture2D,  customGuiStyle)){
                id = 14;
                idDis = 5;
            }
            else if(GUI.Button(Rect(x2 * 1.8, h, 54,62), Resources.Load(chemical[6]) as Texture2D,  customGuiStyle)){
                id = 15;
                idDis = 4;
            }
            else if(GUI.Button(Rect(x2 * 1.6, h + 60, 54,62), Resources.Load(chemical[7]) as Texture2D,  customGuiStyle)){
                id = 16;
                idDis = 7;
            }
            else if(GUI.Button(Rect(x2 * 1.8, h + 60, 54,62), Resources.Load(chemical[8]) as Texture2D,  customGuiStyle)){
                id = 17;
                idDis = 6;
            }
            // function which display molecule
        
            moleculeFormula = function(id, idDis){
            	var loop : int = 0;
                var yOffset = 0;
                var yOffset2 = 0;

                for(var i in recapFormule[id]){
                	var texture_res = dis[idDis];
                    GUI.Label(Rect(20, 25 + yOffset,60,69), Resources.Load(texture_res[loop]) as Texture2D,  customGuiStyle);
                    GUI.Label(Rect(170, 25 + yOffset, 200,150), i, customGuiStyle);
                    yOffset += 200;
                    loop++;
                }
                // for loop to show information about this molecule
                for(var k in recapTexte[id]){
                        GUI.Label(Rect(100, 50 + yOffset2, 190,150), k, sideText);
                        yOffset2 += 200;
                }
            };    
            var displayFormula = function(id){
            
                switch (id){
                    case 0:
//                    Debug.Log(ischecked);
                        toload = chemicalB[1];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[1], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "acide";
                    break;
                    case 1:
                        toload = chemicalB[2];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[2], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "bicarbonate";
                    break;
                    case 2:
                        toload = chemicalB[3];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[3], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "eau-oxygenee";
                    break;
                    case 3:
                        toload = chemicalB[4];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[4], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "glycérol";
                    break;
                    case 4:
                        toload = chemicalB[5];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[5], customGuiStyle2);
                        GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "huile";
                    break;
                    case 5:
                        toload = chemicalB[6];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[6], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "liquide-vaisselle";
                    break;
                    case 6:
                        toload = chemicalB[7];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[7], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "permanganate";
                    break;
                    case 7:
                        toload = chemicalB[8];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[8], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            first = "soude";
                    break;
                    case 10:
                            toload2 = chemicalB[1];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[1], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "acide";
                    break;
                    case 11:
                        toload2 = chemicalB[2];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[2], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "bicarbonate";
                    break;
                    case 12:
                        toload2 = chemicalB[3];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[3], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "eau-oxygenee";
                    break;
                    case 13:
                        toload2 = chemicalB[4];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[4], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "glycérol";
                    break;
                    case 14:
                        toload2 = chemicalB[5];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[5], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "huile";
                    break;
                    case 15:
                        toload2 = chemicalB[6];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[6], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "liquide-vaisselle";
                    break;
                    case 16:
                        toload2 = chemicalB[7];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[7], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "permanganate";
                    break;
                    case 17:
                        toload2 = chemicalB[8];
                        GUI.Label(Rect(x2+80,h+150,100,208), tabchoixFormule[8], customGuiStyle2);
                            GUI.DrawTexture(Rect(x2 * 1.25, h * 0.6,108,124), Resources.Load(toload));
                            GUI.DrawTexture(Rect(x2 * 1.25,h,108,124), Resources.Load(toload2));
                            second = "soude";
                    break;
        }
            };
            
            // call the function
            displayFormula(id);
            moleculeFormula(id, idDis);
            // when a new molecule has been choose, use prototype to redefine the function
            GUI.DrawTexture(Rect(x2 * 0.5,10,3,h*1.9), bar);
            }
            if (canDraw == true){
            GUI.DrawTexture(Rect(x2 * 0.5, h*0.5, x2, h), confirm);
            }
            if (canDraw != true){
            GUI.Label(Rect(x2+15, h*1.8, 200, 200), "Press E to quit and save", customGuiStyle2);
            }
        GUI.EndGroup();
    var x = Screen.width / 2;
        var h2 = Screen.height / 2;
    var player = gameObject.Find("Player");
    var mercure = player.GetComponent(playercol);
    
 // ajout du bouton guide. 
 // get la variable guiBouton
 
 		var setact = player.GetComponent(SpikeTextGUI);
    	
        if (first == "acide" && second == "bicarbonate" || first == "bicarbonate" && second == "acide" ){
        canbutton = false;
        canDraw = true;
        Debug.Log("GAZ");
        if (PlayerPrefs.GetInt("gaz") == 1){
            Debug.Log("Already bought");
        	GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez déjà cette attaque!", customGuiStyle2);
	        if(GUI.Button(Rect(x*1.1,h2*1.3,50,200), "Quit", customGuiStyle2)){
	        	setact.setAction(false, "");
	        	first = "DONE";
            }
         }
        else if (create == true && PlayerPrefs.GetInt("gaz") != 1){
	        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez créé du gaz! Voulez vous débloquer cette attaque? Cela vous coûtera 100 mercure.", customGuiStyle2);
	        if(GUI.Button(Rect(x * 0.85,h2*1.3,50,200), "Oui", customGuiStyle2)){
	        	setact.setAction(false, "");
	        	confirmed = true;
	        	audio.PlayOneShot(levelUpSon);
	        }
        if(GUI.Button(Rect(x * 1.08,h2*1.3,50,200), "Non", customGuiStyle2)){
	        	
	       		setact.setAction(false, "");
	        	first ="DONE";
        	}
        }
    if (confirmed == true){
    create = false;
            Debug.Log(mercure.money);
            if (mercure.money - 100 < 0){
           PlayerPrefs.SetInt("stepsA", 4);
        canbutton = false;
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous n'avez pas assez de mercure!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        	setact.setAction(false, "");
        	first = "DONE";
            }
            }
            else if (PlayerPrefs.GetInt("gaz") != 1){
            GUI.Label(Rect(x * 0.55,h2*0.65,x*0.9, h2*0.5), "Bravo vous pouvez maintenant produire du gaz! Pour lancer l'attaque, combinez de l'acide et du bicarbonate! (Touches Z et R du clavier) \n \n Attention, cette attaque vous infligera quelques dégâts mais ses dommages sont importants sur les ennemis! \n \n Utilisez cette formule au bon moment!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        check();
        audio.PlayOneShot(levelUpSon);
        setact.setAction(false, "");
        mercure.money = mercure.money - 100;
        mercure.score = mercure.score + 1000;
        PlayerPrefs.SetInt("gaz", 1);
        first = "DONE";
            }
            }
            }
            }
            
        if (first == "permanganate" && second == "glycérol" || first == "glycérol" && second == "permanganate"){
        canbutton = false;
        canDraw = true;
        Debug.Log("FIRE");
        if (PlayerPrefs.GetInt("feu") == 1){
            Debug.Log("Already bought");
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez déjà cette attaque!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        setact.setAction(false, "");
        first = "DONE";
            }
            }
        else if (create == true && PlayerPrefs.GetInt("feu") != 1){
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez créé du feu! Voulez vous débloquer cette attaque? Cela vous coûtera 200 mercure.", customGuiStyle2);
        if(GUI.Button(Rect(x * 0.85,h2*1.3,50,200), "Oui", customGuiStyle2)){
        setact.setAction(false, "");
        confirmed = true;
        }
        if(GUI.Button(Rect(x * 1.08,h2*1.3,50,200), "Non", customGuiStyle2)){
        setact.setAction(false, "");
        first ="DONE";
        }
        }
    if (confirmed == true){
    create = false;
            Debug.Log(mercure.money);
            if (mercure.money - 200 < 0){
        canbutton = false;
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous n'avez pas assez de mercure!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        setact.setAction(false, "");
        first = "DONE";
            }
            }
            else if (PlayerPrefs.GetInt("feu") != 1){
            GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Bravo vous pouvez maintenant produire du feu! Pour lancer l'attaque, combinez du glycérol et du permanganate de potassium! (Touches A et D du clavier) \n \n Cette attaque inflige des dégâts très importants!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        check();
        audio.PlayOneShot(levelUpSon);
        setact.setAction(false, "");
        mercure.money = mercure.money - 100;
        mercure.score = mercure.score + 2500;
        PlayerPrefs.SetInt("feu", 1);
        first = "DONE";
            }
            }
            }
            }
            
        if (first == "permanganate" && second == "eau-oxygenee" || first == "eau-oxygenee" && second == "permanganate" || PlayerPrefs.GetInt("guida")){
        canbutton = false;
        canDraw = true;
        Debug.Log("SMOKE");
        if (PlayerPrefs.GetInt("fumee") == 1){
            Debug.Log("Already bought");
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez déjà cette attaque!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        PlayerPrefs.SetInt("guida", 0);
        PlayerPrefs.SetInt("stepsA", 5);
        setact.setAction(false, "");
        first = "DONE";
            }
            }
        else if (create == true && PlayerPrefs.GetInt("fumee") != 1){
        GUI.Label(Rect(x * 0.55,h2*0.75,x*0.9, h2*0.5), "Vous avez créé de la fumée! Voulez vous débloquer cette attaque? Cela vous coûtera 100 mercure.", customGuiStyle2);
        if(GUI.Button(Rect(x * 0.85,h2*1.3,50,200), "Oui", customGuiStyle2)){
        PlayerPrefs.SetInt("stepsA", 5);
        setact.setAction(false, "");
        confirmed = true;
        
        }
        if(GUI.Button(Rect(x * 1.08,h2*1.3,50,200), "Non", customGuiStyle2)){
        PlayerPrefs.SetInt("guida", 0);
        PlayerPrefs.SetInt("stepsA", 5);
        first ="DONE";
        }
        }
    if (confirmed == true){
            create = false;
            Debug.Log(mercure.money);
            if (mercure.money - 100 < 0){
        canbutton = false;
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous n'avez pas assez de mercure!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        PlayerPrefs.SetInt("guida", 0);
        setact.setAction(false, "");
        first = "DONE";
            }
            }
            else if (PlayerPrefs.GetInt("fumee") != 1){
            GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Bravo vous pouvez maintenant produire de la fumée! Pour lancer l'attaque, combinez de l'eau oxygénée et du permanganate de potassium! (Touches E et D du clavier) \n \n Cette attaque inflige des dégâts de zone.", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        check();
        audio.PlayOneShot(levelUpSon);
        PlayerPrefs.SetInt("guida", 0);
        setact.setAction(false, "");
        mercure.money = mercure.money - 100;
        mercure.score = mercure.score + 1000;
        PlayerPrefs.SetInt("fumee", 1);
        first = "DONE";
            }
            }
            }
            }
            
        if (first == "soude" && second == "huile" || first == "huile" && second == "soude"){
        canbutton = false;
        canDraw = true;
        Debug.Log("SAVON");
        if (PlayerPrefs.GetInt("savon") == 1){
            Debug.Log("Already bought");
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez déjà cette attaque!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        setact.setAction(false, "");
        first = "DONE";
            }
            }
        else if (create == true && PlayerPrefs.GetInt("savon") != 1){
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous avez créé du savon! Voulez vous débloquer cette attaque? Cela vous coûtera 150 mercure.", customGuiStyle2);
        if(GUI.Button(Rect(x * 0.85,h2*1.3,50,200), "Oui", customGuiStyle2)){
        setact.setAction(false, "");
        confirmed = true;
        }
        if(GUI.Button(Rect(x * 1.08,h2*1.3,50,200), "Non", customGuiStyle2)){
        setact.setAction(false, "");
        first ="DONE";
        }
        }
    if (confirmed == true){
    create = false;
            Debug.Log(mercure.money);
            if (mercure.money - 150 < 0){
        canbutton = false;
        GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Vous n'avez pas assez de mercure!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        setact.setAction(false, "");
        first = "DONE";
            }
            }
            else if (PlayerPrefs.GetInt("savon") != 1){
            GUI.Label(Rect(x * 0.59,h2*0.75,x*0.9, h2*0.5), "Bravo vous pouvez maintenant produire du savon! Pour lancer l'attaque, combinez de l'huile et de la soude! (Touches Q et F du clavier) \n \n Cette formule vous permettra de glisser dessus et d'accroître temporairement votre vitesse pour se déplacer plus rapidement!", customGuiStyle2);
        if(GUI.Button(Rect(x*0.95,h2*1.3,150,200), "Quit", customGuiStyle2)){
        check();
        audio.PlayOneShot(levelUpSon);
        setact.setAction(false, "");
        mercure.money = mercure.money - 100;
        mercure.score = mercure.score + 1500;
        PlayerPrefs.SetInt("savon", 1);
        first = "DONE";
            }
            }
            }
            }
            
            
    // close the gui
    if(Input.GetKeyDown(KeyCode.E)){
        PlayerPrefs.DeleteKey("active");
        autorisation = false;
    }
    }
}
function Update(){

        var player = gameObject.Find("Player");
    var mercure = player.GetComponent(playercol);
    if (first == "DONE") {
    	Debug.Log("ici");
       	PlayerPrefs.SetInt("active", 1);
        first = "question";
        second = "question";
        canDraw = false;
        canbutton = true;
        confirmed = false;
        autorisation = false;
        create = true;
        Debug.Log(canbutton);
        PlayerPrefs.SetInt("guides",0);
    }
}

function check(){
	if(PlayerPrefs.GetInt("mustPass") == 1){
			PlayerPrefs.SetInt("mustPass", 2);
	}   
}