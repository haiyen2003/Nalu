import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSessions } from '../../store/workout';
import './Session.css';
import {placeholder} from '../../assets/placehold.jpg'

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
        <div className='spot-page-container'>
            <div className='list-container'>
                {sessions.map((session) => {
                    return (
                        <div className='list-one-container'>
                            <div className='spotlist-name _input'>Name: {session.name}</div>
                            <div className='spotlist-description _input'>Description: {session.description}</div>
                            <div className='spotlist-state _input'>Image: {session.image}</div>
                            <div className='spotlist-level _input'>Equipment: {session.equipment}</div>
                            <div className='spotlist-level _input'>Start Time: {session.startTime}</div>
                            <div className='spotlist-level _input'>End Time: {session.endTime}</div>
                            <div className = 'spotlist-img-container'><img className = 'spot-img' src ={session.spot.staticUrl}></img></div>
                            <div className='spotlist-img-container'>
                            <img className='session-img' src={session.image}></img>
                            <img className='session-img' src = {placeholder}></img>
                            <img className='session-img' src = {placeholder}></img>

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SessionList;
