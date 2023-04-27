import { UPDATE_ROOM_FAILURE, UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS, RESET_STATE } from './updateRoomTypes'

const updateRoomInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updateRoomReducer = (state = updateRoomInitialState, action) => {
    switch (action.type) {
        case UPDATE_ROOM_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_ROOM_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_ROOM_FAILURE: return {
            ...state,
            loading: false,
            result: '',
            error: action.message,
            updated: false
        }
        case RESET_STATE: return {
            ...state,
            error: '',
            updated: false
        }
        default: return state
    }
}