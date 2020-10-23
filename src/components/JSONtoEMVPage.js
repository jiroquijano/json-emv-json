import React, {useState} from 'react';
import InputObjectForm from './InputObjectForm';
import EMVResult from './EMVResult';
import JSONResult from './JSONResult';
import {convertObjectToEMVCode} from '../lib/json-emv-conv';
import {Tabs, Tab} from 'react-bootstrap';
import {isEmpty} from 'lodash';
import {Button} from 'react-bootstrap';
import JSONInput from './JSONInput';

const JSONtoEMVPage = () =>{
    const [input, setInput] = useState({});
    return (
        <>
            <Tabs defaultActiveKey='form'>
                <Tab eventKey='form' title="Form input">
                    <InputObjectForm setFormInput={setInput}/>
                </Tab>
                <Tab eventKey='json' title="JSON input">
                    <JSONInput setJSONInput={setInput}/>
                </Tab>
            </Tabs>
            {
                (!isEmpty(input)) && (
                    <>
                        <Button>
                            Generate JSON
                        </Button>
                        <Button>
                            Generate EMV
                        </Button>
                    </>
                )
            }
            <JSONResult resultJSON={JSON.stringify(input)}/><br/>
            <EMVResult resultEMV={convertObjectToEMVCode(input)}/>
        </>
    )
}

export default JSONtoEMVPage;