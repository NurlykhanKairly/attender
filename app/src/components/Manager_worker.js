import React, {useState} from "react";
import renderToString from "react-dom/server";
import '../css/Calendar.css';
import Calendar from './Calendar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { getDatabase, ref, onValue, set} from "firebase/database";
import { auth } from '../firebase';
import { useNavigate, useParams } from "react-router-dom";
import Frame21 from "./Frame21";
import Frame19 from "./Frame19";
import NoMatch from "./NoMatch";


const ManagerWorker = ({workers, dayoffs, additionalInfo}) => {
    // TODO pass props.name and props.id for a worker
    const db = getDatabase();
    const {uid} = useParams();
    // Authenticate user
    // const [id, setId] = useState('');
    // const [idWorker, setIdWorker] = useState(props.id);
    const idWorker = uid;
    let exists = uid in workers;
    // const [isManager, setIsManager] = useState(false);
    // const navigate = useNavigate();
    
    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         console.log('authenticated! ' + user.uid);
    //     } 
    //     else {
    //         navigate('/login');
    //     }
    //   });
    // const user = auth.currentUser;
    // if(!isManager && user !== null && user !== undefined){
    //     onValue(ref(db, `workers/${user.uid}/role`), (snap) => {
    //         if(snap.val() === 'manager'){
    //             setIsManager(true);
    //         }
    //         else{
    //             navigate('/worker');
    //         }
    //     })
    // }
    // if(id === '' && user){
    //     setId(user.uid);
    //     console.log('updated ' + id);
    // }
    // console.log('updated ' + id);
    
    let today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const month_names = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"]
    
    const redDayPopup = (dayData, close) => (
        <Frame21 day={dayData.day} month={month_names[(month-1)%12]} close={close} current_day={dayData.current_day} id={dayData.id}/>
    )
    const greenDayPopup = (dayData, close) => 
        (dayData !== undefined) ?  
        (<Frame19 day={dayData.day} month={month_names[(month-1)%12]} time={dayData.time} mood={dayData.mood} close={close}/>)
        :
        (<Frame19 day="error" month={month_names[(month-1)%12]} time="error" close={close}/>)
    
    return(
        exists 
        ?
        <div className = "page">
            <div className = "settings">
                <div className="setting" style={{fontSize: '26px'}}>
                    {workers[idWorker].name}'s profile
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
                <div className="setting">
                </div>
            </div>
            <div className = "calendar">
                <Calendar 
                    year={year} 
                    month={(month)} 
                    id={idWorker} 
                    redDayPopup={redDayPopup} 
                    greenDayPopup={greenDayPopup} 
                    whiteDayPopup={()=>{}}
                    workers={workers}
                    dayoffs={dayoffs}
                    additionalInfo={additionalInfo}
                />
            </div>
        </div>
        :
        <NoMatch />
    )
}

export default ManagerWorker;