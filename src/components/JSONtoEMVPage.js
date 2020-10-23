import React, {useState} from 'react';
import InputObjectForm from './InputObjectForm';
import EMVResult from './EMVResult';
import JSONResult from './JSONResult';
import {convertObjectToEMVCode} from '../lib/json-emv-conv';

const JSONtoEMVPage = () =>{
    const [input, setInput] = useState({});
    return (
        <>
            <h1>JSON to EMV</h1>
            <InputObjectForm setFormResult={setInput}/>
            <JSONResult resultJSON={JSON.stringify(input)}/><br/>
            <EMVResult resultEMV={convertObjectToEMVCode(input)}/>
        </>
    )
}

export default JSONtoEMVPage;