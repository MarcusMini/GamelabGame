public var x : boolean ;
var timer2 : float;
private var otherLight;
private var otherLight2;

var minIntensity : float;
var maxIntensity : float;
var intensity : float;

// set the duration of the day & night 
var DayNightDuration : int;

function Start(){
	x = PlayerPrefsX.GetBool("xvalue");
	timer2 = PlayerPrefs.GetInt("timer");
		
	if(x){
		minIntensity = PlayerPrefs.GetInt("intensité");
		maxIntensity = 1.8f;
	}
	else{
		maxIntensity = PlayerPrefs.GetInt("intensité");
		minIntensity = 0.0f;
	}
}

function ambiantLight(){

	timer2 += Mathf.Clamp(Time.deltaTime, 0.0, 30.0);
	
	if(timer2 > DayNightDuration){
		x = !x;
		timer2 = 0;
		minIntensity = 0.0f;
		maxIntensity = 1.8f;
	}

	if(x){
		intensity = light.intensity = Mathf.Lerp(minIntensity, maxIntensity, timer2 * 0.1);
	}
	else if(!x){
		intensity = light.intensity = Mathf.Lerp(maxIntensity, minIntensity, timer2 * 0.1);
	}
}

function Update () {
	ambiantLight();
	
	
	if(Application.loadedLevelName != "level1_d_grotte"){
		otherLight = GameObject.Find('Point light 2');
		otherLight2 = GameObject.Find('Point light');
		
		if(gameObject.light.intensity > 0.9){
			if(otherLight){
				otherLight.light.intensity = 0.0;
			}
			if(otherLight2){
				otherLight2.light.intensity = 0.0;
			}
		}
		else{
			if(otherLight){
				otherLight.light.intensity = 3;
			}
			if(otherLight2){
				otherLight2.light.intensity = 1.0;
			}
		}
	}	
}
