
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import logoImg from '../../src/assets/logo-2.png'
import './NavBar.css'
import ProfileButton from './ProfileButton';
import LoginDemoUser from './DemoUser';
import LoginForm from './auth/LoginForm';


const NavBar = ({isLoaded}) => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let sessionLinks;
  if(sessionUser) {
    sessionLinks = (
      <>
          <div className='right-navbar'>
          <div className='new-group-container'> <NavLink className='new-group' to={`/spots/new`}>Create your spots</NavLink></div>
              <div className='button-profile'> <ProfileButton user={sessionUser} /></div>
          </div>
      </>
  );
  } else {
    sessionLinks = (
      <>
      <LoginDemoUser />
      <LoginForm />
      <NavLink className = 'button-signup' to='/signup'>Sign up</NavLink>
      </>
    )
  }
  return (
    // <nav id='header'>
    //   <div className='navbar container'>
    //     <div className='logo-container'>
    //       <NavLink exact to='/'>
    //         <img class='logo' src={logoImg}></img>
    //       </NavLink>
    //     </div>
    //     <div>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </div>
    //     <div>
    //       <NavLink to='/login' exact={true} activeClassName='active'>
    //         Login
    //       </NavLink>
    //     </div>
    //     <div>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </div>
    //     <div>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </div>
    //     <div>
    //       <LogoutButton />
    //     </div>
    //   </div>
    // </nav>
    <div className={sessionUser ? "navbar logged-in" : 'navbar logged-out'}>
    <div className='logo-container'>
        <NavLink exact to='/'>
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
