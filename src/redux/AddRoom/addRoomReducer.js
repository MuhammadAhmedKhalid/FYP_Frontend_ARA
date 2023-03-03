import { ADD_ROOM_FAILURE, ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS, RESET_STATE } from './addRoomTypes'

export const addRoomInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addRoomReducer = (state = addRoomInitialState, action) => {
    switch (action.type) {
        case ADD_ROOM_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_ROOM_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_ROOM_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        case RESET_STATE: return {
            ...state,
            added: null
        }
        default: return state
    }
}