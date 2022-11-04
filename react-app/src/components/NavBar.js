
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logoImg from '../../src/assets/logo-2.png'
import './NavBar.css'
import ProfileButton from './ProfileButton';
import LoginDemoUser from './DemoUser';
import LoginForm from './auth/LoginForm';
import LoginFormModal from './auth/LoginFormModal';


const NavBar = ({isLoaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <>
          <div className='right-navbar'>
              <div className='button-profile'> <ProfileButton user={sessionUser} /></div>
          </div>
      </>
  );
  } else {
    sessionLinks = (
      <>
      <LoginDemoUser />
      <LoginFormModal />
      <NavLink className = 'button-signup' to='/sign-up'>Sign up</NavLink>
      </>
    )
  }
  return (

    <div className={sessionUser ? "navbar logged-in" : 'navbar logged-out'}>
    <div className='logo-container'>
        <NavLink exact to= {sessionUser ? '/spots' : '/'}>
            <img className='logo' src={logoImg}></img>
        </NavLink>
    </div>
    <div className='nav-buttons'>
        {isLoaded && sessionLinks}
    </div>
</div>
  );
}

export default NavBar;
