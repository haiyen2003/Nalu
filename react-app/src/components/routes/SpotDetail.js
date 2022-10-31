import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneSpot, thunkDeleteSpot } from '../../store/spot';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './spot.css';

function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const thisSpot = useSelector((state) => state.spot[spotId])

    useEffect(() => {
        dispatch(thunkGetOneSpot(spotId))
    }, [dispatch, spotId])

    const handleDelete = async spotId => {
        const deletedSpot = await dispatch(thunkDeleteSpot(spotId));
        history.push(`/spots`)
    }
    if (!thisSpot) return null;

    return (
        <div className = 'spot-container'>
            <div className = 'spot-name'>Spot Name: {thisSpot.name}</div>
            <div className = 'spot-description'>Description: {thisSpot.description}</div>
            <div className = 'spot-lat'>Latitude: {thisSpot.lat}</div>
            <div className = 'spot-lng'>Longtitude: {thisSpot.lng}</div>
            <div className = 'spot-state'>State: {thisSpot.state}</div>
            <div className = 'spot-level'>Level: {thisSpot.difficulty}</div>
            <div className = 'spot-img-container'> <img className = 'spot-img' src = {thisSpot.staticUrl}></img></div>


        </div>
    )
}

export default SpotDetail
