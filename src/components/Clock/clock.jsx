import React, { Component } from "react";
import "./clock.css";

class Clock extends Component {
  state = { time: new Date(), date: new Date() };

  currentTime() {
    this.setState({
      time: new Date(),
      date: new Date(),
    });
  }
  componentWillMount() {
    setInterval(() => this.currentTime(), 1000);
  }

  render() {
    return (
      <div className="Clockbox">
        <div className="Clock">
          <div className="showtime">{this.state.time.toLocaleTimeString("en-US", {hour: "numeric", minute: "numeric", second: "numeric"})}</div>
          <div className="showdate">{this.state.date.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</div>
        </div>
      </div>
    );
  }
}

export default Clock;
