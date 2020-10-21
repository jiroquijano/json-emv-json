const _ = require('lodash');
const {keyToIDMap} = require('./key-and-id-mapping');

//Pads length string value when length is one digit
const padPayloadLength = (payload) =>{
    return payload.length < 10 ? `0${payload.length}` : payload.length;
}

//EMV format: `[KEY][PAYLOAD LENGTH][PAYLOAD]`
const transformToEMVFormat = (key, payload) =>{
    if(typeof(payload) === 'string'){ //for simple string payload
        return `${keyToIDMap[key]}${padPayloadLength(payload)}${payload}`;
    }else if(typeof(payload) ==='object'){ //for nested object payload
        const rootkey = keyToIDMap[key];
        const mappedChildObject = _.mapKeys(payload,(_val,_key)=>transformToEMVFormat(_key,_val));
        const aggregatedChildObjectKeys = Object.keys(mappedChildObject).join('');
        return `${rootkey}${padPayloadLength(aggregatedChildObjectKeys)}${aggregatedChildObjectKeys}`;
    }
};

const convertObjectToEMVCode = (input) =>{
    const mappedObject = _.mapKeys(input,(val,key)=>transformToEMVFormat(key,val));
    const emvString = Object.keys(mappedObject).join('');
    console.log(emvString);
    //todo: add CRC
    return emvString;
}

module.exports = {transformToEMVFormat, convertObjectToEMVCode};

var obj = {pfi:'bla',mait:{guid:'1234567890',acqid:'01',merid:'c',pnflags:'d'},acqid:'last'}
convertObjectToEMVCode(obj);