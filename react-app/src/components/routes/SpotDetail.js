import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot, thunkDeleteSpot } from '../../store/spot';
import './spot.css';

function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const thisSpot = useSelector((state) => state.spot[spotId])
    const isOwner = user?.id === thisSpot?.userId;
    const sessions = useSelector((state) => state.spot.sessions)
    console.log(sessions, 'this is sessions ========')


    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

    const handleDelete = async spotId => {
        const deletedSpot = await dispatch(thunkDeleteSpot(spotId));
        history.push(`/spots`)
    }

    const routeChange = async () => {
        let path = `/spots/${spotId}/edit`
        await history.push(path);
    }
    if (!thisSpot) return null;
    return (
        <div className='spot-detail-main'>
            <div className='spot-container'>
                <div className='spot-name'>Spot Name: {thisSpot.name}</div>
                <div className='spot-description'>Description: {thisSpot.description}</div>
                <div className='spot-lat'>Latitude: {thisSpot.lat}</div>
                <div className='spot-lng'>Longtitude: {thisSpot.lng}</div>
                <div className='spot-state'>State: {thisSpot.state}</div>
                <div className='spot-level'>Level: {thisSpot.difficulty}</div>
                <div className='spot-img-container'> <img className='spot-img' src={thisSpot.staticUrl}></img></div>
                <div className='button-container'>
                    {!isOwner &&
                        <p className='notice'>You are not an creator of this spot</p>}
                    {isOwner &&
                        <button className='button' onClick={() => handleDelete(spotId)}>Delete Spot</button>}
                    {isOwner &&
                        <button className='button' onClick={() => routeChange()}>Edit Spot</button>}
                </div>
            </div>
            <div className='spot-level'>THIS IS SESSIONS: {thisSpot.sessions.map((session) => {
                return (
                    <>
                        <div className='list-one-container'>
                            <div className='left-container'>
                                <div className='user-info'>
                                    <div className='user-name'>{session.createdBy.firstName} {session.createdBy.lastName}</div>
                                    <div className='user-name'>{session.createAt}</div>
                                </div>
                            </div>
                            <div className='spotlist-name _input'> {session.name}</div>
                            <div className='spotlist-description _input'>Description: {session.description}</div>
                            <div className='spotlist-level _input'>Equipment: {session.equipment}</div>
                            <div className='spotlist-level _input'>Start Time: {session.startTime}</div>
                            <div className='spotlist-level _input'>End Time: {session.endTime}</div>
                            <div className='spotlist-img-container'>
                                <img className='session-img' src={session.image}></img>
                            </div>
                        </div>
                    </>
                )
            })}</div>
        </div>
    )
}
export default SpotDetail
