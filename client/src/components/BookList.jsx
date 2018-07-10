import React from 'react';
import Book from './Book.jsx';

const BookList = (props) => (
  <div>
    <header className="row">
      <div className="col-md-12">
        <h1>Zookz</h1>
      </div>
    </header>
    { props.books
        .map(book => <Book book={ book } key={ book._id } retrieveBooks={ props.retrieveBooks } />) 
    }
  </div>
);

export default BookList;
