/*global chrome*/
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar/sidebar";
import StackOverflow from "./components/Stackoverflow/stackoverflow";
import YouTube from "./components/Youtube/youtube";
import Github from "./components/Git/github";
import Reddit from "./components/Reddit/reddit";
import Tilesbottom from "./components/Tiles/tilesbottom";
import Tilestop from "./components/Tiles/tilestop";
import Csszen from "./components/Tiles/csszenclass";
import Todo from "./components/Todo/todo";
import History from "./components/History/history";
import Bored from "./components/Bored/bored";
import HackerNews from "./components/Hackernews/hackernews";
import CpTiles from "./components/Tiles/cpTiles";
import WdTiles from "./components/Tiles/wdTiles";
import MiscTiles from "./components/Tiles/miscTiles";
import Bookmark from "./components/Bookmarks/bookmark";
import Info from "./components/Info/info";
import Clock from "./components/Clock/clock";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="application">
      <Router>
        <div className="Middle-container">
          <HackerNews />
          <CpTiles />
          <WdTiles />
          <MiscTiles />
          <Bookmark />
          <Info />
          <Route path="/newtab" component={History} />
          <Route path="/stack-overflow-history" component={StackOverflow} />
          <Route path="/youtube-history" component={YouTube} />
          <Route path="/github" component={Github} />
          <Route path="/reddit" component={Reddit} />
        </div>
        <div className="Right-container">
          <Todo />
          <Csszen />
          <Tilesbottom />
        </div>
      </Router>
    </div>
  );
}

export default App;
