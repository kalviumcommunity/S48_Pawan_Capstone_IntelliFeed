const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport');

const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,               
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, 
    httpOnly: true,
  }
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to the database'));

const router = require("./routes");
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('IntelliFeed');
});

app.get('/mongoDBstatus', (req, res) => {
  res.send(`Database Connection Status: ${db ? 'Connected' : 'Disconnected'}`);
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
