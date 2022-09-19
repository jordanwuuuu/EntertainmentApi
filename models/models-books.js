const mongoose = require("mongoose");

// this obj will have keys for all the properties of our books
const booksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Param 1: name of model in database
// Param 2: name of schema
// Used to interact with database using schema
module.exports = mongoose.model('Books', booksSchema); 
