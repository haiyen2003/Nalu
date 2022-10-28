// TYPES
const GET_ALL_SPOT ='spot/GET_ALL_SPOT';
const CREATE_SPOT = 'spot/CREATE_SPOT';
const UPDATE_SPOT = 'spot/UPDATE_SPOT';
const GET_ONE_SPOT ='spot/GET_ONE_SPOT';
const GET_MY_SPOT = 'spot/GET_MY_SPOT';
const DELETE_SPOT ='spot/DELETE_SPOT';

// ACTION CREATORS

const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const actionGetAllSpots = (spots) => {
    return {
        type: GET_ALL_SPOT,
        spots
    }
}

const actionGetMySpots = (spots) => {
    return {
        type: GET_MY_SPOT,
        spots
    }
}

const actionGetOneSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
}

const actionUpdateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const actionDeleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}


// THUNKS
export const thunkCreateSpot = (payload) => async dispatch => {
    const response = await fetch('/api/spots/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateSpot(data))
        return data
    }
}

export const thunkGetAllSpots = () => async dispatch => {
    const response = await fetch("/api/spots/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllSpots(data))
    }
}


export const thunkGetMySpot = () => async dispatch => {
    const response = await fetch('/api/spots/my-spots', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetMySpots(data))
    }
}

export const thunkGetOneSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetOneSpot(data))
    }
}

export const thunkUpdateSpot = (payload) => async dispatch => {
    const response = await fetch(`/api/spots/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateSpot(data))
        return data
    }
}

export const thunkDeleteSpot = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteSpot(id))
    }
}


const initialState = {}

const spotReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {

      case CREATE_SPOT:
        newState[action.spot.id] = action.spot;
        return newState;

      case GET_ALL_SPOT:
        newState = {};
        action.spots.spots.forEach((spot) => {
          newState[spot.id] = spot;
        });
        return newState;

      case GET_MY_SPOT:
        newState = {};
        action.spots.spots.forEach((spot) => {
          newState[spot.id] = spot;
        });
        return newState;

       case GET_ONE_SPOT:
         newState = {};
         newState[action.spot.id] = action.spot
         return newState

        case UPDATE_SPOT:
            newState[action.spot.id] = action.spot
            return newState

        case DELETE_SPOT:
            delete newState[action.id]
            return newState
      default:
        return state;
    }
}

export default spotReducer
