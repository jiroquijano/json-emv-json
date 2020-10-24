import React,{useState, useContext} from 'react';
import {Collapse, Button} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import InputContext from '../context/Input-context';

const InputObjectForm = () =>{
    const {inputDispatch} = useContext(InputContext);

    const [pfi,setpfi] = useState('');
    const [pim,setpim] = useState('');
    const [maitVisibility, setMaitVisibility] = useState(false);
    const [guid, setguid] = useState('');
    const [acqid, setacqid] = useState('');
    const [merid, setmerid] = useState('');
    const [pnf, setpnf] = useState('');
    const [mcc, setmcc] = useState('');
    const [txCurrency, settxcurrency] = useState('');
    const [txAmt, settxamt] = useState('');
    const [cc, setcc] = useState('');
    const [merName, setmername] = useState('');
    const [merCity, setmercity] = useState('');
    const [addVisibility, setAddVisibility] = useState(false);
    const [refLabel, setreflabel] = useState('');
    const [termLabel, settermlabel] = useState('');

    const handleMerchantInfoClick = () => {
        setguid('');
        setacqid('');
        setmerid('');
        setpnf('');
        setMaitVisibility(!maitVisibility);
    }

    const handleAdditionalDataCollapse = () =>{
        setreflabel('');
        settermlabel('');
        setAddVisibility(!addVisibility);
    }

    const onSubmitHandler = (e) => {
      e.preventDefault();
      const EMVObject = constructObject();
      inputDispatch({type:'UPDATE_JSON_INPUT',json: JSON.stringify(EMVObject)})
    }

    const constructObject = () =>{
        const EMVObject = {};
        [['pfi',pfi], ['pim',pim],['guid',guid], ['acqid',acqid], ['merid',merid], ['pnflags',pnf], ['mcc',mcc],
        ['txCurrency',txCurrency], ['txAmt',txAmt], ['cc',cc], ['merName',merName], ['merCity',merCity],
        ['refLabel',refLabel], ['termLabel',termLabel]
        ].forEach((item)=>{ //ITEM[0] IS THE KEY!
            if(item[1]) {
                if(['guid','acqid','merid','pnflags'].includes(item[0])){ //put under mait object of EMVObject
                    const childObject = {};
                    childObject[item[0]] = item[1];
                    EMVObject['mait'] = {...EMVObject['mait'], ...childObject}
                }else if(['refLabel', 'termLabel'].includes(item[0])){ //put under additional object of EMVObject
                    const childObject = {};
                    childObject[item[0]] = item[1];
                    EMVObject['additional'] = {...EMVObject['additional'], ...childObject}
                }else{
                    EMVObject[item[0]] = item[1];
                }
            }
        });
        return EMVObject;
    }

    return (
        <Container>
            <form onSubmit={onSubmitHandler}>
                <br/>
                <Row>
                    <Col>
                    <label>
                        <div className="input-form__label">
                            Payload Format Indicator:
                        </div>
                        <input type='text' placeholder='' required minLength={2} maxLength={2}
                        value={pfi} onChange={(e)=>setpfi(e.target.value)}
                        />
                    </label>
                    </Col>
                    <Col>
                    <label>
                        <div className="input-form__label">
                            Point of Initiation Method:
                        </div>
                        <select onChange={(e)=>setpim(e.target.value)}>
                            <option value=''>--</option>
                            <option value='11'>11 - Static</option>
                            <option value='12'>12 - Dynamic</option>
                        </select>
                    </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <div className="input-form__label--expand">
                                P2M Merchant Account Information Template
                            </div>
                            <Button size="sm"
                                onClick={handleMerchantInfoClick}
                                aria-controls="mait-collapsible"
                                aria-expanded={maitVisibility}
                            >
                                {maitVisibility ? 'x' : 'expand'}
                            </Button>
                            <Collapse in={maitVisibility}>
                                <div id="mait-collapsible">
                                    {
                                    maitVisibility && (
                                        <div className="form-input__expanded">
                                            <label>
                                                <div className="input-form__label">
                                                    Globally Unique Identifier:
                                                </div>
                                                <input type='text' required minLength={12} maxLength={12}
                                                value={guid} onChange={(e)=>setguid(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                <div className="input-form__label">
                                                    Acquirer ID:
                                                </div>
                                                <input type='text' required minLength={11} maxLength={11}
                                                value={acqid} onChange={(e)=>setacqid(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                <div className="input-form__label">
                                                    Merchant ID:
                                                </div>
                                                <input type='text' maxLength={25}
                                                value={merid} onChange={(e)=>setmerid(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                <div className="input-form__label">
                                                    Proxy-Notify flags:
                                                </div>
                                                <input type='text' required minLength={3} maxLength={3}
                                                value={pnf} onChange={(e)=>setpnf(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </Collapse>
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <div className="input-form__label">
                                Merchant Category Code:
                            </div>
                            <input type='text' required minLength={4} maxLength={4}
                            value={mcc} onChange={(e)=>setmcc(e.target.value)}
                            />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <div className="input-form__label">
                                Transaction Currency:
                            </div>
                            <input type='text' required minLength={3} maxLength={3}
                            value={txCurrency} onChange={(e)=>settxcurrency(e.target.value)}
                            />
                        </label>
                    </Col>
                    <Col>
                        <label>
                            <div className="input-form__label">
                                Transaction Amount:
                            </div>
                            <input type='text' maxLength={13}
                            value={txAmt} onChange={(e)=>settxamt(e.target.value)}
                            />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <div className="input-form__label">
                                Country Code:
                            </div>
                            <input type='text' required minLength={2} maxLength={2}
                            value={cc} onChange={(e)=>setcc(e.target.value)}
                            />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <div className="input-form__label">
                                Merchant Name:
                            </div>
                            <input type='text' required maxLength={25}
                            value={merName} onChange={(e)=>setmername(e.target.value)}
                            />
                        </label>
                    </Col>
                    <Col>
                        <label>
                            <div className="input-form__label">
                                Merchant City:
                            </div>
                            <input type='text' required maxLength={15}
                            value={merCity} onChange={(e)=>setmercity(e.target.value)}
                            />
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>
                            <div className="input-form__label--expand">
                                Additional Data Field Template
                            </div>
                            <Button size="sm"
                                onClick={handleAdditionalDataCollapse}
                                aria-controls="additional-collapsible"
                                aria-expanded={addVisibility}
                            >
                                {addVisibility ? 'x' : 'expand'}
                            </Button>
                            <Collapse in={addVisibility}>
                                <div id="additional-collapsible">
                                    {
                                    addVisibility && (
                                        <div className="form-input__expanded">
                                            <label>
                                                <div className="input-form__label">
                                                    Reference Label:
                                                </div>
                                                <input type='text' required maxLength={25}
                                                value={refLabel} onChange={(e)=>setreflabel(e.target.value)}
                                                />
                                            </label>
                                            <label>
                                                <div className="input-form__label">
                                                    Terminal Label:
                                                </div>
                                                <input type='text' maxLength={8}
                                                value={termLabel} onChange={(e)=>settermlabel(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>            
                            </Collapse>
                        </label>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col >
                        <button className="submit-button">submit</button>
                    </Col>
                </Row>
            </form>
        </Container>
    )
}

export default InputObjectForm;