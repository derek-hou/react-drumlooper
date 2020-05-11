import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Beat = ({ id, datakey, index, selected }) => {
  const { toggleBeat } = useContext(GlobalContext);

  return (
    <>
      <li data-key={datakey} onClick={(event) => toggleBeat(id, index, event)} className={selected === true ? 'beat toggle' : 'beat'}></li>
    </>
  );
}