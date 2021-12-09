import React, { useState, useEffect } from "react";

import { db } from '../firebase';
import {ref, child, get} from 'firebase/database';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';

import '../css/Email.css';
import emailjs from 'emailjs-com';

import Button from "@mui/material/Button"

import { init } from 'emailjs-com';
init("user_ADA96Iq91Y5saGzluwfG5");

const Email = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [workers, setWorkers] = useState({});
    const dbRef = ref(db);
    const navigate = useNavigate();
    const [id, setId] = useState('');
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('authenticated! ' + user.uid);
            
          // User logged in already or has just logged in.
        } else {
            navigate('/login');
          // User not logged in or has just logged out.
        }
      });
    const user = auth.currentUser;
    if(id === '' && user){
        setId(user.uid);
        console.log('updated');
    }
    console.log(workers);
    useEffect(() => {
        console.log('in use effect!');
        console.log(workers);
        console.log(user)

        get(child(dbRef, '/')).then((snapshot) => {
            console.log('response');
            if(snapshot.exists()) {
                
                console.log(snapshot.val());

                setWorkers(snapshot.val().workers);
            } else {
                console.log("No data available");
            }
        });
    }, []);

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const onContentChange = (event) => {
        setContent(event.target.value);
    }

    const sendEmail = () => {
        for(let workerKey in workers) {
            if (workerKey == id) {
                continue;
            }

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
        
        navigate('/home');
        alert('Emails successfully sent!');
    }

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
                        <input id="title" style={{width:'800px'}} type="text" onChange={onTitleChange} />
                    </p>

                    <p>
                        <label for="content" style={{width:'100px', marginTop: '0'}}>Content: </label>
                        <textarea id="content" style={{height:'300px', verticalAlign: 'top'}} name="content_text" rows="14" cols="106" onChange={onContentChange}/>
                    </p>

                    <Button 
                        variant="contained" 
                        style={{width:'200px', marginRight: '0px', marginLeft: 'auto', display: 'block'}}
                        onClick={() => sendEmail()}
                    >Send</Button>
                </form>
            </div>
        </>
       
    )
};

export default Email;