import React, { Component } from "react";
import "./wdTiles.css";
import {ReactComponent as SbLogo} from "../../images/StackBlitz.svg"
import {ReactComponent as SpLogo} from "../../images/Sitepoint.svg"
import {ReactComponent as CsstLogo} from "../../images/CSS-Tricks.svg"
import {ReactComponent as SchLogo} from "../../images/scotch.svg"
import {ReactComponent as CpLogo} from "../../images/Codepen.svg"
import {ReactComponent as W3cLogo} from "../../images/W3C.svg"
import {ReactComponent as W3sLogo} from "../../images/W3S.svg"

class WdTiles extends Component {
  state = {};
  render() {
    return (
      <div className="Wdgrid">
        <div className="Wdtile SB">
          <a
            href="https://stackblitz.com/"
            title="StackBlitz"
            className="Wdtilelink"
          ><SbLogo className="wdtileicon"/></a>
        </div>
        <div className="Wdrow">
          <div className="Wdtile SP">
            <a
              href="https://www.sitepoint.com/"
              title="SitePoint"
              className="Wdtilelink"
            ><SpLogo className="wdtileicon"/></a>
          </div>
          <div className="Wdtile CSST">
            <a
              href="https://css-tricks.com/"
              title="CSS Tricks"
              className="Wdtilelink"
            ><CsstLogo className="wdtileicon"/></a>
          </div>
        </div>
        <div className="Wdrow">
          <div className="Wdtile SCH">
            <a
              href="https://scotch.io/"
              title="Scotch"
              className="Wdtilelink"
            ><SchLogo className="wdtileicon schicon"/></a>
          </div>
        </div>
        <div className="Wdtile CP">
          <a
            href="https://codepen.io/"
            title="CodePen"
            className="Wdtilelink"
          ><CpLogo className="wdtileicon"/></a>
        </div>
        <div className="Wdrow">
          <div className="Wdtile W3C">
            <a
              href="https://www.w3.org/"
              title="W3C"
              className="Wdtilelink"
            ><W3cLogo className="wdtileicon"/></a>
          </div>
          <div className="Wdtile W3S">
            <a
              href="https://www.w3schools.com/"
              title="W3 Schools"
              className="Wdtilelink"
            ><W3sLogo className="wdtileicon"/></a>
          </div>
        </div>
      </div>
    );
  }
}

export default WdTiles;
