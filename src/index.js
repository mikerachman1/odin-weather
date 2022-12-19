import './style.css'


const displayData = (data) => {
  const temperature = data.main.temp;
  const {humidity} = data.main;
  const {description} = data.weather[0]
  const windspeed = data.wind.speed
  const placeName = `${data.name}, ${data.sys.country}`
  console.log(temperature, humidity, description, windspeed, placeName)
}

const fetchWeatherData = async (location) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.API_KEY}`, {mode: 'cors'});
    const searchData = await response.json()
    console.log(searchData)

    await displayData(searchData)


  } catch (error) {
    console.log(error)
  }
}

fetchWeatherData('London, uk')





