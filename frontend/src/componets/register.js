import React from 'react';
import './register.css'
import logo from './logo.png';
import { Link } from 'react-router-dom';
import User from './../models/user';
import { NoverdoseRepo } from './../Api/NoverdoseRepo';


export class RegisterPage extends React.Component {

    noverdoseRepo = new NoverdoseRepo();


    state = {
        name: '',
        email: '',
        password: ''
    };

    registerUser(user){
        this.noverdoseRepo.addUser(user);
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
                    <Link to={'homePage'}>
                    <button className = "registerButton" type="button"  onClick={() => this.registerUser(new User(this.state.name, this.state.email, this.state.password))}>Register</button>
                    </Link>
                </div>
            </form>
        </>;
    }
}

export default RegisterPage;