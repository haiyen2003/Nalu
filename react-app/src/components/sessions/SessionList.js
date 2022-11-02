import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSessions } from '../../store/workout';
import './Session.css';

const SessionList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.sessions)
    console.log(data, 'THIS IS DATA =====')
    let sessions;

    if (data) {
        sessions = Object.values(data);
        console.log(sessions, 'THIS IS SESSIONS =====')
    }
    useEffect(() => {
        dispatch(thunkGetAllSessions())
    }, [dispatch])

    if (!data) return null;
    return (
        <div>
            <div className='list-container'>
                {sessions.map((session) => {
                    return (
                        <div>
                            <div className='spotlist-name'>Name: {session.name}</div>
                            <div className='spotlist-description'>Description: {session.description}</div>
                            <div className='spotlist-state'>Image: {session.image}</div>
                            <div className='spotlist-level'>Equipment: {session.equipment}</div>
                            <div className='spotlist-level'>Start Time: {session.startTime}</div>
                            <div className='spotlist-level'>End Time: {session.endTime}</div>
                            <div className='spotlist-img-container'> <img className='spot-img' src={session.image}></img></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SessionList;
