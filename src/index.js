import './style.css'

let currentLocation = 'London, uk';
let currentUnit = 'metric';

const generateSearchForm = () => {
  const contentDiv = document.querySelector('#content');

  const searchBox = document.createElement('div');
  searchBox.classList.add('search-box');

  searchBox.innerHTML = `<form id='search-form'>
                <label for='city'>Search for a City:
                  <input type="text" id="city" name="city" value="London, uk">
                </label>
                <input type="submit" value="Submit">
              </form>`;

  contentDiv.appendChild(searchBox)
}

const generateBody = () => {
  const contentDiv = document.querySelector('#content');

  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');

  weatherInfo.innerHTML = `<h2 id='location'>Current Weather for </h2>
              <p>Temperature: <span id='temperature'></span> <span id='unit-temp'>°C</span></p>
              <p>Humidity: <span id='humidity'></span>%</p>
              <p>Description: <span id='description'></span></p>
              <p>Wind Speed: <span id='windspeed'></span> <span id='unit-wind'>meters/sec</span></p>
              <button id='toggle-units' data-unit='metric'>Switch to Imperial Units</button>`;

  contentDiv.appendChild(weatherInfo);
}


const displayData = (data) => {
  const temperature = data.main.temp;
  const {humidity} = data.main;
  const {description} = data.weather[0];
  const windspeed = data.wind.speed;
  const placeName = `${data.name}, ${data.sys.country}`;

  document.querySelector('#temperature').innerHTML = temperature;
  document.querySelector('#humidity').innerHTML = humidity;
  document.querySelector('#description').innerHTML = description;
  document.querySelector('#windspeed').innerHTML = windspeed;
  document.querySelector('#location').innerHTML = placeName;

  console.log(temperature, humidity, description, windspeed, placeName);
}

const fetchWeatherData = async (location, units) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.API_KEY}&units=${units}`, {mode: 'cors'});
    const searchData = await response.json();
    console.log(searchData);

    displayData(searchData);

  } catch (error) {
    console.log(error);
  }
}

const addListeners = () => {
  const searchForm = document.querySelector('#search-form')
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    currentLocation = event.currentTarget.city.value;
    fetchWeatherData(currentLocation, currentUnit);
  })

  const toggleUnitsButton = document.querySelector('#toggle-units');
  toggleUnitsButton.addEventListener('click', () => {
    const unitTemp = document.querySelector('#unit-temp');
    const unitWind = document.querySelector('#unit-wind');
    if(toggleUnitsButton.dataset.unit === 'metric') {
      toggleUnitsButton.dataset.unit = 'imperial';
      toggleUnitsButton.innerHTML = 'Switch to Metric Units';
      unitTemp.innerHTML = '°F';
      unitWind.innerHTML = 'miles/hour';
      currentUnit = 'imperial';
      fetchWeatherData(currentLocation, 'imperial');
    } else {
      toggleUnitsButton.dataset.unit = 'metric';
      toggleUnitsButton.innerHTML = 'Switch to Imperial Units';
      unitTemp.innerHTML = '°C';
      unitWind.innerHTML = 'meters/sec';
      currentUnit = 'metric';
      fetchWeatherData(currentLocation, 'metric');
    }
  })
}




generateSearchForm();
generateBody();
addListeners();
fetchWeatherData(currentLocation, currentUnit);





