import React, { useState } from 'react'
import { auth, signInWithEmailAndPassword, registerWithEmailAndPassword } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { create } from '@mui/material/styles/createTransitions';
import axios from 'axios';


export default function WorkerSignup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [code, setCode] = useState("");
    const [position, setPosition] = useState("");
    const [file, setFile] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log('Submitted!');

        // e.preventDefault();
        // registerWithEmailAndPassword(fullName, position, email, password);
        // navigate('/login');

        // let fileFormData = new FormData();
        // fileFormData.append("student-id", studentId);
        // fileFormData.append("class-id", classId);
        // fileFormData.append("student-image", file, file.name);

        // axios.post("http://127.0.0.1:5000/api/students/upload-image", fileFormData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // }).then((response) => {
        //     console.log("The response is: ", response);
        // }).catch((error) => {
        //     console.error("The error is: ", error);
        // });
    }

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
                <label> Picture </label>
                <input 
                    type="file"
                    name = "student-image" 
                    onChange = {event => setFile(event.target.files[0])}
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
            
            
            <div  style={{alignItems: "center", textAlign:"center", marginTop: 10}}>
                <button 
                    className="btn btn-primary btn-block"
                    onClick={handleFormSubmit}
                >
                    Sign up
                </button>
            </div>
        </form>
    )
}
