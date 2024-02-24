const router = require("express").Router();
const dotenv = require("dotenv");
require("dotenv").config();
const Weather = require("../Services/Weather");
 
router.route("/location").get(async (req, res) => {
  
  try {
    const { latitude, longitude } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Missing location data" });
    }
    const weatherData = await Weather.getWeatherdata(latitude, longitude);
    
    if (weatherData) {
      res.json(weatherData);
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving weather data" });
  }
});

module.exports = router;
