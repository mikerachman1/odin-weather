import './style.css'

const generateSearchForm = () => {
  const contentDiv = document.querySelector('#content');

  const searchBox = document.createElement('div');
  searchBox.classList.add('search-box');

  searchBox.innerHTML = `<form id='search'>
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
              <p id='temperature'>Temperature: </p>
              <p id='humidity'>Humidity: </p>
              <p id='description'>Description: </p>
              <p id='windspeed'>Wind Speed: </p>`;

  contentDiv.appendChild(weatherInfo);
}


const displayData = (data) => {
  const temperature = data.main.temp;
  const {humidity} = data.main;
  const {description} = data.weather[0];
  const windspeed = data.wind.speed;
  const placeName = `${data.name}, ${data.sys.country}`;

  document.querySelector('#temperature').innerHTML += temperature;
  document.querySelector('#humidity').innerHTML += humidity;
  document.querySelector('#description').innerHTML += description;
  document.querySelector('#windspeed').innerHTML += windspeed;
  document.querySelector('#location').innerHTML += placeName;

  console.log(temperature, humidity, description, windspeed, placeName);
}

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.API_KEY}`, {mode: 'cors'});
    const searchData = await response.json();
    console.log(searchData);

    await displayData(searchData);

  } catch (error) {
    console.log(error);
  }
}



generateSearchForm();
generateBody();
fetchWeatherData('London, uk');





