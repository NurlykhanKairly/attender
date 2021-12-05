import React, { useState } from "react";
import Button from "@mui/material/Button";
import '../css/Email.css';

const Frame22 = () => {
    return (
        <div>
        <form className="email-form">
            
            <p>
                <label style={{width: '150px'}}for="title">Enter a reason: </label>
                <input id="title" type="text" />
            </p>
            
            <Button style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} variant="contained">Submit</Button>
        </form>
        </div>
    )
};

export default Frame22;