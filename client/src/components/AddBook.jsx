import React from 'react';
import $ from 'jquery';

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    $.post({
      url: '/books',
      data: JSON.stringify(this.state),
      success: (data) => {
        this.setState({
          title: '',
        });

        this.props.retrieveBooks();
      },
      error: (err) => {
        console.error('err', err);
      },
      contentType: 'application/json'
    });
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form action="#" onSubmit={ this.handleSubmit } >
            <div className="form-group row">
              <input name="title" type="text" className="form-control form-control-lg" value={ this.state.title } onChange={ this.handleChange } />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Add Book</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddBook;
