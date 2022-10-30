import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './spot.css'
import React, { useEffect, useState, useContext } from 'react';
import Map from '../Map';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSpot } from '../../store/spot';
import { getKeyThunk } from '../../store/key';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRef } from 'react';
import { MapContext } from '../../context/Map';

export default function CreateSpot() {
  const history = useHistory()
  const apiKey = useSelector(state => state.key)
  const [isKeyLoad, setKeyLoad] = useState(false)
  const dispatch = useDispatch();
  const [map, setMap] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [state, setState] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [staticUrl, setStaticUrl] = useState('')
  const [errors, setErrors] = useState([])
  const [id, setId] = useState(0);
  const [marker, setMarker] = useState([]);
  const [showMarker, setShowMarker] = useState(true)
  const [loading, setLoading] = useState(false)
  const ref = useRef(null);


  //get API key from backend
  useEffect(() => {
    dispatch(getKeyThunk()).then(() => setKeyLoad(true));
  }, [dispatch])


  //instantiates a map within the useEffect hook in the body of the Map component.
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 2000)

  }, []);

  const staticMap = (res) => {
    let image = `https://maps.googleapis.com/maps/api/staticmap?size=600x600`
    let APIKey = apiKey
    let route = res.routes[0]
    const color = `&path=weight:8%7Ccolor:red%7C`
    const path = route.overview_polyline
    const enc_path = `enc:${path}`
    const marker = `&markers=color:blue%7Clabel:S%7C${marker.coords.lat},${marker.coords.lng}`
    image += color + enc_path + marker + '&key=' + `${APIKey}`
    return image
  }

  return (

    //   <Wrapper apiKey={apiKey}>
    //   <Map center={center} zoom={zoom}>
    //     <Marker position={position} />
    //   </Map>
    // </Wrapper>
    <>
      <MapContext.Provider value={{ lat, lng, setLat, setLng }}>
        <Map />
      </MapContext.Provider>
    </>
  )

}
