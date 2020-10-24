import React from 'react';
import InputObjectForm from './InputObjectForm';
import {Tabs, Tab} from 'react-bootstrap';
import JSONInput from './JSONInput';
import {Container,Col} from 'react-bootstrap';

const JSONtoEMVPage = () =>{
    return (
        <div className="json-emv-page">
            <Container>
                <Col>
                    <Tabs defaultActiveKey='form'>
                        <Tab eventKey='form' title="Form input">
                            <InputObjectForm/>
                        </Tab>
                        <Tab eventKey='json' title="JSON input">
                            <JSONInput/>
                        </Tab>
                    </Tabs>
                </Col>
            </Container>
        </div>
    )
}

export default JSONtoEMVPage;