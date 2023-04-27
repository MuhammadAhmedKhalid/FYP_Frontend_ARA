import { UPDATE_POSITION_FAILURE, UPDATE_POSITION_REQUEST, UPDATE_POSITION_SUCCESS, RESET_STATE } from './updatePositionTypes'

const updatePositionInitialState = {
    loading: false,
    result: '',
    error: '',
    updated: false
}

export const updatePositionReducer = (state = updatePositionInitialState, action) => {
    switch (action.type) {
        case UPDATE_POSITION_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_POSITION_SUCCESS: return {
            ...state,
            loading: false,
            result: action.result,
            error: '',
            updated: true
        }
        case UPDATE_POSITION_FAILURE: return {
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