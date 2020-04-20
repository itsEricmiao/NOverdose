import React from 'react';
import './login.css'
import { Redirect } from 'react-router-dom';
import logo from './logo.png';
import { AccountsRepository } from './../Api/AccountsRepository';
import {LoginButton} from './loginButton';


class Login extends React.Component{

    accountRepository = new AccountsRepository();

    onLogin() {
        this.accountRepository.login(this.state.email, this.state.password).then(user => {
            this.setState({authenticated: true});
        });
    
      }
    registerUser = e => {
        this.setState({register: true});
    }

    state = {
        email: "",
        password: "",
        authenticated: false
      };

    render(){
        return <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137604632-1"></script>
            <div class="imgcontainer">
                <h1>Welcome to NOverdose!</h1>
                <img src={logo} alt="Avatar" class="avatar"></img>
            </div>

            <div className="login-form">
                <form>
                    <label>Email</label>
                    <input
                                            type="text"
                                            name="email"
                                            value={this.state.email}
                                            onChange={ e => this.setState({ email: e.target.value }) }
                                            placeholder="email"
                                        />
                </form>
            </div>
            <div className="login-form">
            <form>
                <label>Password</label>
                <input
                                        type="text"
                                        name="email"
                                        value={this.state.password}
                                        onChange={ e => this.setState({ password: e.target.value }) }
                                        placeholder="password"
                                    />
            </form>
            <button className = "loginButton" type="button" disabled={!this.state.email || !this.state.password} 
            onClick={() => this.onLogin()}>Log In</button>
            <button className="registerButton" type="button" onClick={this.registerUser}>Register</button>
            {this.state.register && <Redirect to="/register" />}


            {this.state.authenticated && <LoginButton/>}
            </div>
            </>;
    }

}

export default Login;