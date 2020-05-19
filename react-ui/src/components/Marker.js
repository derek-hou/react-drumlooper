import React, { useContext } from 'react';
import { MarkerContext } from '../context/MarkerState';

export const Marker = () => {
    const { markers } = useContext(MarkerContext);

    return (
        <>
            <ul className="markers">
                { markers.map((marker, index) => <li key={index}></li>)}
            </ul>
        </>
    );
}