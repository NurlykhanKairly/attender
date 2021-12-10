import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { db, auth, logout } from '../firebase';
import '../css/Header.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function Header({uid, workers, dayoffs, additionalInfo}) {
    let location = useLocation();
    // const [uid, setUid] = useState(null);
    // const [workers, setWorkers] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };    

    if(location.pathname === '/login' || location.pathname === '/signup')
        return null;

    // console.log(uid, workers);

    if(!uid || !workers)
        return null;

    let links = [];
    links.push(<Link to="/" className="link"> Home </Link>);        
    if(workers[uid].role === "manager") {
        links.push(<Link to="/email" className="link"> Notify </Link>);
        links.push(<Link to="/manager-settings" className="link"> Settings </Link>);
    }
    return (
        <div className="header-container"> 
            <div className="links-container">
                {links}
            </div>
            <div className="logo-container">
                <h1> Attender </h1>
            </div>
            
            <div 
                className="profile-container" 
                onClick={handleOpen}
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar alt={workers[uid].name} src={workers[uid].photo} sx={{width: 40, height: 40}}/>
                <p> {workers[uid].name} </p>
            </div>
    
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                disableAutoFocusItem
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem 
                    onClick={() => {
                        handleClose();
                        auth.signOut().then(() => {
                            navigate('/login');
                        }).catch(error => {
                            console.log(error);
                        });
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
}
