import { useMemo, useCallback, useRef } from "react"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState, useContext } from "react";
import { MapContext } from "../../context/Map";
import { useDispatch, useSelector } from "react-redux";


const containerStyle = {
    width: '600px',
    height: '600px',
}

const GoogleMapComponent = ({ apiKey }) => {

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    let [staticUrl, setStaticUrl] = useState(null)
    let [staticMap, UpdateStaticMap] = useState(null)
    const context = useContext(MapContext)
    console.log(context, 'THIS IS CONTEXT');
    const mapRef = useRef()
    console.log(mapRef, 'THIS IS MAPREF');
    const center = useMemo(() => ({
        lat: 37.53221987607712,
        lng: -122.39010570624356,
    }), [])

    const onLoad = useCallback(map => {
        (mapRef.current = map)
    }, [])
    const checkMarker = (lat && lng) ? <Marker position={{ lat, lng }} /> : null

    UpdateStaticMap = (e) => {
        // setLat(e.latLng.lat())
        // setLng(e.latLng.lng())
        // context.setLat(e.latLng.lat())
        // context.setLng(e.latLng.lng())
        // if (lat && lng) {
        let image = `https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x600`
        const color = `&path=weight:8%7Ccolor:red%7C`
        const marker = `&markers=color:blue%7Clabel:S%7C${lat},${lng}`
        image += color + marker + '&key=' + `${apiKey}`
        staticUrl = image
        console.log(lat, 'THIS IS LAT')
        // context.setStaticUrl(e.image())
        console.log(staticUrl, 'THIS IS STATIC URL ====')
        return staticUrl
    }
    return (
        <>
            <Wrapper apiKey={apiKey}>
                <GoogleMap mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onClick={(e) => {
                        console.log(e.latLng.lat(), " ======== ")
                        setLat(e.latLng.lat())
                        setLng(e.latLng.lng())
                        console.log(lat, lng, 'LAT AND LNG AFTER SET')
                        //UpdateStaticMap()
                        setStaticUrl(UpdateStaticMap())
                        console.log(staticUrl, 'STATIC URL IN ONCLICK')
                        context.setLat(e.latLng.lat())
                        console.log(lat, 'this is new lat')
                        context.setLng(e.latLng.lng())
                        context.setStaticUrl(UpdateStaticMap())
                    }}
                // onClick = {UpdateStaticMap}
                >
                    {checkMarker}
                </GoogleMap>
            </Wrapper>
        </>
    )
}
export default GoogleMapComponent;
