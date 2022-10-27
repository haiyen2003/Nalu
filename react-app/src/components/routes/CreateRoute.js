import {useMemo} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import './route.css'

export default function CreateRoute(){

    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyB9rT8_t5kN8igvKToa5JAp6cj2jhDal6w" })
    console.log(isLoaded, "IS-LOADED");
    if(!isLoaded) return <div>Loading ... </div>

    return (
        <Map />
    )
}


function Map(){
    return (<GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName="map-container"></GoogleMap>)
}
