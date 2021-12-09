import React, { useState } from "react";

import '../css/Frame19.css';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from "@mui/material/Button"

const Frame19 = (props) => {
    return (
        // 
        <div >
            <div className='row'>
                {/* <div class='column' style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <Button>
                        <ArrowBackIosIcon/>
                    </Button>
                </div> */}

                <div className='column'>
                    <div style={{textAlign: 'center'}}>
                        {props.month}, {props.day}

                        <div style={{marginTop: '20px'}}>
                            <div>
                                Check in: {props.time}
                            </div>
                            
                            <div>
                                Mood: {props.mood}
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='column'>
                    <img style={{width: '350px'}} src="https://static.remove.bg/remove-bg-web/126e8851f6e88bf644890fafdf1b0d82aff0629e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"></img>
                </div>
                
                {/* <div class='column' style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <Button>
                        <ArrowForwardIosIcon/>
                    </Button>
                </div> */}
            </div>
        </div>
    )
};

export default Frame19;