import React from "react";
import '../css/Calendar.css';
import Calendar from './Calendar';
const Worker = () => {
    const id = 'WvmCUa3IzqSbVJ1Lhe7V4HWUPg32';
    const month = '12'
    const month_names = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"]
    return(
        <div class = "page">
            <div className="month">
                
                {month_names[month - 2]}
            </div>
            <div class = "calendar">
                <Calendar year='2021' month={month} id={id}/>
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