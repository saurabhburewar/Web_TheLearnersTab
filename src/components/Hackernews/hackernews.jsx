import React, { Component } from "react";
import "./hackernews.css";
import "axios";
import "http-proxy-middleware";
import NewsStart from "./newsstart";
import Arrowicon from "../../images/arrowUp-01.png";

class HackerNews extends Component {
  state = { newsid: [], news: [], content: "newstories" };

  componentDidMount() {
    this.changeDisplay();
  }

  changeDisplay() {
    const axios = require("axios");
      axios
        .get(`https://hacker-news.firebaseio.com/v0/${this.state.content}.json`)
        .then((res) => {
          let nid = res.data;
          this.setState({
            newsid: nid,
            news: []
          });
        });
    if (Array.isArray(this.state.newsid) && this.state.newsid.length) {
      for (let i = 0; i < 20; ++i) {
        let shortnewsid = this.state.newsid[i];
        axios
          .get(`https://hacker-news.firebaseio.com/v0/item/${shortnewsid}.json`)
          .then((res) => {
            let n = res.data;
            this.setState({
              news: [n, ...this.state.news],
            });
          });
      }
    }
  }

  updatenews = (nstype) => {
    this.setState({
      content: nstype,
    }, () => this.changeDisplay());
  };

  render() {
    return (
      <div className="newspage">
        <a href="https://news.ycombinator.com/" className="newshead"></a>
        {this.state.news.length ? 
        <div className="newsfeed">
          {this.state.news.map((ne) => (
            <div key={ne.id} className="newsitem">
              <a className="newstitle" href={ne.url}>
                {ne.title}
              </a>
              <br />
              <div className="newsauthor">Author: {ne.by}</div>
              <br />
              <div className="newsscore">Score: {ne.score}</div>
            </div>
          ))}
        </div>
        : <NewsStart /> }

        <div className="dropdown">
          <button className="dropbtn">
            <img className="arrowIcon" src={Arrowicon} alt="icon"></img>
          </button>
          <div className="dropdown-content">
            <button onClick={() => this.updatenews("newstories")}>
              New Stories
            </button>
            <button onClick={() => this.updatenews("topstories")}>
              Top Stories
            </button>
            <button onClick={() => this.updatenews("jobstories")}>
              Job Stories
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HackerNews;
