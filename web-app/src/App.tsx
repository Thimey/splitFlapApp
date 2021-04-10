import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

import { publishDisplays } from './services/publishDisplays'
import { publishReset } from './services/publishReset'
import { publishEnableMotors } from './services/publishEnableMotors'
import { publishDisableMotors } from './services/publishDisableMotors'
import './App.css';
import { FlapInput } from './FlapInput'

const NUMBER_OF_SPLIT_FLAPS = 8

const useStyles = createUseStyles({
  splitFlapDisplay: {
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'text',
    '& > *': {
      marginLeft: 4,
      boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px'
    }
  },
  hide: {
    opacity: 0,
    position: 'absolute'
  },
  flapsFocused: {
    border: "1px solid"
  }
})

function App() {
  const classes = useStyles()
  const [displayInput, setDisplayInput] = useState('');
  const [delay, setDelay] = useState(500);
  const [displays, setDisplays] = useState<string[]>([])
  const [publishImmediately, setPublishImmediately] = useState(false);
  const [displayInputFocused, setDisplayInputFocused] = useState(false)

  const inputRef = React.useRef<HTMLTextAreaElement | null>(null)

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

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleOnInputEnter();
    }
  }

  return (
    <div className="App">
      <div
        className={classes.splitFlapDisplay}
        onClick={() => inputRef.current?.focus()}
      >
        {
          Array(NUMBER_OF_SPLIT_FLAPS).fill(null).map((_, i) => (
            <FlapInput
              character={displayInput[i]}
              blink={displayInputFocused && displayInput.length === i}
            />
          ))
        }
      </div>

      <textarea
        ref={inputRef}
        className={classes.hide}
        onFocus={() => setDisplayInputFocused(true)}
        onBlur={() => setDisplayInputFocused(false)}
        onKeyUp={handleInputKeyUp}
        onChange={handleInputChange}
        value={displayInput}
      />

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
