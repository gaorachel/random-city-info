import axios from "axios";

async function fetchWeather(capital) {
  const response = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${capital}&aqi=no`
  );

  return response.data;
}

export default fetchWeather;
