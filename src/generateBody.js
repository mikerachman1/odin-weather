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

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');

  contentDiv.appendChild(weatherInfo);
  document.querySelector('body').appendChild(errorDiv);
}

export default generateBody;