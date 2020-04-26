import React from 'react';
import { Link } from 'react-router-dom';

export const LoginButton = props => {
    
    return<div>
        <Link to={'/mainPage/' + props.id}>
        <button className = "loginButton2">Account Autherized Click here!</button>
        </Link>
    </div>
                            
}

export const ErrorMessage = props => {
    
    console.log('here');
    return<div>
        <h3 className = "error">Invalid Email or Password Please Try Again</h3>
    </div>
                            
}

export const RegisterButton = props => {
    
    return<div>
        <Link to={'/mainPage/' + props.id}>
        <button className = "loginButton2">Account Registered Click here tro Proceed to Profile</button>
        </Link>
    </div>
                            
}