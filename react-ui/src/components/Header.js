import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Header = () => {
  // hook
  const { bpm } = useContext(GlobalContext);
  const [modelBPM, setBPM] = useState(bpm);
  const { playLoop } = useContext(GlobalContext);
  const { stopLoop } = useContext(GlobalContext);
  const { updateBPM } = useContext(GlobalContext);
  
  const onSubmit = e => {
    e.preventDefault();
    
    const newBPM = parseInt(modelBPM);

    //console.log(newBPM);
    updateBPM(newBPM);
  }

  return (
    <div className="header">
      <header className="app-header">
        <h1>Drum Looper</h1>
      </header>
      <nav>
        <div className="buttons">
          <button id="play" onClick={(e) => playLoop(e)}>►</button>
          <button id="stop" onClick={(e) => stopLoop(e)}>◼</button>
        </div>
        <form name="bpmForm" onSubmit={onSubmit}>
          <label htmlFor="bpm">BPM</label>
          <input id="bpm" type="number" value={modelBPM} onChange={(e) => setBPM(e.target.value)} name="bpm" placeholder="120" />
          <button type="submit">Submit</button>
        </form>
      </nav>
    </div>
  );
}