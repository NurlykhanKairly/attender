import React, { useState } from "react";

import '../css/Frame19.css';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from "@mui/material/Button"

const Frame19 = () => {
    return (
        <div class='some-page-wrapper'>
            <div class='row'>
                <div class='column' style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <Button>
                        <ArrowBackIosIcon/>
                    </Button>
                </div>

                <div class='column'>
                    <div style={{textAlign: 'center'}}>
                        November 7

                        <div style={{marginTop: '20px'}}>
                            <div>
                                Check in: 08:22
                            </div>
                            
                            <div>
                                Checked in: #12
                            </div>
                            
                            <div>
                                Mood: confused
                            </div>
                            
                            <div>
                                Temperature: 36.6C
                            </div>
                        </div>
                    </div>
                </div>

                <div class='column'>
                    <img style={{width: '350px'}} src="https://static.remove.bg/remove-bg-web/126e8851f6e88bf644890fafdf1b0d82aff0629e/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"></img>
                </div>
                
                <div class='column' style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <Button>
                        <ArrowForwardIosIcon/>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Frame19;