/*global chrome*/
import React, { Component } from "react";
import "./history.css";

class History extends Component {
  state = { His: [] };

  componentDidMount() {
    chrome.history.search(
      { text: "", startTime: 0, maxResults: 10 },
      (historyItems) => {
        this.setState({
          His: [...historyItems],
        });
      }
    );
  }

  render() {
    let lT = new Date();
    let Dateoptions = { year: "numeric", month: "short", day: "numeric" };
    let Timeoptions = { hour: "numeric", minute: "numeric" };
    return (
      <div className="historyPage">
        <div className="history">
          <div className="Head">Recent history</div>
          {this.state.His.map((H) => {
            lT = new Date(0);
            lT.setUTCMilliseconds(H.lastVisitTime);
            return (
              <div key={H.id} className="historyItem">
                <div className="historyTitle">
                  <a className="htitle" href={H.url}>
                    {H.title}
                  </a>
                </div>
                <div className="historyLastTime">
                  <div className="historyDate">
                    {lT.toLocaleDateString("en-US", Dateoptions)}
                  </div>
                  <div className="historyTime">
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

export default History;
