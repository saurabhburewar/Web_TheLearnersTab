/*global chrome*/
import React, { Component } from "react";
import "./stackoverflow.css";

class StackOverflow extends Component {
  state = { soHis: [] };

  componentDidMount() {
    chrome.history.search(
      { text: "stackoverflow.com", startTime: 0, maxResults: 10 },
      (historyItems) => {
        this.setState({
          soHis: [...historyItems],
        });
      }
    );
  }

  render() {
    let lT = new Date();
    let Dateoptions = { year: "numeric", month: "short", day: "numeric" };
    let Timeoptions = { hour: "numeric", minute: "numeric" };
    return (
      <div className="stackPage">
        <div className="soHistory">
          <div className="soHead">Stack overflow history</div>
          {this.state.soHis.map((soH) => {
            lT = new Date(0);
            lT.setUTCMilliseconds(soH.lastVisitTime);
            return (
              <div key={soH.id} className="soHistoryItem">
                <div className="soHistoryTitle">
                  <a className="soHtitle" href={soH.url}>
                    {soH.title}
                  </a>
                </div>
                <div className="soHistoryLastTime">
                  <div className="soHistoryDate">
                    {lT.toLocaleDateString("en-US", Dateoptions)}
                  </div>
                  <div className="soHistoryTime">
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

export default StackOverflow;
