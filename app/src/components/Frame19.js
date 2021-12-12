import React, { useState } from "react";

import '../css/Frame19.css';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from "@mui/material/Button"
import Avatar from '@mui/material/Avatar';


const Frame19 = (props) => {
    return (
        // 
        <>
            <div className="frame19-header">
                <Avatar alt={props.workerName} src={props.workerPhoto} sx={{width: 40, height: 40}}/>
                <div style={{marginLeft: '1vw'}}>
                    <p style={{marginBottom: 0, fontWeight: 'bold'}}> {props.workerName} </p>
                    <p style={{fontSize: '0.9em', color: '#262834'}}> {props.month}, {props.day} </p>
                </div>
            </div>
            <div className='frame19-content'>
                {
                    props.photo 
                        ? 
                        <img style={{width: '400px'}} src={props.photo}></img>
                        :
                        <img style={{width: '400px'}} src="https://static.remove.bg/remove-bg-web/126e8851f6e88bf644890fafdf1b0d82aff0629e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"></img>
                }
            </div>
            <div className="frame19-footer">
                <p>
                    <span style={{fontWeight: 'bold'}}> Check in: </span> {props.time}
                </p>
                <p>
                <span style={{fontWeight: 'bold'}}> Mood: </span> {props.mood}
                </p>    
            </div>
        </>
    )
};

export default Frame19;