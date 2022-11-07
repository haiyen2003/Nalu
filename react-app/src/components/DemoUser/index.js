import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './DemoUser.css';

export default function LoginDemoUser() {
    const dispatch = useDispatch();
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login('demo@aa.io','password'))
    }
    return (
        <form onSubmit={handleSubmit}>
            <button className = 'button-demo'type='submit'>Demo User</button>
        </form>
    )
}
