import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from './routes';
import './App.css';
import ProfilePage from './Component/profilePage'
import MainPage from './Component/mainPage'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <>
        {/* <Router>
          <Switch>
            { ROUTES.map((route, index) => <Route key={index} { ...route } />) }
          </Switch>
        </Router> */}
        <ProfilePage/>
      </>
    );
  }
}

export default App;