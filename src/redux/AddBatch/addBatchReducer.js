import { ADD_BATCH_FAILURE, ADD_BATCH_REQUEST, ADD_BATCH_SUCCESS } from './addBatchTypes'

export const addBatchInitialState = {
    loading: false,
    success: '',
    error: '',
    added: null,
}

export const addBatchReducer = (state = addBatchInitialState, action) => {
    switch (action.type) {
        case ADD_BATCH_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_BATCH_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            added: true
        }
        case ADD_BATCH_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            added: false
        }
        default: return state
    }
}