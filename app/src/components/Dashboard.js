import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import {ref, child, get} from 'firebase/database';
import WorkerOverviewGraph from './WorkerOverviewGraph';
import AttendanceGraph from './AttendanceGraph';
import '../css/Dashboard.css';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


export default function Dashboard({uid, workers, dayoffs, additionalInfo}) {

    const navigate = useNavigate();

    useEffect(() => {
        if(!uid) {
            navigate('/');
        }    
    }, [uid]);
    
    console.log('Dashboard rendered!');

    let workerOverviewGraphs = Object.keys(workers).filter(key => workers[key].role === "worker").map((key, index) => {
        return <WorkerOverviewGraph workerId={key} workerData={workers[key]} dayoffs={dayoffs} additionalInfo={additionalInfo} key={key}/>
    });
    return (
        (!uid) ?
            <div className="loading-container">
                <CircularProgress />
            </div>
            :
            <div className="dashboard-parent">
                <div className="dashboard-main">
                    <AttendanceGraph workers={workers} dayoffs={dayoffs} additionalInfo={additionalInfo}/>
                    <div className="overview-graphs-container">
                        {workerOverviewGraphs}
                    </div>
                </div>
            </div>
    )
}
