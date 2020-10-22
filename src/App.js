import React, {useState,useRef} from 'react';
import './App.css';
import './components/InputObjectForm'
import InputObjectForm from './components/InputObjectForm';
import EMVResult from './components/EMVResult';

function App() {
  const [resultJSON, setresultJSON] = useState('');
  const [resultEMV, setresultEMV] = useState('');
  const qrCanvas = useRef(null);

  return (
    <div className="App">
      <InputObjectForm setresultEMV={setresultEMV} setresultJSON={setresultJSON}/>
      {
        resultJSON && 
        <>
          <textarea readOnly value={resultJSON}/><br/>
        </>
      }
      <EMVResult resultEMV={resultEMV}/>
    </div>
  );
}

export default App;
