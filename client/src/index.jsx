import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BookList from './components/BookList.jsx';
import AddBook from './components/AddBook.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      books: []
    }

    this.retrieveBooks = this.retrieveBooks.bind(this);
  }

  componentDidMount() {
    this.retrieveBooks(); 
  }

  retrieveBooks() {
    $.get({
      url: '/books', 
      success: (data) => {
        this.setState({
          books: data || []
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <BookList books={ this.state.books } retrieveBooks={ this.retrieveBooks } />
        <AddBook retrieveBooks={ this.retrieveBooks } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
