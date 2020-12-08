import React, { Component } from 'react';
import "./dashwindow.css";
import DashModal from "./dashmodal";
import Gear from "../../images/gear-01.png"

class Dashwindow extends Component {
    state = { tilelist: [], ModalShow: false }

    componentDidMount() {
        this.setState({
            tilelist: JSON.parse(localStorage.getItem("Bookmarks-list")),
        });
    };

    modalClose = () => {
        this.setState({
            ModalShow: false,
            tilelist: JSON.parse(localStorage.getItem("Bookmarks-list")),
        });
    }

    render() { 
        return ( 
        <div className="dashpage">
            <div className="dashhead">
                <div className="dashheadimg"></div>
                <button onClick={() => this.setState({ModalShow: true})} className="dash-btn">
                    <img className="dashIcon" src={Gear} alt="icon"></img>
                </button>
                <DashModal 
                show = {this.state.ModalShow}
                onHide = {this.modalClose}/>
            </div>
            <div className="dashwin">
                {this.state.tilelist.map((tile) => (
                    <div key={tile.id} className="booktile">
                        <a href={tile.url}>
                            <div className="booktileimage">
                                <img src={tile.icon} alt="icon" className="booktilei" />
                            </div>
                            <div className="booktiletitle">{tile.title}</div>
                        </a>                        
                    </div>
                ))}
            </div>
        </div> 
        );
    }
}
 
export default Dashwindow;