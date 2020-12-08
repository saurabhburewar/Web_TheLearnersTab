import React, { Component } from 'react';
import "./bookwindow.css";
import BookModal from "./bookmodal";
import Gear from "../../images/gear-01.png"

class Bookwindow extends Component {
    state = { tilelist: [], ModalShow: false }

    componentDidMount() {
        if (localStorage.getItem("Bookmarks-list") == null) {
            localStorage.setItem("Bookmarks-list", JSON.stringify(this.state.tilelist))
        } else {
            this.setState({
                tilelist: JSON.parse(localStorage.getItem("Bookmarks-list")),
            });
        }
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
                <BookModal 
                show = {this.state.ModalShow}
                onHide = {this.modalClose}/>
            </div>
            <div className="dashwin">
                {this.state.tilelist.map((tile) => (
                    <div className="bookgrp">
                        <div className="grphead">
                            <div className="headtext">{tile.name}</div>
                        </div>
                        {tile.list.map((book) => (
                            <div className="booktile">
                                <a href={book.url} className="booktiletitle">
                                    {book.title}
                                </a>
                            </div>
                        ))}                        
                    </div>
                ))}
            </div>
        </div> 
        );
    }
}
 
export default Bookwindow;