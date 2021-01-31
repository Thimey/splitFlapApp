import React, { useState } from 'react';
import { setDisplay } from './services/setDisplay'
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setDisplay([input]);
      setInput('');
    }
  }


  return (
    <div className="App">
      <input onKeyUp={handleInputKeyUp} onChange={handleInputChange} value={input}></input>
    </div>
  );
}

export default App;
