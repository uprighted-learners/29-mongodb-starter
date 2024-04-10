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

// define a schema for the user data with Mongoose
const learnersSchema = new mongoose.Schema({
    name: String,
    favoriteFood: String,
})

// create a mongoose model for the user data
const Learners = mongoose.model('learners', learnersSchema);

// set up a route to GET all the user data
// GET - /api/learners - get all learners
app.get("/api/learners", async (req, res) => {
    try {
        // get all the learner data from the database
        const learnerData = await Learners.find({});
        // send the learner data as a JSON response
        res.json(learnerData);
    } catch (error) {
        console.log(error)
    }
})