import React from 'react';
import {NoverdoseRepo} from '../Api/NoverdoseRepo';
import { Redirect } from 'react-router-dom';
import NavBar from "./navBar";

export default class ProfilePage extends React.Component {

    repo = new NoverdoseRepo();

    constructor(props)
    {
        super(props)
        this.state = {
            id:'',
            name: '',
            email: '',
            password: '',
            birthday:'',
            homePage: false
        };

    }

    goHome = e => {
        this.setState({homePage: true});
    }



    componentWillMount() {
        let newid = +this.props.match.params.id;
        if (newid) {
            this.repo.getUserById(newid)
                .then(curuser => {
                        console.log("profilepage: componentWillMount");
                        this.setState({
                            id: curuser.user[0].id,
                            name: curuser.user[0].name,
                            email: curuser.user[0].email,
                            password: curuser.user[0].password,
                            id: newid
                        })
                    }
                );
        }
    }

    render() {
        return (
            <>
                <NavBar/>

                <form className="container">
                    <h1>{this.state.title} Profile</h1>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="form-control"
                               value={this.state.name}
                               onChange={e => this.setState({ name: e.target.value, title: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                               id="email"
                               name="email"
                               className="form-control"
                               value={this.state.email}
                               onChange={e => this.setState({ email: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input type="text"
                               id="birthday"
                               name="birthday"
                               className="form-control"
                               value={this.state.birthday}
                               onChange={e => this.setState({ birthday: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthday">Password</label>
                        <input type="text"
                               id="password"
                               name="password"
                               className="form-control"
                               value={this.state.password}
                               onChange={e => this.setState({ password: e.target.value })} />
                    </div>

                    <button className="btn btn-primary btn-block" onClick={this.goHome}>Go Back</button>
                    {this.state.homePage && <Redirect to={"/dashboard/" + this.state.id}/>}
                    <button className="btn btn-primary btn-block">Save</button>
                </form>
            </>
        );
    }
}
