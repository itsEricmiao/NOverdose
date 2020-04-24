import React from 'react';
import './register.css'
import logo from './logo.png';
import User from './../models/user';
import { NoverdoseRepo } from './../Api/NoverdoseRepo';
import { RegisterButton } from './loginButton';


export class RegisterPage extends React.Component {

    noverdoseRepo = new NoverdoseRepo();


    state = {
        id: '',
        name: '',
        email: '',
        password: '',
        registered: null
    };

    registerUser(name, email, password){
        this.setState({registered: false});
        this.noverdoseRepo.addUser(name, email, password)
        .then(accountId => {new User(accountId, name, email, password); 
            this.setState({id: accountId.id}); 
            this.setState({registered: true});
        });
    }

    render() {
        return <>
            <form className="container">
            <div class="imgcontainer">
                <h1>Register</h1>
                <img src={logo} alt="Avatar" class="avatar"></img>
            </div>
                <div className="register-form">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={ e => this.setState({ name: e.target.value }) } />
                </div>

                <div className="register-form">
                    <label htmlFor="email">Email</label>
                    <input type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={ e => this.setState({ email: e.target.value }) } />
                </div>
                  

                <div className="register-form">
                    <label htmlFor="email">Password</label>
                    <input type="text"
                        id="email"
                        name="email"
                        className="form-control"
                        value={this.state.password}
                        onChange={ e => this.setState({ password: e.target.value }) } />
                </div>

                <div className="col-3">
                    <button className = "registerButton" type="button"  onClick={() => this.registerUser(this.state.name, this.state.email, this.state.password)}>Register</button>
                    {this.state.registered && <RegisterButton id = {this.state.id}/>}
                </div>
            </form>
        </>;
    }
}

export default RegisterPage;