import { DELETE_BATCH_FAILURE, DELETE_BATCH_REQUEST, DELETE_BATCH_SUCCESS } from './deleteBatchTypes'

export const deleteBatchInitialState = {
    loading: false,
    success: '',
    error: '',
    deleted: null
}

export const deleteBatchReducer = (state = deleteBatchInitialState, action) => {
    switch (action.type) {
        case DELETE_BATCH_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_BATCH_SUCCESS: return {
            ...state,
            loading: false,
            success: action.message,
            error: '',
            deleted: true
        }
        case DELETE_BATCH_FAILURE: return {
            ...state,
            loading: false,
            success: '',
            error: action.message,
            deleted: false
        }
        default: return state
    }
}