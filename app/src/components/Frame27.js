import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import '../css/Email.css';
import Link from "@mui/material/Link";
import { ref, set} from "firebase/database";
import { db } from '../firebase';

const Input = styled('input')({
    display: 'none',
});

const Frame27 = (props) => {
    const [text, setText] = useState('');
    const reasonRef = ref(db, `dayoffs/${props.current_day}`);
    const submit = () => {
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
                    <div>Reason for day off:</div>
                            
                    <input id="title" type="text" onChange={(event) => setText(event.target.value)}/>


                    </p>

                    <p>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                <Button variant="outlined" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} onClick={props.close}>Cancel</Button>
                            </div>

                            <div>
                                <Button variant="contained" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} onClick={submit}>Submit</Button>
                            </div>
                        </div>
                    </p>
                </form>
            </div>
        </>

    )
};

export default Frame27;