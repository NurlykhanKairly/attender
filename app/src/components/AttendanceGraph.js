import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../css/AttendanceGraph.css';
import { getYMD } from '../helpers';


export default function AttendanceGraph({workers, dayoffs, additionalInfo}) {
    let data = [];

    let today = new Date();
    let startDate = new Date();
    startDate.setMonth(today.getMonth() - 2);
    startDate.setDate(1);

    let ticks = [];
    let i = 0;

    for(let d = new Date(startDate.getTime()); d <= today; d.setDate(d.getDate() + 1)) {
        // console.log(d.toLocaleDateString());
        if(d.getDay() === 0 || d.getDay() === 6) 
            continue;        

        let key = getYMD(d);
        
        if(dayoffs[key])
            continue;

        let misses = 0, totalWorkers = 0;
        for(let workerKey in workers) {
            if(workers[workerKey].role === "manager")
                continue;
            // console.log(workers[workerKey]);
            if(workers[workerKey].attendance && (!workers[workerKey].attendance[key])) {
                misses ++;
            }
            totalWorkers ++;
        }


        // console.log('total workers: ', totalWorkers);
        // console.log('misses: ', misses);
        // console.log(key, misses);

        data.push({
            name: `${d.toLocaleString('default', {month: 'long'})} ${d.getDate()}`,
            rate: (((totalWorkers - misses) / Math.max(1, totalWorkers)) * 100)
        });

        if(d.getDate() === 1)
            ticks.push(i);
        i += 1;
    }
    
    // console.log(data);
    // console.log(ticks);
    
    console.log('AttendanceGraph rendered');

    return (
            <div className="attendance-graph-responsive-container">
                <p className="graph-title"> Attendance Rate </p>
                <ResponsiveContainer height={200} width="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        {/* <XAxis dataKey="name"  tickFormatter={(item) => item.split(' ')[0]} allowDuplicatedCategory={false} interval={30} /> */}
                        <XAxis ticks={ticks} tickFormatter={(item) => data.length && data[item].name.split(' ')[0]}/>
                        <YAxis />
                        <Tooltip labelFormatter={(item) => data.length && data[item].name} formatter={(value, name, props) => `${value}%`}/>
                        <Area type="monotone" dataKey="rate" stroke="#a5cda9" fill="#a5cda9" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
    )
}
