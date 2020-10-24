import React, {useReducer} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import JSONtoEMVPage from './components/JSONtoEMVPage';
import EMVtoJSONPage from './components/EMVtoJSONPage';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import InputContext from './context/Input-context';
import inputReducer from './reducers/inputReducer';
import Result from './components/Result';

function App() {

  const [input, inputDispatch] = useReducer(inputReducer, {});

  return (
    <Router>
      <Header/>
      <div className="App">
        <InputContext.Provider value={{input,inputDispatch}}>
          <Container>
              <Row>
                <Col sm={12} md={7} lg={7}>
                  <div className="main-content">
                    <Switch>
                      <Route path='/' exact component={JSONtoEMVPage}/>
                      <Route path='/emv-json' exact component={EMVtoJSONPage}/>
                      <Route path='/json-emv' exact component={JSONtoEMVPage}/>
                    </Switch>
                  </div>
                </Col>
                <Col md={5} lg={5}>
                  <Result/>
                </Col>
              </Row>
          </Container>
        </InputContext.Provider>
      </div>
    </Router>
  );
}

export default App;
