const express = require('express')
const router = express.Router()
const passport= require('passport');
const User = require('./Models/users');
const summarizedarticles = require("./Models/summarisedarticles")
const bcrypt = require('bcrypt'); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const upload = require('./config/multer');
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

async function summarizeArticle(articleText) {
  try {
    const prompt = `Summarize this article: ${articleText}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    return summary;
  } catch (error) {
    console.error('Error summarizing article:', error);
    return null;
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

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

router.get('/getUsers', authenticateToken , async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to get users.' });
  }
});

router.get('/getArticles',authenticateToken, async (req, res) => {
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

router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      let errorMessage = '';
      if (existingUser.username === username) {
        errorMessage = 'Username already in use.';
      }
      if (existingUser.email === email) {
        errorMessage = 'Email already in use.';
      }
      return res.status(400).json({ message: errorMessage });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePicture = req.file ? req.file.buffer : null;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully!', user: savedUser.toJSON({ virtuals: true }) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    const token = jwt.sign({ id: user._id, username: user.username , pp:user.profilePicture }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

  router.post('/summarize', async (req, res) => {
  try {
    const { articleLink } = req.body;
    const summary = await summarizeArticle(articleLink);

    if (summary) {
      res.status(200).json({ summary });
    } else {
      res.status(500).json({ message: 'Failed to generate summary.' });
    }
  } catch (error) {
    console.error('Error during summarization:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/bookmarks', async (req, res) => {
  try {
    const { title, content, author, url, urlToImage } = req.body;

    const newBookmark = new summarizedarticles({
      title,
      content,
      author,
      url,
      urlToImage,
    });

    await newBookmark.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving bookmark:', error);
    res.status(500).json({ message: 'Failed to save bookmark.' });
  }
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, username: req.user.username}, JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`http://localhost:5173/feedpage?token=${encodeURIComponent(token)}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session' });
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout successful!' });
  
    });
  });
});


module.exports = router;
