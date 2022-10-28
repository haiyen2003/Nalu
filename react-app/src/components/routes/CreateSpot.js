import {useMemo} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import './spot.css'
import { useEffect, useState } from 'react';
import Map from '../Map';

export default function CreateSpot(){

//      const [apiKey, setApiKey] = useState(null)
//     // const [isLoaded, setIsLoaded] = useState(false)
//     useEffect( () => {
//         const getKey = async () => {
//             const data = await fetch('/api/routes/key')
//             const res = await data.json()
//             console.log(res, 'THIS IS RES');
//             if(!apiKey){
//                 setApiKey(res);
//             }
//             return res;
//         }
//         getKey();
//         console.log(apiKey, 'KEY -----')
//     }, [apiKey])
//     console.log(apiKey, 'OUTSIDE USE EFFECT')

//     // if(apiKey === '') return <div>Loading ... </div>
//     // return (
//     //     <LoadMap apiKey={apiKey}/>
//     // )
//     if(!apiKey) return null;
//     //Use this key for now
//    // const {isLoaded} = useLoadScript({googleMapsApiKey: apiKey})
//     //if(!isLoaded) return <div>Loading ... </div>
//     return <LoadMap apiKey={apiKey}/>
// }
// // const libraries = ["places"]
// function LoadMap({apiKey}){
//     console.log(apiKey, 'THIS IS API FROM LOADMAP')
//     const {isLoaded} = useLoadScript({googleMapsApiKey: apiKey, id: 'google-map-script'});
//     console.log(isLoaded, 'ISLOADED ===')
//     return (
//         <>
//          { (< Map />) }
//         </>
//         )
// }

// function Map({}){
  //  return <GoogleMap zoom={10} center={{lat:44, lng:-80}} mapContainerClassName="map-container"></GoogleMap>

  return(
    <Map />
  )
 }
