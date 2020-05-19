import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
  // allow us to pass the data down
  tracks: [
    {
      id: 0, 
      datakey: 65, 
      keyboardKey: 'a', 
      soundName: 'clap',
      src: 'sounds/clap.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },        
    { 
      id: 1,
      datakey: 83,
      keyboardKey: 's',
      soundName: 'hihat',
      src: 'sounds/hihat.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 2,
      datakey: 68,
      keyboardKey: 'd',
      soundName: 'kick',
      src: 'sounds/kick.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 3,
      datakey: 70,
      keyboardKey: 'f',
      soundName: 'open hihat',
      src: 'sounds/openhat.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 4,
      datakey: 71,
      keyboardKey: 'g',
      soundName: 'boom',
      src: 'sounds/boom.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 5,
      datakey: 72,
      keyboardKey: 'h',
      soundName: 'ride',
      src: 'sounds/ride.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 6,
      datakey: 74,
      keyboardKey: 'j',
      soundName: 'snare',
      src: 'sounds/snare.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 7,
      datakey: 75,
      keyboardKey: 'k',
      soundName: 'tom',
      src: 'sounds/tom.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    },
    { id: 8,
      datakey: 76,
      keyboardKey: 'l',
      soundName: 'tink',
      src: 'sounds/tink.wav',
      beats: [
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false },
        { selected: false }
      ],
      playSound: []
    }
  ],
  bpm: 100,
  drumloop: null,
  isPlaying: false,
  playButton: null,
  markerIndex: 0
}

// create context - bring this into other files and components to use it
export const GlobalContext = createContext(initialState);

// Provider component - so we can import into App.js
export const GlobalProvider = ({ children }) => { // children is destructured
  const [state/*, dispatch*/] = useReducer(AppReducer, initialState); // reducer uses dispatch
  
  // Add functions
  function toggleBeat(id, index, e) {
    state.tracks[id].beats[index].selected = !state.tracks[id].beats[index].selected;
    // check if the beat has been toggled on the UI
    if(e.target) {
        e.target.classList.toggle('toggle');
    }
  }

  function playSound(e) {
    if(e.type === 'keydown') {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      //console.log(e.keyCode);
      if(!audio) { return } // if no audio, end the function
      audio.currentTime = 0; // resets the sound clip from the beginning
      audio.play(); // plays the sound
      key.classList.add('playing'); // finally add the class to the key that has been pressed
    } else {
      //const audio = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`);
      //console.log(e);
      const audio = document.querySelector(`audio[data-key="${e}"]`);
      if(!audio) { return } // if no audio, end the function
      audio.currentTime = 0; // resets the sound clip from the beginning
      audio.play(); // plays the sound
      //key.classList.add('playing'); // finally add the class to the key that has been pressed
    }
  }

  function removeTransition(e) {
    if(e.propertyName !== 'transform') { // filter out all the transitioned events that we don't want, we only want the transform property because that's the css property that changed
      return;
    }
    e.target.classList.remove('playing'); // remove the class from the key
  }

  // check if the loop array is populated, if not add the tabs, else clear it
  function resetTab() {
    // clap
    if(state.tracks[0].beats.length === 0) {
        state.tracks[0].beats.forEach(tab => state.tracks[0].playSound.push(tab));
    } else { // reset
      while (state.tracks[0].playSound.length > 0) {
        state.tracks[0].playSound.pop();
      }
    }

    // hihat
    if(state.tracks[1].beats.length === 0) {
      state.tracks[1].beats.forEach(tab => state.tracks[1].playSound.push(tab));
    } else { // reset
      while (state.tracks[1].playSound.length > 0) {
        state.tracks[1].playSound.pop();
      }
    }

    // kick
    if(state.tracks[2].beats.length === 0) {
      state.tracks[2].beats.forEach(tab => state.tracks[2].playSound.push(tab));
    } else { // reset
      while (state.tracks[2].playSound.length > 0) {
        state.tracks[2].playSound.pop();
      }
    }

    // open hihat
    if(state.tracks[3].beats.length === 0) {
      state.tracks[3].beats.forEach(tab => state.tracks[3].playSound.push(tab));
    } else { // reset
      while (state.tracks[3].playSound.length > 0) {
        state.tracks[3].playSound.pop();
      }
    }

    // boom
    if(state.tracks[4].beats.length === 0) {
      state.tracks[4].beats.forEach(tab => state.tracks[4].playSound.push(tab));
    } else { // reset
      while (state.tracks[4].playSound.length > 0) {
        state.tracks[4].playSound.pop();
      }
    }

    // ride
    if(state.tracks[5].beats.length === 0) {
      state.tracks[5].beats.forEach(tab => state.tracks[5].playSound.push(tab));
    } else { // reset
      while (state.tracks[5].playSound.length > 0) {
        state.tracks[5].playSound.pop();
      }
    }

    // snare
    if(state.tracks[6].beats.length === 0) {
      state.tracks[6].beats.forEach(tab => state.tracks[6].playSound.push(tab));
    } else { // reset
      while (state.tracks[6].playSound.length > 0) {
        state.tracks[6].playSound.pop();
      }
    }

    // tom
    if(state.tracks[7].beats.length === 0) {
      state.tracks[7].beats.forEach(tab => state.tracks[7].playSound.push(tab));
    } else { // reset
      while (state.tracks[7].playSound.length > 0) {
        state.tracks[7].playSound.pop();
      }
    }

    // tink
    if(state.tracks[8].beats.length === 0) {
      state.tracks[8].beats.forEach(tab => state.tracks[8].playSound.push(tab));
    } else { // reset
      while (state.tracks[8].playSound.length > 0) {
        state.tracks[8].playSound.pop();
      }
    }
  }

  function intervalUpdate(intervalTime, markerIndex) {
    // setInterval
    state.drumloop = setInterval(function () {
      // loop through the inner array only 1 item at a time
      //console.log("KeyCode",state.tracks[0].datakey);
      if(state.tracks[0].beats[markerIndex].selected === true) {
        playSound(state.tracks[0].datakey);
      }

      if(state.tracks[1].beats[markerIndex].selected === true) {
        playSound(state.tracks[1].datakey);
      }

      if(state.tracks[2].beats[markerIndex].selected === true) {
        playSound(state.tracks[2].datakey);
      }

      if(state.tracks[3].beats[markerIndex].selected === true) {
        playSound(state.tracks[3].datakey);
      }

      if(state.tracks[4].beats[markerIndex].selected === true) {
        playSound(state.tracks[4].datakey);
      }

      if(state.tracks[5].beats[markerIndex].selected === true) {
        playSound(state.tracks[5].datakey);
      }

      if(state.tracks[6].beats[markerIndex].selected === true) {
        playSound(state.tracks[6].datakey);
      }

      if(state.tracks[7].beats[markerIndex].selected === true) {
        playSound(state.tracks[7].datakey);
      }

      if(state.tracks[8].beats[markerIndex].selected === true) {
        playSound(state.tracks[8].datakey);
      }

      //console.log(state.markers);
      state.markers = document.querySelectorAll('.markers > li');
      state.markers.forEach(marker => marker.addEventListener('transitionend', removeTransition));
      state.markers[markerIndex].classList.add('playing'); // add marker css
      
      //if we reach the end of the array, reset markerIndex back to zero
      if(markerIndex === state.markers.length-1) {
        //state.markerIndex = 0;
        state.markerIndex = 0;       
        markerIndex = 0; 
      } else {
        state.markerIndex++;
        markerIndex++;
      }
    }, intervalTime);
  }

  function playLoop(e) {
    e.preventDefault();
    
    // checks if play button is already toggled to play
    if(state.isPlaying === false) {
      e.target.classList.add('toggle');
      resetTab();
      state.isPlaying = true;
      let intervalTime = 1000 * (60/state.bpm);
      intervalUpdate(intervalTime, state.markerIndex);
    }
  }
    
  function stopLoop (e) {
    e.preventDefault();
    if (state.isPlaying === true) {
      state.playButton = document.querySelector('#play');
      state.playButton.classList.remove('toggle');
      state.isPlaying = false;
      resetTab();
      state.markerIndex = 0;
      clearInterval(state.drumloop);
    }
  }

  function updateBPM(bpm, j) {
    // only perform this action if isPlaying
    if (state.isPlaying === true) {
      state.bpm = bpm;
      resetTab();
      clearInterval(state.drumloop);
      // this code is to create a new interval continuing where the BPM was changed
      let intervalTime = 1000 * (60/state.bpm);
      intervalUpdate(intervalTime, state.markerIndex);
    } else {
      state.bpm = bpm;
    }
  }

  // value property uses an object
  return (
  <GlobalContext.Provider value={{ // allows for tracks to be passed to deeper components
      tracks: state.tracks,
      bpm: state.bpm,
      toggleBeat,
      playSound,
      removeTransition,
      playLoop,
      stopLoop,
      updateBPM
    }}>
    {children}
  </GlobalContext.Provider>);
}