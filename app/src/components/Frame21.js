import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

import '../css/Email.css';
import Link from "@mui/material/Link";

const Input = styled('input')({
    display: 'none',
});

const Frame21 = () => {
    return (
        <>
            <div>
                <form className="email-form" style={{marginTop: '200px'}}>
                    <p>
                    <div style={{textAlign: 'center'}}>
                        <h4>November 16</h4>
                    </div>
                    </p>

                    <p>
                    <div>Reason:</div>
                            
                    <div>
                        Visited a dentist.
                    </div>

                    </p>

                    <p>
                        <div>Uploaded files:</div>

                        <div>
                            <Link>dentist_certificate.png</Link>
                        </div>
                    </p>

                    <p>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                <Button variant="outlined" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}}>Reject</Button>
                            </div>

                            <div>
                                <Button variant="contained" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}}>Approve</Button>
                            </div>
                        </div>
                    </p>
                </form>
            </div>
        </>

    )
};

export default Frame21;