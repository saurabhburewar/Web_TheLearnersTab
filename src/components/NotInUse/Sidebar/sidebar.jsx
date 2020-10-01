import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

class Sidebar extends Component {
  state = {};

  render() {
    return (
      <div className="side-list">
        <Link to="/newtab">
          <div className="side-items" id="side-nt" style={this.props.style}>
            Newtab
          </div>
        </Link>
        <Link to="/youtube-history">
          <div className="side-items" id="side-yt">
            Youtube
          </div>
        </Link>
        <Link to="/stack-overflow-history">
          <div className="side-items" id="side-SO">
            Stack overflow
          </div>
        </Link>
        <Link to="/github">
          <div className="side-items" id="side-gh">
            Github
          </div>
        </Link>
        <Link to="/reddit">
          <div className="side-items" id="side-rd">
            Reddit
          </div>
        </Link>
      </div>
    );
  }
}

export default Sidebar;
