import React, { Component } from "react";
import "./user.css";

class User extends Component {
  state = { nameText: "" };

  handleName = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  nameSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      nameText: this.state.nameText,
    });
  };

  render() {
    return (
      <div className="userform">
        Enter Github username:
        <form onSubmit={this.nameSubmit}>
          <input
            className="usernameInput"
            name="nameText"
            value={this.state.nameText}
            onChange={this.handleName}
            autoComplete="off"
          ></input>
        </form>
      </div>
    );
  }
}

export default User;
