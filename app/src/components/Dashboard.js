import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
import {ref, child, get} from 'firebase/database';
import WorkerOverviewGraph from './WorkerOverviewGraph';
import AttendanceGraph from './AttendanceGraph';
import '../css/Dashboard.css';

export default function Dashboard(props) {
    const [workers, setWorkers] = useState({});
    const dbRef = ref(db);
    console.log('re-rendered!');
    console.log(workers);
    useEffect(() => {
        console.log('in use effect!');
        console.log(workers);
        get(child(dbRef, 'workers')).then((snapshot) => {
            console.log('response');
            if(snapshot.exists()) {
                setWorkers(snapshot.val());
            } else {
                console.log("No data available");
            }
        });
    }, []);

    let workerOverviewGraphs = Object.keys(workers).filter(key => workers[key].role === "worker").map((key, index) => {
        return <WorkerOverviewGraph workerData={workers[key]} key={key}/>
    });
    return (
        <div className="dashboard-parent">
            <div className="dashboard-main">
                hello
                <AttendanceGraph workers={workers}/>
                <div className="overview-graphs-container">
                    {workerOverviewGraphs}
                </div>
            </div>
        </div>
    )
}
