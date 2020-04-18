import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './homePage.css';

class Home extends React.Component{

	logoutUser = e => {
        this.setState({logout: true});
	}
	
	state = {
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
					<Link to={'/home'}>
						<a >Home</a>
					</Link>
					</li>
				</ul>
			</nav>
			<h1>Profile Page</h1>
		</div>
		</>
	}
         
}

export default Home;