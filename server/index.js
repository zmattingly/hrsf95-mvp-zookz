const express = require('express');
const bodyParser = require('body-parser');
const models = require('../database');

const gbs = require('google-books-search-promise')("!!!-GOOGLE_BOOKS_API_KEY_HERE-!!!");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/books', function (req, res) {
  models.Book.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/books', function (req, res) {
  console.log(req.body.title);
  // Find book in Google Books API and Store Data

  const options = {
    offset: 0,
    limit: 1
  }

  gbs.searchByTitle(req.body.title, options)
    .then(results => {
      console.log(results);

      const result = results[0];
      let newBook = new models.Book({
        title: result.title,
        author: result.authors[0],
        description: result.description,
        pageCount: result.pageCount,
        thumbnail: result.thumbnail,
        read: false
      });

      const syncError = newBook.validateSync();
      if (syncError) {
        return res.status(400).json({ SyncError });
      }

      newBook.save();
      return res.status(200).json(newBook);
    })
    .catch(error => {
      return res.status(400).json({ error });
    });
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
