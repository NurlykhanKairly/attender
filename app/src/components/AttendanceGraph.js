import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../css/AttendanceGraph.css';


export default function AttendanceGraph({workers}) {
    let data = [];

    let finishDate = new Date();
    finishDate.setMonth(finishDate.getMonth() + 1);
    finishDate.setDate(0);
    let startDate = new Date();
    startDate.setMonth(finishDate.getMonth() - 2);
    startDate.setDate(1);

    console.log(startDate.toLocaleDateString());
    console.log(finishDate.toLocaleDateString());

    let ticks = [];
    let i = 0;

    for(let d = startDate; d <= finishDate; d.setDate(d.getDate() + 1)) {
        // console.log(d.toLocaleDateString());
        data.push({
            name: `${d.toLocaleString('default', {month: 'long'})} ${d.getDate()}`,
            rate: (Math.round(Math.random() * 100))
        });
        if(d.getDate() == 1)
            ticks.push(i);
        i += 1;
    }
    if(data.length === 0) {
        console.log('EMPTY!!');
    }
    console.log(data);
    console.log(ticks);
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
