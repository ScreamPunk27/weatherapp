const inputCity = document.getElementById('input-city');
const btnSwitch = document.getElementById('btn-switch');
const txtButton = document.getElementById('text-btn');


//buttons
const btnCelsius = document.getElementById("btn-celsius");
const btnFahrenheit = document.getElementById("btn-fahrenheit");

// div right
const rightSide = document.querySelector(".right");

const keyApp = 'f44f1eb0189ef102226b0f39f312d6a0';
let city;

//temperatures scales
let celcius = 1;
let textStatus = 1;
let celsiusStatus = false;
let fahrenheitStatus = false;
let firstRoundDone = false;


function getCity(namecity, idAPI) {

    rightSide.innerHTML = "";



    console.log("The city is " + namecity);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${namecity}&appid=${idAPI}`)
        .then((data) => { return data.json() })
        .then(data => {

            let tempToCelsius = Math.round(data.main.temp - 273.15);
            let feelToCelsius = Math.round(data.main.feels_like - 273.15);
            let minToCelsius = Math.round(data.main.temp_min - 273.15);
            let maxToCelsius = Math.round(data.main.temp_max - 273.15);

            let tempToFah = Math.round(1.8 * (data.main.temp - 273) + 32);
            let feelsToFah = Math.round(1.8 * (data.main.feels_like - 273) + 32);
            let minToFah = Math.round(1.8 * (data.main.temp_min - 273) + 32);
            let maxToFah = Math.round(1.8 * (data.main.temp_max - 273) + 32);


            //btnSwitch.addEventListener('click', changeTemp);
            btnFahrenheit.addEventListener('click', showFah);
            btnCelsius.addEventListener('click', showCel);

            // function changeTemp() {

            //     if (textStatus % 2 !== 0) {
            //         txtButton.textContent = "°C";
            //     } else {
            //         txtButton.textContent = "°F";
            //     }

            //     if (celcius % 2 === 0) {
            //         temp.textContent = tempToCelsius + "°C";
            //         feels.textContent = feelToCelsius + "°C";
            //         maxTemp.textContent = maxToCelsius + "°C";
            //         minTemp.textContent = minToCelsius + "°C";


            //     } else {
            //         temp.textContent = tempToFah + "°F";
            //         feels.textContent = feelsToFah + "°F";
            //         maxTemp.textContent = maxToFah + "°F";
            //         minTemp.textContent = minToFah + "°F";

            //     }
            //     celcius++;
            //     textStatus++;
            // }

            function showFah() {
                btnCelsius.classList.add("showCel");
                btnFahrenheit.classList.add("hideFah");

                temp.textContent = tempToFah + "°F";
                feels.textContent = feelsToFah + "°F";
                maxTemp.textContent = maxToFah + "°F";
                minTemp.textContent = minToFah + "°F";
            }

            function showCel() {
                btnCelsius.classList.remove("showCel");
                btnFahrenheit.classList.add("showFah");


                temp.textContent = tempToCelsius + "°C";
                feels.textContent = feelToCelsius + "°C";
                maxTemp.textContent = maxToCelsius + "°C";
                minTemp.textContent = minToCelsius + "°C";
            }



            let weatherDiv = document.createElement("div");
            let footerWeatherDiv = document.createElement("div");
            weatherDiv.classList.add("nuevo-contenedor");

            const temp = document.createElement("h1");
            const description = document.createElement("h1");
            description.style = "text-transform:uppercase";
            const location = document.createElement("h3");
            const imgWeather = document.createElement("img");
            imgWeather.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            imgWeather.width = "50";
            const containerImg = document.createElement("div");
            containerImg.appendChild(imgWeather);



            temp.textContent = tempToCelsius + "°C";
            description.textContent = data.weather[0].description;
            location.textContent = data.name + ", " + data.sys.country;

            //create footer
            //feels like
            const feelsTitle = document.createElement("h3");
            const feels = document.createElement("p");
            const feelsDiv = document.createElement("div");
            feelsDiv.classList.add("container-div");
            feelsTitle.textContent = "feels like";
            feels.textContent = feelToCelsius + "°C";
            feelsDiv.appendChild(feelsTitle);
            feelsDiv.appendChild(feels);

            // temp max
            const maxTempTitle = document.createElement("h3");
            const maxTemp = document.createElement("p");
            const maxTempDiv = document.createElement("div");
            maxTempDiv.classList.add("container-div");
            maxTempTitle.textContent = "temp max";
            maxTemp.textContent = maxToCelsius + "°C";
            maxTempDiv.appendChild(maxTempTitle);
            maxTempDiv.appendChild(maxTemp);

            // temp min
            const minTempTitle = document.createElement("h3");
            const minTemp = document.createElement("p");
            const minTempDiv = document.createElement("div");
            minTempDiv.classList.add("container-div");
            minTempTitle.textContent = "temp min";
            minTemp.textContent = minToCelsius + "°C";
            minTempDiv.appendChild(minTempTitle);
            minTempDiv.appendChild(minTemp);

            //humidity
            const humidityTitle = document.createElement("h3");
            const humidity = document.createElement("p");
            const humidityDiv = document.createElement("div");
            humidityDiv.classList.add("container-div");
            humidityTitle.textContent = "humidity";
            humidity.textContent = data.main.humidity;
            humidityDiv.appendChild(humidityTitle);
            humidityDiv.appendChild(humidity);

            //pressure
            const pressureTitle = document.createElement("h3");
            const pressure = document.createElement("p");
            const pressureDiv = document.createElement("div");
            pressureDiv.classList.add("container-div");
            pressureTitle.textContent = "pressure";
            pressure.textContent = data.main.pressure;
            pressureDiv.appendChild(pressureTitle);
            pressureDiv.appendChild(pressure);


            weatherDiv.appendChild(containerImg);
            weatherDiv.appendChild(temp);
            weatherDiv.appendChild(description);
            weatherDiv.appendChild(location);
            rightSide.appendChild(weatherDiv);

            //ADD FOOTER
            footerWeatherDiv.appendChild(feelsDiv);
            footerWeatherDiv.appendChild(maxTempDiv);
            footerWeatherDiv.appendChild(minTempDiv);
            footerWeatherDiv.appendChild(humidityDiv);
            footerWeatherDiv.appendChild(pressureDiv);

            weatherDiv.appendChild(footerWeatherDiv);

            console.log(data);
            console.log(data.main.temp);

        });
}





inputCity.addEventListener('keypress', (e) => {

    let enterKey = e.key;

    if (enterKey === 'Enter') {
        e.preventDefault();
        city = inputCity.value;
        getCity(city, keyApp);
        inputCity.value = "";

        if (firstRoundDone === true) {
            // txtButton.textContent = "°F";
            btnFahrenheit.classList.add("showFah");
            btnCelsius.classList.remove("showCel");
        }

        firstRoundDone = true;

    }
})