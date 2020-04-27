import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './navBar.css';
import logo from './logo.png';

class NavBar extends React.Component{
	constructor(props)
	{
		super(props);
		this.state = {
			id: '',
			profile: false,
			logout: false,
			search: false,
			dash: false
		};
	}

	logoutUser = e => {
        this.setState({logout: true});
	}

	goToProfile = e => {
        this.setState({profile: true});
	}
	goToDash = e => {
        this.setState({dash: true});
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
						<img src={logo} alt="Avatar" class="avatar"></img>
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
						<a onClick = {this.goToDash} href="">Home</a>
						{this.state.dash &&<Redirect to={'/dashboard/' + this.props.id}></Redirect>}
					</li>
				</ul>
			</nav>
		</div>
		</>
	}
}
export default NavBar;