import React, { useState } from 'react';
import { publishDisplays } from './services/publishDisplays'
import { publishReset } from './services/publishReset'
import { publishEnableMotors } from './services/publishEnableMotors'
import { publishDisableMotors } from './services/publishDisableMotors'
import './App.css';

function App() {
  const [displayInput, setDisplayInput] = useState('');
  const [delay, setDelay] = useState(500);
  const [displays, setDisplays] = useState<string[]>([])
  const [publishImmediately, setPublishImmediately] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDisplayInput(e.target.value);
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => setDelay(Number(e.target.value));
  const handlePublishOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setPublishImmediately(e.target.checked);

  const handlePublishDisplays = (displaysToPublish: string[]) => {
    publishDisplays(displaysToPublish, delay);
    setDisplays([]);
  }

  const handleOnInputEnter = () => {
    const newDisplays = [...displays, displayInput];

    if (publishImmediately) {
      handlePublishDisplays(newDisplays);
    } else {
      setDisplays(newDisplays)
    }

    setDisplayInput('');
  }

  const handleReset = () => publishReset();
  const handleDisableMotors = () => publishDisableMotors();
  const handleEnableMotors = () => publishEnableMotors();

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleOnInputEnter();
    }
  }

  return (
    <div className="App">
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDisableMotors}>Disable Motors</button>
      <button onClick={handleEnableMotors}>Enable Motors</button>
      <input type="number" onChange={handleDelayChange} value={delay} />
      <textarea onKeyUp={handleInputKeyUp} onChange={handleInputChange} value={displayInput} />
      <input id='publish' type='checkbox' onChange={handlePublishOptionChange} checked={publishImmediately} />
      <label htmlFor='publish' >Publish on Enter</label>

      {
        !publishImmediately && (
          <button onClick={() => handlePublishDisplays(displays)}>Publish</button>
        )
      }
      <ul>
        {displays.map(display => <li>{display}</li>)}
      </ul>
    </div>
  );
}

export default App;
