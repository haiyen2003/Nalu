import React from "react";
import { useHistory, useParams } from "react-router-dom";
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
        <div className='session-container'>
            <div className='sessionlist-name'>Name: {thisSession.name}</div>
                            <div className='sessionlist-description'>Description: {thisSession.description}</div>
                            <div className='sessionlist-state'>State: {thisSession.image}</div>
                            <div className='sessionlist-level'>Equipment: {thisSession.equipment}</div>
                            <div className='sessionlist-level'>Start Time: {thisSession.startTime}</div>
                            <div className='sessionlist-level'>End Time: {thisSession.endTime}</div>
                            <div className='sessionlist-img-container'> <img className='session-img' src={thisSession.image}></img></div>

            <div className='button-container'>
                {!isOwner &&
                    <p className='notice'>You are not an creator of this session</p>}
                {isOwner &&
                    <button className='button' onClick={() => handleDelete(sessionId)}>Delete Session</button>}
                {isOwner &&
                <button className='button' onClick={() => routeChange()}>Edit Session</button> }
            </div>
        </div>
    )
}
export default SessionDetail
