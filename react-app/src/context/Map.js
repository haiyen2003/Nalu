import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const MapContext = React.createContext({ lat: 100, lng: 200 });

export function MapProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();
}
