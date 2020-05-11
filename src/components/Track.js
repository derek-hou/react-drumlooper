import React from 'react';
//import { GlobalContext } from '../context/GlobalState';
import { Beat } from "./Beat";

export const Track = ({ track }) => {
  return (
      <>
        <li>
            <kbd>{track.keyboardKey}</kbd>
            <span className="sound">{track.soundName}</span>
            <ul className="beats">
              { track.beats.map((beat, index) => (<Beat id={track.id} key={index} index={index} datakey={track.datakey} selected={track.beats[index]} />))}
            </ul>
        </li>
      </>
  );
}
