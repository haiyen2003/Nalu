import { response } from "express/lib/express";

const GET_ALL_COMMENT = 'comment/GET_ALL_COMMENT';
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const UPDATE_COMMENT = 'comment/UPDATE_COMMENT';
const GET_ONE_COMMENT = 'comment/GET_ONE';
const GET_MY_COMMENT = 'comment/GET_MY_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';

const actionCreateComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const actionGetAllComments = (comments) => {
    return {
        type: GET_ALL_COMMENT,
        comments
    }
}

const actionGetMyComments = (comments) => {
    return {
        type: GET_MY_COMMENT,
        comments
    }
}

const actionGetOneComments = (comment) => {
    return {
        type: GET_ONE_COMMENT,
        comment
    }
}

const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

const actionDeleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    }
}

// Thunks
export const thunkCreateComment = (payload) => async dispatch => {
    const response = await fetch(`/api/sessions/${payload.sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    if (response.ok) {
        dispatch(actionCreateComment(data))
        return response
    } else {
        return data;
    }
}

export const thunkGetAllComments = () => async dispatch => {
    const response = await fetch(`/api/comments`, {

    })
}
