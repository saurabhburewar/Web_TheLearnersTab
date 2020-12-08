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
      <div className="Clock">
        <div className="showtime">{this.state.time.toLocaleTimeString()}</div>
        <div className="showdate">{this.state.date.toLocaleDateString()}</div>
      </div>
    );
  }
}

export default Clock;
