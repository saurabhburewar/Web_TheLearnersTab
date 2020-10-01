import React, { Component } from "react";
import "./wdTiles.css";

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
          ></a>
        </div>
        <div className="Wdrow">
          <div className="Wdtile SP">
            <a
              href="https://www.sitepoint.com/"
              title="SitePoint"
              className="Wdtilelink"
            ></a>
          </div>
          <div className="Wdtile CSST">
            <a
              href="https://css-tricks.com/"
              title="CSS Tricks"
              className="Wdtilelink"
            ></a>
          </div>
        </div>
        <div className="Wdrow">
          <div className="Wdtile SCH">
            <a
              href="https://scotch.io/"
              title="Scotch"
              className="Wdtilelink"
            ></a>
          </div>
        </div>
        <div className="Wdtile CP">
          <a
            href="https://codepen.io/"
            title="CodePen"
            className="Wdtilelink"
          ></a>
        </div>
        <div className="Wdrow">
          <div className="Wdtile W3C">
            <a
              href="https://www.w3.org/"
              title="W3C"
              className="Wdtilelink"
            ></a>
          </div>
          <div className="Wdtile W3S">
            <a
              href="https://www.w3schools.com/"
              title="W3 Schools"
              className="Wdtilelink"
            ></a>
          </div>
        </div>
      </div>
    );
  }
}

export default WdTiles;
