import React, {useState} from 'react';
import InputObjectForm from './InputObjectForm';
import EMVResult from './EMVResult';
import JSONResult from './JSONResult';
import {convertObjectToEMVCode} from '../lib/json-emv-conv';
import {Tabs, Tab} from 'react-bootstrap';

const JSONtoEMVPage = () =>{
    const [input, setInput] = useState({});
    return (
        <>
            <h1>JSON to EMV</h1>
            <Tabs defaultActiveKey='form'>
                <Tab eventKey='form' title="Form input">
                    <InputObjectForm setFormResult={setInput}/>
                </Tab>
                <Tab eventKey='json' title="JSON input">
                    JSON input
                </Tab>
            </Tabs>
            <JSONResult resultJSON={JSON.stringify(input)}/><br/>
            <EMVResult resultEMV={convertObjectToEMVCode(input)}/>
        </>
    )
}

export default JSONtoEMVPage;