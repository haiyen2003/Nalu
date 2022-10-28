const GET_KEY = 'GET_KEY'

const actionGetKey = (key) => {
    return {
        type: GET_KEY,
        key
    }
}

export const getKeyThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots/key')

    if(res.ok){
        const thisKey = await res.json()
        dispatch(actionGetKey(thisKey.GoogleMapApiKey))
        return thisKey
    }
}

const initialState = {key:null}
const keyReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_KEY:
            return {key:action.key}

        default:
            return state
    }
}
export default keyReducer;
