import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: props.book.read,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      read: !this.state.read
    });
    console.info("Clicked!");
  }

  render() {
    let thumbnailImg = null;
    if (this.props.book.thumbnail) {
      thumbnailImg = <img src={this.props.book.thumbnail} />;
    }

    return (
      <div className={ this.state.read ? 'book read' : 'book unread' } onClick={ this.handleClick } >
        <div className="row">
          <div className="col-md-3">
            <h3>{ this.props.book.title }</h3>
            <h4>{ this.props.book.author }</h4>
            { thumbnailImg }
          </div>
          <div className="col-md-9">
            <p>{ this.props.book.description }</p>
            <h6>{ this.props.book.pageCount } Pages</h6>
          </div>
        </div>
      </div>
    )
  }
}


export default Book;
