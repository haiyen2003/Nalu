import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreateSpot from './components/routes/CreateSpot';
import HomePage from './components/HomePage';
import SpotDetail from './components/routes/SpotDetail';
import SpotList from './components/routes/SpotList';
import UpdateSpot from './components/routes/UpdateSpot';
import SessionList from './components/sessions/SessionList';
import SessionDetail from './components/sessions/SessionDetail';
import CreateSession from './components/sessions/CreateSession';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route exact path='/spots/new'>
          <CreateSpot />
        </Route>
        <Route path='/spots' exact={true} >
          <SpotList />
        </Route>
        <Route path='/sessions' exact={true} >
          <SessionList />
        </Route>
        <Route path='/spots/:spotId' exact={true} >
          <SpotDetail />
        </Route>
        <Route path='/spots/:spotId/sessions/new' exact={true} >
          <CreateSession />
        </Route>
        <Route path='/sessions/:sessionId' exact={true} >
          <SessionDetail />
        </Route>
        <Route path='/spots/:spotId/edit' exact={true} >
          <UpdateSpot />
        </Route>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
