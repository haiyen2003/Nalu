import './Session.css'
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateSession } from '../../store/workout';
import { thunkGetOneSpot } from '../../store/spot'


function CreateSession() {
    const dispatch = useDispatch();
    const { spotId } = useParams()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spot[spotId])
    const [submit, setSubmit] = useState(false);
    const [validations, setValidations] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [equipment, setEquipment] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (name.length < 5) errors.push('Name must be longer than 5 characters')
        if (!description.length || description.length < 20) errors.push('Please enter a description more than 20 characters')
        if (
            (!image.includes("jpg") &&
                !image.includes("png") &&
                !image.includes("jpeg") &&
                !image.includes("svg")) ||
            (!image.includes("https") && !image.includes("http"))
        )
            errors.push("Please enter a valid image url");
        if (!equipment) errors.push('Please enter boards/equipment info')
        if (!startTime) errors.push('Please insert start time')
        if (!endTime) errors.push('Please insert end time')
        if(startTime > endTime) errors.push('startTime and endTime conflicts')
        setValidations(errors)
    }, [name, description, image, equipment, startTime, endTime])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const payload = {
            name,
            description,
            userId: user.id,
            spotId: spotId,
            image,
            equipment,
            startTime,
            endTime
        }
        let createdSession = await dispatch(thunkCreateSession(payload))
        if (createdSession) {
            history.push(`/sessions/`)
        }
    }
    return (
        <div className='form'>
             <div className='title-div'>
                Log Session
            </div>
            <div className='create-session-main'>
                <form className='create-session-form' onSubmit={onSubmit}>


                <div className='field'>
                        <label className='label'>Session name </label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            className='input-box'
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></input>
                    </div>

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
                        <label className='label'>Image </label>
                        <input
                            type='text'
                            name='image'
                            value={image}
                            className='input-box'
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>

                     <div className='field'>
                        <label className='label'>Equipment </label>
                        <input
                            type='text'
                            name='equipment'
                            value={equipment}
                            className='input-box'
                            onChange={(e) => setEquipment(e.target.value)}
                            required
                        ></input>
                    </div>

                     <div className='field'>
                        <label className='label'>Start Time </label>
                        <input
                            type='datetime-local'
                            name='startTime'
                            value={startTime}
                            className='input-box'
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        ></input>
                    </div>

                    <div className='field'>
                        <label className='label'>End Time </label>
                        <input
                            type='datetime-local'
                            name='endTime'
                            value={endTime}
                            className='input-box'
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        ></input>
                    </div>

                    <div className='create-session-validation'>
                        {validations.length > 0 ? (
                            <div className='validation-container'>
                                <ul>
                                    {validations.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                            </div>
                        ) : <div className='create-spot-button'>
                        </div>}
                        <button
                            className="edit-group-button"
                            type="submit"
                            disabled={validations.length > 0}
                        >
                            Log Session
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default CreateSession
