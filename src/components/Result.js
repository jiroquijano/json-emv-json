import React, {useState, useContext, useEffect, useRef} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import InputContext from '../context/Input-context'
import {convertObjectToEMVCode} from '../lib/json-emv-conv';
import QrCode from 'qrcode';

const Result = () => {
    const {input} = useContext(InputContext);
    const [select, setSelect] = useState('emv');
    const [output, setOutput] = useState('');
    const qrCanvas = useRef(null);

    useEffect(()=>{
        if(input.emv){

        }
    },[input.emv,select]);

    useEffect(()=>{
        if(input.json){
            if(select === 'json'){
                setOutput(input.json);
            }else if(select==='emv'){
                setOutput(convertObjectToEMVCode(JSON.parse(input.json)));
            }else if(select==='qr'){
                QrCode.toCanvas(qrCanvas.current, convertObjectToEMVCode(JSON.parse(input.json)), (error)=>console.log(error))
            }
        }
    },[input.json,select]);

    const onSelectChange = (e) =>{
        setSelect(e.target.value);
    }

    return (
        <div className="result">
            <Container>
                <Row className="result__header">
                    <Col>
                        <p>{"> OUTPUT"}</p>
                    </Col>
                    <Col>
                        <select value={select} onChange={onSelectChange} className="result__select">
                            <option value='emv'>EMV</option>
                            <option value='json'>JSON</option>
                            <option value='qr'>QR</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col className="result-output">
                        {
                            select === 'qr' ? (
                                <canvas className="result-output__qr" ref={qrCanvas}/>
                            ):(
                                <textarea className="result-output__text" value={output}/>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Result;