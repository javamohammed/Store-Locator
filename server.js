const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors");
const { connectDB } = require('./src/helpers/db')
const app = express()
const PORT = process.env.PORT || 5000

//load env vars
dotenv.config({
    path: './env'
})

// Connect to database
connectDB()

//set static folder
app.use(express.static(path.join(__dirname, "public")));
//Body Parse
app.use(express.json())

// Enable Cors
app.use(cors());

//Routes
app.use(require('./src/routes/stores'))

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
