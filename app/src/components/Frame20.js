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
    const [fileName, setFileName] = useState('');
    const uploadReason = () => {
        console.log(text);
        set(reasonRef, text);
        props.close();
    }
    return (
        <>
            <div>
                <form className="email-form" style={{marginTop: 0}}>
                    <p>
                    <div style={{textAlign: 'center'}}>
                        <h4>{props.month} {props.day}</h4>
                    </div>
                    </p>

                    <p>
                    <div>Enter a reason:</div>
                            
                    <div>
                        <input type="text" style={{width: '100%'}} onChange={(event) => {setText(event.target.value)}}/>
                    </div>

                    </p>

                    <div>Upload files (i.e: medical certificate):</div>

                    <div style={{marginBottom: '0.8vw', display: 'flex', alignItems: 'center'}}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e) => setFileName(e.target.files[0].name)}/>
                            <Button component="span" variant="outlined">
                                Upload
                            </Button>
                        </label>
                        <div style={{marginLeft: '0.5vw', fontSize: '0.8em'}}> {fileName} </div>
                     </div>


                    <Button variant="contained" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} onClick={uploadReason}>Submit</Button>
                </form>
            </div>
        </>

    )
};

export default Frame20;