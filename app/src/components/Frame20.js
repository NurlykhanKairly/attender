import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

import '../css/Email.css';


const Input = styled('input')({
    display: 'none',
});

const Frame20 = () => {
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
                    <div>Enter a reason:</div>
                            
                    <div>
                        <input type="text" style={{width: '250px'}}/>
                    </div>

                    </p>

                    <p>
                    <div>Upload files (i.e: medical certificate):</div>

                    <div style={{textAlign: 'left'}}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button component="span" variant="outlined">
                                Upload
                             </Button>
                        </label>
                     </div>
                    </p>
                    <Button variant="contained" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}}>Submit</Button>
                </form>
            </div>
        </>

    )
};

export default Frame20;