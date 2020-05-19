import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { TrackList } from './components/TrackList';
import { KeyPad } from './components/KeyPad';
import { Marker } from './components//Marker';

import { GlobalProvider } from './context/GlobalState';

function App() {

  return (
    <GlobalProvider>
      <Header />
      <KeyPad />
      <Marker />
      <TrackList />
    </GlobalProvider>
  );
}

export default App;
