import React from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSession, thunkDeleteSession } from '../../store/workout';
import './Session.css';

function SessionDetail() {
    const { sessionId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const thisSession = useSelector((state) => state.sessions[sessionId])
    const isOwner = user?.id === thisSession?.userId;


    useEffect(() => {
        dispatch(thunkGetOneSession(sessionId))

    }, [dispatch, sessionId])


    const handleDelete = async sessionId => {
        const deletedSession = await dispatch(thunkDeleteSession(sessionId));
        history.push(`/sessions`)
    }

    const routeChange = async () => {
        let path = `/sessions/${sessionId}/edit`
        await history.push(path);
    }

    if (!thisSession) return null;

    return (
        <div className='spot-detail-main'>
            <div className='spot-detail-container'>
                <div className='user-name'>{thisSession.createdBy.firstName} {thisSession.createdBy.lastName}</div>
                <div className='user-name'>{new Date(thisSession.createAt).toLocaleString()}</div>
                <div className='spot-detail-name'>{thisSession.name}</div>
                <div className='spot-detail-description'>Description: {thisSession.description}</div>
                <div className='sessionlist-level'>Equipment: {thisSession.equipment}</div>
                <div className='sessionlist-level'>Start Time: {new Date(thisSession.startTime).toLocaleString()}</div>
                <div className='sessionlist-level'>End Time: {new Date(thisSession.endTime).toLocaleString()}</div>
                <div className='sessionlist-img-container'> <img className='session-img' src={thisSession.image}></img></div>

                <div className='sessionlist-img-container'> <img className='session-img' src={thisSession.spot.staticUrl}></img></div>
                <div className='spot-detail-description'>This session was at <NavLink className = 'link' to={`/spots/${thisSession.spot.id}`}>{thisSession.spot.name}</NavLink></div>
                <div className='button-detail-container'>
                    {/* {!isOwner &&
                    <p className='notice'>You are not an creator of this session</p>} */}
                    {isOwner &&
                        <button className='spot-log-button' onClick={() => handleDelete(sessionId)}>Delete Session</button>}
                    {isOwner &&
                        <button className='spot-log-button' onClick={() => routeChange()}>Edit Session</button>}
                </div>
            </div>
        </div>
    )
}
export default SessionDetail
