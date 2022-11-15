import { useMemo, useCallback, useRef } from "react"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState, useContext, useEffect } from "react";
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

    useEffect(() => {
        context.lat = lat;
        context.lng = lng;
        context.setStaticUrl(UpdateStaticMap())
    }, [lat, lng])

    const mapClick = (e) => {
        setLat(e.latLng.lat())
        setLng(e.latLng.lng())
        setStaticUrl(UpdateStaticMap())
        context.setLat(e.latLng.lat())
        context.setLng(e.latLng.lng())
        // context.setStaticUrl(UpdateStaticMap())
    }
    const mapRef = useRef()

    const center = useMemo(() => ({
        lat: 37.53221987607712,
        lng: -122.39010570624356,
    }), [])

    const onLoad = useCallback(map => {
        (mapRef.current = map)
    }, [])
    const checkMarker = (lat && lng) ? <Marker position={{ lat, lng }} /> : null

    UpdateStaticMap = (e) => {
        let image = `https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=600x400`
        // const color = `&path=weight:8%7Ccolor:red%7C`
        const marker = `&markers=color:blue%7Clabel:S%7C${lat},${lng}`
        image += marker + '&key=' + `${apiKey}`
        staticUrl = image
        // context.setStaticUrl(e.image())
        return staticUrl
    }
    return (
        <>
            <Wrapper apiKey={apiKey}>
                <GoogleMap mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onClick={mapClick}
                // onClick = {UpdateStaticMap}
                >
                    {checkMarker}
                </GoogleMap>
            </Wrapper>
        </>
    )
}
export default GoogleMapComponent;
