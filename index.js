// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// create an express app
const app = express();

// load environmental variables
dotenv.config();

// body parser middleware
app.use(express.json());

// declare port
const PORT = process.env.PORT || 8080;

// get the MongoDB connect URL from the environment variable
const MONGOURL = process.env.ATLAS_URI;

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
        const data = await Learners.find({});
        // send the learner data as a JSON response
        res.json(data);
    } catch (error) {
        console.log(error)
    }
})

// GET - /api/learners/:id - get learner by id
app.get("/api/learners/:id", async (req, res) => {
    try {
        // get the learner data from the database
        const data = await Learners.findById(req.params.id);
        // send the learner data as a JSON response
        res.json(data);
    } catch (error) {
        console.log(error)
    }
})

// POST - /api/learners - create a new learner
app.post("/api/learners", async (req, res) => {
    try {
        // create a new learner object from the request body
        const learner = new Learners({
            name: req.body.name,
            favoriteFood: req.body.favoriteFood
        });
        // save the learner to the database
        await learner.save();
        // send the new learner data as a JSON response
        res.json(learner);
    } catch (error) {
        console.log(error)
    }
})

// PUT - /api/learners/:id - update a learner by id
app.put("/api/learners/:id", async (req, res) => {
    try {
        // update the learner data in the database
        const data = await Learners.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            favoriteFood: req.body.favoriteFood
        }, { new: true });
        // send the updated learner data as a JSON response
        res.json(data);
    } catch (error) {
        console.log(error)
    }
});

// DELETE - /api/learners/:id - delete a learner by id
app.delete("/api/learners/:id", async (req, res) => {
    try {
        // delete the learner data from the database
        const data = await Learners.findByIdAndDelete(req.params.id);
        // send the deleted learner data as a JSON response
        res.json(data);
    } catch (error) {
        console.log(error)
    }
});