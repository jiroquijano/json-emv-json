import React, {useState} from 'react';
import './App.css';
import './components/InputObjectForm'
import InputObjectForm from './components/InputObjectForm';
import EMVResult from './components/EMVResult';
import JSONResult from './components/JSONResult';

function App() {
  const [resultJSON, setresultJSON] = useState('');
  const [resultEMV, setresultEMV] = useState('');

  return (
    <div className="App">
      <InputObjectForm setresultEMV={setresultEMV} setresultJSON={setresultJSON}/>
      <JSONResult resultJSON={resultJSON}/><br/>
      <EMVResult resultEMV={resultEMV}/>
    </div>
  );
}

export default App;
