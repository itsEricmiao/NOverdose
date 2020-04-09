import React from 'react';
import { Redirect } from 'react-router-dom';
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
						<a onClick = {<Redirect to="/login"/>} >Home</a>
					</li>
				</ul>
			</nav>
			<h1>Profile Page</h1>
		</div>
		</>
	}
         
}

export default Home;