import React from "react";
import Book from "../components/Book";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleSeach = async (e) => {
    const field = e.target.value.replace(" ", "+");
    const url = `https://www.googleapis.com/books/v1/volumes?q=${field}`;
    const data = await this.search(url);
    this.setState({ data: data });
  };

  search = async (url) => {
    const response = await fetch(url);
    if (response.status === 400) {
      return [];
    }
    const data = await response.json();
    return data;
  };

  render() {
    return (
      <div className="container">
        <input className="searchBar" onKeyUp={this.handleSeach} />
        <p>
          {this.state.data.totalItems &&
            `${this.state.data.totalItems} resultados encontrados`}
        </p>
        <div className="books">
          {this.state.data["items"]?.map((book) => (
            <Book book={book}/>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
