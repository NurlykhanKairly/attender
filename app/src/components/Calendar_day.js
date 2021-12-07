import React from "react";
import '../css/Calendar.css';

const Day = (props) => {
    const day = props.day;
    switch(props.status){
        case "onTime":
            return(
                <div class='green_day'>
                    <div>{day}</div>
                    <div>Check in</div>
                    <div style={{fontSize: '24px'}}>{props.time}</div>
                </div>
            );
        case "late":
            return(
                <div class='yellow_day'>
                    <div>{day}</div>
                    <div>Check in</div>
                    <div style={{fontSize: '24px'}}>{props.time}</div>
                </div>
            )
        case "absent":
            return(
                <div class='red_day'>
                    <div>{day}</div>
                    <div>Reason</div>
                    <div style={{fontSize: '24px'}}>{props.reason}</div>
                </div>
            )
        case "dayOff":
            return(
                <div class='grey_day'>
                    <div>{day}</div>
                    <div></div>
                    <div style={{fontSize: '24px'}}>{props.reason}</div>
                </div>
            )
        default:
            return(
                <div class='day'>
                    <div>{day}</div>
                    <div></div>
                    <div>{props.time}</div>
                </div>
            )
    }
    
};

export default Day;