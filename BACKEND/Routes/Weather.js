const router = require("express").Router();
const dotenv = require("dotenv") 
require("dotenv").config()
const axios = require('axios');
//const express = require('express');
//const router = express.Router();
console.log("api", process.env.OPENWEATHERMAP_API_KEY);
const apiid=process.env.OPENWEATHERMAP_API_KEY;
// router.route("/adduser").post((req, res) => {

router.route("/location").get(async(req, res) => {  
        console.log("missing", req.query);
    try {
      const { latitude, longitude } = req.query; 
      console.log("missing", latitude);
      if (!latitude || !longitude) {
        console.log("missing");
        return res.status(400).json({ message: 'Missing location data' });
       
      }
     // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiid}`;
     // const response = await axios.get(url);
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    //    // const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}', {
        params: { 
          lat: latitude,
          lon: longitude,
          units: 'metric', // Use metric units by default
          appid: process.env.OPENWEATHERMAP_API_KEY,
        }, 
      });
  console.log(response,"response");
      const weatherData = {
        temperature: response.data.main.temp,
       // temperature: Math.floor(response.data.main.temp - 273.15), // Convert Kelvin to Celsius
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        dt:response.data.dt,
        country:response.data.sys.country,
        name:response.data.name,
        temp_min:response.data.main.temp_min,
        temp_max:response.data.main.temp_max, 
      };
      console.log("weatherData",weatherData);
      res.json(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ message: 'Error retrieving weather data' });
    }
  });

  module.exports = router; // Ensure that you export the router
