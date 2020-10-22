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
            <textarea className="emvresult_textarea" readOnly value={resultEMV}/><br/>
            <button className="emvresult_button" onClick={generateQRHandler}>Generate QR</button><br/>
            <canvas className="emvresult_canvas" ref={qrCanvas}/>
        </>
        )
    )
}

export default EMVResult;