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
        <div className="main-content">
            <Container>
              <Row>
                <Col>
                  <Switch>
                    <Route path='/' exact component={JSONtoEMVPage}/>
                    <Route path='/emv-json' exact component={EMVtoJSONPage}/>
                    <Route path='/json-emv' exact component={JSONtoEMVPage}/>
                  </Switch>
                </Col>
              </Row>
            </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
