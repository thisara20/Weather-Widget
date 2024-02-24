const express = require("express"); 
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const WeatherRouter = require("./Routes/Weather.js");
app.use("/weather", WeatherRouter); 

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
