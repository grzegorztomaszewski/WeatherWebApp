window.addEventListener("load", () => {
let longitude, latitude;
let temperatureDescription = document.getElementById("temperature-description");
let temperatureDegree = document.getElementById("temperature-degree");
let locationTimezone = document.getElementById("location-timezone");
let temperatureSection = document.getElementById("temperature");
let temperatureSpan = document.getElementById("span-degree");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => { //Get geolocation
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const api = "https://api.darksky.net/forecast/7fb2ea5c85b582eb1c2af7f9f513d916/";
        $.ajax({
            url : `${proxy}https://api.darksky.net/forecast/709d3314837d31871ad222add133e997/${latitude},${longitude}`,
            method : "get",
            dataType : "json"
        })
        .done((res) => {
            temperatureDescription.innerText = res.currently.summary;   //Description weather
            temperatureDegree.innerText = (res.currently.apparentTemperature).toFixed(1);   //Degree (value) 
      
            temperatureDegree.innerText = ((temperatureDegree.innerText - 32) / 1.8).toFixed(1); //Degree celsius
            locationTimezone.innerText = res.timezone;  //Timezone and city
            
            //Image icon (skycons)
            let currentIcon = res.currently.icon;
            let skycons = new Skycons({"color": "white"});
            currentIcon = currentIcon.replace(/-/g, "_").toUpperCase();
            skycons.add("icon", Skycons[currentIcon]);
            skycons.play();
            //Switch unit
            temperatureSection.addEventListener("click", () => {
                if(temperatureSpan.innerText === "C"){  //Switch unit C => F
                    temperatureSpan.innerText = "F";
                    temperatureDegree.innerText = ((temperatureDegree.innerText * 9) / 5 + 32).toFixed(1);
                }else if(temperatureSpan.innerText === "F"){    //Switch unit F => C
                    temperatureSpan.innerText = "C";
                    temperatureDegree.innerText = ((temperatureDegree.innerText -32) / 1.8).toFixed(1);
                }
            })
         });
    })
}
});