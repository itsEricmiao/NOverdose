import React from 'react';
import './login.css'
import { Redirect } from 'react-router-dom';
import logo from './logo.png';


class Login extends React.Component{
    
    passwords = ["abc123"];
    emails = ["john@smu.edu"];

    authenticateUser = e => {
        if ("john@smu.edu" === this.state.email && "abc123" === this.state.password)  
        {
          this.setState({ authenticated: true });
          console.log('Logged IN');
        }
        else 
        {
            this.setState({ authenticated: false });
        }
    }
    registerUser = e => {
        this.setState({register: true});
    }

    state = {
        email: "",
        password: ""
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
            onClick={this.authenticateUser}>Log In</button>
            { this.state.authenticated  && <Redirect to="/homePage" /> }
            <button className="registerButton" type="button" onClick={this.registerUser}>Register</button>
            {this.state.register && <Redirect to="/register" />}
            </div>
            </>;
    }

}

export default Login;