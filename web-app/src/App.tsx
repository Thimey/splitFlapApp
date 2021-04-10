import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

import { publishDisplays } from './services/publishDisplays'
import { publishReset } from './services/publishReset'
import { publishEnableMotors } from './services/publishEnableMotors'
import { publishDisableMotors } from './services/publishDisableMotors'
import './App.css';
import { FlapInput } from './FlapInput'

const NUMBER_OF_SPLIT_FLAPS = 8

const useStyles = createUseStyles({})

function App() {
  const classes = useStyles()
  const [delay, setDelay] = useState(500);
  const [displays, setDisplays] = useState<string[]>([])
  const [publishImmediately, setPublishImmediately] = useState(false);
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => setDelay(Number(e.target.value));
  const handlePublishOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setPublishImmediately(e.target.checked);

  const handlePublishDisplays = (displaysToPublish: string[]) => {
    publishDisplays(displaysToPublish, delay);
    setDisplays([]);
  }

  const handleOnDisplaySubmitted = (displayInput: string) => {
    const newDisplays = [...displays, displayInput];

    if (publishImmediately) {
      handlePublishDisplays(newDisplays);
    } else {
      setDisplays(newDisplays)
    }
  }

  return (
    <div className="App">

      <FlapInput onDisplaySubmitted={handleOnDisplaySubmitted} />

      <button onClick={() => publishReset()}>Reset</button>
      <button onClick={() => publishDisableMotors()}>Disable Motors</button>
      <button onClick={() => publishEnableMotors()}>Enable Motors</button>
      <input type="number" onChange={handleDelayChange} value={delay} />
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
