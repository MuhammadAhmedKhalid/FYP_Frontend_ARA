import { GET_POSITION_FAILURE, GET_POSITION_REQUEST, GET_POSITION_SUCCESS } from './getPositionTypes'

const getPositionInitialState = {
    loading: false,
    faculty: [],
    error: '',
    added: false
}

export const getPositionReducer = (state = getPositionInitialState, action) => {
    switch (action.type) {
        case GET_POSITION_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_POSITION_SUCCESS: return {
            ...state,
            loading: false,
            faculty: action.data,
            error: '',
            added: true
        }
        case GET_POSITION_FAILURE: return {
            ...state,
            loading: false,
            faculty: [],
            error: action.message,
            added: false
        }
        default: return state
    }
}