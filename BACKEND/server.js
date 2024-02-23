const express = require("express")
//const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const app = express()
require("dotenv").config()
const path = require("path")

const PORT = process.env.PORT || 8070

app.use(cors())
app.use(bodyParser.json())

//const URL = process.env.MONGODB_URL

// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// const connection = mongoose.connection
// connection.once("open", () => {
//   console.log("MongoDB connection success!")
// })

//give access to route file here
//IT20197032


const JobPostRouter = require("./Routes/Weather.js")
app.set("/weather", JobPostRouter)
//app.set('port', process.env.PORT || 3000)

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`)
})