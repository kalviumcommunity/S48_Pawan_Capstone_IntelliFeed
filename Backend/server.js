const express = require('express');
const cors = require('cors'); 
const app = express();
app.use(cors()); 
const port = process.env.PORT || 3000;
const mongoose=require('mongoose');
const User = require('./Models/users');
const summarizedarticles = require('./Models/summarisedarticles');
require('dotenv').config()
const mongoURI = process.env.MONGODB_URI
app.use(express.json())
const router=require("./routes")
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('IntelliFeed');
});

mongoose.connect(mongoURI);
const db =mongoose.connection;
db ? console.log("connected to the database") :console.log("not connected");
db.on('error',console.error.bind(console,'MongoDB connection error:'));

app.get('/mongoDBstatus',(req,res)=>{
    res.send(`Database Connection Status:${db?'Connected':'Disconnected'}`);
  });

app.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to get users.' });
  }
});
  
app.get('/getArticles', async (req, res) => {
  try {
    const articles = await summarizedarticles.find(); 
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching summarizedarticles:', error);
    res.status(500).json({ message: 'Failed to get summarizedarticles.' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
