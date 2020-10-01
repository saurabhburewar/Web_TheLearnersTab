import React, { Component } from "react";
import "./repos.css";
import "axios";

class Repos extends Component {
  state = { repos: [], repotype: "all", languages: [] };

  componentDidMount() {
    this._isMounted = true;
    const axios = require("axios");
    axios
      .get(
        `https://api.github.com/users/${this.props.nameText}/repos?type=${this.state.repotype}`
      )
      .then((resp) => {
        let repos = resp.data;
        this.setState({
          repos,
        });
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updaterepos = (s) => {
    this.setState({
      repotype: s,
    });
  };

  componentDidUpdate() {
    const axios = require("axios");
    axios
      .get(
        `https://api.github.com/users/${this.props.nameText}/repos?type=${this.state.repotype}`
      )
      .then((resp) => {
        let repos = resp.data;
        this.setState({
          repos,
        });
      });
  }

  getLanguage = (languageurl) => {
    this.setState({
      languages: JSON.parse(languageurl),
    });
    console.log(this.state.languages);
  };

  render() {
    return (
      <div className="repos">
        <div className="reposhead">
          Public Repositories
          <div className="dropdown">
            <button className="dropbtn">Filter</button>
            <div className="dropdown-content">
              <button onClick={() => this.updaterepos("all")}>All</button>
              <button onClick={() => this.updaterepos("owner")}>Owner</button>
              <button onClick={() => this.updaterepos("member")}>Member</button>
            </div>
          </div>
        </div>
        <div className="reposList">
          {this.state.repos.map((repo) => (
            <div key={repo.id} className="repositem">
              <a className="reposText" href={repo.html_url}>
                {repo.name}
              </a>
              <div className="reposissues" title="Open Issues">
                {repo.open_issues_count ? (
                  <img
                    className="issueimg"
                    src={require("../../images/issue-01.png")}
                    alt=""
                  ></img>
                ) : null}
              </div>
              <br />
              <a className="reposauthor" href={repo.owner.html_url}>
                Owner: {repo.owner.login}
              </a>
              <br />
              <div className="reposlanguage">{repo.language}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Repos;
