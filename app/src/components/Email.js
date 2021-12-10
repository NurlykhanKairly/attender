import React, { useState, useEffect } from "react";

import { db } from '../firebase';
import {ref, child, get} from 'firebase/database';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';

import '../css/Email.css';
import emailjs from 'emailjs-com';

import Button from "@mui/material/Button"
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


import { init } from 'emailjs-com';
init("user_ADA96Iq91Y5saGzluwfG5");

const Email = ({uid, workers}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    // const [workers, setWorkers] = useState({});
    // const dbRef = ref(db);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    // const [id, setId] = useState('');
    const id = uid;
    useEffect(() => {
        if(!uid) {
            navigate('/login');
        }    
    }, [uid]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };

    console.log(workers);

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContent(event.target.value);
    }

    const sendEmail = () => {
        for(let workerKey in workers) {
            // if (workerKey == id) {
            //     continue;
            // }

            var data = {
                to_email:workers[workerKey].email,
                from_name: workers[id].name,
                to_name:workers[workerKey].name,
                email_title: title,
                message: content
            };
            
            emailjs.send('service_hwk67zd', 'template_48wblda', data, 'user_ADA96Iq91Y5saGzluwfG5').then(
                function (response) {
                    console.log(response.status, response.text);
                },
                function (err) {
                console.log(err);
                }
            );
        }
        setOpen(true);
        setTitle('');
        setContent('');
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    return (
        <>
            <div>
                <form className="email-form">
                    <p>
                        <label htmlFor="to" style={{width:'100px'}}>To: </label>

                        <select id="to">
                            <option value="everyone">everyone</option>
                        </select>
                    </p>

                    <p>
                        <label htmlFor="title" style={{width:'100px'}}>Title: </label>
                        <input id="title" style={{width:'800px'}} type="text" onChange={onTitleChange} value={title}/>
                    </p>

                    <p>
                        <label htmlFor="content" style={{width:'100px', marginTop: '0'}}>Content: </label>
                        <textarea id="content" style={{height:'300px', verticalAlign: 'top'}} name="content_text" rows="14" cols="106" onChange={onContentChange} value={content}/>
                    </p>

                    <Button 
                        variant="contained" 
                        style={{width:'200px', marginRight: '0px', marginLeft: 'auto', display: 'block'}}
                        onClick={() => sendEmail()}
                    >Send</Button>
                </form>
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message="Emails were sent!"
                    action={action}
                />
            </div>
        </>
       
    )
};

export default Email;