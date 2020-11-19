/*global chrome*/
import React, { Component } from "react";
import "./youtube.css";

class YouTube extends Component {
  state = { ytHis: [] };

  componentDidMount() {
    chrome.history.search(
      { text: "youtube.com", startTime: 0, maxResults: 10 },
      (historyItems) => {
        this.setState({
          ytHis: [...historyItems],
        });
      }
    );
  }

  render() {
    let lT = new Date();
    let Dateoptions = { year: "numeric", month: "short", day: "numeric" };
    let Timeoptions = { hour: "numeric", minute: "numeric" };
    return (
      <div className="ytPage">
          <div className="ytHead">Y O U T U B E <span className="tab"></span> H I S T O R Y</div>
        <div className="ytHistory">
          {this.state.ytHis.map((ytH) => {
            lT = new Date(0);
            lT.setUTCMilliseconds(ytH.lastVisitTime);
            return (
              <div key={ytH.id} className="ytHistoryItem">
                <div className="ytHistoryTitle">
                  <a className="ythtitle" href={ytH.url}>
                    {ytH.title}
                  </a>
                </div>
                <div className="ythistoryLastTime">
                  <div className="ythistoryDate">
                    {lT.toLocaleDateString("en-US", Dateoptions)}
                  </div>
                  <div className="ythistoryTime">
                    {lT.toLocaleTimeString("en-US", Timeoptions)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default YouTube;
