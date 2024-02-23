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

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude, "longitude and lat");

        const weatherData = { latitude, longitude };
        console.log(weatherData, "weatherData aa");
        // const response =   await axios .get(`http://localhost:8070/weather/location`,  weatherData );

        const response = await axios.get(
          `http://localhost:8070/weather/location?latitude=${latitude}&longitude=${longitude}`
        );

        if (response) {
          console.log(response, "response");
          const data = await response.data;
          setWeatherData(data);
          setFormattedDate(moment(data.dt * 1000).format("MMMM Do YYYY"));

          //setFormattedDate(moment(weatherData.dt * 1000).format("MMMM Do YYYY"));

          setError(null);
        }
      },
      (error) => {
        // Handle location access denial or errors
        console.error("Error getting location:", error);
        setError("Error fetching weather data. Please try again.");
        // Show an error message or provide a location fallback option
      },
      {
        enableHighAccuracy: true, // Request more precise location if needed
      }
    );
  };
  //getLocation();

 

  useEffect(() => {
    // Fetch initial weather data
    ///fetchWeatherData();
    getLocation();
  }, []);

   

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "50px",
        padding: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Adding box shadow
      }}
    >
      <div>
        {error && <Typography color="error">{error}</Typography>}
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            backgroundColor: "#00308F",
            color: "white",
          }}
          className="blue-background"
        >
          <Typography style={{ marginTop: "20px" }} variant="h5">
            Weather Information
          </Typography>
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid item xs={12} md={4}>
              <Box>
                {" "}
                <Typography>{weatherData?.country}</Typography>
                <Typography> {weatherData?.name}</Typography>
                <Typography>{formattedDate}</Typography>
              </Box>
              <Box style={{ marginTop: "30px" }}>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt="Weather Icon"
                />
                <Typography>{weatherData?.description}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              container
              alignItems="center"
              justify="center"
            >
              {weatherData && (
                <Box>
                  <Typography variant="h4">
                    {weatherData?.temperature} °C
                  </Typography>
                  <Typography>{weatherData?.description}</Typography>
                </Box>
              )}
            </Grid>
            <hr style={{ border: "1px solid black" }} />
            <Grid item xs={12} md={4} container alignItems="center">
              <Box>
                <Box>
                  <Typography variant="h4">
                    {weatherData?.temperature} °C
                  </Typography>
                </Box>

                <Typography>Temp Min: {weatherData?.temp_min} °C</Typography>
                <Typography>Temp Max: {weatherData?.temp_max} °C</Typography>
              </Box>{" "}
            </Grid>
          </Grid>
          {/* {error && <Typography color="error">{error}</Typography>} */}
        </Paper>
      </div>
    </Container>

    //     <div className="blue-background">

    //       <Box sx={{ display: "flex", flexWrap: "wrap" }}>
    //       <div style={{  maxWidth: 'sm', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)' }}>
    //       <Container>

    //           <p>Date: {formattedDate}</p>
    //           {error && <div>{error}</div>}
    //           {weatherData && (
    //             <div>
    //                <p>Name: {weatherData.name} </p>
    //               <p>Country: {weatherData.country} </p>
    //               <p>Temperature: {weatherData.temperature} °C</p>
    //               <p>Weather: {weatherData.description}</p>
    //               <img
    //                 src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
    //                 alt="Weather Icon"
    //               />

    //               <p>temp_min: {weatherData.temp_min}</p>
    //               <p>temp_max: {weatherData.temp_max}</p>

    //             </div>

    //           )}

    // <Grid item xs={12} container alignItems="center" justify="center">
    //             {weatherData && (
    //               <Box>
    //                 <img
    //                   src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
    //                   alt="Weather Icon"
    //                 />
    //                 <Typography>{weatherData?.description}</Typography>
    //               </Box>
    //             )}
    //           </Grid>
    //         </Container></div>
    //       </Box>
    //     </div>
  );
};

export default WeatherApp;
