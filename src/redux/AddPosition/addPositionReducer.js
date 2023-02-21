import { ADD_POSITION_FAILURE, ADD_POSITION_REQUEST, ADD_POSITION_SUCCESS } from './addPositionTypes'

export const addPositionInitialState = {
    loading: false,
    success: '',
    error: '',
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
        }
        case ADD_POSITION_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
        }
        default: return state
    }
}