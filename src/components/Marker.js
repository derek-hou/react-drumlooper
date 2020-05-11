import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Marker = () => {
    const { markers } = useContext(GlobalContext);

    return (
        <>
            <ul className="beats">
                { markers.map((mark, index) => (<li key={index} selected={mark.selected}></li>))}
            </ul>
        </>
    );
}