import React from 'react';
import Avatar from '@mui/material/Avatar';
import '../css/WorkerOverviewGraph.css';
import { getYMD } from '../helpers';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";



const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 220,
      border: '1px solid #f5f5f9',
    },
}));

export default function WorkerOverviewGraph({workerId, workerData, dayoffs, additionalInfo}) {
    
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
    let lates = 0;
    let misses = 0;

    // console.log(startDate.toLocaleDateString(), finishDate.toLocaleDateString());
    
    for(let d = new Date(startDate.getTime()); d <= finishDate; d.setDate(d.getDate() + 1)) {
        if(prev !== null && prev.getMonth() != d.getMonth()) {
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

        // console.log(workerData);

        let className = "mini-square";
        let key = getYMD(d);
        let shift = ((d.getDay() - 1 + 7) % 7) + 1; // 1 - Monday, ... 7 - Sunday
        let today = new Date();
        let text = '';
        if(shift <= 5 && (!dayoffs[key]) && d <= today) {
            if(workerData.attendance && workerData.attendance[key]) {
                console.log(workerData.attendance[key].reason_response);
                if(workerData.attendance[key].reason_response !== null && workerData.attendance[key].reason_response !== undefined) {
                    if(workerData.attendance[key].reason_response) {
                        className += ' mini-square-green';
                        text = 'Reason was approved';
                    } else {
                        className += ' mini-square-red';
                        text = 'Reason was rejected';
                        misses ++;
                    }
                } else {
                    if(workerData.attendance[key].time <= additionalInfo.working_from) {
                        className += ' mini-square-green';
                    } else {
                        className += ' mini-square-yellow';
                        lates ++;
                    }
                    text = `Check-in: ${workerData.attendance[key].time}`;    
                }
            } else {
                className += ' mini-square-red';
                misses ++;
                text = 'Missed';
            }
        } else if(shift > 5) {
            text = 'Weekend';
        } else if(dayoffs[key]) {
            text = `Dayoff: ${dayoffs[key]}`;
        }

        
        if(cur.length === 0) {
            cur.push(
                <HtmlTooltip
                    disableInteractive
                    title={
                    <React.Fragment>
                        <p> {`${d.toLocaleString('default', {month: 'long'})} ${d.getDate()}`} </p>
                        <p> {text} </p>
                    </React.Fragment>
                    }
                >
                    <div className={className} key={cur.length} style={{gridColumnStart: shift}} />
                </HtmlTooltip> 
            );
        } else {
            cur.push(
                <HtmlTooltip
                    disableInteractive
                    title={
                    <React.Fragment>
                        <p> {`${d.toLocaleString('default', {month: 'long'})} ${d.getDate()}`} </p>
                        <p> {text} </p>
                    </React.Fragment>
                    }
                >
                    <div className={className} key={cur.length} />
                </HtmlTooltip> 
            );
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
    return (
        <div className="worker-overview-graph">
            <div className="worker-information">
                <Avatar alt={workerData.name} src={workerData.photo} sx={{width: 70, height: 70}}/>
                <div className="worker-information-text">
                    <p> {workerData.position} </p>
                    <p> {workerData.name} </p>
                    <div className="late-missed">
                        <p className="late-text"> {lates} late </p>
                        <p className="miss-text"> {misses} missed </p>
                    </div>
                </div>

                <Link to={`/manager-worker/${workerId}`} style={{marginLeft: 'auto'}} >
                    see more
                </Link>
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
