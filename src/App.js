import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { TrackList } from './components/TrackList';
import { KeyPad } from './components/KeyPad';

import { GlobalProvider } from './context/GlobalState';

function App() {

  return (
    <GlobalProvider>
      <Header />
      <KeyPad />
      <TrackList />
    </GlobalProvider>
  );
}

export default App;
