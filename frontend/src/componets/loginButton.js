import React from 'react';
import { Link } from 'react-router-dom';

export const LoginButton = props => {
    
    console.log('here');
    return<div>
        <Link to={'/homePage'}>
        <button className = "loginButton2">Account Autherized Click here!</button>
        </Link>
    </div>
                            
}