import React, {useContext, useState} from 'react';
import InputContext from '../context/Input-context';
import {Container, Row, Col} from 'react-bootstrap';

const EMVInput = () => {
    const {inputDispatch} = useContext(InputContext);
    const [emvString, setEMVString] = useState('');

    const submitButtonHandler = (e) =>{
        const emvStringInput = emvString.replace(/(\r\n|\n|\r)/gm,"");
        inputDispatch({type:'UPDATE_EMV_INPUT',emv:emvStringInput});
    }

    return (
        <Container>
            <Row>
                <Col>
                    <textarea 
                        className="emv-json__textarea"
                        onChange={(e)=>setEMVString(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={submitButtonHandler} className="submit-button">submit</button>
                </Col>
            </Row>
        </Container>
    );
}

export default EMVInput;