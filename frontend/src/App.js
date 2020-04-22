import React, { Component } from 'react';
import './App.css';
import { ProfileCard } from "./componets/profileCard";
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { ROUTES } from './routes';

class App extends Component {
  render() {
    var user = {
      name: "Sample User",
      birthday: "01-01-2001",
      medications: ["Vitamin D", "Vitamin C", "Vitamin B"],
      profilePicUrl: "https://image.shutterstock.com/image-photo/closeup-face-headshot-pug-dog-260nw-250466800.jpg"
    };
    return (
      <>
        {/* <Router>
          <Switch>
            { ROUTES.map((route, index) => <Route key={index} { ...route } />) }
          </Switch>
        </Router> */}
        <ProfileCard user={user} cardColor={"#9EC0FE"} />
      </>
    );
  }
}

export default App;