// TYPES
const GET_ALL_SESSION = 'session/GET_ALL_SESSION';
const CREATE_SESSION = 'session/CREATE_SESSION';
const UPDATE_SESSION = 'session/UPDATE_SESSION';
const GET_ONE_SESSION = 'session/GET_ONE_SESSION';
const GET_MY_SESSION = 'session/GET_MY_SESSION';
const DELETE_SESSION = 'session/DELETE_SESSION';

// ACTION CREATORS

const actionCreateSession = (session) => {
    return {
        type: CREATE_SESSION,
        session
    }
}

const actionGetAllSession = (sessions) => {
    return {
        type: GET_ALL_SESSION,
        sessions
    }
}

const actionGetMySessions = (sessions) => {
    return {
        type: GET_MY_SESSION,
        sessions
    }
}

const actionGetOneSession = (session) => {
    return {
        type: GET_ONE_SESSION,
        session
    }
}

const actionUpdateSession = (session) => {
    return {
        type: UPDATE_SESSION,
        session
    }
}

const actionDeleteSession = (id) => {
    return {
        type: DELETE_SESSION,
        id
    }
}


// THUNKS
export const thunkCreateSession = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.spotId}/sessions/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    const data = await response.json()
    if (response.ok) {
        dispatch(actionCreateSession(data))
        return response
    } else {
        return data;
    }
}

export const thunkGetAllSessions = () => async dispatch => {
    const response = await fetch("/api/sessions/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllSession(data))
    }
}


export const thunkGetMySessions = () => async dispatch => {
    const response = await fetch('/api/sessions/my-sessions', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetMySessions(data))
    }
}

export const thunkGetOneSession = (id) => async dispatch => {
    const response = await fetch(`/api/sessions/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetOneSession(data))
    }
}

export const thunkUpdateSession = (payload) => async dispatch => {
    const response = await fetch(`/api/sessions/${payload.id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            payload
        ),
    });

    const data = await response.json()
    if (response.ok) {
        dispatch(actionUpdateSession(data))
        return data
    } else {
        return data.errors;
    }
}

export const thunkDeleteSession = (id) => async dispatch => {
    const response = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteSession(id))
    }
}


const initialState = {}

const sessionReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case CREATE_SESSION:
            newState[action.session.id] = action.session;
            return newState;

        case GET_ALL_SESSION:
            newState = {};
            action.sessions.sessions.forEach((session) => {
                newState[session.id] = session;
            });
            return newState;

        case GET_MY_SESSION:
            newState = {};
            action.sessions.sessions.forEach((session) => {
                newState[session.id] = session;
            });
            return newState;

        case GET_ONE_SESSION:
            newState = {};
            newState[action.session.id] = action.session
            return newState

        case UPDATE_SESSION:
            newState = {};
            newState[action.session.id] = action.session
            return newState

        case DELETE_SESSION:
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}

export default sessionReducer
