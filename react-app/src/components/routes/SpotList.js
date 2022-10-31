import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllSpots, thunkDeleteSpot } from '../../store/spot';
import './spot.css';

const SpotList = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.spot)
    let spots;

    if (data) {
        spots = Object.values(data);
        console.log(spots, 'THIS IS SPOTS =====')
    }
    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch])

    if (!data) return null;
    return (
        <div>
            <div className='list-container'>
                {spots.map((spot) => {
                    return (
                        <div>
                            <div className='spotlist-name'>Name: {spot.name}</div>
                            <div className='spotlist-name'>Spot Name: {spot.name}</div>
                            <div className='spotlist-description'>Description: {spot.description}</div>
                            <div className='spotlist-state'>State: {spot.state}</div>
                            <div className='spotlist-level'>Level: {spot.difficulty}</div>
                            <div className='spotlist-img-container'> <img className='spot-img' src={spot.staticUrl}></img></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default SpotList;
