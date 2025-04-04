const express = require("express");
const cors = require("cors");
const {sequelize} = require('./config')
const {Movie,Actor,Genre} = require('./models/relationships.database')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Định tuyến
app.get('/', (req,res) => {
    res.send("Hello World!");
})

sequelize.sync()
    .then(() => console.log("Database synced"))
    .catch((err) => console.error("Error syncing database"))

module.exports = app;
