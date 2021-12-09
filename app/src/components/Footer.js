import React, {useEffect} from 'react';
import { useLocation, Link } from "react-router-dom";
import '../css/Footer.css';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


export default function Footer({uid, workers, dayoffs, additionalInfo}) {
    let location = useLocation();
    if(location.pathname === '/login' || location.pathname == '/signup')
        return null;
    if(!uid || !workers)
        return null;
    let links = [];
    links.push(<Link to="/" className="footer-link"> Home </Link>);        
    if(workers[uid].role === "manager") {
        links.push(<Link to="/email" className="footer-link"> Notify </Link>);
        links.push(<Link to="/manager-settings" className="footer-link"> Settings </Link>);
    }

    return (
        <div className="footer">
            <p className="copyright"> &copy; 2021 Attender </p>
            <Divider className="divider" />
            <div className="footer-bottom">
                <div className="footer-links">
                    {links}
                </div>
                <div className="social-media">
                    <FacebookIcon className="footer-icon"/>
                    <LinkedInIcon className="footer-icon" />
                    <TwitterIcon className="footer-icon" />
                    <YouTubeIcon className="footer-icon" />
                    <InstagramIcon className="footer-icon" />
                </div>
            </div>
        </div>
    )
}
