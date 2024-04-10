// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// create an express app
const app = express();

// load environmental variables
dotenv.config();

// declare port
const PORT = process.env.PORT || 8080;

// get the MongoDB connect URL from the environment variable
const MONGOURL = process.env.MONGO_URL;

// connect to MongoDB using Mongoose
mongoose.connect(MONGOURL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })