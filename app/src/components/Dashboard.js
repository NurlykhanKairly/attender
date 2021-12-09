import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import {ref, child, get} from 'firebase/database';
import WorkerOverviewGraph from './WorkerOverviewGraph';
import AttendanceGraph from './AttendanceGraph';
import '../css/Dashboard.css';
import { useNavigate } from "react-router-dom";


export default function Dashboard({uid, workers, dayoffs, additionalInfo}) {
    // const [workers, setWorkers] = useState({});
    // const [dayoffs, setDayoffs] = useState({});
    // const [additionalInfo, setAdditionalInfo] = useState({});
    
    // console.log('re-rendered!');
    // console.log(workers);
    // useEffect(() => {
    //     console.log('in use effect!');
    //     console.log(workers);
    //     get(child(ref(db), '/')).then((snapshot) => {
    //         console.log('response');
    //         if(snapshot.exists()) {
                
    //             console.log(snapshot.val());

    //             setWorkers(snapshot.val().workers);
    //             setDayoffs(snapshot.val().dayoffs);
    //             setAdditionalInfo(snapshot.val().additional_info);
                
    //         } else {
    //             console.log("No data available");
    //         }
    //     });
    // }, []);
    const navigate = useNavigate();
    if(!uid)
        navigate('/login');
    
    let workerOverviewGraphs = Object.keys(workers).filter(key => workers[key].role === "worker").map((key, index) => {
        return <WorkerOverviewGraph workerData={workers[key]} dayoffs={dayoffs} additionalInfo={additionalInfo} key={key}/>
    });
    return (
        <div className="dashboard-parent">
            <div className="dashboard-main">
                hello
                <AttendanceGraph workers={workers} dayoffs={dayoffs} additionalInfo={additionalInfo}/>
                <div className="overview-graphs-container">
                    {workerOverviewGraphs}
                </div>
            </div>
        </div>
    )
}
