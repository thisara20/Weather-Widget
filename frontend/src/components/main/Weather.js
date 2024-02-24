import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Weather.css";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import axios from "axios";
import TypingEffect from "../TypingEffect";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [sunriseTime, setSunriseTime] = useState();
  const [sunsetTime, setSunsetTime] = useState();

  const combinedText =
    `${weatherData?.name}` + ", " + `${weatherData?.country}`;

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude, "longitude and lat");

        const response = await axios.get(
          `http://localhost:8070/weather/location?latitude=${latitude}&longitude=${longitude}`
        );

        if (response) {
          const data = await response.data;
          setWeatherData(data);
          // setSunsetTime(
          //   weatherData?.sunset &&
          //     moment(weatherData.sunset * 1000).format("h:mm A")
          // );
          // setSunriseTime(
          //   weatherData?.sunrise &&
          //     moment(weatherData.sunrise * 1000).format("h:mm A")
          // );

          setError(null);
        }
      },
      (error) => {
        // Handle location access denial or errors
        console.error("Error getting location:", error);
        setError("Error fetching weather data. Please try again.");
      },
      {
        enableHighAccuracy: true, // Request more precise location if needed
      }
    );
  };
  //const sunriseTime24Hour = sunriseDate.toLocaleTimeString('en-US', { hour12: false });

  useEffect(() => {
    getLocation();
    setSunsetTime(
      weatherData?.sunset &&
        moment(weatherData.sunset * 1000).format("h:mm A")
    );
    setSunriseTime(
      weatherData?.sunrise &&
        moment(weatherData.sunrise * 1000).format("h:mm A")
    );
    // setSunriseTime(weatherData?.sunrise?.toLocaleTimeString('en-US', { hour12: false })) ;

    // console.log(sunriseTime,"sss")
  }, [error]);

  const TypingEffect = ({ text, delay, color }) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (index < text?.length) {
          setDisplayText((prevText) => prevText + text[index]);
          setIndex((prevIndex) => prevIndex + 1);
        }
      }, delay);

      return () => clearTimeout(timer);
    }, [index, text, delay]);

    return <span style={{ color, fontWeight: "bold" }}>{displayText}</span>;
  };

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
          <Typography style={{ marginTop: "20px" }} variant="h4">
            Weather Information
          </Typography>
          {/* <Typography style={{ marginTop: "20px" }} variant="h5">
            Right Now in {weatherData?.name} , {weatherData?.country} , It's {weatherData?.description}
          </Typography> */}
          <Typography style={{ marginTop: "20px" }} variant="h5">
            Right Now in{" "}
            <TypingEffect color="yellow" text={combinedText} delay={250} /> ,
            It's {weatherData?.description}
          </Typography>

          {/* {weatherData.map((weatherData) => ( */}
          <Grid
            container
            spacing={3}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Grid item xs={4} md={3}>
              <Box style={{ marginTop: "10px" }}>
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`}
                  alt="Weather Icon"
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3} container alignItems="center">
              <Box>
                <Typography variant="h4">
                  {weatherData?.temperature} °C
                </Typography>

                <Typography>Temp Min: {weatherData?.temp_min} °C</Typography>
                <Typography>Temp Max: {weatherData?.temp_max} °C</Typography>
              </Box>{" "}
            </Grid>
            <hr style={{ border: "1px solid black" }} />
            <Grid item xs={12} md={3} container alignItems="center">
              <Box>
                <Box>
                  <Typography variant="h5">
                    {weatherData?.wind.speed}
                  </Typography>
                </Box>
                <Typography>Wind Speed</Typography>
                <br></br>
                <Box>
                  <Typography variant="h5">{weatherData?.rain} %</Typography>
                </Box>
                <Typography>Rain </Typography>
              </Box>{" "}
            </Grid>
            <Grid item xs={12} md={2} container alignItems="center">
              <Box>
                <Box>
                  <Typography variant="h5">{sunsetTime}</Typography>
                </Box>
                <Typography>Sunset </Typography>
                <br></br>
                <Box>
                  <Typography variant="h5">{sunriseTime}</Typography>
                </Box>
                <Typography>Sunrise </Typography>
              </Box>{" "}
            </Grid>
          </Grid>
          {/* ))} */}
        </Paper>
      </div>
    </Container>
  );
};

export default WeatherApp;