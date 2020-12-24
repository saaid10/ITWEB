import React from 'react'

import { DualNBack } from '../dual-n-back';

function Game() {
    return (
        <>
            <DualNBack />
            <div className="flex-center">
                <p>
                    Press "a" or left mouse on same Location
            </p>
                <p>
                    Press "l" or right mouse on same letter
            </p>
            </div>
        </>
    )
}

export default Game

