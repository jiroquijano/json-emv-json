const _ = require('lodash');
const {keyToIDMap} = require('./key-and-id-mapping');
const {crc16ccitt} = require('crc');

//Pads length string value when length is one digit
const padPayloadLength = (payload) =>{
    return payload.length < 10 ? `0${payload.length}` : payload.length;
}

const calculateAndFormatCRC = (input) =>{
    const crc = crc16ccitt(`${input}6304`).toString(16).toUpperCase(); //[KEY][LENGTH] of CRC part of CRC payload
    const paddedCrc = _.padStart(crc,4,'0');
    return transformToEMVFormat('crc',paddedCrc);
}

//EMV format: `[KEY][PAYLOAD LENGTH][PAYLOAD]`
const transformToEMVFormat = (key, payload) =>{
    if(typeof(payload) === 'string'){ //for simple string payload
        return `${keyToIDMap[key]}${padPayloadLength(payload)}${payload}`;
    }else if(typeof(payload) ==='object'){ //for nested array payload
        const rootkey = keyToIDMap[key];
        const aggregatedChildArray = payload.reduce((acc,curr)=>{
            return `${acc}${transformToEMVFormat(curr[0],curr[1])}`;
        },'');
        return `${rootkey}${padPayloadLength(aggregatedChildArray)}${aggregatedChildArray}`;
    }
}

const convertObjectToArray = (input)=>{ //transform object to array to guarantee order of fields
    const resultingArray = [];
    ['pfi','pim','mait','mcc','txCurrency','txAmt','cc','merName','merCity','additional'].forEach((key)=>{
        if(input[key]){
            if(key === 'mait'){
                const innerArray = [];
                ['guid','acqid','merid','pnflags'].forEach((innerKey)=>{
                    if(input[key][innerKey]){
                        innerArray.push([innerKey, input[key][innerKey]]);
                    }
                });
                resultingArray.push([key, innerArray])
            }else if(key === 'additional'){
                const innerArray = [];
                ['guidContext','refLabel','termLabel'].forEach((innerKey)=>{
                    if(input[key][innerKey]){
                        innerArray.push([innerKey, input[key][innerKey]]);
                    }
                });
                resultingArray.push([key, innerArray]);
            }else if(keyToIDMap[key] === undefined){
                console.log('invalid key');
            }else{
                resultingArray.push([key,input[key]]);
            }
        }
    });
    return resultingArray;
}

const convertObjectToEMVCode = (input) =>{
    if(_.isEmpty(input)) return '';
    const inputArray = convertObjectToArray(input); //to guarantee input field order (this is crucial for crc), transform object to array
    const emvString = inputArray.reduce((acc, curr)=>{
        return `${acc}${transformToEMVFormat(curr[0],curr[1])}`
    },'');
    const crcString = calculateAndFormatCRC(emvString);
    return emvString+crcString;
}

module.exports = {transformToEMVFormat, convertObjectToEMVCode, calculateAndFormatCRC};