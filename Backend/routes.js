const express = require('express')
require('dotenv').config()
const router = express.Router()
const User = require('./Models/users');
const summarizedarticles = require("./Models/summarisedarticles")
const mongoose=require('mongoose');
const db =mongoose.connection;
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI);
const bcrypt = require('bcrypt'); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

router.get('/mongoDBstatus',(req,res)=>{
  res.send(`Database Connection Status:${db?'Connected':'Disconnected'}`);
});

router.get('/newsAPIorg', (req, res) => {
  fetch(`https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey=${process.env.NEWSapiORG}`)
      .then(response =>response.json())
      .then(data =>{
          console.log(data)
          res.send(data);
      })
      .catch(err =>{
          res.send(err);
      });
});

router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to get users.' });
  }
});

router.get('/getArticles', async (req, res) => {
  try {
    const articles = await summarizedarticles.find(); 
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching summarizedarticles:', error);
    res.status(500).json({ message: 'Failed to get summarizedarticles.' });
  }
});

router.get('/getUsers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by id:', error);
    res.status(500).json({ message: 'Failed to get user.' });
  }
});

router.get('/getArticles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await summarizedarticles.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found.' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article by id:', error);
    res.status(500).json({ message: 'Failed to get article.' });
  }
});

module.exports = router;