import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { ROUTES } from './routes';

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