import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTES } from './routes';
import MainPage from './Component/mainPage'
import NavBar from './Component/navBar'
import './Component/semantic-ui-css/semantic.min.css';
import './App.css';


class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            { ROUTES.map((route, index) => <Route key={index} { ...route } />) }
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;