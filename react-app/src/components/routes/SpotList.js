import React from "react";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots, thunkDeleteSpot } from '../../store/spot';
import './spot.css';

const SpotList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.spot)
    const history = useHistory();
    let spots;

    if (data) {
        spots = Object.values(data);
    }
    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    if (!data) return null;
    return (
        <div className='spot-page-container'>
            <div className='list-container'>
                <div className='top-container'>
                    <NavLink className="top-link top-link-underlined" to={`/spots`}>All Spots</NavLink>
                    <NavLink className='top-link' to={`/sessions`}>All Sessions</NavLink>
                </div>
                {spots.map((spot) => {
                    return (
                        <div className='list-one-container'>
                            <div className='user-name'>Created by: {spot.createdBy.firstName} {spot.createdBy.lastName}</div>
                            <div className='user-name'>{new Date(spot.createAt).toLocaleString()}</div>
                            <div className='spotlist-name _input'><NavLink className='link' to={`/spots/${spot.id}`}>{spot.name}</NavLink> </div>
                            <div className='spotlist-description _input'>Description: {spot.description}</div>
                            <div className='spot-state-level'>
                                <div className='spot-detail-state'>
                                    <div>State</div>
                                    <div>{spot.state}</div>
                                </div>
                                <div className='spot-detail-state'>
                                    <div>Level</div>
                                    <div>{spot.difficulty}</div>
                                </div>
                                <div className='spot-detail-state'>
                                    <div>Total Sessions</div>
                                    <div>{spot.sessions.length}</div>
                                </div>
                            </div>
                            <div className='spotlist-img-container'> <img className='spot-img' src={spot.staticUrl}></img></div>
                            <div className='spot-buttons'>
                                <button className='spot-log-button' onClick={() => { history.push(`/spots/${spot.id}/sessions/new`) }}>Log Session Here</button>
                                <button className='spot-log-button' onClick={() => { history.push(`/spots/${spot.id}`) }}>Spot Detail</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SpotList;
