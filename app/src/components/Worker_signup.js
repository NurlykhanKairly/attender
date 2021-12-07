import React, { useState } from 'react'
import { auth, signInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { create } from '@mui/material/styles/createTransitions';

export default function WorkerSignup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [code, setCode] = useState("");
    const [position, setPosition] = useState("");

    return (
        <div className="auth-wrapper">  
            <div className="auth-inner">
                <form>
                    <h3>Sign up</h3>
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
                        <label>Group code</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter group code"
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Position</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter your position"
                            onChange={(e) => setPosition(e.target.value)}
                        />
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
                    
                    
                    <div  style={{alignItems: "center", textAlign:"center"}}>
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

                    <p className="forgot-password text-right">
                        Already have an <a href="/login">account?</a>
                    </p>
                </form>
            </div>
        </div>
    )
}
