import React, { createContext} from 'react';

const markerState = {
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
export const MarkerContext = createContext(markerState);

// Provider component - so we can import into App.js
export const MarkerProvider = ({ children }) => { // children is destructured
    const state = markerState;

    return (
    <MarkerContext.Provider value={{ // allows for tracks to be passed to deeper components
            markers: state.markers
        }}>
        {children}
    </MarkerContext.Provider>);
}