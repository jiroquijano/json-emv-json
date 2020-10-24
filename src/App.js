import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import JSONtoEMVPage from './components/JSONtoEMVPage';
import EMVtoJSONPage from './components/EMVtoJSONPage';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

function App() {

  return (
    <Router>
      <Header/>
      <div className="App">
        <Container>
            <Row>
              <Col md="6">
                <div className="main-content">
                  <Switch>
                    <Route path='/' exact component={JSONtoEMVPage}/>
                    <Route path='/emv-json' exact component={EMVtoJSONPage}/>
                    <Route path='/json-emv' exact component={JSONtoEMVPage}/>
                  </Switch>
                </div>
              </Col>
              <Col md="6">
                <div className="result">
                  <button> hi </button>
                </div>
              </Col>
            </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
