import React from 'react';
import { useLocation } from "react-router-dom";

export default function Header() {
    
    let location = useLocation();
    return (
        (location.pathname !== '/login' && location.pathname !== '/signup') && 
        <header> 
            <h1> Attender </h1> 
        </header>
    )
}
