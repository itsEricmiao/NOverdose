import React from 'react';
import './login.css'
import { Redirect, Link } from 'react-router-dom';
import logo from './logo.png';
import { NoverdoseRepo } from './../API/NoverdoseRepo';
import {LoginButton, ErrorMessage} from './loginButton';


class Login extends React.Component{
    noverdoseRepo = new NoverdoseRepo();
    onLogin() {
        this.setState({authenticated: false});
        this.noverdoseRepo.login(this.state.email, this.state.password).then(user => {
            this.setState({authenticated: true});
        });

      }
    registerUser = e => {
        this.setState({register: true});
    }

    state = {
        email: "",
        password: "",
        authenticated: null
      };

    render(){
        return <>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-137604632-1"></script>
            <div class="imgcontainer">
                <h1>Welcome to NOverdose!</h1>
                <img src={logo} alt="Avatar" class="avatar"></img>
            </div>

            {this.state.authenticated === false && <ErrorMessage/>}

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
            <Link to={'register'}>
            <button className="registerButton" type="button">Register</button>
            </Link>


            {this.state.authenticated && <LoginButton/>}
            </div>
            </>;
    }

}

export default Login;
