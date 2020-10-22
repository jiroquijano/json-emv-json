const {EMVParser} = require('./EMVParser');

test('simple EMV strings should be converted to objects properly',()=>{
    const simpleEMV = '0004simp';
    const parserUnderTest = new EMVParser(simpleEMV);
    expect(parserUnderTest.getObjectEquivalent()).toEqual({
        pfi: 'simp'
    });
});

test('EMV strings with multiple simple key data should be handled properly',()=>{
    const longSimpleEMV = '0004simp0102LE5203but6004many';
    const parserUnderTest = new EMVParser(longSimpleEMV);
    expect(parserUnderTest.getObjectEquivalent()).toEqual({
        pfi:'simp',
        pim:'LE',
        mcc:'but',
        merCity:'many'
    });
});

test('parser should be able to handle complex nested EMV string',()=>{
    const complexEMV = '28390007complex0106nested0306string0504test';
    const parserUnderTest = new EMVParser(complexEMV);
    expect(parserUnderTest.getObjectEquivalent()).toEqual({
        mait:{
            guid:'complex',
            acqid:'nested',
            merid:'string',
            pnflags:'test'
        }
    })
});