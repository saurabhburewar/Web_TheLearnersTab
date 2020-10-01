import React, { Component } from "react";
import "./miscTiles.css";

class MiscTiles extends Component {
  state = {};
  render() {
    return (
      <div className="Miscgrid">
        <div className="Misctile GM">
          <a
            href="https://www.google.com/intl/en-GB/gmail/about/#"
            title="Gmail"
            className="Misctilelink"
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 293 219.87"
            >
              <title>gmail</title>
              <path
                d="M4,59.14c.33-.87.69-1.73,1-2.62a18.17,18.17,0,0,1,16-12.27,18,18,0,0,1,12.87,3.82C72,75.94,110.27,103.55,148.43,131.3c1.59,1.16,2.57,1.2,4.19,0,38.32-27.86,76.76-55.54,114.95-83.58,5.59-4.1,11-4.13,16.88-2.53A17.44,17.44,0,0,1,297,61.27c0,.67,0,1.33,0,2q0,90.84,0,181.68c0,10.75-7.13,18.65-17.28,19-6.28.21-12.58,0-19.19,0V97.82c-1.4,1-2.31,1.57-3.19,2.21Q205.21,137.47,153.1,175c-2,1.41-3.2,1.38-5.13,0Q95.78,137.33,43.49,99.84c-.76-.55-1.56-1.06-2.73-1.86V263.72c-7.45,0-14.62.57-21.66-.16-7.5-.77-12.24-5.67-14.45-12.9-.16-.52-.41-1-.62-1.53Q4,154.14,4,59.14Z"
                transform="translate(-4.02 -44.19)"
              />
            </svg>
          </a>
        </div>
        <div className="Misctile KP">
          <a
            href="https://keep.google.com/#home"
            title="Google Keep"
            className="Misctilelink"
          ></a>
        </div>
        <div className="Misctile OL">
          <a
            href="https://www.overleaf.com/"
            title="Overleaf"
            className="Misctilelink"
          ></a>
        </div>
        <div className="Misctile  LC">
          <a
            href="https://www.lucidchart.com/pages/"
            title="LucidChart"
            className="Misctilelink"
          ></a>
        </div>
      </div>
    );
  }
}

export default MiscTiles;