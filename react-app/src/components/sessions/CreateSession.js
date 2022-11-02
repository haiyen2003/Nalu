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
        <>
            <div className='create-session-main'>
                <form className='create-session-form' onSubmit={onSubmit}>
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
                            className="create-spot-button"
                            type="submit"
                            disabled={validations.length > 0}
                        >
                            Log Session
                        </button>
                    </div>

                    <div>
                        <label>Session name </label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            className='create-spot-name'
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></input>
                    </div>
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
                    <div className='input-image'>
                        <label>Image </label>
                        <input
                            type='text'
                            name='image'
                            value={image}
                            className='create-session-image'
                            onChange={(e) => setImage(e.target.value)}
                        ></input>
                    </div>
                    <div className='input-equipment'>
                        <label>Equipment </label>
                        <input
                            type='text'
                            name='equipment'
                            value={equipment}
                            className='create-session-image'
                            onChange={(e) => setEquipment(e.target.value)}
                        ></input>
                    </div>
                    <div className='input-startTime'>
                        <label>Start Time </label>
                        <input
                            type='urltime-local'
                            name='startTime'
                            value={startTime}
                            className='create-session-image'
                            onChange={(e) => setStartTime(e.target.value)}
                        ></input>
                    </div>
                    <div className='input-endTime'>
                        <label>End Time </label>
                        <input
                            type='urltime-local'
                            name='endTime'
                            value={endTime}
                            className='create-session-image'
                            onChange={(e) => setEndTime(e.target.value)}
                        ></input>
                    </div>
                </form>
            </div>
        </>
    )
}


export default CreateSession
