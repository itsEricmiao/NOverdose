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
            specialist: '',
            birthday:'',
            homePage: false
        };
    }

    goHome = e => {
        this.setState({homePage: true});
    }


    updateUserInfo = (id, name, email, password, specialist, birthday) => {

        this.repo.updateUserByID(id, name, email, password, specialist, birthday);
        console.log("Updating user info");
        console.log(this.state);
    }


    componentWillMount() {
        let newid = +this.props.match.params.id;
        if (newid) {
            this.repo.getUserById(newid)
                .then(curuser => {
                        let rawBday = curuser.user[0].dob;
                        if (rawBday == null){
                            rawBday = "0000-00-00";
                        }
                        let bday = rawBday.slice(0,10);
                        this.setState({
                            id: curuser.user[0].id,
                            name: curuser.user[0].name,
                            email: curuser.user[0].email,
                            specialist: curuser.user[0].specialist,
                            birthday: bday,
                            password: curuser.user[0].password
                        })
                    }
                );
        }
    }
    render() {
        return (
            <>
                <NavBar id={this.props.match.params.id}/>
                <form className="container">
                    <h1>{this.state.title} Profile</h1>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input type="text"
                               id="name"
                               name="name"
                               className="form-control"
                               value={this.state.name}
                               onChange={e => this.setState({ name: e.target.value})} />
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

                    <div>
                        <label htmlFor="userAccountType">Account Type</label>
                        <form>
                            <select className="form-control"
                                    value={this.state.specialist}
                                    onChange={e =>
                                        this.setState(
                                            { specialist: e.target.value }
                                        )
                                    }>
                                <option defaultValue=""></option>
                                <option value="0">User</option>
                                <option value="1">Medical Specialist</option>
                            </select>
                        </form>
                    </div>
                    <br></br>

                    <button className="btn btn-primary btn-block" onClick={this.goHome}>Go Back</button>
                    {this.state.homePage && <Redirect to={"/dashboard/" + this.state.id}/>}
                    <button className="btn btn-primary btn-block" onClick={() => this.updateUserInfo(this.state.id, this.state.name, this.state.email, this.state.password, this.state.specialist, this.state.birthday)}>Save</button>
                </form>
            </>
        );
    }
}