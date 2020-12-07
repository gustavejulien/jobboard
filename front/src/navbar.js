import React from 'react';
import { Link } from 'react-router-dom';
import useCookie from './useCookie'
import './css/navbar.css';

const Navbar = () => {
    const test = useCookie("status")
    if(test[0] === null){
        return (
            <div className="navbar">
            <Link to="/">Jobs</Link>
            <Link to="/registeruser">Signup</Link>
            <Link to="/login">Login</Link>
            </div>
            )
        } else if(test[0] === "user") {
            return (
                <div className="navbar">
                <Link to="/">Jobs</Link>
                <Link to="/history">Application history</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Logout</Link>
                </div>                )
        } else if (test[0] === "recruiter"){
            return(
                <div className="navbar">
                <Link to="/ads">Ads</Link>
                <Link to="/applications">Applications</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Logout</Link>
                </div>
            )
        } else if(test[0] === "admin"){
            return(
                <div className="navbar">
                <Link to="/admin">Admin panel</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/logout">Logout</Link>
                </div>
            ) 
        }
                    
}
                
                
export default Navbar