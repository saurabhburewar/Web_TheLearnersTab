/*global chrome*/
import './App.css';
import Tilesbottom from "./components/Tiles/tilesbottom";
import Todo from "./components/Todo/todo";
// import HackerNews from "./components/Hackernews/hackernews";
import Bookwindow from "./components/Bookmarks/bookwindow";
// import Info from "./components/Info/info";
// import Clock from "./components/Clock/clock";
// import SpaceWeather from "./components/SpaceWeather/SpaceWeather";
import Stocks from './components/Stocks/stocks';
import ScreenTimer from './components/ScreenTimer/ScreenTimer';
import SystemInfo from './components/SystemInfo/systeminfo';
import CustomWall from './components/CustomWall/customwall';
import { useState, useEffect } from 'react';
import HistoryInfo from './components/HistoryInfo/historyInfo';
import GithubInfo from './components/GithubInfo/githubInfo';

function App() {

  const [file, setFile] = useState();

  useEffect(() => {
    chrome.storage.local.get("LTImg", (result) => {
        if(result.LTImg) {
            setFile(result.LTImg)
        }
    })
  })


  return (
    <div style={{backgroundImage: 'url(' + file + ')'}} className="application">
      <div className="Left-container">
        <Todo />
        <GithubInfo />
        <HistoryInfo />
        <ScreenTimer />
        <SystemInfo />
        {/* <Clock />
        <SpaceWeather />
        <Info /> */}
      </div>
      <div className="Right-container">
        <Bookwindow />
        <Tilesbottom />
      </div>
    </div>
  );
}

export default App;
