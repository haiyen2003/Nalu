
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
  const dispatch = useDispatch();
  const apiKey = useSelector(state => state.key)
  const [isKeyLoad, setKeyLoad] = useState(false)
  const [map, setMap] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [state, setState] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [difficulty, setDifficulty] = useState('')
  let [staticUrl, setStaticUrl] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef(null);


  //get API key from backend
  useEffect(() => {
    dispatch(getKeyThunk()).then(() => setKeyLoad(true));
  }, [dispatch])

  const staticMap = () => {
    let image = `https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x600`
    const color = `&path=weight:8%7Ccolor:red%7C`
    const marker = `&markers=color:blue%7Clabel:S%7C${lat},${lng}`
    image += color + marker + '&key=' + `${apiKey.key}`
    staticUrl = image
    console.log(staticUrl, 'THIS IS STATIC URL ====')
    return staticUrl
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    staticMap()
    const payload = {
      name,
      description,
      lat,
      lng,
      state,
      difficulty,
      staticUrl
    }

    // let createdSpot = await dispatch(thunkCreateSpot(payload))
    // if (createdSpot) {
    //   history.push(`/spots/${createdSpot.id}`)
    // }
    return dispatch(thunkCreateSpot(payload))
      // .then(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     setErrors(data.errors);
      //   }
      //   else {
      //     history.push(`/spots/`);
      //   }
      // })
      .then(
        () => {
          history.push(`/spots/`);
        })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {

          setErrors(data.errors);
          console.log(data.errors, "======data errors")
        }
      })
  }

  let state_options = ['CA', 'HI', 'AK', 'WA', 'OR', 'TX', 'LA', 'AL', 'FL', 'GA', 'SC', 'NC', 'VA', 'MD', 'DE', 'NJ', 'MS', 'NY', 'CT', 'RI', 'MA', 'NH', 'ME']
  let level_options = ['Beginner-friendly', 'Moderate', 'Expert']
  return (
    <div className='create-spot-main'>
      <MapContext.Provider value={{ lat, lng, setLat, setLng }}>
        <form className='create-spot-form' onSubmit={onSubmit}>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>Location name </label>
          <input
            type='text'
            name='name'
            value={name}
            className='create-spot-name'
            onChange={(e) => setName(e.target.value)}
            required
          ></input>

          <div className='input-description'>
            <label>Description </label>
            <input
              type='text'
              name='description'
              value={description}
              className='create-spot-description'
              onChange={(e) => setDescription(e.target.value)}
              required
            ></input>
          </div>

          <div className='input-state'>
            <label>State </label>
            <select
              name='state'
              value={state}
              className='create-spot-state'
              onChange={(e) => setState(e.target.value)}
              required>
              <option value='' disabled>
                Select a state
              </option>
              {state_options.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className='input-difficulty'>
            <label>Difficulty</label>
            <select
              name='difficulty'
              value={difficulty}
              className='create-spot-difficulty'
              onChange={(e) => setDifficulty(e.target.value)}
              required>
              <option value='' disabled>
                Select difficulty
              </option>
              {level_options.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <Map />

          <div className='input-lat'>
            <label>Latitude</label>
            <input
              type='text'
              placeholder='latitude'
              value={lat}
              readOnly
              required
            />
          </div>
          <div className='input-long'>
            <label>Longtitude</label>
            <input
              type='text'
              placeholder='longtitude'
              value={lng}
              readOnly
              required
            />
          </div>
          <button
            className="create-spot-button"
            type="submit"
          >
            Create Spot
          </button>

        </form>

      </MapContext.Provider>
    </div>
  )
}
