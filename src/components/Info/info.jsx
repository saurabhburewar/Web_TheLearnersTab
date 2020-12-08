import React, { Component } from "react";
import "./info.css";
import InfoSide from "./infoside";
import History from "../History/history";
import YouTube from "../Youtube/youtube";
import StackOverflow from "../Stackoverflow/stackoverflow";
import Github from "../Git/github";
import Reddit from "../Reddit/reddit";

class Info extends Component {
  state = { content: "Githistory" };

  componentDidUpdate() {
    this.render();
  }

  updateContent = (type) => {
    this.setState({
      content: type,
    });
  };

  render() {
    return (
      <div className="infopage">
        {this.state.content === "history" ? (
          <div className="infopagein">
            <div className="infoside">
              <InfoSide callback={this.updateContent} />
            </div>
            <div className="infocontent">
              <History />
            </div>
          </div>
        ) : this.state.content === "Ythistory" ? (
          <div className="infopagein">
            <div className="infoside">
              <InfoSide callback={this.updateContent} />
            </div>
            <div className="infocontent">
              <YouTube />
            </div>
          </div>
        ) : this.state.content === "Sohistory" ? (
          <div className="infopagein">
            <div className="infoside">
              <InfoSide callback={this.updateContent} />
            </div>
            <div className="infocontent">
              <StackOverflow />
            </div>
          </div>
        ) : this.state.content === "Githistory" ? (
          <div className="infopagein">
            <div className="infoside">
              <InfoSide callback={this.updateContent} />
            </div>
            <div className="infocontent">
              <Github />
            </div>
          </div>
        ) : this.state.content === "Redhistory" ? (
          <div className="infopagein">
            <div className="infoside">
              <InfoSide callback={this.updateContent} />
            </div>
            <div className="infocontent">
              <Reddit />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Info;
