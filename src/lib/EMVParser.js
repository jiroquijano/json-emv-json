const {getKeyFromID} = require('./key-and-id-mapping');
const _ = require('lodash');


/* ===============================================EMV Parser===============================================
    A Class whose purpose in life is to parse EMV strings to JS objects and gives you warm hugs

    Usage:
    1. instantiate class ---- e.g. const parser = new EMVParser(EMVString,keyshift)
        constructor parameters:
            EMVString : the string that will be parsed into an object
            keyshift : defaults to 0, used for id-key mapping in case of nested EMV structure
    2. get the constructed object ---- e.g. parser.getObjectEquivalent()
    3. carry on
    ========================================================================================================
*/
class EMVParser{
    constructor(EMVString, keyshift=0){
        this.emvString = EMVString;
        this.keyshift=keyshift;
        this.cursor = 0;
        this.currentKey = '';
        this.currentPayloadLength='';
        this.currentPayload='';
        this.objectEquivalent = {};
        this.nestedObject = {};
        this.triggerParsing();
    }

    getObjectEquivalent(){
        return this.objectEquivalent;
    }

    parseKey(){
        this.currentKey = getKeyFromID(this.emvString.slice((+this.cursor), (+this.cursor)+2), this.keyshift);
        this.cursor += 2;
    }

    parseLength(){
        this.currentPayloadLength = this.emvString.slice((+this.cursor), (+this.cursor)+2);
        this.cursor +=2;
    }

    parsePayload(){
        this.currentPayload = this.emvString.slice(this.cursor, (+this.cursor)+ (+this.currentPayloadLength))
        this.cursor+=(+this.currentPayloadLength);
        if(['mait','additional'].includes(this.currentKey)){
            const subParser = new EMVParser(this.currentPayload, 1); //keyshift is 1 because of id to key mapping
            subParser.triggerParsing();
            this.nestedObject = {...subParser.getObjectEquivalent()};
        }
    }

    updateEquivalentObject(){
        const newEntry = {};
        if(!_.isEmpty(this.nestedObject)){
            newEntry[this.currentKey] = {...this.nestedObject};
            this.objectEquivalent = {
                ...this.objectEquivalent,
                ...newEntry
            }
            this.nestedObject = {};
        }else{
            newEntry[this.currentKey] = this.currentPayload;
            
            this.objectEquivalent = {
                ...this.objectEquivalent,
                ...newEntry
            }
        }
    }

    triggerParsing(){
        while(this.cursor < this.emvString.length){
            this.parseKey();
            this.parseLength();
            this.parsePayload();
            this.updateEquivalentObject();
        }
    }
}

const parser = new EMVParser('00020101021128500011ph.ppmi.p2m0111PAPHPHM1XXX030910040313105033105204601653036085802PH5910MYFOODHALL6011MANDALUYONG624105253CF64D20941AAEFCE8C263A7A070800000000630485A6');
console.log(parser.getObjectEquivalent());
