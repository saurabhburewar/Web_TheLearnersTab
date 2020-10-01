import React, { Component } from "react";
import shortid from "shortid";
import "./todoform.css";
import plussign from "../../images/AddSign.png";

class Todoform extends Component {
  state = { text: "" };

  handleText = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  Submit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
    });
    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.Submit}>
        <div className="addTodo">
          <input
            className="todoInput"
            name="text"
            value={this.state.text}
            onChange={this.handleText}
            placeholder="What to do..."
            autoComplete="off"
          ></input>
          <button className="plus" onClick={this.Submit}>
            <img className="plusIcon" src={plussign} alt="add"></img>
          </button>
        </div>
      </form>
    );
  }
}

export default Todoform;
