import { GET_ROOMS_FAILURE, GET_ROOMS_REQUEST, GET_ROOMS_SUCCESS } from './getRoomsTypes'

const roomssInitialState = {
    loading: false,
    rooms: [],
    error: '',
    added: false
}

export const roomsReducer = (state = roomssInitialState, action) => {
    switch (action.type) {
        case GET_ROOMS_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_ROOMS_SUCCESS: return {
            ...state,
            loading: false,
            rooms: action.data,
            error: '',
            added: true
        }
        case GET_ROOMS_FAILURE: return {
            ...state,
            loading: false,
            rooms: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}