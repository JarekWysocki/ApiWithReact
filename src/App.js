import React, { Component } from "react";
import "./App.scss";

class App extends Component {
  state = {
    value: "",
    books: []
  };
  handleChange = e => {
    const value = e.target.value;
    this.setState({
      value
    });
  };
  handleSearchBook = e => {
    e.preventDefault();
    if (this.state.value === "") return alert("search book");
    const search = this.state.value;
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://www.googleapis.com/books/v1/volumes?q=" + search,
      true
    );
    xhr.onload = () => {
      if (xhr.status === 200) {
        const books = JSON.parse(xhr.responseText);
        const results = books.items;
        console.log(results);
        this.setState({ books: results });
      }
    };
    xhr.send(null);
    this.setState({
      value: ""
    });
  };

  render() {
    const books = this.state.books.map(book => (
      <div key={book.id}>
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.authors}</h3>
        <p>{book.volumeInfo.description}</p>
        <img alt="none" src={book.volumeInfo.imageLinks.thumbnail} />
      </div>
    ));
    return (
      <div className="App">
        <form>
          <label htmlFor="book">
            Search books :
            <input
              type="text"
              id="book"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <button onClick={this.handleSearchBook}>Search</button>
        </form>
        {books}
      </div>
    );
  }
}
export default App;
