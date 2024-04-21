/*global chrome*/
import { useEffect, useState } from "react";
import "./ScreenTimer.css";
import { PieChart } from 'react-minimal-pie-chart';


export default function ScreenTimer() {

    const [timeBook, setTimeBook] = useState([]);
    const [currView, setCurrView] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [pieHover, setPieHover] = useState(0);
    const colors = ["#FF7878", "#B0C5A4", "#776B5D", "#EBC49F", "#F1EF99", "#9BB0C1", "#E1AFD1", "#AD88C6", "#FFBE98", "#D37676"]

    const msToTime = (ms) => {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        if (seconds < 60) return seconds + " s";
        else if (minutes < 60) return minutes + " m";
        else if (hours < 24) return hours + " h";
    }

    useEffect(() => {
        chrome.storage.sync.get("LTTimeBook", (result) => {
            if(result.LTTimeBook) {
                const book = result.LTTimeBook
                const sortedBook = book.sort((a, b) => b.duration - a.duration);
                const slicedBook = sortedBook.slice(0, 10);

                setTimeBook(slicedBook);

                const chartList = slicedBook.map((obj, i) => {
                    obj['title'] = obj['url'];
                    obj['value'] = obj['duration'];
                    obj['color'] = colors[i]
                    if (pieHover === i) {
                        obj['label'] = obj['url'] + " - " + msToTime(obj['duration'])
                    } else {
                        obj['label'] = ""
                    }
                    delete obj['url'];
                    delete obj['duration'];
                    delete obj['id'];
                    delete obj['startTime'];
                    return obj;
                });
                
                setChartData(chartList)
            }
        })
    })

    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif',
        fill: '#ffffff',
        whiteSpace: 'pre-wrap',
    };

    return (
        <div className="ScreenPage">
            <div className="ScreenChanger" onClick={() => {setCurrView(!currView)}}>
                <svg id="1037c3e5-9362-41e9-95dc-d772a684f081" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#292929"}><title>view</title><path class="04fa9c7d-150c-485c-b8f6-5b42b51595f7" d="M129.65,66.51c-.06,64.32,6.08,58.35-58.07,58.38-13.49,0-27,0-40.46,0-13.92,0-21-6.75-21-20.8,0-25.55.15-51.11-.07-76.66-.13-15,6.74-22.28,21.88-22.17,24.84.18,49.69.32,74.53-.05,16-.24,23.7,6.81,23.3,23C129.38,40.95,129.64,53.73,129.65,66.51Zm-84-26.08V89.07H94.4V40.43Z"/><path class="04fa9c7d-150c-485c-b8f6-5b42b51595f7" d="M223.11,124.89c-65.86-.14-59.28,6.47-59.24-59.27,0-67.38-7.1-60.26,60.25-60.29,65.74,0,59.32-6.72,59.28,59.17C283.36,131.76,290.33,124.69,223.11,124.89ZM198.39,89.42h49.39V41.13H198.39Z"/><path class="04fa9c7d-150c-485c-b8f6-5b42b51595f7" d="M146.65,176.16c37.66,0,75.31.13,113-.07,12.86-.07,25.08,3.6,22.43,17.91-1.22,6.59-14.4,15.49-22.29,15.62-75.29,1.18-150.61.64-225.92.77-12.84,0-25.08-3.63-22.41-17.94,1.23-6.58,14.28-15.2,22.29-15.55C71.3,175.25,109,176.16,146.65,176.16Z"/><path class="04fa9c7d-150c-485c-b8f6-5b42b51595f7" d="M144.76,295.75c-36.95,0-73.89-.12-110.84.07-12.81.07-25.11-3.51-22.51-17.86,1.19-6.58,14.33-15.54,22.18-15.66,75.29-1.18,150.62-.63,225.93-.78,12.83,0,25.1,3.49,22.52,17.82-1.19,6.59-14.23,15.33-22.21,15.67C221.53,296.65,183.12,295.75,144.76,295.75Z"/></svg>
            </div>
            {currView ? 
                <div className="ScreenChartBox">
                    <PieChart
                        data={chartData}
                        lineWidth={25}
                        paddingAngle={5}
                        label={({ dataEntry }) => dataEntry.label}
                        labelStyle={{
                        ...defaultLabelStyle,
                        }}
                        labelPosition={0}
                        onMouseOver={(_, index) => {
                            setPieHover(index);
                        }}
                        onMouseOut={() => {
                            setPieHover(0);
                        }}
                    />
                </div> 
            : 
                <div className="ScreenListBox">
                    {chartData.map((times) => (
                        <div style={{color: times.color}} className="ScreenItem">
                            <div className="ScreenName">{times.title}</div>
                            <div className="ScreenDuration">{msToTime(times.value)}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}