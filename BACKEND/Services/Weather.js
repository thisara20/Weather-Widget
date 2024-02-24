const dotenv = require("dotenv");
require("dotenv").config();
const axios = require("axios");

const getWeatherdata = async (latitude, longitude) => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat: latitude,
        lon: longitude,
        units: "metric",
        appid: process.env.OPENWEATHERMAP_API_KEY,
      },
    }
  );
  
  if (response) {
    const weatherData = {
      temperature: response?.data.main.temp,
      description: response?.data.weather[0].description,
      icon: response?.data.weather[0].icon,
      dt: response?.data.dt,
      country: response?.data.sys.country,
      name: response?.data.name,
      temp_min: response?.data.main.temp_min,
      temp_max: response?.data.main.temp_max,
      sunrise: response?.data.sys.sunrise,
      sunset: response?.data.sys.sunset,
      wind: response?.data.wind,
      rain: response?.data.clouds.all,
    };
 
    return weatherData;
  } else throw new Error("Unauthorized user");
};

module.exports = { getWeatherdata };
