import React, {useState} from "react";
import renderToString from "react-dom/server";
import '../css/Calendar.css';
import Calendar from './Calendar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { getDatabase, ref, onValue, set} from "firebase/database";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import Frame27 from "./Frame27";

const ManagerSettings = ({dayoffs, additionalInfo}) => {
    const db = getDatabase();

    // Authenticate user
    // const [id, setId] = useState('');
    
    let today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const month_names = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"]

    const data = additionalInfo;
    
    let extreme_temp = 0;
    let start_time;
    let end_time;
    if(data){
        extreme_temp = data['extreme_temp'];
        start_time = data['working_from'];
        end_time = data['working_to'];
    }
    
    const [editTime, setEditTime] = useState(false);
    const [editTemp, setEditTemp] = useState(false);
    const [temp, setTemp] = useState({extreme_temp});
    const [stTime, setStTime] = useState({start_time});
    const [endTime, setEndTime] = useState({end_time});

    const whiteDayPopup = (dayData, close) => (
        <Frame27 close={close} day={dayData.day} month={month_names[(month-1)%12]} current_day={dayData.current_day}/>
    )
    return(
        <div className = "page">
            <div className = "settings">
                <div className="setting" >
                    Working time: 
                    {!editTime ? (
                    <div>
                        {start_time}-{end_time}
                    </div>) 
                    : 
                    <form style={{display: 'flex'}}>
                        <input type='time' onChange={(event) => {setStTime(event.target.value)}}></input>
                        -
                        <input type='time' onChange={(event) => {setEndTime(event.target.value)}}></input>
                    </form>}
                    
                    <div onClick = {() => {
                        if(editTime){
                            set(ref(db, 'additional_info/working_from'), stTime.toString());
                            set(ref(db, 'additional_info/working_to'), endTime.toString());
                        }
                        setEditTime(!editTime);
                    }}>
                        <EditIcon/>
                    </div>
                </div>
                <div className="month" style={{marginBottom: '10px'}}>
                    <div onClick={() => {
                        if(month - 1 < 1){
                            setYear(year - 1);
                            setMonth((month + 11));
                        }
                        else{
                            setMonth((month - 1));
                        }
                    }
                    }>
                        <ArrowBackIosIcon/>
                    </div>
                    
                    {month_names[(month-1)%12]}

                    <div onClick={() => {
                        if(month + 1 > 12){
                            setYear(year + 1);
                            setMonth((month - 11));
                        }
                        else{
                            setMonth((month + 1));
                        }
                    } }>
                        <ArrowForwardIosIcon/>
                    </div>
                </div>
                <div className="setting" style={{justifyContent: 'end'}}>
                    <div>
                        Extreme Temperature:
                    </div>
                    {!editTemp ? (
                        <div style={{}}>
                            {extreme_temp}??C 
                        </div>
                    )
                    :
                    (
                        <form>
                            <input type='number' style={{width: '50px'}} onChange={(event) => {setTemp(event.target.value)} }></input>
                        </form>
                    )}
                    <div onClick = {() => {
                        if(editTemp){
                            set(ref(db, 'additional_info/extreme_temp'), temp);
                        }
                        setEditTemp(!editTemp);
                    }}>
                        <EditIcon/>
                    </div>
                </div>
            </div>
            <div className = "calendar">
                <Calendar 
                    year={year} 
                    month={(month)} 
                    id={''} 
                    greenDayPopup={() => {}} 
                    redDayPopup = {() => {}} 
                    whiteDayPopup={whiteDayPopup}
                    // workers={workers}
                    dayoffs={dayoffs}
                    additionalInfo={additionalInfo}
                />
            </div>
        </div>
    )
}

export default ManagerSettings;