import React, { useState } from 'react';
import { publishDisplays } from './services/publishDisplays'
import './App.css';

function App() {
  const [displayInput, setDisplayInput] = useState('');
  const [displays, setDisplays] = useState<string[]>([])
  const [publishImmediately, setPublishImmediately] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDisplayInput(e.target.value);
  const handlePublishOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setPublishImmediately(e.target.checked);

  const handlePublishDisplays = (displaysToPublish: string[]) => {
    publishDisplays(displaysToPublish);
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

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleOnInputEnter();
    }
  }

  return (
    <div className="App">
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
