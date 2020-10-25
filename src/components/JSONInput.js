import React, {useState,useContext} from 'react';
import InputContext from '../context/Input-context';
import {Container, Col, Row} from 'react-bootstrap'

const JSONInput = () => {
    const [text, setText] = useState('');
    const {inputDispatch} = useContext(InputContext);

    const submitButtonHandler = () =>{
        try{
            const inputJSON = text.replace(/(\r\n|\n|\r)/gm,"");
            JSON.parse(inputJSON);
            inputDispatch({type:'UPDATE_JSON_INPUT', json:inputJSON});
        }catch(e){
            alert(`Invalid JSON input\nsample valid JSON:\n    {\n    "validjson":"lykdis"\n    }`);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <textarea className="json-input__textarea" value={text} onChange={(e)=>setText(e.target.value)}/><br/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button className="submit-button" onClick={submitButtonHandler}>submit</button>
                </Col>
            </Row>
        </Container>
    )
}

export default JSONInput;