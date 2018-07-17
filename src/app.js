const express = require("express");
const bodyParser = require("body-parser"); //auxilia na conversão para Json
const mongoose = require("mongoose");
const config = require("./config");
const router = express.Router();
const app = express();

//configuring bodyparser
app.use(bodyParser.json({
    limit: "5mb"
}));

app.use(bodyParser.urlencoded({ extended: false }));

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//connection to dataBase
mongoose.connect(config.connectionString, { useNewUrlParser: true });

//loading models
const user = require("./models/user");

//creating route's
const userRoute = require("./routes/user-route");

app.use("/users", userRoute);
//exporting app
module.exports = app;
