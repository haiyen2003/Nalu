import React from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSessions } from '../../store/workout';
import './Session.css';
import placeholder from '../../assets/placehold.jpg'

const SessionList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.sessions)
    const history = useHistory();
    const user = useSelector(state => state.session.user)
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
                <div className='top-container'>
                    <NavLink className="top-link " to={`/spots`}>All Spots</NavLink>
                    <NavLink className='top-link top-link-underlined' to={`/sessions`}>All Sessions</NavLink>
                </div>
                {sessions.map((session) => {
                    return (
                        <div className='list-one-container'>
                            <div className='left-container'>
                                <div className='user-info'>
                                    <div className='user-name'>{session.createdBy.firstName} {session.createdBy.lastName}</div>
                                    <div className='user-name'>{new Date(session.createAt).toLocaleString()}</div>
                                </div>
                            </div>
                            <div className='spotlist-name _input'><NavLink className='link' to={`/sessions/${session.id}`}>{session.name}</NavLink> </div>
                            <div className='spot-detail-description'>Description: {session.description}</div>
                            <div className='spotlist-level _input'>Equipment: {session.equipment}</div>
                            <div className='spotlist-level _input'>Start Time: {new Date(session.startTime).toLocaleString()}</div>
                            <div className='spotlist-level _input'>End Time: {new Date(session.endTime).toLocaleString()}</div>
                            <div className='spotlist-img-container'><img className='spot-img' src={session.spot.staticUrl}></img></div>
                            <div className='spotlist-img-container'>
                                <img className='session-img' src={session.image}></img>
                            </div>
                            <div className='spot-buttons'>
                                <button className='spot-log-button' onClick={() => { history.push(`/sessions/${session.id}`) }}>Session Detail</button>
                                {user.id == session.userId &&
                                    <button className='spot-log-button' onClick={() => { history.push(`/sessions/${session.id}/edit`) }}>Edit Session</button>
                                }
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SessionList;
