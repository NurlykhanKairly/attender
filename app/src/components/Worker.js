import React, {useState} from "react";
import '../css/Calendar.css';
import Calendar from './Calendar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { getDatabase, ref, onValue, } from "firebase/database";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";
import Frame20 from "./Frame20";
import Frame19 from "./Frame19";

const Worker = () => {
    let today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const month_names = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"]
    // Authenticate the user
    const navigate = useNavigate();
    const [id, setId] = useState('');
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('authenticated! ' + user.uid);
            
          // User logged in already or has just logged in.
        } else {
            navigate('/login');
          // User not logged in or has just logged out.
        }
      });
    const user = auth.currentUser;
    if(id === '' && user){
        setId(user.uid);
        console.log('updated');
    }

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

    const body = (
        <Frame20/>
    )
    return(
        <div className = "page">
                <div className="month">
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
            <div className = "calendar">
                <Calendar year={year} month={(month)} id={id} redDayPopup={(<Frame20/>)} greenDayPopup={(<Frame19/>)} />
            </div>
        </div>
    )
}

export default Worker;

// const days = [
//     {
//         date: '2021-1-1',
//         time: '01:22',
//     },
//     {
//         date:'2021-1-2',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-3',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-4',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-5',
//         time: '02:33',
//     },{
//         date:'2021-1-6',
//         time: '02:33',
//     },{
//         date:'2021-1-7',
//         time: '02:33',
//     },
//     {
//         date: '2021-1-8',
//         time: '01:22',
//     },
//     {
//         date:'2021-1-9',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-10',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-11',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-12',
//         time: '02:33',
//     },{
//         date:'2021-1-13',
//         time: '02:33',
//     },{
//         date:'2021-1-14',
//         time: '02:33',
//     },
//     {
//         date: '2021-1-15',
//         time: '01:22',
//     },
//     {
//         date:'2021-1-16',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-17',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-18',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-19',
//         time: '02:33',
//     },{
//         date:'2021-1-20',
//         time: '02:33',
//     },{
//         date:'2021-1-21',
//         time: '02:33',
//     },
//     {
//         date: '2021-1-22',
//         time: '01:22',
//     },
//     {
//         date:'2021-1-23',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-24',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-25',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-26',
//         time: '02:33',
//     },{
//         date:'2021-1-27',
//         time: '02:33',
//     },{
//         date:'2021-1-28',
//         time: '02:33',
//     },
//     {
//         date: '2021-1-29',
//         time: '01:22',
//     },
//     {
//         date:'2021-1-30',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-1',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-2',
//         time: '02:33',
//     },
//     {
//         date:'2021-1-3',
//         time: '02:33',
//     },{
//         date:'2021-1-4',
//         time: '02:33',
//     },{
//         date:'2021-1-5',
//         time: '02:33',
//     },
// ];