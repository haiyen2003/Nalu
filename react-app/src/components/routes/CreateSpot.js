
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
  const [lat, setLat] = useState(37.53221987607712)
  const [lng, setLng] = useState(-122.39010570624356)
  const [difficulty, setDifficulty] = useState('')
  let [staticUrl, setStaticUrl] = useState('')
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const ref = useRef(null);
  const [validations, setValidations] = useState([])
  const [staticMap, UpdateStaticMap] = useState(null)

  //get API key from backend
  useEffect(() => {
    dispatch(getKeyThunk()).then(() => setKeyLoad(true));
  }, [dispatch])

  // const staticMap = () => {
  //   let image = `https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x600`
  //   const color = `&path=weight:8%7Ccolor:red%7C`
  //   const marker = `&markers=color:blue%7Clabel:S%7C${lat},${lng}`
  //   image += color + marker + '&key=' + `${apiKey.key}`
  //   staticUrl = image
  //   return staticUrl
  // }
  //front end input validations
  useEffect(() => {
    const errors = []
    if (name.length < 5) errors.push('Name must be longer than 5 characters')
    if (!description.length || description.length < 20) errors.push('Please enter a description more than 20 characters')
    if (!lat || lat == null || lat == 37.53221987607712 && lng == -122.39010570624356 ) errors.push('Please click on the map twice to locate your spot')
    if (!state) errors.push('Please choose the state')
    if (!difficulty) errors.push('Please pick a difficulty level of your spot')
    setValidations(errors)
  }, [name, description, lat, state, difficulty])

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrors([])
    //staticMap()
    const payload = {
      name,
      description,
      lat,
      lng,
      state,
      difficulty,
      staticUrl
    }
    console.log(staticUrl, 'STATIC URL')
    let createdSpot = await dispatch(thunkCreateSpot(payload))
    if (createdSpot) {
      history.push(`/spots`)
    }
  }

  let state_options = ['CA', 'HI', 'AK', 'WA', 'OR', 'TX', 'LA', 'AL', 'FL', 'GA', 'SC', 'NC', 'VA', 'MD', 'DE', 'NJ', 'MS', 'NY', 'CT', 'RI', 'MA', 'NH', 'ME']
  let level_options = ['Beginner-friendly', 'Moderate', 'Expert']
  return (
    <div className='form'>
      <div className='title-div'>
        Create a Spot
      </div>
      <MapContext.Provider value={{ lat, lng, setLat, setLng, staticUrl, setStaticUrl, UpdateStaticMap }}>
        <form className='create-spot-form' onSubmit={onSubmit}>

          <label className='label'>Location name </label>
          <input
            className='input-box'
            type='text'
            name='name'
            value={name}

            onChange={(e) => setName(e.target.value)}
            required
          ></input>

          <div className='field'>
            <label className='label'>Description </label>
            <input
              type='text'
              name='description'
              value={description}
              className='input-box'
              onChange={(e) => setDescription(e.target.value)}
              required
            ></input>
          </div>

          <div className='field'>
            <label className='label'>State </label>
            <select
              name='state'
              value={state}
              className='dropdown-option'
              onChange={(e) => setState(e.target.value)}
              required>
              <option value='' disabled>
                Select a state
              </option>
              {state_options.map((state) => (
                <option className='dropdown-option' key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className='field'>
            <label className='label'>Difficulty</label>
            <select
              name='difficulty'
              value={difficulty}
              className='dropdown-option'
              onChange={(e) => setDifficulty(e.target.value)}
              required>
              <option className='dropdown-option' value='' disabled>
                Select difficulty
              </option>
              {level_options.map((level) => (
                <option className='dropdown-option' key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <Map />

          <div className='field'>
            <label className='label'>Latitude</label>
            <input
              className='input-box'
              type='text'
              placeholder='latitude'
              value={lat}
              readOnly
              required
            />
          </div>
          <div className='field'>
            <label className='label'>Longtitude</label>
            <input
              className='input-box'
              type='text'
              placeholder='longtitude'
              value={lng}
              readOnly
              required
            />
          </div>
          <div className='create-spot-validation'>
            {validations.length > 0 ? (
              <div className='validation-container'>
                <ul>
                  {validations.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
              </div>
            ) : <div className='create-spot-button'>
            </div>}
            <button
              className='edit-group-button'
              type="submit"
              disabled={validations.length > 0}
            >
              Create Spot
            </button>
          </div>

        </form>

      </MapContext.Provider>
    </div>
  )
}
