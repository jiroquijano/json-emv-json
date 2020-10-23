import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import JSONtoEMVPage from './components/JSONtoEMVPage';
import EMVtoJSONPage from './components/EMVtoJSONPage';

function App() {

  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={HomePage}/>
        <Route path='/json-emv' exact component={JSONtoEMVPage}/>
        <Route path='/emv-json' exact component={EMVtoJSONPage}/>
      </Router>
    </div>
  );
}

export default App;
