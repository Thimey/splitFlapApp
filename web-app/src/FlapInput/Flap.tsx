import React from 'react';
import classnames from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    caseFrame: {
        border: '1px solid black',
        height: '100px',
        width: '50px',
    },
    noBlink: {
        fill: 'white',
    },
    '@keyframes blinker': {
        from: { fill: 'black' },
        to: { fill: 'white' }
    },
    blink: {
        fill: 'black',
        animationName: '$blinker',
        animationTimingFunction: 'unset',
        animationDuration: '0.530s',
        animationIterationCount: 'infinite',
    },
})

const scale = 0.5

const WIDTH = 100 * scale
const HEIGHT = 150 * scale
const X = 0
const Y = 0

const BORDER_X = 0.1 * WIDTH
const BORDER_TOP = 0.1 * HEIGHT
const BORDER_BOTTOM = 0.07 * HEIGHT
const FLAP_BORDER = 0.04 * WIDTH
const FLAP_GAP = 0.03 * WIDTH
const FLAP_WIDTH = WIDTH - 2 * (BORDER_X + FLAP_BORDER)
const FLAP_HEIGHT = (HEIGHT - FLAP_GAP - (2 * FLAP_BORDER) - BORDER_TOP - BORDER_BOTTOM) / 2

export interface Props {
    character: string
    blink: boolean
}

export const Flap: React.FC<Props> = ({ character, blink }) => {
    const classes = useStyles()

    return (
        <svg
            viewBox={`${X} ${Y} ${WIDTH} ${HEIGHT}`}
            width={WIDTH}
            height={HEIGHT}
        >
            {/* Outer box */}
            <rect
                x={X}
                y={Y}
                width={WIDTH}
                height={HEIGHT}
                style={{ fill: "rgb(11, 11, 11)" }}
            />
            {/* Inner box */}
            <rect
                x={X + BORDER_X}
                y={Y + BORDER_TOP}
                width={WIDTH - (2 * BORDER_X)}
                height={HEIGHT - BORDER_TOP - BORDER_BOTTOM}
                className={classnames({
                    [classes.noBlink]: !blink,
                    [classes.blink]: blink,
                })}
            // style={{ fill: focused ? '#e3e2df' : 'rgb(245, 245, 245)' }}
            />
            {/* Top flap */}
            <rect
                x={X + BORDER_X + FLAP_BORDER}
                y={Y + BORDER_TOP + FLAP_BORDER}
                width={FLAP_WIDTH}
                height={FLAP_HEIGHT}
            />
            {/* Bottom flap */}
            <rect
                x={X + BORDER_X + FLAP_BORDER}
                y={Y + BORDER_TOP + FLAP_BORDER + FLAP_HEIGHT + FLAP_GAP}
                width={FLAP_WIDTH}
                height={FLAP_HEIGHT}
            />
            {/* Character */}
            <text
                style={{
                    fill: "rgb(254, 254, 254)",
                    fontSize: `${0.9 * WIDTH}px`,
                    whiteSpace: "pre"
                }}
                x={X + (WIDTH / 2)}
                y={(Y + (HEIGHT / 2)) * 1.1}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {(character || '').toUpperCase()}
            </text>
        </svg>
    )
}

