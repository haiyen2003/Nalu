import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import { Link , NavLink} from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const navigateToSignUpForm = () => {
    history.push("/signup");
    if (onClose) {
      onClose();
    }
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='top-div-login-form'>
        <div className='Login-title'>Log in</div>
        <div className='Signup-title'>Not a member? <Link className='signup-link' onClick={navigateToSignUpForm}>Sign up</Link> </div>
      </div>
      <form className='login-field' onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className='label-login-form' htmlFor='email'>Email</label>
          <input className='input-box-form'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label className='label-login-form' htmlFor='password'>Password</label>
          <input className='input-box-form'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div className='login-button-container'>
          <button className='button-login-form' type='submit'>Login</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
