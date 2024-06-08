const mongoose = require('mongoose');

const summarizedArticleSchema = new mongoose.Schema({
    title: { type: String,required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    urltoimg: { type: String, required: true },
    addedOn :{ type: Date, required:true},
  });
  
  module.exports = mongoose.model('summarizedarticles', summarizedArticleSchema);