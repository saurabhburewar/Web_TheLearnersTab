/*global chrome*/
import "./bookwindow.css"
import BookModal from "./bookmodal";
import Bookstart from "./bookstart";
import gear from "../../images/Bookmarks/gear-01.png";
import titleimg from "../../images/Bookmarks/title-01.svg"
import { useEffect, useState } from "react";

export default function Bookwindow() {

    const [modalShow, setModalShow] = useState(false);
    const [tilelist, setTilelist] = useState([]);

    useEffect(() => {
        chrome.storage.sync.get("LTBookmarks", (result) => {
            if(result.LTBookmarks) {
                setTilelist(result.LTBookmarks)
            }
        })
    })

    const modalClose = () => {
        setModalShow(false)
        chrome.storage.sync.get("LTBookmarks", (result) => {
            if(result.LTBookmarks) {
                setTilelist(result.LTBookmarks)
            }
        })
    }

    return (
        <div className="dashpage">
            <div className="dashhead">
                <div className="dashheadimg">
                    <img src={titleimg}></img>
                </div>
                <button onClick={() => setModalShow(true)} className="dash-btn">
                    <svg className="dashIcon" id="5bff9671-2c30-4598-93d1-65365b696dd8" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#292a31"}><title>gear</title><path class="0a7234fe-1eea-42f6-9e47-835659cf12fd" d="M70.15,234.45c.09-12.8-10.36-23.22-22.1-23.51-8.64-.21-17.27-1.05-25.91-1.44-2.88-.13-4.31-1.12-4.94-4.11-2.88-13.66-6-27.27-9-40.91-1.35-6.2-.06-9.2,5.5-12.46,4.73-2.77,9.58-5.33,14.46-7.83,6.16-3.15,10.39-8,13.81-14,4.48-7.77,3.77-14.93-1.62-21.76C34.78,101.42,29.67,94,24.48,86.7c-1.54-2.18-1.41-3.53.23-5.55Q39.63,62.71,54.25,44c1.82-2.33,3.31-2.45,5.85-1.33C68,46.18,76,49.42,84,52.7c13.83,5.66,27.14-.7,31.51-15.1,2.46-8.1,4.84-16.24,7.06-24.41.61-2.24,1.38-3.28,3.94-3.25q21.48.25,43,.14c5.51,0,8.82,2.75,10.44,7.58,2.11,6.3,4,12.68,5.66,19.11,3.92,15.13,18.84,22.08,33.16,15.49,7.54-3.47,15.3-6.44,22.88-9.81,2.4-1.07,3.75-.66,5.39,1.42q14.8,18.86,29.91,37.47c1.54,1.9,1.61,3.15.17,5.14-4.68,6.47-8.71,13.44-14.17,19.3-9.53,10.26-8,30.5,7.64,36.81a136.89,136.89,0,0,1,15.68,7.57c7.06,4,9.3,8.88,7.41,16.74-2.6,10.82-5.71,21.51-8.51,32.28-1.8,6.92-6.47,10.21-13.3,10.74-6,.47-12,.81-17.93,1.06-14.94.63-23.87,10.92-22,25.82.87,7.09,2.21,14.12,3.39,21.17.93,5.57-.88,10-5.9,12.57-13.18,6.68-26.52,13.05-39.73,19.69-2.3,1.16-3-.45-4-1.6-6.1-6.83-12.12-13.73-18.26-20.52a22,22,0,0,0-33-.22c-5.78,6.22-11.45,12.54-16.85,19.09-2.62,3.18-4.77,3.82-8.63,1.86q-20-10.14-40.39-19.47c-3.41-1.55-3.86-3.33-3.25-6.46,1.61-8.32,3.09-16.67,4.58-25C70,236.43,70.11,234.93,70.15,234.45Zm36.38-83.62c-.69,22.85,19.07,43.29,42.68,44.16,24.36.9,44.28-17.95,45.25-42.8.93-23.88-18.81-44.54-43.16-45.17C127.72,106.4,107.28,126.4,106.54,150.82Z"/></svg>
                </button>
                <BookModal 
                show = {modalShow}
                onHide = {modalClose}/>
            </div>
            {tilelist.length ? 
                <div className="dashwin">
                    {tilelist.map((tile) => (
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
            : <Bookstart />}            
        </div> 
    )
}