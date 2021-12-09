import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';
import '../css/Email.css';


const Input = styled('input')({
    display: 'none',
});

const Frame20 = (props) => {
    const [text, setText] = useState('');
    const reasonRef = ref(db, `workers/${props.id}/attendance/${props.current_day}/reason`);
    const uploadReason = () => {
        console.log(text);
        set(reasonRef, text);
        props.close();
    }
    return (
        <>
            <div>
                <form className="email-form">
                    <p>
                    <div style={{textAlign: 'center'}}>
                        <h4>{props.month} {props.day}</h4>
                    </div>
                    </p>

                    <p>
                    <div>Enter a reason:</div>
                            
                    <div>
                        <input type="text" style={{width: '250px'}} onChange={(event) => {setText(event.target.value)}}/>
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
                    <Button variant="contained" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} onClick={uploadReason}>Submit</Button>
                </form>
            </div>
        </>

    )
};

export default Frame20;