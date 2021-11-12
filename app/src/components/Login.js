import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onLogin = () => {
        signInWithEmailAndPassword(email, password);
        navigate('/home');
    };

    return (
        <div className="auth-wrapper">  
            <div className="auth-inner">
                <form>
                    <h3>Sign in</h3>
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

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    
                    <div  style={{alignItems: "center", textAlign:"center"}}>
                        <button 
                            type="submit" 
                            className="btn btn-primary btn-block"
                            onClick={() => onLogin()}
                        >
                            Sign in
                        </button>
                    </div>

                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </form>
            </div>
        </div>
    )
};

export default Login;
