
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import GoogleMapComponent from './GoogleMapComponent';

const MapContainer = ({apiKey}) => {
    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: apiKey
      });
      return (
        <>
            {isLoaded && (
                <GoogleMapComponent />
            )}
        </>
    )

}
export default MapContainer;
