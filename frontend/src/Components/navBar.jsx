import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './navBar.css';

class NavBar extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			id: '',
			profile: false,
			logout: false,
			search: false
		};
	}

	logoutUser = e => {
        this.setState({logout: true});
	}

	goToProfile = e => {
        this.setState({profile: true});
	}

	goToSearch = e => {
		this.setState({search: true});
	}
	

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
						<a href="" onClick={this.goToSearch}>Search </a>
						{this.state.search  && <Redirect to="/search" /> }
					</li>
					<li>
						<a href="" onClick = {this.goToProfile}>Profile </a>
						{this.state.profile  &&<Redirect to={'/profile/' + this.props.id}></Redirect>}
					</li>
					<li>
						<a href="">Home</a>
					</li>
				</ul>
			</nav>
		</div>
		</>
	}
}

export default NavBar;
