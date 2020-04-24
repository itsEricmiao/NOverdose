import React from 'react';
import { Redirect } from 'react-router-dom';
import './navBar.css';

class NavBar extends React.Component{
	logoutUser = e => {
        this.setState({logout: true});
	}

	goProfile = e => {
        this.setState({profile: true});
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
					<a href = "" onClick = {this.goProfile}>Profile </a>
						{this.state.profile  && <Redirect to="/profile" /> }
					</li>
					<li>
						<a >Home</a>
					</li>
				</ul>
			</nav>
		</div>
		</>
	}
         
}

export default NavBar;