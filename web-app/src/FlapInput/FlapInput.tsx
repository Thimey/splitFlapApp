import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

import { Flap } from './Flap'

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

export interface Props {
    onDisplaySubmitted: (display: string) => void
}

export const FlapInput: React.FC<Props> = ({ onDisplaySubmitted }) => {
    const classes = useStyles()
    const [displayInput, setDisplayInput] = useState('');
    const [displayInputFocused, setDisplayInputFocused] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(0)
    const inputRef = React.useRef<HTMLTextAreaElement | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDisplayInput(e.target.value)
    }
    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            onDisplaySubmitted(displayInput);
            setDisplayInput('');
        }
        setCursorPosition(inputRef.current?.selectionStart || 0)
    }

    return (
        <>
            <div
                className={classes.splitFlapDisplay}
                onClick={() => inputRef.current?.focus()}
            >
                {
                    Array(NUMBER_OF_SPLIT_FLAPS).fill(null).map((_, i) => (
                        <Flap
                            key={i}
                            character={displayInput[i]}
                            blink={displayInputFocused && cursorPosition === i}
                        />
                    ))
                }
            </div>

            <textarea
                ref={inputRef}
                maxLength={NUMBER_OF_SPLIT_FLAPS}
                className={classes.hide}
                onFocus={() => setDisplayInputFocused(true)}
                onBlur={() => setDisplayInputFocused(false)}
                onKeyUp={handleInputKeyUp}
                onChange={handleInputChange}
                value={displayInput}
            />
        </>
    );
}
