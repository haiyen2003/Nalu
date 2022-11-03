import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './DemoUser.css';

export default function LoginDemoUser() {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login('demo@aa.io','password'))
    }
    return (
        <form onSubmit={handleSubmit}>
            <button className = 'button-demo'type='submit'>Demo User</button>
        </form>
    )
}
