import './style.css';
import generateSearchForm from './generateSearchForm';
import generateBody from './generateBody';

let currentLocation = 'London, uk';
let currentUnit = 'metric';

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

  // console.log(temperature, humidity, description, windspeed, placeName);
}

const fetchWeatherData = async (location, units) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.API_KEY}&units=${units}`, {mode: 'cors'});
    const searchData = await response.json();
    // console.log(searchData);

    displayData(searchData);
    document.querySelector('.error').innerHTML = '';
  } catch (error) {
    console.log(error);
    document.querySelector('.error').innerHTML = 'Oh no! Please enter a valid city name! (ex. Paris, fr)';
    currentLocation = 'London, uk';
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
      fetchWeatherData(currentLocation, currentUnit);
    } else {
      toggleUnitsButton.dataset.unit = 'metric';
      toggleUnitsButton.innerHTML = 'Switch to Imperial Units';
      unitTemp.innerHTML = '°C';
      unitWind.innerHTML = 'meters/sec';
      currentUnit = 'metric';
      fetchWeatherData(currentLocation, currentUnit);
    }
  })
}




generateSearchForm();
generateBody();
addListeners();
fetchWeatherData(currentLocation, currentUnit);





