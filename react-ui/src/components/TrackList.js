import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Track } from "./Track";

export const TrackList = () => {
    const { tracks } = useContext(GlobalContext);
    //console.log(track)
    return (
        <>  
            <ul className="track-list">
                { tracks.map(track => (<Track key={track.id} track={track} />))}
            </ul>
        </>
    );
}
