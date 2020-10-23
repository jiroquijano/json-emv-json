import React, {useState,useEffect} from 'react';

const JSONInput = ({setJSONInput}) => {
    const [text, setText] = useState('');
    const parseButtonHandler = () =>{
        try{
            const object = JSON.parse(text.replace(/(\r\n|\n|\r)/gm,""));
            setJSONInput(object);
        }catch(e){
            alert(`${e.message}\nsample valid JSON input:\n{"jiro":"pogi"}`);
        }
    }

    return (
        <>
            <textarea value={text} onChange={(e)=>setText(e.target.value)}/><br/>
            <button onClick={parseButtonHandler}>parse</button>
        </>
    )
}

export default JSONInput;