import { ADD_ROOM_REQ_FAILURE, ADD_ROOM_REQ_REQUEST, ADD_ROOM_REQ_SUCCESS } from './roomRequestTypes'

export const addRoomReqInitialState = {
    loading: false,
    success: '',
    error: '',
    added: false
}

export const addRoomReqeReducer = (state = addRoomReqInitialState, action) => {
    switch (action.type) {
        case ADD_ROOM_REQ_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_ROOM_REQ_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_ROOM_REQ_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}