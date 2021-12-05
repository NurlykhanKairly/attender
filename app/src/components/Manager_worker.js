import React, {useState} from "react";
import renderToString from "react-dom/server";
import '../css/Calendar.css';
import Calendar from './Calendar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { getDatabase, ref, onValue, set} from "firebase/database";
import { height } from "@mui/system";

const ManagerWorker = () => {
    const id = 'WvmCUa3IzqSbVJ1Lhe7V4HWUPg32';
    let today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const month_names = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"]

    //loading firebase
    const db = getDatabase();
    const info_ref = ref(db, `additional_info`);
    const [data, setData] = useState(0);
    if(data === 0){
        onValue(info_ref, (snap) =>{
            const val = snap.val();
            setData(val);
        })
    }
    let extreme_temp = 0;
    let start_time;
    let end_time;
    if(data !== undefined && data !== 0){
        extreme_temp = data['extreme_temp'];
        start_time = data['working_from'];
        end_time = data['working_to'];
    }
    
    const [editTime, setEditTime] = useState(false);
    const [editTemp, setEditTemp] = useState(false);
    const [temp, setTemp] = useState({extreme_temp});
    const [stTime, setStTime] = useState({start_time});
    const [endTime, setEndTime] = useState({end_time});

    return(
        <div class = "page">
            <div class = "settings">
                <div class="setting" >
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
                <div class="setting" style={{justifyContent: 'end'}}>
                    <div>
                        Extreme Temperature:
                    </div>
                    {!editTemp ? (
                        <div style={{}}>
                            {extreme_temp}°C 
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
            <div class = "calendar">
                <Calendar year='2021' month={(month)} id={id}/>
            </div>
        </div>
    )
}

export default ManagerWorker;