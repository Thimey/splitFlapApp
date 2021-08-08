import React from 'react'
import { createUseStyles } from 'react-jss'

import { publishReset } from './services/publishReset'
import { publishEnableMotors } from './services/publishEnableMotors'
import { publishDisableMotors } from './services/publishDisableMotors'

const useStyles = createUseStyles({})

export interface Props {
    delay: number
    setDelay: (delay: number) => void
    publishImmediately: boolean
    setPublishImmediately: (publishImmediately: boolean) => void
}

export const Options: React.FC<Props> = ({
    delay,
    setDelay,
    publishImmediately,
    setPublishImmediately,
}) => {
    const classes = useStyles()
    const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => setDelay(Number(e.target.value));
    const handlePublishOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setPublishImmediately(e.target.checked);

    return (
        <div>
            <button onClick={() => publishReset()}>Reset</button>
            <button onClick={() => publishDisableMotors()}>Disable Motors</button>
            <button onClick={() => publishEnableMotors()}>Enable Motors</button>
            <input type="number" onChange={handleDelayChange} value={delay} />
            <input id='publish' type='checkbox' onChange={handlePublishOptionChange} checked={publishImmediately} />
            <label htmlFor='publish' >Publish on Enter</label>
        </div>
    );
}
