import React from 'react'
import './App.css';
import Navbar2 from './components/Navbar/Navbar2.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import IndividualMap from './components/Maps/IndividualMap'

function App() {
  return (
    <Router>
      <Navbar2 />
      <Switch> 
        <Route path='/' exact component={Home} />
        <Route path='/IndividualMap' component={IndividualMap} />
      </Switch>
    </Router>
  );
}

export default App;
