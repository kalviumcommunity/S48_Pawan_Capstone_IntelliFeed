const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose=require('mongoose');
require('dotenv').config()
const mongoURI = process.env.MONGODB_URI
app.use(express.json())

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
