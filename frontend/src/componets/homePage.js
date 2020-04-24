import React from 'react';
import { Redirect } from 'react-router-dom';
import './homePage.css';
import { NoverdoseRepo } from './../Api/NoverdoseRepo';

class Home extends React.Component{

	noverdoseRepo = new NoverdoseRepo();

	logoutUser = e => {
        this.setState({logout: true});
	}
	
	state = {
		user:[]
    };

	render(){
		return <>
		<div>
			<nav>
				<ul>
					<li className = "Title">
						NOverdose
					</li>
					<li>
						<a href = "" onClick = {this.logoutUser}>Logout </a>
						{this.state.logout  && <Redirect to="/login" /> }
					</li>
					<li>
						<a href = "">Search</a>
					</li>
					<li>
						<a href = "">Profile</a>
					</li>
					<li>
						<a >Home</a>
					</li>
				</ul>
			</nav>
			<h1>Profile Page</h1>
			<h1>{console.log(this.state.user.name),this.state.name}</h1>
		</div>
		</>
	}

	componentWillMount() {
        let id = +this.props.match.params.id;
        console.log(id);
        if (id) {
            this.noverdoseRepo.getUserById(id)
                .then(user => this.setState(user));
        }
    }
}

export default Home;