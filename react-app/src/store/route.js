// TYPES
const GET_ALL_ROUTE = 'route/GET_ALL_ROUTE';
const CREATE_ROUTE = 'route/CREATE_ROUTE';
const UPDATE_ROUTE = 'route/UPDATE_ROUTE';
const GET_ONE_ROUTE ='route/GET_ONE_ROUTE';
const GET_MY_ROUTE = 'route/GET_MY_ROUTE';
const DELETE_ROUTE ='route/DELETE_ROUTE';

// ACTION CREATORS

const actionCreateRoute = (route) => {
    return {
        type: CREATE_ROUTE,
        route
    }
}

const actionGetAllRoutes = (routes) => {
    return {
        type: GET_ALL_ROUTE,
        routes
    }
}

const actionGetMyRoutes = (routes) => {
    return {
        type: GET_MY_ROUTE,
        routes
    }
}

const actionGetOneRoute = (route) => {
    return {
        type: GET_ONE_ROUTE,
        route
    }
}

const actionUpdateRoute = (route) => {
    return {
        type: UPDATE_ROUTE,
        route
    }
}

const actionDeleteRoute = (id) => {
    return {
        type: DELETE_ROUTE,
        id
    }
}


// THUNKS
export const thunkCreateRoute = (payload) => async dispatch => {
    const response = await fetch('/api/routes/new', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(actionCreateRoute(data))
        return data
    }
}

export const thunkGetAllRoutes = () => async dispatch => {
    const response = await fetch("/api/routes/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetAllRoutes(data))
    }
}


export const thunkGetMyRoute = () => async dispatch => {
    const response = await fetch('/api/routes/my-routes', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetMyRoutes(data))
    }
}

export const thunkGetOneRoute = (id) => async dispatch => {
    const response = await fetch(`/api/routes/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionGetOneRoute(data))
    }
}

export const thunkUpdateRoute = (payload) => async dispatch => {
    const response = await fetch(`/api/routes/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(actionUpdateRoute(data))
        return data
    }
}

export const thunkDeleteRoute = (id) => async dispatch => {
    const response = await fetch(`/api/routes/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(actionDeleteRoute(id))
    }
}


const initialState = {}

const routeReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {

      case CREATE_ROUTE:
        newState[action.route.id] = action.route;
        return newState;

      case GET_ALL_ROUTE:
        newState = {};
        action.routes.routes.forEach((route) => {
          newState[route.id] = route;
        });
        return newState;

      case GET_MY_ROUTE:
        newState = {};
        action.routes.routes.forEach((route) => {
          newState[route.id] = route;
        });
        return newState;

       case GET_ONE_ROUTE:
         newState = {};
         newState[action.route.id] = action.route
         return newState

        case UPDATE_ROUTE:
            newState[action.route.id] = action.route
            return newState

        case DELETE_ROUTE:
            delete newState[action.id]
            return newState
      default:
        return state;
    }
}

export default routeReducer
