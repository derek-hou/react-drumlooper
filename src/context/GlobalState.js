import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
  // allow us to pass the data down
  tracks: [
      {
          id: 1, 
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
          id: 2,
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
          ]
      //},
      // { id: 3, datakey: 68, keyboardKey: 'd', soundName: 'kick',
      //     beats: [
      //         { selected: false },
      //         { selected: false },
      //         { selected: false },
      //         { selected: false },
      //         { selected: false },
      //         { selected: false },
      //         { selected: false },
      //         { selected: false }
      //     ]
      }
  ],
  bpm: 60,
  drumloop: {},
  playButton: {},
  markers: [
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false },
    { selected: false }
  ]
}

// create context - bring this into other files and components to use it
export const GlobalContext = createContext(initialState);

// Provider component - so we can import into App.js
export const GlobalProvider = ({ children }) => { // children is destructured
  const [state, dispatch] = useReducer(AppReducer, initialState); // reducer uses dispatch
  
  // Add functions
  function toggleBeat(id, index, e) {
    dispatch({
        type: 'TOGGLE_BEAT',
        payload: {
            id: id,
            index: index,
            event: e
        }
    });

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
        console.log(e);
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

  function resetTab() {
    // check if the loop array is populated, if not add the tabs, else clear it
    if(state.tracks[0].beats.length === 0) {
        state.tracks[0].beats.forEach(tab => state.tracks[0].playSound.push(tab));
    } else { // reset
      while (state.tracks[0].playSound.length > 0) {
        state.tracks[0].playSound.pop();
      }
    }
  }
    
  function playLoop(e) {
    e.preventDefault();
    let j = 0;
    
    // checks if play button is already toggled to play
    if(e.target.classList.value.indexOf('toggle') < 0) {
      e.target.classList.add('toggle');
      resetTab();
      
      let intervalTime = 1000 * (60/state.bpm);
      //console.log(intervalTime);
  
      // setInterval
      state.drumloop = setInterval(function () {
        // loop through the inner array only 1 item at a time
        //console.log("KeyCode",state.tracks[0].datakey);
        if(state.tracks[0].beats[j].selected === true) {
          playSound(state.tracks[0].datakey);
        }

        if(state.tracks[1].beats[j].selected === true) {
          playSound(state.tracks[1].datakey);
        }

        //console.log(state.markers);
        state.markers = document.querySelectorAll('.markers > li');
        state.markers.forEach(marker => marker.addEventListener('transitionend', removeTransition));
        state.markers[j].classList.add('playing'); // add marker css
        
        //if we reach the end of the array, reset j back to zero
        if(j===state.markers.length-1) {
          j = 0;
        } else {
          j++;
        }
      }, intervalTime);
    }
  }
    
  function stopLoop (e) {
    e.preventDefault();
    
    if (state.drumloop) {
      state.playButton = document.querySelector('#play');
      state.playButton.classList.toggle('toggle');
      resetTab();
      clearInterval(state.drumloop);
      state.drumloop = null
      //console.log(drumloop);
    }
  }

  // value property uses an object
  return (
  <GlobalContext.Provider value={{ // allows for tracks to be passed to deeper components
          tracks: state.tracks,
          bpm: state.bpm,
          markers: state.markers,
          toggleBeat,
          playSound,
          removeTransition,
          playLoop,
          stopLoop
      }}>
      {children}
  </GlobalContext.Provider>);
}