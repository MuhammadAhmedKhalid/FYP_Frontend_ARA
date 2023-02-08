import { ADD_ROOM_FAILURE, ADD_ROOM_REQUEST, ADD_ROOM_SUCCESS } from './addRoomTypes'

export const addRoomInitialState = {
    loading: false,
    success: '',
    error: '',
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
        }
        case ADD_ROOM_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}