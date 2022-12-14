import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../store/session';
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const setRoute = () => {
    history.push('/my-spots')
  }
  const setRoute2 = () => {
    history.push('/my-sessions')
  }

  const setRoute3 = () => {
    history.push('/spots/new')
  }

  const setRoute4 = () => {
    history.push('/spots')
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" /> */}
      {/* </button> */}
      <div className='profile-button' onClick={openMenu}>
        {user.firstName.charAt(0)}
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Hello, {user.firstName}</li>
          <li>
            <button className='dropdown-button' onClick={setRoute}>My Spots</button>
          </li>
          <li>
            <button className='dropdown-button' onClick={setRoute2}>My Sessions</button>
          </li>
          <li>
            <button className='dropdown-button' onClick={setRoute3}>Create a Spot</button>
          </li>
          <li>
            <button className='dropdown-button' onClick={setRoute4}>Log your Session</button>
          </li>
          <li>
            <button className='dropdown-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
