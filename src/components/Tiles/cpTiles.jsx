import React, { Component } from "react";
import "./cpTiles.css";
import { ReactComponent as GdbLogo } from "../../images/OnlineGDB.svg";

class CpTiles extends Component {
  state = {};
  render() {
    return (
      <div className="Cpgrid">
        <div className="Cptile GDB">
          <a
            href="https://www.onlinegdb.com/"
            title="Online GDB"
            className="Cptilelink"
          >
            <GdbLogo />
          </a>
        </div>
        <div className="Cptile GFG">
          <a
            href="https://www.geeksforgeeks.org/"
            title="Geeks for Geeks"
            className="Cptilelink"
          ></a>
        </div>
        <div className="Cprow">
          <div className="Cptile HR">
            <a
              href="https://www.hackerrank.com/"
              title="HackerRank"
              className="Cptilelink"
            ></a>
          </div>
          <div className="Cptile CC">
            <a
              href="https://www.codechef.com/"
              title="CodeChef"
              className="Cptilelink"
            ></a>
          </div>
        </div>
        <div className="Cprow">
          <div className="Cptile CF">
            <a
              href="https://codeforces.com/"
              title="CodeForces"
              className="Cptilelink"
            ></a>
          </div>
          <div className="Cptile CW">
            <a
              href="https://www.codewars.com/"
              title="CodeWars"
              className="Cptilelink"
            ></a>
          </div>
        </div>
      </div>
    );
  }
}

export default CpTiles;
