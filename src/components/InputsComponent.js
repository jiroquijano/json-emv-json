import React from 'react';
import FormInput from './FormInput';
import {Tabs, Tab} from 'react-bootstrap';
import JSONInput from './JSONInput';
import {Container,Col} from 'react-bootstrap';
import EMVInput from './EMVInput';

const InputsComponent = () =>{
    return (
        <div className="json-emv-page">
            <Container>
                <Col>
                    <Tabs defaultActiveKey='form'>
                        <Tab eventKey='form' title="Form input">
                            <FormInput/>
                        </Tab>
                        <Tab eventKey='json' title="JSON input">
                            <JSONInput/>
                        </Tab>
                        <Tab eventKey='emv' title="EMV input">
                            <EMVInput/>
                        </Tab>
                    </Tabs>
                </Col>
            </Container>
        </div>
    )
}

export default InputsComponent;