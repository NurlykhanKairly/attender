import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { create } from '@mui/material/styles/createTransitions';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export default function ManagerSignnup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [code, setCode] = useState("");
    const [position, setPosition] = useState("");
    const [generated, setGenerated] = useState(null);
    const [open, setOpen] = React.useState(false);
    const bottom = 'bottom';
    const right = 'right';

    let groupcodeElement = <input 
        type="text" 
        className="form-control" 
        placeholder="Enter group code"
        onChange={(e) => setCode(e.target.value)}
    />

    if(generated !== null) {
        groupcodeElement = <input 
            type="text" 
            className="form-control" 
            disabled
            value={generated}    
        />
    }

    const generateCode = () => {
        console.log('Clicked!');
        setGenerated(makeid(32));
    }

    const copyGenerated = () => {
        navigator.clipboard.writeText(generated).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    };

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
        <form className="signup-form">
            <div className="form-group">
                <label>Full name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter full name"
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="group-code-label">
                    <div className="group-code-text"> Group code </div>
                    {
                        generated !== null 
                            ?
                            <>
                                <a className="link-text" href='javascript:void(0);' onClick={copyGenerated} style={{marginLeft: 'auto'}}> copy </a>
                                <Snackbar
                                    anchorOrigin={{vertical: bottom, horizontal: right}}
                                    open={open}
                                    autoHideDuration={1000}
                                    onClose={handleClose}
                                    message="Group code was copied!"
                                    action={action}
                                />
                            </>
                            :
                            <a className="link-text" href='javascript:void(0);' onClick={generateCode} style={{marginLeft: 'auto'}}> generate </a>
                    }
                </label>
                {groupcodeElement}
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input 
                    type="email" 
                    className="form-control"
                    placeholder="Enter email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div  style={{alignItems: "center", textAlign:"center", marginTop: 10}}>
                <button 
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                        e.preventDefault();
                        registerWithEmailAndPassword(fullName, position, email, password);
                        navigate('/login');
                    }}
                >
                    Sign up
                </button>
            </div>
        </form>
    )
}
