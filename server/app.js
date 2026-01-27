const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const API_VERSION = process.env.API_VERSION;

const app = express();

//Import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require ("./router/menu");
const courseRoutes = require("./router/course");

//Configure Body Parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configure static files
app.use(express.static("uploads"));

//Configure Header HTTP - CORS
app.use(cors());

// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);

module.exports = app;