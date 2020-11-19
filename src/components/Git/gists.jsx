import React, { Component } from "react";
import "./gists.css";
import "axios";

class Gists extends Component {
  state = { gists: [] };

  componentDidMount() {
    const axios = require("axios");
    axios
      .get(`https://api.github.com/users/${this.props.nameText}/gists`)
      .then((res) => {
        let gists = res.data;
        this.setState({ gists });
      });
  }

  render() {
    return (
      <div className="gists">
        <div className="gistshead">G I S T S</div>
        <div className="gistsList">
          {this.state.gists.map((gist) => (
            <div key={gist.id} className="gistsitem">
              <a className="gistsText" href={gist.html_url}>
                {gist.description !== ""
                  ? gist.description
                  : Object.keys(gist.files)[0]}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gists;
