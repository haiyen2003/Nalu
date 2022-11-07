import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { thunkUpdateSession, thunkGetOneSession } from '../../store/workout';

export default function EditSession() {
    const { sessionId } = useParams();
    const thisSession = useSelector((state) => state.sessions[sessionId])
    console.log(thisSession, 'THIS SESSIONS =======')
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch();
    const [validations, setValidations] = useState(false);
    const [name, setName] = useState(thisSession && thisSession.name)
    const [description, setDescription] = useState(thisSession && thisSession.description)
    const [image, setImage] = useState(thisSession && thisSession.image)
    const [equipment, setEquipment] = useState(thisSession && thisSession.equipment)
    const [startTime, setStartTime] = useState(thisSession && thisSession.startTime)
    const [endTime, setEndTime] = useState(thisSession && thisSession.endTime)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const errors = [];
        if (name?.length < 5) errors.push('Name must be longer than 5 characters')
        if (!description?.length || description?.length < 20) errors.push('Please enter a description more than 20 characters')
        if (
            (!image?.includes("jpg") &&
                !image?.includes("png") &&
                !image?.includes("jpeg") &&
                !image?.includes("svg")) ||
            (!image?.includes("https") && !image?.includes("http"))
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
            id: parseInt(sessionId),
            name,
            description,
            image,
            equipment,
            startTime,
            endTime,
            userId: user.id,
        }
        let updatedSession = await dispatch(thunkUpdateSession(payload))
        if (updatedSession) {
            history.push(`/sessions/${thisSession.id}`)
        }
    }
    return (
        <div className='form'>
            <div className='title-div'>
                Update Session
            </div>

            <div className='update-session-main'>
                <form className='update-session-form' onSubmit={onSubmit}>


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
                        ></input>
                    </div>

                    <div className='update-session-validation'>
                        {validations.length > 0 ? (
                            <div className='validation-container'>
                                <ul>
                                    {validations.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                            </div>
                        ) : <div className='update-spot-button'>
                        </div>}
                        <button
                            className="edit-group-button"
                            type="submit"
                            disabled={validations.length > 0}
                        >
                            Update Session
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
