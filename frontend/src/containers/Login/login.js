import React from 'react';
import { Redirect } from 'react-router-dom';


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
        return<>
            <h1>NOverdose</h1>
            <div className="form-group">
                <form>
                    <label>Email</label>
                    <input
                                            type="text"
                                            name="email"
                                            value={this.state.email}
                                            onChange={ e => this.setState({ email: e.target.value }) }
                                            placeholder="Enter Email"
                                        />
                </form>
            </div>
            <div className="form-group">
            <form>
                <label>Password</label>
                <input
                                        type="text"
                                        name="email"
                                        value={this.state.password}
                                        onChange={ e => this.setState({ password: e.target.value }) }
                                        placeholder="Enter Email"
                                    />
            </form>
            <button className = "loginButton" type="button" disabled={!this.state.email || !this.state.password} 
            onClick={this.authenticateUser}>Log In</button>
            { this.state.authenticated  && <Redirect to="/homePage" /> }
            <button className = "registerButton" type="button"  onClick={this.registerUser}>Register</button>
            { this.state.register  && <Redirect to="/register" /> }
            </div>
            </>;
    }

}

export default Login;