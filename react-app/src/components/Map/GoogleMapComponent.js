import { useMemo, useCallback, useRef } from "react"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState, useContext } from "react";
import { MapContext } from "../../context/Map";


const containerStyle = {
    width: '600px',
    height: '600px',
}

const GoogleMapComponent = ({apiKey}) => {

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const context = useContext(MapContext)
    console.log(context, 'CONTEXT ----')
    const mapRef = useRef()
    const center = useMemo(() => ({
        lat: 38.9072,
        lng: 77.0369,
    }), [])
    const onLoad = useCallback(map => (mapRef.current = map), [])
    const checkMarker = (lat && lng)? <Marker position={{lat,lng}} />:null
    return (
        <>
            <Wrapper apiKey={apiKey}>
                <GoogleMap mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onClick={(e)=>{setLat(e.latLng.lat())
                       setLng(e.latLng.lng())
                       context.setLat(e.latLng.lat())
                       context.setLng(e.latLng.lng())
                        }}
                >
                  {checkMarker}
                </GoogleMap>
            </Wrapper>
        </>
    )
}
export default GoogleMapComponent;
