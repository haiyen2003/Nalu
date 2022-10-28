import { useMemo, useCallback, useRef } from "react"
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
}

const GoogleMapComponent = () => {
    const mapRef = useRef()
    const center = useMemo(() => ({
        lat: 38.9072,
        lng: 77.0369,
    }), [])
    const onLoad = useCallback(map => (mapRef.current = map), [])
    return (
        <>
            <GoogleMap mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
            />
        </>
    )
}
export default GoogleMapComponent;
