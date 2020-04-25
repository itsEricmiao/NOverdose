import React from 'react';
import { Redirect } from 'react-router-dom';

export default class ProfilePage extends React.Component {

    state = {
        title: 'User',
        name: 'John Smith',
        email: '',
        password: '',
    };

    goHome = e => {
        this.setState({homePage: true});
    }

    render() {
        return (
            <>

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

                    <button className="btn btn-primary btn-block" onClick={this.goHome}>Go Back</button>
                    {this.state.homePage && <Redirect to="/homePage" />}
                    <button className="btn btn-primary btn-block">Save</button>
                </form>
            </>
        );
    }
}
