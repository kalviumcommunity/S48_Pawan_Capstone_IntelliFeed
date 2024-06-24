const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
  },
  profilePicture: {
    type: Schema.Types.Mixed,
    default: null,
  },
  interests: {
    type: [String], 
  },
});

module.exports = mongoose.model('users', userSchema);
