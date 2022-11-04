import './spot.css'
import React, { useEffect, useState, useContext } from 'react';
import Map from '../Map';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot, thunkUpdateSpot } from '../../store/spot';
import { getKeyThunk } from '../../store/key';
import { MapContext } from '../../context/Map';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useMemo, useCallback, useRef } from "react"

export default function UpdateSpot() {
    const { spotId } = useParams();
    const thisSpot = useSelector(state => state.spot[spotId])
    const apiKey = useSelector(state => state.key)
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch();
    const [map, setMap] = useState(null)
    const [name, setName] = useState(thisSpot?.name)
    const [description, setDescription] = useState(thisSpot && thisSpot?.description)
    const [state, setState] = useState(thisSpot && thisSpot?.state)
    const [lat, setLat] = useState(thisSpot && thisSpot?.lat)
    const [lng, setLng] = useState(thisSpot && thisSpot?.lng)
    const [difficulty, setDifficulty] = useState(thisSpot && thisSpot?.difficulty)
    const [errors, setErrors] = useState([]);
    const [staticUrl, setStaticUrl] = useState(thisSpot?.staticUrl)
    const [staticMap, UpdateStaticMap] = useState(null)
    const [submitted, setSubmitted] = useState(false);
    const [isKeyLoad, setKeyLoad] = useState(false)
    const [validations, setValidations] = useState([])

    useEffect(() => {
        dispatch(getKeyThunk()).then(() => setKeyLoad(true));
    }, [dispatch])

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

    // const staticMap = () => {
    //     let image = `https://maps.googleapis.com/maps/api/staticmap?zoom=8&size=600x600`
    //     const color = `&path=weight:8%7Ccolor:red%7C`
    //     const marker = `&markers=color:blue%7Clabel:S%7C${thisSpot.lat},${thisSpot.lng}`
    //     image += color + marker + '&key=' + `${apiKey.key}`
    //     //setStaticUrl(image);
    //     console.log(staticUrl, 'THIS IS NEW STATIC URL');
    //     return staticUrl
    // }

    //front end input validations
    useEffect(() => {
        const errors = []
        if (name?.length < 5) errors.push('Name must be longer than 5 characters')
        if (!description?.length || description?.length < 20) errors.push('Please enter a description more than 20 characters')
        if (!lat) errors.push('Please locate your spot on the map')
        if (!state) errors.push('Please choose the state')
        if (!difficulty) errors.push('Please pick a difficulty level of your spot')
        setValidations(errors)
    }, [name, description, lng, lat, state, difficulty])


    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // const newStaticUrl = staticMap();
        setSubmitted(true);
        const payload = {
            id: parseInt(spotId),
            name,
            description,
            lat,
            lng,
            state,
            difficulty,
            staticUrl
        }
        console.log(staticUrl, 'THIS IS STATIC URL FROM PAYLOAD')
        let updatedSpot = await dispatch(thunkUpdateSpot(payload))
        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    let state_options = ['CA', 'HI', 'AK', 'WA', 'OR', 'TX', 'LA', 'AL', 'FL', 'GA', 'SC', 'NC', 'VA', 'MD', 'DE', 'NJ', 'MS', 'NY', 'CT', 'RI', 'MA', 'NH', 'ME']
    let level_options = ['Beginner-friendly', 'Moderate', 'Expert']

    if (!thisSpot) return null;
    return (
        <div className='form'>
            <div className='title-div'>
                Update Spot
            </div>

            <MapContext.Provider value={{ lat, lng, setLat, setLng, staticUrl, setStaticUrl, UpdateStaticMap }}>
                <form className='create-spot-form' onSubmit={onSubmit}>


                    <label className='label'>Location name </label>
                    <input
                        type='text'
                        name='name'
                        value={name}
                        className='input-box'
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
                        />
                    </div>

                    <div className='field'>
                        <label className='label'>Static Url</label>
                        <input
                            className='input-box'
                            type='text'
                            placeholder='staticUrl'
                            value={staticUrl}
                            readOnly
                        />
                    </div>

                    <div className='create-spot-validation'>
                        {validations.length > 0 ? (
                            <div className='validation-container'>
                                <ul>
                                    {validations.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                            </div>
                        ) : <div className='create-spot-button'>  </div>}
                            <button
                                className="edit-group-button"
                                type="submit"
                            >
                                Update Spot
                            </button>
                    </div>
                </form>
            </MapContext.Provider>
        </div>
    )
}
