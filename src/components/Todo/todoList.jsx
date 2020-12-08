import React from "react";
import "./todoList.scss";
import crossicon from "../../images/cross.png";

export default (props) => (
  <div className="listContainer">
    <div className="list">{props.text}</div>
    <button className="removebut" onClick={props.permaDelete}>
      <img className="crossIcon" src={crossicon} alt="icon"></img>
    </button>
  </div>
);
