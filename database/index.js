const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/zookz');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  description: String,
  pageCount: Number,
  thumbnail: String,
  // Filled In Later
  read: Boolean,
  pagesComplete: Number
});

let Book = mongoose.model('Book', bookSchema);

Book.selectAll = function(callback) {
  Book.find({}, function(err, items) {
    console.log(items);
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports = {
  Book
};
