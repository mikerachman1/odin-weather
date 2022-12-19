import './style.css'

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
              <p>Temperature: <span id='temperature'></span></p>
              <p>Humidity: <span id='humidity'></span></p>
              <p>Description: <span id='description'></span></p>
              <p>Wind Speed: <span id='windspeed'></span></p>`;

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

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.API_KEY}`, {mode: 'cors'});
    const searchData = await response.json();
    console.log(searchData);

    displayData(searchData);

  } catch (error) {
    console.log(error);
  }
}

const searchFormListener = () => {
  const searchForm = document.querySelector('#search-form')
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = event.currentTarget.city.value;
    fetchWeatherData(location)
  })
}




generateSearchForm();
generateBody();
searchFormListener();
fetchWeatherData('London, uk');





