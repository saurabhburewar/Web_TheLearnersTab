/*global chrome*/
import { useEffect, useState } from "react";
import "./systeminfo.css";
import { PieChart } from 'react-minimal-pie-chart';


export default function SystemInfo() {

    const [cpuInfo, setCpuInfo] = useState({});
    const [cpuUtil, setCpuUtil] = useState(0);
    const [memoryUse, setMemoryUse] = useState(0);
    const [memoryTotal, setMemoryTotal] = useState(0);
    const [storeNum, setStoreNum] = useState({})


    useEffect(() => {
        chrome.system.cpu.getInfo((res) => {
            let totalProc = 0;
            res.processors.forEach(proc => {
                const procUtil = ((proc.usage.kernel + proc.usage.user)/proc.usage.total)*100
                totalProc += procUtil
            });
            const totalUtil = totalProc/res.numOfProcessors;
            setCpuUtil(totalUtil);
            setCpuInfo({name:res.modelName, num:res.numOfProcessors})
        })
        chrome.system.memory.getInfo((res) => {
            const memoryUsed = (res.capacity - res.availableCapacity)
            setMemoryUse(memoryUsed)
            setMemoryTotal(res.capacity)
        })
        chrome.system.storage.getInfo((res) => {
            let fixednum = 0;
            let removenum = 0;
            res.forEach(storeDevice => {
                if (storeDevice.type == 'fixed') {
                    fixednum += 1
                } else if (storeDevice.type == 'removable') {
                    removenum += 1
                }
            })
            
            setStoreNum({fnum:fixednum, rnum:removenum})
        })
    })


    return (
        <div className="systeminfoBox">
            <div className="systemmem">
                <div className="systemmemgraph">
                    <PieChart 
                        data={[{ value: memoryUse, color: '#D37676' }]}
                        totalValue={memoryTotal}
                        lineWidth={30}
                        label={({ dataEntry }) => (dataEntry.value*1e-9).toFixed(2)}
                        labelStyle={{
                          fontSize: '20px',
                          fontFamily: 'sans-serif',
                          fill: '#D37676',
                        }}
                        labelPosition={0}
                    />
                </div>
                <div style={{color: "#D37676"}} className="systemmemname">Memory</div>
            </div>
            <div className="systemmem">
                <div className="systemmemgraph">
                    <PieChart 
                        data={[{ value: cpuUtil, color: '#E1AFD1' }]}
                        totalValue={100}
                        lineWidth={30}
                        label={({ dataEntry }) => ((dataEntry.value).toFixed(1) + "%")}
                        labelStyle={{
                          fontSize: '20px',
                          fontFamily: 'sans-serif',
                          fill: '#E1AFD1',
                        }}
                        labelPosition={0}
                    />
                </div>
                <div style={{color: "#E1AFD1"}} className="systemmemname">CPU</div>
            </div>
            <div className="systemTextBox"><p style={{color: "#E1AFD1"}}>Model: {cpuInfo.name}<br />Number of Processors: {cpuInfo.num}</p><p style={{color: "#B0C5A4"}}>Storage Devices (SSD/HDD): {storeNum.fnum}<br />Storage Devices (removable): {storeNum.rnum}</p></div>
        </div>
    )
}