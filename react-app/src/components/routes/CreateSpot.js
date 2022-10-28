import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './spot.css'
import React, { useEffect, useState } from 'react';
import Map from '../Map';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSpot } from '../../store/spot';
import { getKeyThunk } from '../../store/key';

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

  //get API key from backend
  useEffect(() => {
    dispatch(getKeyThunk()).then(() => setKeyLoad(true));
  }, [dispatch])
  //get Marker from Google Api

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }
    return () => {
      if(marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if(marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  return (
    <Map />
  )

}
