import React, { Component } from "react";
import Todoform from "./todoform";
import TodoList from "./todoList";
import "./todo.css";
import bin from "../../images/deletebin.png";

class Todo extends Component {
  state = { todos: [], Toshow: "all" };

  componentDidMount() {
    if (localStorage.getItem("Todos-List") == null) {
      localStorage.setItem("Todos-List", JSON.stringify(this.state.todos));
    } else {
      this.setState({
        todos: JSON.parse(localStorage.getItem("Todos-List")),
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("Todos-List", JSON.stringify(this.state.todos));
  }

  addtoList = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  clearTodo = () => {
    this.setState({
      todos: [],
    });
  };

  render() {
    return (
      <div className="TodoContainer">
        <Todoform onSubmit={this.addtoList} />
        <div className="lefttodo">
          <div id="textLeft">Tasks Left</div>: {this.state.todos.length}
        </div>
        {this.state.todos.length >= 5 ? (
          <div className="message">Your tasks are piling up!</div>
        ) : null}
        {this.state.todos.length ? (
          <button className="deletebut" onClick={this.clearTodo}>
            <img className="deleteicon" src={bin} alt="del"></img>
          </button>
        ) : null}
        <div className="showthelist">
          {this.state.todos.map((todo) => (
            <TodoList
              key={todo.id}
              permaDelete={() => this.deleteTodo(todo.id)}
              text={todo.text}
            />
          ))}
          {this.state.todos.length ? null : (
            <div className="listmessage">
              Your pending tasks <br /> will be shown here
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Todo;
