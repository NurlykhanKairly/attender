import { textAlign } from "@mui/system";
import React from "react";
import '../css/Calendar.css';

const Day = (props) => {
    const day = props.day;
    switch(props.status){
        case "onTime":
            return(
                <div className='green_day'>
                    <div>{day}</div>
                    <div>Check in</div>
                    <div style={{fontSize: '24px'}}>{props.time}</div>
                </div>
            );
        case "late":
            return(
                <div className='yellow_day'>
                    <div>{day}</div>
                    <div>Check in</div>
                    <div style={{fontSize: '24px'}}>{props.time}</div>
                </div>
            )
        case "absent":
            return(
                <div className='red_day'>
                    <div>{day}</div>
                    <div>Reason</div>
                    <div style={{fontSize: '24px', textAlign: 'center'}}>{props.reason}</div>
                    {(props.reasonResponse === undefined) ? 
                    <></> 
                    : <div style={{display:"flex"}}>Reason {props.reasonResponse ? ('approved') : 'rejected'}</div>}
                </div>
            )
        case "dayOff":
            return(
                <div className='grey_day'>
                    <div>{day}</div>
                    <div></div>
                    <div style={{fontSize: '24px', textAlign: "center"}}>{props.reason}</div>
                </div>
            )
        default:
            return(
                <div className='day'>
                    <div>{day}</div>
                    <div></div>
                    <div>{props.time}</div>
                </div>
            )
    }
    
};

export default Day;