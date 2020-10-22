import React,{useState} from 'react';
import {convertObjectToEMVCode} from '../lib/json-emv-conv';

const InputObjectForm = () =>{
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

    const formSubmitHandler = (e) => {
        e.preventDefault();
        const EMVObject = constructObject();
        console.log(convertObjectToEMVCode(EMVObject));
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <label>
                Payload Format Indicator:
                <input type='text' placeholder='' required minLength={2} maxLength={2}
                value={pfi} onChange={(e)=>setpfi(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Point of Initiation Method:
                <select onChange={(e)=>setpim(e.target.value)}>
                    <option value=''>--</option>
                    <option value='11'>11 - Static</option>
                    <option value='12'>12 - Dynamic</option>
                </select>
            </label>
            <br/>
            <label>
                P2M Merchant Account Information Template
                <input type="checkbox" onChange={(e)=>setMaitVisibility(!maitVisibility)}/>
                {
                    maitVisibility ? (
                        <div>
                            <label>
                                Globally Unique Identifier:
                                <input type='text' required minLength={12} maxLength={12}
                                value={guid} onChange={(e)=>setguid(e.target.value)}
                                />
                            </label>
                            <label>
                                Acquirer ID:
                                <input type='text' required minLength={11} maxLength={11}
                                value={acqid} onChange={(e)=>setacqid(e.target.value)}
                                />
                            </label>
                            <label>
                                Merchant ID:
                                <input type='text' maxLength={25}
                                value={merid} onChange={(e)=>setmerid(e.target.value)}
                                />
                            </label>
                            <label>
                                Proxy-Notify flags:
                                <input type='text' required minLength={3} maxLength={3}
                                value={pnf} onChange={(e)=>setpnf(e.target.value)}
                                />
                            </label>
                        </div>
                    ) : <br/>
                }
            </label>
            <label>
                Merchant Category Code:
                <input type='text' required minLength={4} maxLength={4}
                value={mcc} onChange={(e)=>setmcc(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Transaction Currency:
                <input type='text' required minLength={3} maxLength={3}
                value={txCurrency} onChange={(e)=>settxcurrency(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Transaction Amount:
                <input type='text' maxLength={13}
                value={txAmt} onChange={(e)=>settxamt(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Country Code:
                <input type='text' required minLength={2} maxLength={2}
                value={cc} onChange={(e)=>setcc(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Merchant Name:
                <input type='text' required maxLength={25}
                value={merName} onChange={(e)=>setmername(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Merchant City:
                <input type='text' required maxLength={15}
                value={merCity} onChange={(e)=>setmercity(e.target.value)}
                />
            </label>
            <br/>
            <label>
                Additional Data Field Template:
                <input type="checkbox" onChange={(e)=>setAddVisibility(!addVisibility)}/>
                {
                    addVisibility ? (
                        <div>
                            <label>
                                Reference Label:
                                <input type='text' required maxLength={25}
                                value={refLabel} onChange={(e)=>setreflabel(e.target.value)}
                                />
                            </label>
                            <label>
                                Terminal Label:
                                <input type='text' maxLength={8}
                                value={termLabel} onChange={(e)=>settermlabel(e.target.value)}
                                />
                            </label>
                        </div>
                    ) : <br/>
                }
            </label>
            <button>Generate</button>
        </form>
    )
}

export default InputObjectForm;