const cityName = document.getElementById('city-name');
const weatherType = document.getElementById('weather-type');
const weatherTemperature = document.getElementById('weather-temperature');
const weatherFeelTemperature = document.getElementById('weather-feel-temperature');
let root = document.documentElement;
var backgroundColors = {sunsetSunrise :"#ff8366", Day:"#007fb4", Rain:"#828a8e", Snow:"#7abece", dayThunder:"#33333f", dusk:"#133a4f", night:"#190d8c"} ; 
var overlayColors = {sunsetSunrise :"#ff8366", Day:"#007fb4", Rain:"#828a8e", Snow:"#7abece", dayThunder:"#33333f", dusk:"#133a4f", night:"#190d8c"} ; 
var cityImages = {day:"Day.svg", night:"Night.svg", dayFog:"dayFog.svg", nightFog:"nightFog.svg"};
var backgroundName;
var backgroundDesc = "basic";

//orange orange-overcast orange-rain orange-snow orange-thunder
//day  day-rain  day-snow day-thunder 
//dusk dusk-overcast dusk-rain dusk-fog dusk-snow dusk-thunder
//night-basic night-overcast night-rain night-fog night-snow night-thunder
var overlayColor; //orange day dusk night
var cityType = 'day'; //day day-fog night night-fog
var rainOrsnow ; // none rain snow || 
var isClear = false; //true false || Statement for cloud generator animation
var velocity;

successFunction = position => { //function to save coordinate values
    
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log(`latitude =${lat} longitude = ${long}`) 

    const apiKey = "df7374ae099bb5c3225c10b111a545af"
fetch(`api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`) //Weather API call
    .then(response => response.json())
    .then(data =>{
        const {weather,main,wind,clouds,sys,name, dt} = data; //save values from promise to be used
        var timeOfDay;
        console.log(weather,main,wind,clouds,sys,name, dt);

        cityName.innerHTML = name;
        weatherType.innerHTML= weather.description;
        weatherTemperature.innerHTML = main.temp;
        weatherFeelTemperature.innerHTML = main.feels_like;

        //If statements to get the major background colour and city types
        if (((dt>=(sys.sunrise - 3600)) && (dt < sys.sunrise))||((dt>sys.sunset) && (dt <= (sys.sunset+3600)))){ //if dawn/dusk

            root.style.setProperty("--backgroundColor",`${backgroundColors.dusk}`);
            root.style.setProperty("--overlayColor",`${overlayColors.dusk}`);
            root.style.setProperty("--cityImage",`url(./resources/${cityImages.night})`);
            
        }else if (((dt<=(sys.sunrise + 3600)) && (dt > sys.sunrise))||((dt<sys.sunset) && (dt >= (sys.sunset-3600)))){ //if sunset/sunrise code

            root.style.setProperty("--backgroundColor",`${backgroundColors.sunsetSunrise}`);
            root.style.setProperty("--overlayColor",`${overlayColors.sunsetSunrise}`);
            root.style.setProperty("--cityImage",`url(./resources/${cityImages.day})`);

        }else if(dt>sys.sunrise+3600){ //day code

            root.style.setProperty("--backgroundColor",`${backgroundColors.Day}`);
            root.style.setProperty("--overlayColor",`${overlayColors.Day}`);
            root.style.setProperty("--cityImage",`url(./resources/${cityImages.day})`);

        }else if(dt>sys.sunset+3600){//night code

            root.style.setProperty("--backgroundColor",`${backgroundColors.night}`);
            root.style.setProperty("--overlayColor",`${overlayColors.night}`);
            root.style.setProperty("--cityImage",`url(./resources/${cityImages.night})`);

        }

        //If statements to get background alternate states of weather that can affect city and background
        if (weather.id[1] == 3) { //check background drizzle
            rainOrsnow="rain";
            velocity = 2;
        } else if ((weather.id[1] == 2)){ //check background thunder
            backgroundDesc = "thunder";
            rainOrsnow = "rain";
            velocity = 7;
        } else if(weather.id[1] == 5){//check background rain and atmosphere
            backgroundDesc="rain";
            rainOrsnow = "rain";
            velocity = 6;
        }else if((weather.id[1] == 6)){//check background snow
            backgroundDesc="snow";
            rainOrsnow = "snow";
            velocity = 3;
        }else if (weather.id[1] == 7){//check background fog
            backgroundDesc="rain";
            cityType = `${cityType}-fog`;
        }else{
            isClear=true;
        }

        //If statement to check to play rain or snowing animation
        if (rainOrsnow != null){
            if (rainOrsnow =="rain"){
                if (weather.id[1] != 3){
                    //add cloud svg top thunder or rain
                    //change to appropriate colour

                }
                //play raining animation with velocity
            }else{
                //add cloud svg top snow
            }
        }

        //Check cloud cover and wind speed
        //do animation for that


    })


}

if (navigator.geolocation) { //Geolocation API compatibility test
    navigator.geolocation.getCurrentPosition(successFunction);
} else {
    alert('Geolocation is required to run this website, Sorry.');
}


