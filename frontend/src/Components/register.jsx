import React from 'react';
import './register.css'
import logo from './logo.png';
import User from './../models/user';
import { NoverdoseRepo } from './../Api/NoverdoseRepo';
import { RegisterButton } from './loginButton';
import { Redirect } from 'react-router-dom';


export class RegisterPage extends React.Component {

    noverdoseRepo = new NoverdoseRepo();


    state = {
        id: '',
        name: '',
        email: '',
        password: '',
        birthday: '',
        medications: '',
        profilePicUrl: '',
        registered: null
    };

    registerUser(name, email, password){
        this.noverdoseRepo.addUser(name, email, password)
        .then(accountId => {new User(accountId, name, email, password, this.state.birthday, this.state.medications, this.state.profilePicUrl)
            console.log(accountId);
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
                        <input type="text"
                            name="Password"
                            className="form-control"
                            value={ this.state.password }
                            onChange={ e => this.setState( { password: e.target.value } ) } />
                </div>
                </div>

                <div className="login-form">
                    <button className = "btn btn-primary btn-lg btn-block" type="button"  onClick={() => this.registerUser(this.state.name, this.state.email, this.state.password)}>Register</button>
                    {this.state.registered && <Redirect to={'/dashboard/' + this.state.id}/>}
                </div>
            </form>
        </>;
    }
}

export default RegisterPage;