import React from 'react';
import {isEmpty} from 'lodash'

const JSONResult = ({resultJSON}) => (
    (isEmpty(resultJSON)) &&
    <>
        <textarea className="jsonresult_textarea" readOnly value={resultJSON}/>
    </>
)

export default JSONResult;