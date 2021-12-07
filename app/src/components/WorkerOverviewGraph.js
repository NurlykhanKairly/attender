import React from 'react';
import Avatar from '@mui/material/Avatar';
import '../css/WorkerOverviewGraph.css';

export default function WorkerOverviewGraph({workerData}) {
    
    let finishDate = new Date();
    finishDate.setMonth(finishDate.getMonth() + 1);
    finishDate.setDate(0);
    let startDate = new Date();
    startDate.setMonth(finishDate.getMonth() - 2);
    startDate.setDate(1);

    let namesOfDayOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    let namesOfDayOfWeekP = namesOfDayOfWeek.map(name => <p className="name-of-day-of-week"> {name} </p>);

    let monthBlocks = [];
    let cur = [];
    let prev = null;
    
    console.log(startDate.toLocaleDateString(), finishDate.toLocaleDateString());

    for(let d = startDate; d <= finishDate; d.setDate(d.getDate() + 1)) {
        if(prev) {
            console.log(prev.getMonth(), d.getMonth());
        }
        if(prev !== null && prev.getMonth() != d.getMonth()) {
            console.log('hello?');
            monthBlocks.push(
                <div className="month-block-container" key={monthBlocks.length}>
                    <p style={{width:50}}> {prev.toLocaleString('default', {month: 'short'})} </p>
                    <div className="mini-squares-container">
                        {[...cur]}
                    </div>
                </div>
            );
            cur = [];
        } 
        if(cur.length === 0) {
            let shift = ((d.getDay() - 1 + 7) % 7) + 1;
            console.log("shift", shift, "day: ", d.toLocaleString('default', {weekday: 'long'}));
            cur.push(<div className="mini-square" key={cur.length} style={{gridColumnStart: shift}} /> );
        } else {
            cur.push(<div className="mini-square"  key={cur.length} />);
        }
        prev = new Date(d.getTime());
    }
    if(cur.length) {
        monthBlocks.push(
            <div className="month-block-container" key={monthBlocks.length}>
                <p> {prev.toLocaleString('default', {month: 'short'})} </p>
                <div className="mini-squares-container">
                    {[...cur]}
                </div>
            </div>
        );
    }
    console.log(monthBlocks);
    return (
        <div className="worker-overview-graph">
            <div className="worker-information">
                <Avatar alt={workerData.name} src={workerData.photo} sx={{width: 70, height: 70}}/>
                <div className="worker-information-text">
                    <p> {workerData.position} </p>
                    <p> {workerData.name} </p>
                    <div className="late-missed">
                        <p className="late-text"> 4 late </p>
                        <p className="miss-text"> 3 missed </p>
                    </div>
                </div>
            </div>
            <div className="name-of-container">
                <div style={{width:50}} /> 
                <div className="names-of-day-of-week">
                    {namesOfDayOfWeekP}
                </div>
            </div>
            {monthBlocks}
        </div>
    )
}
