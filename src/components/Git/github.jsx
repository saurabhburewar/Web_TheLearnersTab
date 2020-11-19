import React, { Component } from "react";
import Gists from "./gists";
import Repos from "./repos";
import User from "./user";
import "./github.css";

class Github extends Component {
  state = { user: [] };

  componentDidMount() {
    if (localStorage.getItem("Github-username") == null) {
      return;
    } else {
      this.setState({
        user: JSON.parse(localStorage.getItem("Github-username")),
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("Github-username", JSON.stringify(this.state.user));
  }

  addusername = (uName) => {
    this.setState({
      user: [uName],
    });
  };

  clearUsername = () => {
    this.setState({
      user: null,
    });
  };

  render() {
    return (
      <div className="gitpage">
        <div className="gituser">
          {this.state.user != null ? (
            <div className="gitinfo">
              <button className="logoutbut" onClick={this.clearUsername}>
                <img
                  src={require("../../images/25376.png")}
                  alt="Sign out"
                ></img>
              </button>
              {this.state.user.map((u) => (
                <div key="0" className="repos-gists">
                  <Repos key="0" nameText={u.nameText} />
                  <Gists key="1" nameText={u.nameText} />
                </div>
              ))}
            </div>
          ) : (
            <User onSubmit={this.addusername} />
          )}
        </div>
      </div>
    );
  }
}

export default Github;
