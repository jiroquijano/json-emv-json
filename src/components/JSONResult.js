import React from 'react';

const JSONResult = ({resultJSON}) => (
    resultJSON &&
    <>
        <textarea className="jsonresult_textarea" readOnly value={resultJSON}/>
    </>
)

export default JSONResult;