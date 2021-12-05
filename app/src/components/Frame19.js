import React, { useState } from "react";

import '../css/Frame19.css';

const Frame19 = () => {
    return (
        <div class='some-page-wrapper'>
            <div class='row'>
                <div class='column'>
                    <div style={{textAlign: 'center'}}>
                        November 7
                    </div>

                    <div style={{textAlign: 'left'}}>
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

                <div class='column'>
                    <div class='green-column'>
                        Some Text in Column Two
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Frame19;