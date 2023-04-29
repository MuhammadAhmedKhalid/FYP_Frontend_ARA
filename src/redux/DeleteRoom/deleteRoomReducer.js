import { DELETE_ROOM_FAILURE, DELETE_ROOM_REQUEST, DELETE_ROOM_SUCCESS } from './deleteRoomTypes'

export const deleteRoomInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteRoomReducer = (state = deleteRoomInitialState, action) => {
    switch (action.type) {
        case DELETE_ROOM_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_ROOM_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_ROOM_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}