import React, {useEffect, useState} from "react";
import '../css/Calendar.css';
import Day from './Calendar_day';
import { getDatabase, ref, onValue, } from "firebase/database";


const Calendar = (props) => {

    //get first monday
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

    console.log(data);

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
            if(data[current_day_str].time !== "" && data[current_day_str].time <= starting_time){
                days.push({date: current_day.getDate(), time: data[current_day_str].time, status: "onTime"});
            }
            else if(data[current_day_str].time !== ""){
                days.push({date: current_day.getDate(), time: data[current_day_str].time, status: "late"});
            }
            else{
                days.push({date: current_day.getDate(), time: "", status: "absent", reason: data[current_day_str].Reason});
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
                days.push({date: current_day.getDate(), time: "", status: "absent", reason: ((data && data[current_day_str]) ? data[current_day_str].reason : '')});
            } else {
                days.push({date: current_day.getDate(), time: "", status: ""});
            }
        }
        current_day.setDate(current_day.getDate() + 1);
    }
    let weeks = []
    //divide 35 days into 5 weeks
    for(let i = 0; i < 5; i++){
        let week = days.slice(i*7, i*7+7).map((today) => 
        <th className='cell'>
            <Day day={today.date} time={today.time} status={today.status} reason={today.reason}/>
            </th>
        );
        weeks.push(week);
    }

    return(
        <div className = "calendar">
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