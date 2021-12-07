import React, { useState } from "react";

import '../css/Email.css';

import Button from "@mui/material/Button"

const Email = () => {
    return (
        <>
       
            <div>
                <form className="email-form">
                    <p>
                        <label for="to" style={{width:'100px'}}>To: </label>

                        <select id="to">
                            <option value="everyone">everyone</option>
                        </select>
                    </p>

                    <p>
                        <label for="title" style={{width:'100px'}}>Title: </label>
                        <input id="title" style={{width:'800px'}}type="text" />
                    </p>

                    <p>
                        <label for="content" style={{width:'100px'}}>Content: </label>
                        <input id="content" style={{width:'800px', height:'300px'}} type="text" />
                    </p>

                    <Button variant="contained" style={{width:'200px', marginRight: '0px', marginLeft: 'auto', display: 'block'}}>Send</Button>
                </form>
            </div>
        </>
       
    )
};

export default Email;