import React, {useEffect, useState} from "react";
import '../css/Calendar.css';
import Day from './Calendar_day';
import { getDatabase, ref, onValue, } from "firebase/database";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Calendar = (props) => {

    //get first monday
    const rolePopup = props.rolePopup;
    const first = `${props.year}-${props.month}-1`;
    let first_day = new Date(first);
    let w = first_day.getDay();
    while(w != 1){
        first_day.setDate(first_day.getDate() - 1);
        w = first_day.getDay();
    }
    let current_day = first_day;
    // load data from firebase
    const id = props.id;
    const db = getDatabase();
    const attendance_ref = ref(db, `workers/${id}/attendance`);
    const dayoffs_ref = ref(db, `dayoffs`);
    const starting_time_ref = ref(db, 'additional_info/working_from');
    const [data, setData] = useState(0); 
    if(data===0){
        onValue(attendance_ref, (snap) =>{ 
            const val = snap.val();
            setData(val);
        })
    }
    const [dayoffs, setDayoffs] = useState(0);
    if(dayoffs===0){
        onValue(dayoffs_ref, (snap) => {
            const val = snap.val();
            setDayoffs(val);
        })
    }
    const [starting_time, setStarting_time] = useState(0);
    if(starting_time===0){
        onValue(starting_time_ref, (snap) => {
            const val = snap.val();
            setStarting_time(val);
        })
    }


    //fill days array with 35 days to display on the screen
    let days = [];   
    let current_day_str = `${current_day.getDate()}-${current_day.getMonth()}-${current_day.getFullYear()}`;
    let today = new Date();
    for(let i = 0; i < 35; i++){
        current_day_str = `${current_day.getFullYear()}-${('0' + (current_day.getMonth()+1)).slice(-2)}-${('0' + current_day.getDate()).slice(-2)}`;
        if(id === ''){
            days.push({date: current_day.getDate(), time: "", status: ""});
            current_day.setDate(current_day.getDate() + 1);
            continue;
        }
        if(data !== undefined && data !== null && data[current_day_str] !== undefined && data[current_day_str] !== null && i % 7 < 5){
            //day found at attendance
            if(data[current_day_str].time !== "" && data[current_day_str].time !== undefined && data[current_day_str].time <= starting_time){
                days.push({date: current_day.getDate(), time: data[current_day_str].time, status: "onTime", mood: data[current_day_str].mood});
            }
            else if(data[current_day_str].time !== "" && data[current_day_str].time !== undefined){
                days.push({date: current_day.getDate(), time: data[current_day_str].time, status: "late", mood: data[current_day_str].mood});
            }
            else{
                days.push({date: current_day.getDate(), time: "", status: "absent", reason: data[current_day_str].reason, current_day: current_day_str});
            }
        }
        else{
            //day was not found
            if(dayoffs !== undefined && dayoffs[current_day_str] !== undefined){
                days.push({date: current_day.getDate(), time: "", status: "dayOff", reason: dayoffs[current_day_str]});
            }
            else if(i%7 == 5 || i%7 == 6){
                //saturday and sunday
                days.push({date: current_day.getDate(), time: "", status: "dayOff"});
            }
            else if(current_day <= today) {
                days.push({date: current_day.getDate(), time: "", status: "absent", reason: ((data && data[current_day_str]) ? data[current_day_str].reason : ''), current_day: current_day_str});
            } else {
                days.push({date: current_day.getDate(), time: "", status: ""});
            }
        }
        current_day.setDate(current_day.getDate() + 1);
    }
    let weeks = []
    //divide 35 days into 5 weeks
    const [dayData, setDayData] = useState({day: '', time: '', mood: ''});
    const [redOpen, setRedOpen] = useState(false);
    const [greenOpen, setGreenOpen] = useState(false);
    const [whiteOpen, setWhiteOpen] = useState(false);

    const handleRedOpen = () => {
        setRedOpen(true);
    }
    const handleRedClose = () => {
        setRedOpen(false);
    }
    const handleGreenOpen = () => {
        setGreenOpen(true);
    }    
    const handleGreenClose = () => {
        setGreenOpen(false);
    }
    const handleWhiteOpen = () => {
        setWhiteOpen(true);
    }    
    const handleWhiteClose = () => {
        setWhiteOpen(false);
    }
    for(let i = 0; i < 5; i++){
        let week = days.slice(i*7, i*7+7).map((today) => 
        <th className='cell' onClick={() => {
            setDayData({day: today.date, time: today.time, mood: today.mood, id: id, current_day: today.current_day});
            (today.status==='absent') ? handleRedOpen() :
            ((today.status === 'onTime' || today.status==='late') ? handleGreenOpen() : handleWhiteOpen())}}>
            <Day day={today.date} time={today.time} status={today.status} reason={today.reason}/>
        </th>
        );
        weeks.push(week);
    }
    /////
    return(
        <div className = "calendar">
            <div style={{display: 'flex', alignContent: ''}}>
                <Dialog
                open={greenOpen}
                onClose={handleGreenClose}>
                    <DialogTitle>
                    </DialogTitle>
                    <DialogContent>
                        {props.greenDayPopup(dayData, handleGreenClose)}
                    </DialogContent>
                </Dialog>
            </div>
            <Dialog
            open={redOpen}
            onClose={handleRedClose}>
                <DialogContent>
                    {props.redDayPopup(dayData, handleRedClose)}
                </DialogContent>
            </Dialog>
            
            <Dialog
            open={whiteOpen}
            onClose={handleWhiteClose}>
                <DialogContent>
                    {props.whiteDayPopup}
                </DialogContent>
            </Dialog>
            <table>
                <thead>
                    <tr>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => 
                        <th className="head">
                            {day}
                        </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {weeks.map((week) => 
                        <tr>
                            {week}
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;