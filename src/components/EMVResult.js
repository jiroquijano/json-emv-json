import React,{useRef} from 'react';
import QrCode from 'qrcode';

const EMVResult = ({resultEMV}) => {
    const qrCanvas = useRef(null);

    const generateQRHandler = () => {
        QrCode.toCanvas(qrCanvas.current,resultEMV,(error)=>{
            if(error) console.log(error);
        });
    };

    return (
        resultEMV && (
        <>
            <textarea readOnly value={resultEMV}/><br/>
            <button onClick={generateQRHandler}>Generate QR</button><br/>
            <canvas ref={qrCanvas}/>
        </>
        )
    )
}

export default EMVResult;