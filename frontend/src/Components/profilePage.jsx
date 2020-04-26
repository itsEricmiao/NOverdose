import React from 'react';
import { Redirect } from 'react-router-dom';

export default class ProfilePage extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            id:'',
            title: '',
            name: '',
            email: '',
            password: '',
            homePage: false
        };

    }
    
    goHome = e => {
        this.setState({homePage: true});
    }

    componentDidMount() {
        let newId = +this.props.match.params.id;
        this.setState({ id:newId});
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

                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input type="text"
                            id="birthday"
                            name="birthday"
                            className="form-control"
                            value={this.state.birthday}
                            onChange={e => this.setState({ birthday: e.target.value })} />
                    </div>

                    <button className="btn btn-primary btn-block" onClick={this.goHome}>Go Back</button>
                    {this.state.homePage && <Redirect to={"/mainPage/" + this.state.id}/>}
                    <button className="btn btn-primary btn-block">Save</button>
                </form>
            </>
        );
    }
}
