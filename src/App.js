/*global chrome*/
import React from "react";
import "./App.css";
import Tilesbottom from "./components/Tiles/tilesbottom";
import Csszen from "./components/Tiles/csszenclass";
import Todo from "./components/Todo/todo";
import HackerNews from "./components/Hackernews/hackernews";
import Bookwindow from "./components/Bookmarks/bookwindow";
import Info from "./components/Info/info";
import Clock from "./components/Clock/clock"

function App() {
  return (
    <div className="application">
      <div className="Left-container">
        <HackerNews />
        <Clock />
        <Bookwindow />
        <Info />
      </div>
      <div className="Right-container">
        <Todo />
        <Csszen />
        <Tilesbottom />
      </div>
    </div>
  );
}

export default App;
