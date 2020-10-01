import React, { Component } from "react";
import "./bookmark.css";

class Bookmark extends Component {
  state = {
    text: "",
    bookmarklist: [],
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.handleTransfer();
    localStorage.setItem(
      "Bookmarks-list",
      JSON.stringify(this.state.bookmarklist)
    );
    localStorage.setItem("Bookmarks-string", this.state.text);
  };

  handleTransfer() {
    this.setState({
      bookmarklist: this.state.text.split(","),
    });
  }

  render() {
    return (
      <div className="bookpage">
        {this.state.bookmarklist.map((book) => (
          <div className="bookitem">
            <div className="booktitle">
              <a className="btitle" href={book}>
                {book}
              </a>
            </div>
          </div>
        ))}
        <div className="addbookmark dropdown">
          <button className="addbutton">a</button>
          <div className="addform">
            <form>
              <input
                className="bookinput"
                name="text"
                value={this.state.text}
                onChange={this.handleChange}
                autoComplete="off"
              ></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Bookmark;
