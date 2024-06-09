const express = require('express')
require('dotenv').config()
const router = express.Router()
const User = require('./Models/users');
const summarizedarticles = require("./Models/summarisedarticles")
const mongoose=require('mongoose');
const db =mongoose.connection;
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI);



module.exports = router;