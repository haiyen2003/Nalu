import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password, firstName, lastName, profileImg));
            if (data) {
                setErrors(data)
            }
        }
    };

    
    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    const updateProfileImg = (e) => {
        setProfileImg(e.target.value)
    }

    const updateFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const updateLastName = (e) => {
        setLastName(e.target.value)
    }

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <div className='form'>
            <div className='title-div'>
                <div className='Login-title'>Sign up</div>
            </div>
            <form onSubmit={onSignUp}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='top-field'>
                    <div className='field'>
                        <label className='label'>First Name</label>
                        <input
                            className='input-box'
                            type='text'
                            name='firstName'
                            onChange={updateFirstName}
                            value={firstName}
                            required
                        ></input>
                    </div>
                    <div className='field'>
                        <label className='label'>Last Name</label>
                        <input
                            className='input-box'
                            type='text'
                            name='lastName'
                            onChange={updateLastName}
                            value={lastName}
                            required
                        ></input>
                    </div>
                    <div className='field'>
                        <label className='label'>User Name</label>
                        <input
                            className='input-box'
                            type='text'
                            name='username'
                            onChange={updateUsername}
                            value={username}
                            required
                        ></input>
                    </div>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <input
                            className='input-box'
                            type='text'
                            name='email'
                            onChange={updateEmail}
                            value={email}
                            required
                        ></input>
                    </div>
                    <div className='field'>
                        <label className='label'>Password</label>
                        <input
                            className='input-box'
                            type='password'
                            name='password'
                            onChange={updatePassword}
                            value={password}
                        ></input>
                    </div>
                    <div className='field'>
                        <label className='label'>Repeat Password</label>
                        <input
                            className='input-box'
                            type='password'
                            name='repeat_password'
                            onChange={updateRepeatPassword}
                            value={repeatPassword}
                            required={true}
                        ></input>
                    </div>
                    <div className='field'>
                        <label className='label'>Profile Image</label>
                        <input
                            className='input-box'
                            type='profileImg'
                            name='profileImg'
                            onChange={updateProfileImg}
                            value={profileImg}
                            required
                        ></input>
                    </div>
                </div>
                <button className='button-signup-form'type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
