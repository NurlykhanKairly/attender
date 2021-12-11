import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import '../css/Signup.css';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import WorkerSignup from './Worker_signup';
import ManagerSignnup from './ManagerSignnup';


export default function Signup({uid}) {
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event) => {
        setType(event.target.value);
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
            { error && <Alert severity="error">Unexpected error happened. Error message: {error} </Alert> }      
            <div className="auth-wrapper">  
                <div className="auth-inner">       
                    <h3>Sign up</h3> 
                    <FormControl component="fieldset">
                        <FormLabel component="legend">You are: </FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={handleChange}
                            className="radio-group"
                        >
                            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
                            <FormControlLabel value="worker" control={<Radio />} label="Worker" />
                        </RadioGroup>
                    </FormControl>
                    {
                        type === "worker" ? <WorkerSignup setError={setError}/>
                        : type === "manager" ? <ManagerSignnup setError={setError}/>
                        : null
                    }
                    <p className="forgot-password text-right">
                        Already have an <Link to="/login" className="link"> account? </Link>
                    </p>
                </div>
                
            </div>
            </>
    )
}
