/*global chrome*/
import { useEffect, useState } from "react";
import "./customwall.css";


export default function CustomWall() {

    const [file, setFile] = useState();

    return (
        <div className="customWallPage">
            <img src={file}></img>
        </div>
    )
}