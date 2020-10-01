import React from "react";

function ImgComp({ src }) {
  const imgstyle = {
    width: 100 + "%",
    height: "auto",
  };
  return <img src={src} style={imgstyle} alt=""></img>;
}

export default ImgComp;
