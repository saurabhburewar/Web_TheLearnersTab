/*global chrome*/ 
import { useEffect, useState } from "react";
import "./historyInfo.css";


export default function HistoryInfo() {

    const [filter, setFilter] = useState("SO");
    const [hisList, setHisList] = useState([]);
    const [cusFilter, setCusFilter] = useState("");

    useEffect(() => {
        
        chrome.storage.sync.get("LTHist", (result) => {
            if(result.LTHist) {
                setCusFilter(result.LTHist)
            }
        })

        if (filter === "SO") {
            chrome.history.search({ text: "stackoverflow.com", startTime: 0, maxResults: 10 }, (historyItems) => {
                setHisList(historyItems)
            })
        } else if (filter === "YT") {
            chrome.history.search({ text: "youtube.com", startTime: 0, maxResults: 10 }, (historyItems) => {
                setHisList(historyItems)
            })
        } else if (filter === "CU") {
            chrome.history.search({ text: cusFilter, startTime: 0, maxResults: 10 }, (historyItems) => {
                setHisList(historyItems)
            })
        }
    })

    return (
        <div className="historyPage">
            <div className="historyBox">
                <div className="historyNav">
                    <div className="historyNavItem">
                        <div className="historyNavBut" onClick={() => {setFilter("SO")}}>
                            <svg id="60c20fe4-aad6-44cf-ae69-8d0c95e49510" data-name="ae7922f0-e5ea-42d8-80d5-c1e3c9eb13e4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#e89959"}><title>stackOverflow</title><path class="e5e7d3c2-3350-40b7-8674-70fee90ac4ca" d="M145.61,297.13h-114c-2.77,0-3.33-.75-3.32-3.38q.14-48.94,0-97.88c0-2.68.68-3.42,3.35-3.33,6.68.21,13.36.15,20,0,2.16,0,2.61.68,2.61,2.77q0,36.14-.11,72.29c0,2.77.77,3.31,3.38,3.29q88-.11,176,0c3.35,0,3.35,0,3.35-3.46V196.21c0-3.47,0-3.47,3.6-3.47h20c1.67,0,2.3.44,2.3,2.21v100c0,2.25-1.08,2.31-2.77,2.3H186.21Z"/><path class="e5e7d3c2-3350-40b7-8674-70fee90ac4ca" d="M209,211.52l-29.46-6.16Q132.8,195.6,86,185.89c-2.52-.53-3.14-1.26-2.52-3.85,1.66-6.82,3-13.71,4.37-20.6.32-1.69.86-1.87,2.41-1.55,14.41,3.06,28.86,6,43.28,9l80.12,16.74c1.83.37,2.31.94,1.9,2.77-1.59,7.11-3.07,14.23-4.56,21.37C210.84,210.84,210.89,212.06,209,211.52Z"/><path class="e5e7d3c2-3350-40b7-8674-70fee90ac4ca" d="M111.4,100.77c.47.21,1,.43,1.59.69q56.88,26.71,113.75,53.24c1.87.87,2,1.66,1.15,3.35-3,6.34-6,12.7-8.76,19.16-.87,2-1.72,2-3.44,1.18q-50.56-23.65-101.14-47.2c-4.3-2-8.58-4-12.91-6-1.3-.58-1.69-1.11-1-2.55,3.17-6.85,6.21-13.75,9.32-20.62C110.18,101.48,110.28,100.59,111.4,100.77Z"/><path class="e5e7d3c2-3350-40b7-8674-70fee90ac4ca" d="M275,109.09c-.43.39-.77.77-1.19,1.08-6.06,4.51-12.19,8.95-18.18,13.56-1.62,1.24-2,.19-2.77-.79l-25-33.66-49.8-67.09c-1.38-1.77-1.2-2.53.58-3.8,5.81-4.15,11.49-8.41,17.15-12.71,1.26-1,1.9-1,2.89.39q37.56,50.86,75.35,101.66C274.36,108.13,274.64,108.58,275,109.09Z"/><path class="e5e7d3c2-3350-40b7-8674-70fee90ac4ca" d="M249.19,130c-.35.47-.65.9-1,1.3-4.66,5.62-9.36,11.19-14,16.85-1,1.26-1.63,1.3-2.89.25q-48.41-40.34-96.83-80.56c-1.49-1.24-1.63-2-.32-3.47,4.58-5.39,9.1-10.93,13.54-16.46,1.08-1.38,1.72-1.38,3.06-.29q37.35,31.17,74.77,62.25l22.13,18.38C248.25,128.77,249,129.17,249.19,130Z"/><path class="e5e7d3c2-3350-40b7-8674-70fee90ac4ca" d="M145.32,244.56H83.07c-2.34,0-3-.59-2.9-2.92q.25-10.28,0-20.57c0-2.17.68-2.57,2.67-2.57q62.66.08,125.31,0c2,0,2.52.53,2.48,2.49q-.18,10.55,0,21.11c0,2-.58,2.48-2.52,2.46Q176.71,244.52,145.32,244.56Z"/></svg>
                        </div>
                    </div>
                    <div className="historyNavItem">
                        <div className="historyNavBut" onClick={() => {setFilter("YT")}}>
                        <svg id="60aba6fd-385f-4f9a-b04f-13e0a8a2fafc" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#f97878"}><title>youtube</title><path class="4744c841-dc98-4f62-8e0d-c5c661b1e7c1" d="M122,49h7.62c.17.3.34.86.51.86q18.54.06,37.09,0c.17,0,.34-.56.51-.86h7.62c1.23,2.11,3.25,1,4.87,1,25.36.92,50.75,1.26,76,4.31,17.54,2.12,30.29,13.32,33.54,30.54,8.1,42.85,7.36,85.84.77,128.75-3.19,20.75-15.07,31.1-35.91,33.7-16.21,2-32.48,3-48.79,3.47-53.15,1.54-106.26,1.8-159.24-3.65C28.45,245.3,16,234.9,12.3,218.14a173.3,173.3,0,0,1-3.5-22c-3.15-35.14-3-70.23,2-105.25C14,68.17,25.8,56.88,48.72,54.31c23.28-2.61,46.64-3.44,70-4.25C119.84,50,121.35,50.75,122,49Zm76.7,101.8-75.39-43.27v86.58Z"/><path class="d5842674-dc83-41cd-8351-03e98896dfcc" d="M167.69,49c-.17.3-.34.86-.51.86q-18.54.06-37.09,0c-.17,0-.34-.56-.51-.86Z"/></svg>
                        </div>
                    </div>
                    <div className="historyNavItem">
                        <div className="historyNavBut" onClick={() => {setFilter("CU")}}>
                        <svg id="3a1bf94a-42c3-447c-8ec6-4a2bacade3e5" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#87dfe8"}><title>custom</title><path class="d54ccfe4-1ea0-4116-a0cd-6930c45b11e0" d="M4.55,238.71q0-87.53,0-175.05c.46-2.5.84-5,1.4-7.5C12.81,26.16,37.7,5.83,68.4,5.73c54.46-.17,108.91-.08,163.37,0A61.25,61.25,0,0,1,268.5,17.36c18,13.1,27,31,27,53.25q.11,80.55,0,161.1c0,1.51,0,3-.13,4.54-2.45,27.39-16.3,46.43-42,56.47-5,2-10.58,2.67-15.88,4H62.52c-.82-.19-1.62-.44-2.45-.57-25-4-42.31-17.67-51.48-41.26C6.6,249.73,5.86,244.11,4.55,238.71ZM150.34,23.87c-27.18,0-54.37-.07-81.55,0-25.89.09-45.94,19.82-46,45.59q-.21,81.69,0,163.39c.06,25.65,20,45.53,45.71,45.59q81.55.18,163.1,0c25.81-.06,45.69-20,45.74-45.86q.15-81.41-.08-162.82a48.44,48.44,0,0,0-2.44-15c-6.36-18.93-23.3-30.81-43.49-30.86C204.33,23.82,177.33,23.87,150.34,23.87Z"/><path class="d54ccfe4-1ea0-4116-a0cd-6930c45b11e0" d="M65,96.41V78.6H231.73V96.41Z"/><path class="d54ccfe4-1ea0-4116-a0cd-6930c45b11e0" d="M65,160.08V142.24H231.61v17.85Z"/><path class="d54ccfe4-1ea0-4116-a0cd-6930c45b11e0" d="M231.77,206v17.83H65V206Z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="historyListBox">
                    {filter === "SO" ? (
                        <div className="historyList">
                            {hisList.map((hisItem) => (
                                <a href={hisItem.url} className="historyTitle soTitle">{hisItem.title}</a>
                            ))}
                        </div>
                    ) : filter === "YT" ? (
                        <div className="historyList">
                            {hisList.map((hisItem) => (
                                <a href={hisItem.url} className="historyTitle ytTitle">{hisItem.title}</a>
                            ))}
                        </div>
                    ) : filter === "CU" ? (
                        <div className="historyList">
                            {hisList.map((hisItem) => (
                                <a href={hisItem.url} className="historyTitle cuTitle">{hisItem.title}</a>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}