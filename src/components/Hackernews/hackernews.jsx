import React, { Component } from "react";
import "./hackernews.css";
import "axios";
import "http-proxy-middleware";
import proxyApp from "../../setupProxy";

class HackerNews extends Component {
  state = { newsid: [], news: [], content: "topstories" };

  componentDidUpdate() {
    const axios = require("axios");
    proxyApp.get(() => {
      axios
        .get(`https://hacker-news.firebaseio.com/v0/${this.state.content}`)
        .then((res) => {
          let newsid = res.data;
          this.setState({
            newsid,
          });
        });
    });

    for (let i = 0; i < 20; ++i) {
      let id = this.state.newsid[i];
      axios
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}`)
        .then((res) => {
          let n = res.data;
          this.setState({
            news: [n, ...this.state.news],
          });
        });
    }
  }

  updatenews = (nstype) => {
    this.setState({
      content: nstype,
    });
  };

  render() {
    return (
      <div className="newspage">
        <div className="newshead">Hacker News</div>
        <div className="dropdown">
          <button className="dropbtn">a</button>
          <div className="dropdown-content">
            <button onClick={() => this.updatenews("topstories")}>
              Top Stories
            </button>
            <button onClick={() => this.updatenews("jobstories")}>
              Job Stories
            </button>
          </div>
        </div>
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
      </div>
    );
  }
}

export default HackerNews;
