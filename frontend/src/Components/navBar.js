import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './navBar.css';

class NavBar extends React.Component{
	logoutUser = e => {
        this.setState({logout: true});
	}

	goToProfile = e => {
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
					<Link to={'/search'}>
						<a href = "">Search </a>
					</Link>
					</li>
					<li>
					<Link to={'/profile'}>
						<a href = "">Profile </a>
					</Link>
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
