import React, { Component } from "react";
import "./cpTiles.css";
import { ReactComponent as GdbLogo } from "../../images/OnlineGDB.svg";
import { ReactComponent as GfgLogo } from "../../images/GFG.svg";
import { ReactComponent as HrLogo } from "../../images/HackerRank.svg";
import { ReactComponent as CcLogo } from "../../images/Chef.svg";
import { ReactComponent as CfLogo } from "../../images/Codeforces.svg";
import { ReactComponent as CwLogo } from "../../images/Codewars.svg";

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
            <GdbLogo className="cptileicon"/>
          </a>
        </div>
        <div className="Cptile GFG">
          <a
            href="https://www.geeksforgeeks.org/"
            title="Geeks for Geeks"
            className="Cptilelink"
          ><GfgLogo className="cptileicon"/></a>
        </div>
        <div className="Cprow">
          <div className="Cptile HR">
            <a
              href="https://www.hackerrank.com/"
              title="HackerRank"
              className="Cptilelink"
            ><HrLogo className="cptileicon"/></a>
          </div>
          <div className="Cptile CC">
            <a
              href="https://www.codechef.com/"
              title="CodeChef"
              className="Cptilelink"
            ><CcLogo className="cptileicon"/></a>
          </div>
        </div>
        <div className="Cprow">
          <div className="Cptile CF">
            <a
              href="https://codeforces.com/"
              title="CodeForces"
              className="Cptilelink"
            ><CfLogo className="cptileicon"/></a>
          </div>
          <div className="Cptile CW">
            <a
              href="https://www.codewars.com/"
              title="CodeWars"
              className="Cptilelink"
            ><CwLogo className="cptileicon"/></a>
          </div>
        </div>
      </div>
    );
  }
}

export default CpTiles;
