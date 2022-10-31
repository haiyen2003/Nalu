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

const GoogleMapComponent = ({apiKey}) => {

    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    let [staticUrl, setStaticUrl] = useState(null)
    const context = useContext(MapContext)

    const mapRef = useRef()
    const center = useMemo(() => ({
        lat: 38.9072,
        lng: 77.0369,
    }), [])
    const onLoad = useCallback(map => (mapRef.current = map), [])
    const checkMarker = (lat && lng)? <Marker position={{lat,lng}} />:null

    // const UpdateStaticMap = (e) => {
    //     setLat(e.latLng.lat())
    //     setLng(e.latLng.lng())
    //     context.setLat(e.latLng.lat())
    //     context.setLng(e.latLng.lng())
    //     console.log(e, 'e =====')
    //     let image = `https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x600`
    //     const color = `&path=weight:8%7Ccolor:red%7C`
    //     const marker = `&markers=color:blue%7Clabel:S%7C${e.latLng.lat()},${e.latLng.lng()}`
    //     image += color + marker + '&key=' + `${apiKey}`
    //     // setStaticUrl(e.image());
    //     // context.setStaticUrl(e.image())
    //     staticUrl = image
    //     console.log(staticUrl, 'THIS IS STATIC URL ====')
    //     return staticUrl
    //   }



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
                    // onClick = {UpdateStaticMap}
                >
                  {checkMarker}
                </GoogleMap>
            </Wrapper>
        </>
    )
}
export default GoogleMapComponent;
