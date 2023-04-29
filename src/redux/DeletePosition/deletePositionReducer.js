import { DELETE_POSITION_FAILURE, DELETE_POSITION_REQUEST, DELETE_POSITION_SUCCESS } from './deletePositionTypes'

export const deletePositionInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deletePositionReducer = (state = deletePositionInitialState, action) => {
    switch (action.type) {
        case DELETE_POSITION_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_POSITION_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_POSITION_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}