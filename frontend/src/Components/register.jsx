import React from 'react';
import './register.css'
import logo from './logo.png';
import User from './../models/user';
import { NoverdoseRepo } from './../Api/NoverdoseRepo';
import { RegisterButton } from './loginButton';
import { Redirect } from 'react-router-dom';
import {LoginButton, RegisterErrorMessage} from './loginButton';


export class RegisterPage extends React.Component {

    noverdoseRepo = new NoverdoseRepo();


    state = {
        id: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        medications: '',
        profilePicUrl: '',
        registered: null,
        confirm: null
    };

    registerUser(name, email, password, confirmPassword){
        if(password === confirmPassword)
        {
            this.setState({confirm: true});
            this.noverdoseRepo.addUser(name, email, password)
        .then(accountId => {new User(accountId, name, email, password, this.state.birthday, this.state.medications, this.state.profilePicUrl)
            console.log(accountId);
            this.setState({id: accountId.id}); 
            this.setState({registered: true});
        });
        }
        else
        {
            this.setState({registered: false});
        }
    }

    render() {
        return <>
            <form className="container">
            <div class="imgcontainer">
                <h1>Register</h1>
                <img src={logo} alt="Avatar" class="avatar"></img>
            </div>
            {this.state.registered == false && <RegisterErrorMessage/>}
            <div className="login-form">
            <div className="form-group">
                    <label htmlFor="search_name">Name</label>
                        <input type="text"
                            name="Email"
                            className="form-control"
                            value={ this.state.name }
                            onChange={ e => this.setState( { name: e.target.value } ) } />
                </div>
            </div>
            
                <div className="login-form">
            <div className="form-group">
                    <label htmlFor="search_name">Email</label>
                        <input type="text"
                            name="Email"
                            className="form-control"
                            value={ this.state.email }
                            onChange={ e => this.setState( { email: e.target.value } ) } />
                </div>
            </div>
            <div className="login-form">
            <div className="form-group">
                    <label htmlFor="search_name">Password</label>
                        <input type="password"
                            name="Password"
                            className="form-control"
                            value={ this.state.password }
                            onChange={ e => this.setState( { password: e.target.value } ) } />
                </div>
                </div>

                <div className="login-form">
            <div className="form-group">
                    <label htmlFor="search_name">Confirm Password</label>
                        <input type="password"
                            name="Password"
                            className="form-control"
                            value={ this.state.currentPassword }
                            onChange={ e => this.setState( { currentPassword: e.target.value } ) } />
                </div>
                </div>

                <div className="login-form">
                    <button className = "btn btn-primary btn-lg btn-block" type="button"  onClick={() => this.registerUser(this.state.name, this.state.email, this.state.password, this.state.currentPassword)}>Register</button>
                    {console.log(this.state.confirm), this.state.registered && <Redirect to={'/profile/' + this.state.id}/>}
                </div>
            </form>
        </>;
    }
}

export default RegisterPage;