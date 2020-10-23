const _ = require('lodash');
const {keyToIDMap} = require('./key-and-id-mapping');
const {crc16ccitt} = require('crc');

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

const calculateAndFormatCRC = (input) =>{
    const crc = crc16ccitt(`${input}6304`).toString(16).toUpperCase(); //[KEY][LENGTH] of CRC part of CRC payload
    const paddedCrc = _.padStart(crc,4,'0');
    return transformToEMVFormat('crc',paddedCrc);
}

const convertObjectToEMVCode = (input) =>{
    if(_.isEmpty(input)) return '';
    const mappedObject = _.mapKeys(input,(val,key)=>transformToEMVFormat(key,val));
    const emvString = Object.keys(mappedObject).join('');
    const crcString= calculateAndFormatCRC(emvString);
    return emvString+crcString;
}

module.exports = {transformToEMVFormat, convertObjectToEMVCode, calculateAndFormatCRC};