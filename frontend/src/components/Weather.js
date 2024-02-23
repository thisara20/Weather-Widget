import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Weather.css"; // Tell webpack that Button.js uses these styles

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
//import {TextField} from '@material-ui/core/TextField';
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import axios from "axios";

const WeatherApp = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState();

  const apiKey = "33c92b0552e0eea71460739025382726";
  //const formattedDate = moment(weatherData.dt * 1000).format('MMMM Do YYYY');

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude,longitude,"longitude and lat");
        // Send latitude and longitude to backend (e.g., using a fetch API call)
        const location ={latitude, longitude}
        axios
    .post(`https://localhost:8070/register/adduser`, location)
    .then((response) => {
      console.log("Response:", response.data);
      alert("Thanks for joining!");
      window.location = `/signin`;
    })
    .catch((error) => {
      console.error("Axios Error:", error);
      alert("Error occurred during registration");
    });
      },
      (error) => {
        // Handle location access denial or errors
        console.error("Error getting location:", error);
        // Show an error message or provide a location fallback option
      },
      {
        enableHighAccuracy: true // Request more precise location if needed
      }
    );
  };
  //getLocation();

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
      setFormattedDate(moment(weatherData.dt * 1000).format("MMMM Do YYYY"));

      setError(null);
    } catch (error) {
      setError("Error fetching weather data. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch initial weather data
    fetchWeatherData();
  }, [latitude, longitude]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "latitude") {
      setLatitude(value);
    } else if (name === "longitude") {
      setLongitude(value);
      // Fetch weather data on longitude change
      fetchWeatherData();
    }
  };
  return (
    <div className="blue-background">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ height:'', maxWidth: 'sm', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)' }}>
      <Container>
        
          <div>
             
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={latitude}
              placeholder="latitude"
              onChange={handleInputChange}
              className="input-field"
              //onChange={(e) => setLat(e.target.value)}
            />

            
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={longitude}
              placeholder="longitude"
              onChange={handleInputChange}
              className="input-field"
              //onChange={(e) => setLon(e.target.value)}
              // handleKeyDown ={handleKeyPress}
            />
          </div>
          {error && <div>{error}</div>}
          {weatherData && (
            <div>
              <p>Name: {weatherData.name} </p>
              <p>Country: {weatherData.sys.country} </p>
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <p>Date: {formattedDate}</p>
              
            </div>
           
          )}
        </Container></div>
      </Box>
    </div>
  );
};

export default WeatherApp;