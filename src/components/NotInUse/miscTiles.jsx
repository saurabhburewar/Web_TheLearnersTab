import React, { Component } from "react";
import "./miscTiles.css";
import {ReactComponent as MailLogo} from "../../images/gmail.svg";
import {ReactComponent as KeepLogo} from "../../images/keep.svg";
import {ReactComponent as OlLogo} from "../../images/overleaf.svg";
import {ReactComponent as LcLogo} from "../../images/lucidchart.svg";

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
          ><MailLogo className="misctileicon" /></a>
        </div>
        <div className="Misctile KP">
          <a
            href="https://keep.google.com/#home"
            title="Google Keep"
            className="Misctilelink"
          ><KeepLogo className="misctileicon keepicon" /></a>
        </div>
        <div className="Misctile OL">
          <a
            href="https://www.overleaf.com/"
            title="Overleaf"
            className="Misctilelink"
          ><OlLogo className="misctileicon" /></a>
        </div>
        <div className="Misctile  LC">
          <a
            href="https://www.lucidchart.com/pages/"
            title="LucidChart"
            className="Misctilelink"
          ><LcLogo className="misctileicon" /></a>
        </div>
      </div>
    );
  }
}

export default MiscTiles;
