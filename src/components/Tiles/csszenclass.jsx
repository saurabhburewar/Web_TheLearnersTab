import React, { Component } from "react";
import "./csszen.scss";
import ImgComp from "./imgComp";
import i1 from "../../images/zen1.PNG";
import i2 from "../../images/zen2.PNG";
import i3 from "../../images/zen3.PNG";
import i4 from "../../images/zen4.PNG";
import i5 from "../../images/zen5.PNG";
import i6 from "../../images/zen6.PNG";
import i7 from "../../images/zen7.PNG";
import i8 from "../../images/zen8.PNG";

class Csszen extends Component {
  constructor(props) {
    super(props);
    this.zenImages = [
      <ImgComp src={i1} />,
      <ImgComp src={i2} />,
      <ImgComp src={i3} />,
      <ImgComp src={i4} />,
      <ImgComp src={i5} />,
      <ImgComp src={i6} />,
      <ImgComp src={i7} />,
      <ImgComp src={i8} />,
    ];
    this.state = { x: 0 };
    this.goRight = this.goRight.bind(this);
    this.goLeft = this.goLeft.bind(this);
  }
  goLeft() {
    if (this.state.x === 0) {
      this.setState({ x: -100 * (this.zenImages.length - 1) });
    } else {
      this.setState({ x: this.state.x + 100 });
    }
  }
  goRight() {
    if (this.state.x === -100 * (this.zenImages.length - 1)) {
      this.setState({ x: 0 });
    } else {
      this.setState({ x: this.state.x - 100 });
    }
  }

  componentDidMount() {
    if (this.state.x === 0) {
      setInterval(() => this.goRight(), 5000);
    }
  }

  render() {
    return (
      <div className="zenslider">
        {this.zenImages.map((item, index) => {
          return (
            <div
              key={index}
              className="zenslide"
              style={{ transform: `translate(${this.state.x}%)` }}
            >
              {item}
            </div>
          );
        })}
        <a
          href="http://www.csszengarden.com/"
          title="Css Zen Garden"
          className="overlay"
        >
          Css Zen Garden
        </a>
      </div>
    );
  }
}

export default Csszen;
