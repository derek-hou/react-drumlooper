import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useEvent } from './useEvent';

export const KeyPad = () => {
    const { tracks } = useContext(GlobalContext);
    const { playSound } = useContext(GlobalContext);
    const { removeTransition } = useContext(GlobalContext);

    useEvent('keydown', playSound);
    useEvent('transitionend', removeTransition);

    return (
        <>
            <ul className="key-list">
                { tracks.map((track, index) => (<li data-key={track.datakey} key={index} className="key"><span>{track.keyboardKey}</span> <span className="sound">{track.soundName}</span></li>)) }
            </ul>

            { tracks.map((track, index) => (<audio data-key={track.datakey} key={index} src={track.src}></audio>)) }
        </>
    );
}