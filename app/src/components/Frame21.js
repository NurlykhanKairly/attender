import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { db } from '../firebase';
import '../css/Email.css';
import Link from "@mui/material/Link";
import { ref, onValue, set } from 'firebase/database';

const Frame21 = (props) => {
    const reasonRef = ref(db, `workers/${props.id}/attendance/${props.current_day}/reason`);
    const reasonResponseRef = ref(db, `workers/${props.id}/attendance/${props.current_day}/reason_response`)
    const [reason, setReason] = useState('');
    onValue(reasonRef, (snap) => {
        if(snap.exists() && reason === ''){
            setReason(snap.val());
        }
    })
    const approve = () => {
        set(reasonResponseRef, true);
        props.close();
    }
    const reject = () => {
        set(reasonResponseRef, false);
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
                    <div>Reason:</div>
                            
                    <div>
                        {reason}
                    </div>

                    </p>

                    <p>
                        <div>Uploaded files:</div>

                        <div>
                            None
                            {/* <Link>dentist_certificate.png</Link> */}
                        </div>
                    </p>

                    <p>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div>
                                <Button variant="outlined" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} onClick={reject}>Reject</Button>
                            </div>

                            <div style={{marginLeft: '1vw'}}>
                                <Button variant="contained" style={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}} onClick={approve}>Approve</Button>
                            </div>
                        </div>
                    </p>
                </form>
            </div>
        </>

    )
};

export default Frame21;