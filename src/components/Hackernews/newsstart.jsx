import React, { Component } from 'react';
import "./newsstart.css"
import Y from "../../images/ycomb-01.png";

class NewsStart extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="startmessage">
                <div className="start1">
                    <div className="Yimg">
                        <img src={ Y } alt="Y" className="Yicon"/>
                    </div>
                    <div className="Yurl">
                        <a href="https://news.ycombinator.com/" className=""><i>news.ycombinator.com</i></a>
                    </div>
                </div>
                <div className="start2">
                    <i>&#8678;<span className="tab"></span>Choose what you want to read here</i>
                </div>
            </div>
         );
    }
}
 
export default NewsStart;