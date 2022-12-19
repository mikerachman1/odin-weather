import './style.css'


const returnWeatherPromise = async (location) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${process.env.API_KEY}`, {mode: 'cors'});
    const searchData = await response.json()
    console.log(searchData)
  } catch (error) {
    console.log(error)
  }
}

returnWeatherPromise('london, uk')

