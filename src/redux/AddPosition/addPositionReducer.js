import { ADD_POSITION_FAILURE, ADD_POSITION_REQUEST, ADD_POSITION_SUCCESS, RESET_STATE } from './addPositionTypes'

export const addPositionInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null
}

export const addPositionReducer = (state = addPositionInitialState, action) => {
    switch (action.type) {
        case ADD_POSITION_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_POSITION_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_POSITION_FAILURE: return {
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