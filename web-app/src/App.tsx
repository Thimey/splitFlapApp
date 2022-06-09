import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import './App.css';

import { publishDisplays } from './services/publishDisplays'
import { FlapInput } from './FlapInput'
import { Options } from './Options'

const useStyles = createUseStyles({})

function App() {
  const classes = useStyles()

  const [showOptions, setShowOptions] = useState(false);
  const [delay, setDelay] = useState(500);
  const [displays, setDisplays] = useState<string[]>([])
  const [publishImmediately, setPublishImmediately] = useState(true);

  // React.useEffect(() => {
  //   const savedState = localStorage.getItem('characterDisplays')

  //   if (savedState) {
  //     setDisplays(JSON.parse(savedState));
  //   }
  // }, [])

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
      <h2>Flap me</h2>

      <FlapInput onDisplaySubmitted={handleOnDisplaySubmitted} />

      <button onClick={() => setShowOptions(!showOptions)}>Options</button>

      {
        showOptions && (
          <Options
            delay={delay}
            publishImmediately={publishImmediately}
            setDelay={d => setDelay(d)}
            setPublishImmediately={p => setPublishImmediately(p)}
          />
        )
      }

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
