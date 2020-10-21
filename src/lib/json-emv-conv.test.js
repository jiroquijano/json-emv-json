const {transformToEMVFormat, convertObjectToEMVCode} = require('./json-emv-conv');
const {keyToIDMap} = require('./key-and-id-mapping');

const padPayloadLength = (payload) =>{
    return payload.length < 10 ? `0${payload.length}` : payload.length;
}

test('should be able to process simple key-value pair strings to EMV format', ()=>{
    const keyValuePairArray = [
        ['pfi','test'], ['pim', 'test'], ['mait','test'], ['guid','testing'],
        ['acqid','test'], ['merid','jiro'], ['pnflags','pogi'], ['mcc','test'],
        ['txCurrency','test'], ['txAmt','test'], ['cc','test'], ['merName','test'],
        ['merCity','test'], ['additional','test'], ['refLabel','test'], ['termLabel','test'], ['crc','test']
    ];
    keyValuePairArray.forEach((pairItem)=>{
        const emvFormatString = transformToEMVFormat(pairItem[0], pairItem[1]);
        expect(emvFormatString).toEqual(`${keyToIDMap[pairItem[0]]}${padPayloadLength(pairItem[1])}${pairItem[1]}`);
    });
});

test('should be able to translate nested object payload to EMV formatted string',()=>{
    //note: crc to be included in emv code format result
    const nestedObject = {
        mait:{                  //28 32
            guid: '1234',           //00 04 1234
            acqid: '56789',         //01 05 56789
            merid: 'abcd',          //03 04 abcd
            pnflags: '310'          //05 03 310
        }
    };
    const generatedEMVCode = convertObjectToEMVCode(nestedObject);
    expect(generatedEMVCode).toEqual('2832000412340105567890304abcd0503310');
});

test('should be able to translate complex object (simple + nested) input to EMV formatted string', ()=>{
    const complexObject = {
        pfi: 'hey',             //00 03 hey
        mait: {                 //28 36
            guid: 'black',          //00 05 black
            acqid: 'pink',          //01 04 pink
            merid: 'in.your',       //03 07 in.your
            pnflags: 'area'         //05 04 area
        }
    }
    const generatedEMVCode = convertObjectToEMVCode(complexObject);
    expect(generatedEMVCode).toEqual('0003hey28360005black0104pink0307in.your0504area');
});