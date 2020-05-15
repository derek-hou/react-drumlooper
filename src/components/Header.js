import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
  // hook
  const [bpm, setBPM] = useState(60);
  const { playLoop } = useContext(GlobalContext);
  const { stopLoop } = useContext(GlobalContext);

  return (
    <div className="header">
      <header className="App-header">
        <h1>Drum Looper</h1>
        <button id="play" onClick={(e) => playLoop(e)}>►</button>
        <button id="stop" onClick={(e) => stopLoop(e)}>◼</button>
        <form name="bpmForm">
          <label htmlFor="bpm">BPM</label>
          <input id="bpm" type="number" value={bpm} onChange={(e) => setBPM(e.target.value)} name="bpm" placeholder="120" />
        </form>
      </header>
    </div>
  );
}