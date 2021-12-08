import React from 'react';
import { useLocation } from "react-router-dom";


export default function Footer() {
    let location = useLocation();
    return (
        (location.pathname !== '/login' && location.pathname !== '/signup') && 
        <footer>
            <h1> Footer </h1>
        </footer>
    )
}
