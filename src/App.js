import React, {useReducer} from 'react';
import './App.css';
import InputsComponent from './components/InputsComponent';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';
import InputContext from './context/Input-context';
import inputReducer from './reducers/inputReducer';
import Result from './components/Result';

function App() {

  const [input, inputDispatch] = useReducer(inputReducer, {});

  return (
      <>
      <Header/>
      <div className="App">
        <InputContext.Provider value={{input,inputDispatch}}>
          <Container>
              <Row>
                <Col sm={12} md={7} lg={7}>
                  <div className="main-content">
                    <InputsComponent/>
                  </div>
                </Col>
                <Col md={5} lg={5}>
                  <Result/>
                </Col>
              </Row>
          </Container>
        </InputContext.Provider>
      </div>
      </>
  );
}

export default App;
