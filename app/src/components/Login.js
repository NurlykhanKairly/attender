import React, { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import '../css/Login.css';


const Login = ({uid}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    console.log('Login rendered!');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        console.log('logging in');
        setLoading(true);
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigate('/');
            })
            .catch((err) => {
                setLoading(false);
                setError(true);
                console.log(err);
            });
    };

    useEffect(() => {
        if(uid) {
            navigate('/');
        }    
    }, [uid]);

    return (
        (uid || loading) ?
            <div className="loading-container">
                <CircularProgress />
            </div>
            :
            <>
            { error && <Alert severity="error">Unexpected error happened. Please try again </Alert> }
            <div className="auth-wrapper">  
                <div className="auth-inner">
                    <form className="login-form">
                        <h3>Sign in</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input 
                                required
                                type="email" 
                                className="form-control"
                                placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
    
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                required
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
                                // type="submit" 
                                className="btn btn-primary btn-block"
                                onClick={(e) => onLogin(e)}
                            >
                            {/* <input type="submit" /> */}

                                Sign in
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            Don't have an <Link to="/signup" className="link"> account? </Link>
                        </p>
                    </form>
                </div>
            </div>
            </>
    )
};

export default Login;
