import React, { Component } from "react";
import "./infoside.css";

class InfoSide extends Component {
  state = {};

  SubmitHis = () => {
    this.props.callback("history");
  };

  SubmitYt = () => {
    this.props.callback("Ythistory");
  };

  SubmitSo = () => {
    this.props.callback("Sohistory");
  };

  SubmitG = () => {
    this.props.callback("Githistory");
  };

  SubmitR = () => {
    this.props.callback("Redhistory");
  };

  render() {
    return (
      <div className="sideList">
        <div className="sideItem sideHis" onClick={this.SubmitHis}>
          History
        </div>
        <div className="sideItem sideYt" onClick={this.SubmitYt}>
          Youtube
        </div>
        <div className="sideItem sideSo" onClick={this.SubmitSo}>
          Stack overflow
        </div>
        <div className="sideItem sideG" onClick={this.SubmitG}>
          Github
        </div>
        {/* <div className="sideItem sideR">
          Reddit
        </div> */}
      </div>
    );
  }
}

export default InfoSide;
